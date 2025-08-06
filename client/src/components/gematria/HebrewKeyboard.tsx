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
      <DialogContent className="max-w-xs sm:max-w-md w-full mx-4 bg-gradient-to-br from-primary to-primary/90 border-2 border-secondary">
        <DialogHeader>
          <DialogTitle className="text-center text-white text-lg sm:text-xl">
            ⌨️ Hebrew Keyboard
          </DialogTitle>
          <p className="text-center text-sm text-gray-200 mt-2 px-2">
            Click letters to type in Hebrew. Gold buttons are regular letters, purple buttons are final letters.
          </p>
        </DialogHeader>
        
        <div className="space-y-3 p-3 sm:p-4">
          <div className="space-y-2">
            {hebrewLetters.map((row, rowIndex) => (
              <div key={rowIndex} className="flex gap-1 sm:gap-2 justify-center">
                {row.map((letter) => (
                  <Button
                    key={letter}
                    onClick={() => onKeyPress(letter)}
                    className="hebrew-key w-10 h-10 sm:w-12 sm:h-12 text-base sm:text-lg font-bold 
                               bg-gradient-to-br from-secondary to-secondary/80 
                               hover:from-secondary/90 hover:to-secondary/70 
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

          <div className="pt-2 border-t border-secondary/50">
            <p className="text-center text-xs text-gray-300 mb-2">Final Letters (end of word)</p>
            <div className="flex gap-1 sm:gap-2 justify-center">
              {finalLetters.map((letter) => (
                <Button
                  key={letter}
                  onClick={() => onKeyPress(letter)}
                  className="hebrew-key w-8 h-8 sm:w-10 sm:h-10 text-sm sm:text-base font-bold 
                             bg-gradient-to-br from-primary/80 to-primary 
                             hover:from-primary/70 hover:to-primary/90 
                             text-secondary border-2 border-primary/80
                             transition-all duration-200 hover:scale-105"
                  dir="rtl"
                >
                  {letter}
                </Button>
              ))}
            </div>
          </div>

          <div className="flex gap-2 justify-center pt-3 border-t border-secondary/50">
            <Button
              onClick={onBackspace}
              className="px-3 py-2 text-sm sm:text-base bg-gradient-to-br from-secondary to-secondary/80 
                         hover:from-secondary/90 hover:to-secondary/70 text-primary border-2 border-secondary
                         transition-all duration-200 hover:scale-105 font-bold"
            >
              ← Backspace
            </Button>
            <Button
              onClick={onClear}
              className="px-3 py-2 text-sm sm:text-base bg-gradient-to-br from-secondary to-secondary/80 
                         hover:from-secondary/90 hover:to-secondary/70 text-primary border-2 border-secondary
                         transition-all duration-200 hover:scale-105 font-bold"
            >
              🗑️ Clear
            </Button>
            <Button
              onClick={onClose}
              className="px-3 py-2 text-sm sm:text-base bg-gradient-to-br from-secondary to-secondary/80 
                         hover:from-secondary/90 hover:to-secondary/70 text-primary border-2 border-secondary
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
