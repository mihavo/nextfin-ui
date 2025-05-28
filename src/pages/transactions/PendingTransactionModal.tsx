'use client';

import { mapCurrencySymbolToObject } from '@/components/utils/currency';
import { useAppSelector } from '@/store/hooks';
import { TransactionMethod } from '@/types/Transaction';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowRight,
  Check,
  CreditCard,
  ExternalLink,
  Wallet,
} from 'lucide-react';

export function PendingTransactionModal() {
  const isComplete =
    useAppSelector((state) => state.transactions.newTransactionStatus) ===
    'succeeded';

  const pendingTransaction = useAppSelector(
    (state) => state.transactions.pendingTransaction
  );

  const getIcon = (type: TransactionMethod) => {
    switch (type) {
      case TransactionMethod.ACCOUNT:
        return <Wallet className="h-5 w-5" />;
      case TransactionMethod.CARD:
        return <CreditCard className="h-5 w-5" />;
      case TransactionMethod.EXTERNAL:
        return <ExternalLink className="h-5 w-5" />;
      default:
        return <Wallet className="h-5 w-5" />;
    }
  };

  return (
    <AnimatePresence>
      {pendingTransaction == null ? (
        <div>
          <p className="text-center text-gray-500 py-8">
            No Pending Transactzions.
          </p>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className={`relative mx-4 w-full max-w-xl overflow-hidden rounded-xl bg-white p-6 shadow-lg ${
              isComplete ? 'dark:bg-[#0f2116]' : 'dark:bg-gray-900'
            }`}
          >
            <div className="flex flex-col">
              <div className="mb-6 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full">
                  {isComplete ? (
                    <Check className="h-12 w-12 bg-green-100 text-green-600 rounded-full p-1 dark:bg-green-900/30 dark:text-green-400" />
                  ) : (
                    <ArrowRight className="h-12 w-12 bg-blue-100 text-blue-400 rounded-full p-1 dark:bg-blue-900/30 dark:text-blue-400" />
                  )}
                </div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {isComplete ? 'Transfer Complete' : 'Processing Transfer'}
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {isComplete
                    ? 'Your money has been sent'
                    : 'Securely moving your funds'}
                </p>
              </div>

              {/* Amount Display */}
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="mb-6 text-center"
              >
                <div className="text-3xl font-bold text-gray-900 dark:text-white">
                  {
                    mapCurrencySymbolToObject(pendingTransaction.currency)
                      ?.symbol
                  }
                  {pendingTransaction.amount}
                </div>
              </motion.div>

              {/* Transfer Visualization */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mb-8"
              >
                <div className="flex items-center">
                  {/* From Account */}
                  <div className="flex flex-col items-center space-y-2">
                    <motion.div
                      animate={{
                        scale: isComplete ? 1 : [1, 1.05, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: isComplete ? 0 : Number.POSITIVE_INFINITY,
                      }}
                      className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                    >
                      {getIcon(TransactionMethod.ACCOUNT)}
                    </motion.div>
                    <div className="text-center">
                      <div className="text-xs font-medium text-gray-900 dark:text-white">
                        {'Source'}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {'Account'}
                      </div>
                    </div>
                  </div>

                  {/* Animated Transfer Path */}
                  <div className="flex flex-1 px-4">
                    <svg
                      className="h-6 w-full"
                      viewBox="0 0 200 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      {/* Background path */}
                      <path
                        d="M 10 12 L 190 12"
                        stroke="rgba(156, 163, 175, 0.3)"
                        strokeWidth="2"
                        fill="none"
                      />

                      {/* Animated progress path */}
                      <motion.path
                        d="M 10 12 L 190 12"
                        stroke={isComplete ? '#05DE72' : '#3b82f6'}
                        strokeWidth="2"
                        fill="none"
                        transition={{
                          duration: 0.3,
                          ease: 'easeOut',
                          repeat: Infinity,
                          repeatType: 'loop',
                        }}
                      />

                      {/* Subtle moving dots */}
                      {!isComplete &&
                        Array.from({ length: 2 }).map((_, i) => (
                          <motion.circle
                            key={i}
                            r="3"
                            fill={'#3b82f6'}
                            animate={{
                              cx: [10, 190],
                              opacity: [0, 0.7, 0],
                            }}
                            transition={{
                              duration: 2.5,
                              delay: i * 1,
                              repeat: Number.POSITIVE_INFINITY,
                              ease: 'easeInOut',
                            }}
                          />
                        ))}
                    </svg>
                  </div>

                  {/* To Account */}
                  <div className="flex flex-col items-center space-y-2">
                    <motion.div
                      animate={{
                        scale: isComplete ? [1, 1.1, 1] : 1,
                      }}
                      transition={{ duration: 1, delay: isComplete ? 0 : 0 }}
                      className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                    >
                      {getIcon(pendingTransaction.transactionType)}
                    </motion.div>
                    <div className="text-center">
                      <div className="text-xs font-medium text-gray-900 dark:text-white">
                        {'Recipient'}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {'Account'}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Status Message */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-center"
              >
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {isComplete
                    ? 'Your transfer has been completed successfully.'
                    : 'Processing your transaction securely...'}
                </p>
              </motion.div>

              {/* Subtle Success Indicator */}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
