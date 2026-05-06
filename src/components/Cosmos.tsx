import { useEffect, useRef } from 'react';

export const Cosmos = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let stars: {
      x: number;
      y: number;
      r: number;
      speed: number;
      alpha: number;
      phase: number;
    }[] = [];

    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      stars = Array.from({ length: 200 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.8 + 0.2,
        speed: Math.random() * 0.3 + 0.05,
        alpha: Math.random() * 0.7 + 0.1,
        phase: Math.random() * Math.PI * 2,
      }));
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach((s) => {
        const a = s.alpha * (0.6 + 0.4 * Math.sin(t * 0.001 * s.speed * 3 + s.phase));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${a})`;
        ctx.fill();
      });
      animationFrameId = requestAnimationFrame(draw);
    };

    init();
    draw(0);

    const handleResize = () => {
      init();
    };

    window.addEventListener('resize', handleResize);
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <canvas id="cosmos" ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />
      <div className="fixed inset-0 z-1 pointer-events-none bg-[radial-gradient(ellipse_60%_40%_at_20%_30%,rgba(240,96,128,0.18)_0%,transparent_70%),radial-gradient(ellipse_50%_60%_at_80%_70%,rgba(144,96,240,0.15)_0%,transparent_70%),radial-gradient(ellipse_40%_30%_at_60%_10%,rgba(80,232,144,0.10)_0%,transparent_70%)]" />
    </>
  );
};
