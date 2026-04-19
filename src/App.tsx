/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Loader2 } from 'lucide-react';

const questions = [
  {
    id: 1,
    question: '¿Cuál es tu rango de edad actual?',
    options: [
      { text: '👩 Menos de 50 años' },
      { text: '👩‍🦳 De 50 a 65 años' },
      { text: '👵 Más de 65 años' },
    ],
  },
  {
    id: 2,
    question:
      'Últimamente, ¿has notado que olvidas nombres o dónde dejaste las llaves con frecuencia?',
    options: [
      { text: '🤷‍♀️ Sí, me pasa muy a menudo' },
      { text: '🤔 Solo a veces, pero me preocupa' },
      { text: '🙅‍♂️ No, mi memoria está perfecta' },
    ],
  },
  {
    id: 3,
    question:
      'Si existiera un método natural y sencillo de 12 minutos diarios para apoyar la agilidad mental desde casa, ¿te interesaría conocerlo?',
    options: [
      { text: '✅ Sí, me interesa mucho' },
      { text: '❌ No, prefiero los métodos tradicionales' },
    ],
  },
];

export default function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [stage, setStage] = useState<'quiz' | 'loading' | 'final'>('quiz');
  const [loadingText, setLoadingText] = useState('Analizando tus respuestas...');
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const handleAnswer = (index: number) => {
    setSelectedOption(index);
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion((c) => c + 1);
        setSelectedOption(null);
      } else {
        startLoading();
      }
    }, 400); // Small delay to show selection feedback
  };

  const startLoading = () => {
    setStage('loading');
    setTimeout(() => {
      setLoadingText('Buscando la mejor recomendación para ti...');
    }, 1500);
    setTimeout(() => {
      // Redirecionamento direto para a VSL após o loading
      window.location.href = '/vsl2.html';
    }, 3000);
  };

  const currentQ = questions[currentQuestion];
  const progress = Math.round(((currentQuestion) / questions.length) * 100);

  return (
    <div className="min-h-dvh bg-[#F9F9F9] flex flex-col items-center font-sans antialiased px-4 overflow-hidden">
      {/* Header */}
      {stage === 'quiz' && (
        <div className="w-full max-w-lg px-4 flex justify-center pt-10 md:pt-12 mb-8">
          <img 
            src="/logo_onda.webp" 
            alt="Onda de la Claridad" 
            className="w-[125px] object-contain drop-shadow-sm" 
          />
        </div>
      )}

      <div className={`w-full max-w-lg flex flex-col ${stage === 'quiz' ? 'justify-start' : 'justify-center flex-1 pb-20'}`}>
        <AnimatePresence mode="wait">
          {stage === 'quiz' && (
            <motion.div
              key={`question-${currentQuestion}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="w-full flex-col"
            >
              {/* Progress Bar */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-500">
                    Progreso
                  </span>
                  <span className="text-sm font-medium text-gray-500">
                    {progress}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <motion.div
                    className="bg-blue-600 h-2.5 rounded-full"
                    initial={{ width: `${((currentQuestion) / questions.length) * 100}%` }}
                    animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                    transition={{ duration: 0.5 }}
                  ></motion.div>
                </div>
              </div>

              {/* Question */}
              <h2 className="text-[24px] md:text-[28px] font-bold text-gray-900 leading-tight mb-8 text-center text-balance">
                {currentQ.question}
              </h2>

              {/* Options */}
              <div className="space-y-4">
                {currentQ.options.map((option, index) => {
                  const isSelected = selectedOption === index;
                  return (
                    <button
                      key={index}
                      onClick={() => handleAnswer(index)}
                      disabled={selectedOption !== null}
                      className={`w-full min-h-[72px] px-6 text-left text-lg md:text-xl font-medium rounded-xl border-2 transition-all duration-200 flex items-center shadow-sm active:scale-[0.98]
                        ${
                          isSelected
                            ? 'bg-blue-50 border-blue-500 text-blue-700 shadow-md'
                            : 'bg-white border-gray-200 text-gray-800 hover:border-blue-300 hover:bg-gray-50'
                        }
                      `}
                    >
                       <span className="leading-snug">{option.text}</span>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {stage === 'loading' && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center text-center space-y-6"
            >
              <div className="relative">
                 <Loader2 className="w-16 h-16 text-blue-600 animate-spin" />
              </div>
              <motion.p 
                key={loadingText}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xl md:text-2xl font-medium text-gray-800 animate-pulse"
              >
                {loadingText}
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
