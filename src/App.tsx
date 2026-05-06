import { useState, useCallback, useRef, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import { BLESSINGS } from './constants';
import { Cosmos } from './components/Cosmos';
import { HUD } from './components/HUD';
import { IntroScreen } from './components/IntroScreen';
import { BlessingScreen } from './components/BlessingScreen';
import { TransitScreen } from './components/TransitScreen';
import { FinalScreen } from './components/FinalScreen';

type ScreenState = 'INTRO' | 'BLESSING' | 'TRANSIT' | 'FINAL';

export default function App() {
  const [screen, setScreen] = useState<ScreenState>('INTRO');
  const [currentIdx, setCurrentIdx] = useState(0);
  const [visitedCount, setVisitedCount] = useState(0);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [isWarpingFinal, setIsWarpingFinal] = useState(false);

  // Audio refs
  const audioCtxRef = useRef<AudioContext | null>(null);
  const bgGainRef = useRef<GainNode | null>(null);

  const initAudio = useCallback(async () => {
    if (audioCtxRef.current) return;
    
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    const ac = new AudioContextClass();
    audioCtxRef.current = ac;

    const bgGain = ac.createGain();
    bgGain.gain.value = 0; // Start muted
    bgGain.connect(ac.destination);
    bgGainRef.current = bgGain;

    // Ambient background
    const freqs = [65.41, 98.00, 130.81, 196.00, 261.63];
    freqs.forEach((freq, i) => {
      const osc = ac.createOscillator();
      const g = ac.createGain();
      osc.type = i % 2 === 0 ? 'sine' : 'triangle';
      osc.frequency.setTargetAtTime(freq, ac.currentTime, 0.1);
      
      const lfo = ac.createOscillator();
      const lfoGain = ac.createGain();
      lfo.frequency.value = 0.04 + i * 0.02;
      lfoGain.gain.value = freq * 0.012;
      lfo.connect(lfoGain);
      lfoGain.connect(osc.frequency);
      
      g.gain.value = 0.12 / (i + 1);
      osc.connect(g);
      g.connect(bgGain);
      lfo.start();
      osc.start();
    });

    setAudioEnabled(true);
    bgGain.gain.setTargetAtTime(0.06, ac.currentTime, 1);
  }, []);

  const playSfx = useCallback((type: 'next' | 'travel' | 'final') => {
    if (!audioCtxRef.current || !audioEnabled) return;
    const ac = audioCtxRef.current;
    if (ac.state === 'suspended') ac.resume();

    const master = ac.createGain();
    master.gain.value = 0.35;
    master.connect(ac.destination);

    if (type === 'next') {
      [523, 659, 784].forEach((f, i) => {
        const osc = ac.createOscillator();
        const g = ac.createGain();
        osc.type = 'sine';
        osc.frequency.value = f;
        const t = ac.currentTime + i * 0.1;
        g.gain.setValueAtTime(0, t);
        g.gain.linearRampToValueAtTime(0.2, t + 0.05);
        g.gain.exponentialRampToValueAtTime(0.001, t + 0.5);
        osc.connect(g);
        g.connect(master);
        osc.start(t);
        osc.stop(t + 0.5);
      });
    } else if (type === 'travel') {
      const osc = ac.createOscillator();
      const g = ac.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, ac.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ac.currentTime + 0.6);
      g.gain.setValueAtTime(0.15, ac.currentTime);
      g.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + 0.6);
      osc.connect(g);
      g.connect(master);
      osc.start();
      osc.stop(ac.currentTime + 0.6);
    } else if (type === 'final') {
      [[261, 0], [329, 0.08], [392, 0.16], [523, 0.24], [659, 0.35], [784, 0.5]].forEach(([f, del]) => {
        const osc = ac.createOscillator();
        const g = ac.createGain();
        osc.type = 'sine';
        osc.frequency.value = f;
        const t = ac.currentTime + del;
        g.gain.setValueAtTime(0, t);
        g.gain.linearRampToValueAtTime(0.18, t + 0.08);
        g.gain.exponentialRampToValueAtTime(0.001, t + 1.8);
        osc.connect(g);
        g.connect(master);
        osc.start(t);
        osc.stop(t + 1.8);
      });
    }
  }, [audioEnabled]);

  const toggleAudio = () => {
    if (!audioCtxRef.current) {
      initAudio();
    } else {
      const targetGain = audioEnabled ? 0 : 0.06;
      bgGainRef.current?.gain.setTargetAtTime(targetGain, audioCtxRef.current.currentTime, 0.2);
      setAudioEnabled(!audioEnabled);
    }
  };

  const handleStart = () => {
    initAudio();
    setScreen('BLESSING');
    setVisitedCount(1);
    playSfx('next');
  };

  const handleNext = () => {
    if (currentIdx < BLESSINGS.length - 1) {
      playSfx('travel');
      setScreen('TRANSIT');
      setTimeout(() => {
        const nextIdx = currentIdx + 1;
        setCurrentIdx(nextIdx);
        setVisitedCount(v => Math.max(v, nextIdx + 1));
        setScreen('BLESSING');
        playSfx('next');
      }, 1800);
    } else {
      playSfx('final');
      setScreen('TRANSIT');
      setIsWarpingFinal(true);
      setTimeout(() => {
        setScreen('FINAL');
        setIsWarpingFinal(false);
      }, 2200);
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setVisitedCount(0);
    setScreen('INTRO');
  };

  return (
    <div className="relative w-full h-screen bg-bg text-cream font-serif overflow-hidden">
      <Cosmos />
      
      {screen !== 'INTRO' && screen !== 'FINAL' && (
        <HUD currentIdx={currentIdx} total={BLESSINGS.length} visitedCount={visitedCount} />
      )}

      <AnimatePresence mode="wait">
        {screen === 'INTRO' && <IntroScreen key="intro" onStart={handleStart} />}
        
        {screen === 'BLESSING' && (
          <BlessingScreen
            key={`blessing-${currentIdx}`}
            blessing={BLESSINGS[currentIdx]}
            currentIdx={currentIdx}
            total={BLESSINGS.length}
            onNext={handleNext}
          />
        )}

        {screen === 'TRANSIT' && (
          <TransitScreen
            key="transit"
            nextBlessing={isWarpingFinal ? null : BLESSINGS[currentIdx + 1]}
            isFinal={isWarpingFinal}
          />
        )}

        {screen === 'FINAL' && <FinalScreen key="final" onRestart={handleRestart} />}
      </AnimatePresence>

      {/* Audio Toggle */}
      <button
        onClick={toggleAudio}
        className="fixed bottom-5 right-5 z-[99] w-10 h-10 rounded-full bg-[#0f0520]/90 border border-[rgba(240,192,96,0.25)] text-rose flex items-center justify-center transition-all hover:border-rose hover:scale-110 cursor-pointer"
        title="Sonido"
      >
        {audioEnabled ? '🔊' : '🔇'}
      </button>
    </div>
  );
}
