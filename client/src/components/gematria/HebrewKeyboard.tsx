import * as React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface HebrewKeyboardProps {
  isOpen: boolean;
  onClose: () => void;
  onKeyPress: (key: string) => void;
  onBackspace: () => void;
  onClear: () => void;
}

export function HebrewKeyboard({ isOpen, onClose, onKeyPress, onBackspace, onClear }: HebrewKeyboardProps) {
  const hebrewLetters = [
    ['א', 'ב', 'ג', 'ד'],
    ['ה', 'ו', 'ז', 'ח'],
    ['ט', 'י', 'כ', 'ל'],
    ['מ', 'נ', 'ס', 'ע'],
    ['פ', 'צ', 'ק', 'ר'],
    ['ש', 'ת']
  ];

  const finalLetters = ['ך', 'ם', 'ן', 'ף', 'ץ'];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-xs sm:max-w-md w-full mx-4 bg-gradient-to-br from-purple-900 to-purple-800 border-2 border-yellow-400">
        <DialogHeader>
          <DialogTitle className="text-center text-white text-lg sm:text-xl">
            ⌨️ Hebrew Keyboard
          </DialogTitle>
          <p className="text-center text-sm text-gray-200 mt-2 px-2">
            Click letters to type in Hebrew. Gold buttons are regular letters, purple buttons are final letters.
          </p>
        </DialogHeader>
        
        <div className="space-y-3 p-3 sm:p-4">
          {/* Regular Hebrew Letters */}
          <div className="space-y-2">
            {hebrewLetters.map((row, rowIndex) => (
              <div key={rowIndex} className="flex gap-1 sm:gap-2 justify-center">
                {row.map((letter) => (
                  <Button
                    key={letter}
                    onClick={() => onKeyPress(letter)}
                    className="hebrew-key w-10 h-10 sm:w-12 sm:h-12 text-base sm:text-lg font-bold 
                               bg-gradient-to-br from-yellow-400 to-yellow-600 
                               hover:from-yellow-500 hover:to-yellow-700 
                               text-purple-900 border-2 border-yellow-500
                               transition-all duration-200 hover:scale-105"
                    dir="rtl"
                  >
                    {letter}
                  </Button>
                ))}
              </div>
            ))}
          </div>

          {/* Final Letters */}
          <div className="pt-2 border-t border-purple-400">
            <p className="text-center text-xs text-gray-300 mb-2">Final Letters (end of word)</p>
            <div className="flex gap-1 sm:gap-2 justify-center">
              {finalLetters.map((letter) => (
                <Button
                  key={letter}
                  onClick={() => onKeyPress(letter)}
                  className="hebrew-key w-8 h-8 sm:w-10 sm:h-10 text-sm sm:text-base font-bold 
                             bg-gradient-to-br from-purple-400 to-purple-600 
                             hover:from-purple-500 hover:to-purple-700 
                             text-white border-2 border-purple-300
                             transition-all duration-200 hover:scale-105"
                  dir="rtl"
                >
                  {letter}
                </Button>
              ))}
            </div>
          </div>

          {/* Control Buttons */}
          <div className="flex gap-2 justify-center pt-3 border-t border-purple-400">
            <Button
              onClick={onBackspace}
              className="px-3 py-2 text-sm sm:text-base bg-red-600 hover:bg-red-700 text-white border-2 border-red-400"
            >
              ← Backspace
            </Button>
            <Button
              onClick={onClear}
              className="px-3 py-2 text-sm sm:text-base bg-orange-600 hover:bg-orange-700 text-white border-2 border-orange-400"
            >
              🗑️ Clear
            </Button>
            <Button
              onClick={onClose}
              className="px-3 py-2 text-sm sm:text-base bg-gray-600 hover:bg-gray-700 text-white border-2 border-gray-400"
            >
              ✓ Done
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
