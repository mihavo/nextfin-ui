import { useAppSelector } from '@/store/hooks';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';

const CompleteRegistration = () => {
  const [showConfetti, setShowConfetti] = useState(false);
  const fullName = useAppSelector(
    (state) => state.holders.holder?.fullName ?? ''
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowConfetti(true);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: 'beforeChildren',
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 12,
      },
    },
  };

  const checkmarkVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 200,
        damping: 15,
        delay: 0.4,
      },
    },
  };

  const buttonVariants = {
    initial: { scale: 1 },
    hover: {
      scale: 1.05,
      transition: {
        type: 'keyframes',
        stiffness: 400,
        damping: 10,
      },
    },
  };

  const renderConfetti = () => {
    if (!showConfetti) return null;

    return Array.from({ length: 50 }).map((_, index) => {
      const size = Math.random() * 10 + 5;
      const left = Math.random() * 100;
      const animDuration = Math.random() * 3 + 2;
      const delay = Math.random() * 0.5;
      const rotation = Math.random() * 360;
      const color = ['#22c55e', '#3b82f6', '#f97316', '#ec4899', '#a855f7'][
        Math.floor(Math.random() * 5)
      ];

      return (
        <motion.div
          key={index}
          initial={{
            top: -20,
            left: `${left}%`,
            rotate: 0,
            opacity: 1,
          }}
          animate={{
            top: '100%',
            rotate: rotation,
            opacity: 0,
          }}
          transition={{
            duration: animDuration,
            delay: delay,
            ease: 'easeOut',
          }}
          style={{
            position: 'absolute',
            width: size,
            height: size,
            backgroundColor: color,
            borderRadius: '2px',
            zIndex: 20,
          }}
        />
      );
    });
  };

  return (
    <div className="relative overflow-hidden">
      {renderConfetti()}

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="bg-white dark:bg-gray-800  rounded-2xl shadow-lg p-8 md:p-10 max-w-md mx-auto relative z-10"
      >
        <motion.div
          variants={checkmarkVariants}
          className="flex justify-center mb-6"
        >
          <div className="relative">
            <CheckCircle
              className="text-emerald-500 w-20 h-20"
              strokeWidth={1.5}
            />
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="absolute top-0 right-0"
            >
              <Sparkles className="text-amber-400 w-8 h-8" />
            </motion.div>
          </div>
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="text-3xl font-bold text-center  mb-2"
        >
          Registration Complete!
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-center text-muted-foreground mb-8"
        >
          Welcome to the platform,{' '}
          <span className="font-medium text-indigo-600">{fullName}</span>! Your
          account has been successfully created.
        </motion.p>

        <motion.div variants={itemVariants} className="flex justify-center">
          <motion.button
            variants={buttonVariants}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
            className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-300"
          >
            Continue to Dashboard
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default CompleteRegistration;
