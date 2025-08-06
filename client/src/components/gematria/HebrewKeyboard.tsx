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
      <DialogContent className="max-w-xs sm:max-w-md w-full mx-4 bg-primary border-2 border-secondary">
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
                               bg-secondary hover:bg-secondary/80 
                               text-primary border-2 border-secondary
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
          <div className="pt-2 border-t border-secondary">
            <p className="text-center text-xs text-gray-300 mb-2">Final Letters (end of word)</p>
            <div className="flex gap-1 sm:gap-2 justify-center">
              {finalLetters.map((letter) => (
                <Button
                  key={letter}
                  onClick={() => onKeyPress(letter)}
                  className="hebrew-key w-8 h-8 sm:w-10 sm:h-10 text-sm sm:text-base font-bold 
                             bg-primary/80 hover:bg-primary/60 
                             text-white border-2 border-primary
                             transition-all duration-200 hover:scale-105"
                  dir="rtl"
                >
                  {letter}
                </Button>
              ))}
            </div>
          </div>

          {/* Control Buttons */}
          <div className="flex gap-2 justify-center pt-3 border-t border-secondary">
            <Button
              onClick={onBackspace}
              className="px-3 py-2 text-sm sm:text-base bg-secondary hover:bg-secondary/80 
                         text-primary border-2 border-secondary
                         transition-all duration-200 hover:scale-105 font-bold"
            >
              ← Backspace
            </Button>
            <Button
              onClick={onClear}
              className="px-3 py-2 text-sm sm:text-base bg-secondary hover:bg-secondary/80 
                         text-primary border-2 border-secondary
                         transition-all duration-200 hover:scale-105 font-bold"
            >
              🗑️ Clear
            </Button>
            <Button
              onClick={onClose}
              className="px-3 py-2 text-sm sm:text-base bg-secondary hover:bg-secondary/80 
                         text-primary border-2 border-secondary
                         transition-all duration-200 hover:scale-105 font-bold"
            >
              ✓ Done
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
