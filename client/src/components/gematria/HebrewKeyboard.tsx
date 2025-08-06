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
      <DialogContent className="max-w-sm sm:max-w-lg w-full mx-2 sm:mx-4 bg-primary border-2 border-secondary overflow-hidden">
        <DialogHeader className="pb-2">
          <DialogTitle className="text-center text-white text-base sm:text-lg">
            ⌨️ Hebrew Keyboard
          </DialogTitle>
          <p className="text-center text-xs sm:text-sm text-gray-200 mt-1 px-1">
            Click letters to type in Hebrew. Gold buttons are regular letters, purple buttons are final letters.
          </p>
        </DialogHeader>
        
        <div className="space-y-2 p-2 sm:p-3 overflow-hidden">
          {/* Regular Hebrew Letters */}
          <div className="space-y-1 sm:space-y-2">
            {hebrewLetters.map((row, rowIndex) => (
              <div key={rowIndex} className="flex gap-1 justify-center items-center flex-wrap">
                {row.map((letter) => (
                  <Button
                    key={letter}
                    onClick={() => onKeyPress(letter)}
                    className="hebrew-key w-8 h-8 sm:w-10 sm:h-10 text-sm sm:text-base font-bold 
                               bg-secondary hover:bg-secondary/80 
                               text-primary border border-secondary
                               transition-all duration-200 hover:scale-105 flex-shrink-0"
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
            <p className="text-center text-xs text-gray-300 mb-1">Final Letters (end of word)</p>
            <div className="flex gap-1 justify-center flex-wrap">
              {finalLetters.map((letter) => (
                <Button
                  key={letter}
                  onClick={() => onKeyPress(letter)}
                  className="hebrew-key w-6 h-6 sm:w-8 sm:h-8 text-xs sm:text-sm font-bold 
                             bg-primary/80 hover:bg-primary/60 
                             text-white border border-primary
                             transition-all duration-200 hover:scale-105 flex-shrink-0"
                  dir="rtl"
                >
                  {letter}
                </Button>
              ))}
            </div>
          </div>

          {/* Control Buttons */}
          <div className="flex gap-1 sm:gap-2 justify-center pt-2 border-t border-secondary flex-wrap">
            <Button
              onClick={onBackspace}
              className="px-2 py-1 sm:px-3 sm:py-2 text-xs sm:text-sm bg-secondary hover:bg-secondary/80 
                         text-primary border border-secondary
                         transition-all duration-200 hover:scale-105 font-bold flex-shrink-0"
            >
              ← Back
            </Button>
            <Button
              onClick={onClear}
              className="px-2 py-1 sm:px-3 sm:py-2 text-xs sm:text-sm bg-secondary hover:bg-secondary/80 
                         text-primary border border-secondary
                         transition-all duration-200 hover:scale-105 font-bold flex-shrink-0"
            >
              🗑️ Clear
            </Button>
            <Button
              onClick={onClose}
              className="px-2 py-1 sm:px-3 sm:py-2 text-xs sm:text-sm bg-secondary hover:bg-secondary/80 
                         text-primary border border-secondary
                         transition-all duration-200 hover:scale-105 font-bold flex-shrink-0"
            >
              ✓ Done
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
