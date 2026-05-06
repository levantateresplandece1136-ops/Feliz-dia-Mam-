import { motion } from 'motion/react';

interface IntroScreenProps {
  onStart: () => void;
}

export const IntroScreen = ({ onStart }: IntroScreenProps) => {
  return (
    <motion.div
      className="fixed inset-0 z-10 flex flex-col items-center justify-center p-8 text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.span
        className="text-6xl mb-6 animate-pulse-heart"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
      >
        💝
      </motion.span>

      <motion.p
        className="font-mono text-[10px] tracking-[5px] text-rose uppercase mb-2"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        ♥ Misión Especial — Día de las Madres ♥
      </motion.p>

      <motion.h1
        className="font-orbitron font-black text-4xl md:text-7xl leading-tight bg-gradient-to-br from-rose via-violet to-gold bg-clip-text text-transparent mb-6"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        10 RAZONES
        <br />
        POR LAS QUE
        <br />
        LAS MADRES SON
        <br />
        UNA BENDICIÓN
      </motion.h1>

      <motion.p
        className="italic text-xl text-[rgba(240,236,224,0.55)] mb-8"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.3 }}
      >
        Un viaje celestial según las Escrituras
      </motion.p>

      <motion.div
        className="border border-[rgba(240,192,96,0.25)] bg-[rgba(15,5,32,0.92)] backdrop-blur-md rounded-lg p-6 md:p-8 max-w-[560px] w-full text-left mb-10"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.8 }}
      >
        <p className="mb-3 text-[rgba(240,236,224,0.55)] text-lg">
          <strong className="text-rose uppercase tracking-wider text-sm mr-2">Misión:</strong>
          Viajar a través de 10 dimensiones espirituales para descubrir las razones bíblicas por las que una madre es un regalo divino.
        </p>
        <p className="mb-3 text-[rgba(240,236,224,0.55)] text-lg">
          <strong className="text-rose uppercase tracking-wider text-sm mr-2">Fuente:</strong>
          La Palabra de Dios — cada razón está respaldada por las Escrituras.
        </p>
        <p className="text-[rgba(240,236,224,0.55)] text-lg">
          <strong className="text-rose uppercase tracking-wider text-sm mr-2">Preparada?</strong>
          Este viaje cambiará la forma en que ves el amor de una madre.
        </p>
      </motion.div>

      <motion.button
        className="font-orbitron text-xs font-bold tracking-[3px] uppercase px-11 py-4 bg-gradient-to-br from-[rgba(240,96,128,0.15)] to-[rgba(144,96,240,0.1)] border border-rose text-rose rounded-sm cursor-pointer transition-all hover:bg-rose hover:text-[#0f0520] hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(240,96,128,0.4)]"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 2.3 }}
        onClick={onStart}
      >
        ⊳ INICIAR MISIÓN
      </motion.button>
    </motion.div>
  );
};
