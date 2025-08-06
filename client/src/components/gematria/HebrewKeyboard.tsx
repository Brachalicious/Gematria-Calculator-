import * as React from '    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-xs sm:max-w-md w-full mx-4">
        <DialogHeader>
          <DialogTitle className="text-center text-white text-lg sm:text-xl">
            ⌨️ Hebrew Keyboard
          </DialogTitle>
          <p className="text-center text-sm text-gray-200 mt-2 px-2">
            Click letters to type in Hebrew. Gold buttons are regular letters, purple buttons are final letters.
          </p>
          <p className="text-center text-xs sm:text-sm font-semibold text-yellow-300 mt-1">
            Currently typing in: {
              activeInput === 0 ? 'First Name' : 
              activeInput === 1 ? 'Second Name' : 
              activeInput === 2 ? 'Third Name' : 
              activeInput === 3 ? 'Fourth Name' : 
              'Fifth Name'
            }
          </p>
        </DialogHeader>tton } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface HebrewKeyboardProps {
  isOpen: boolean;
  onClose: () => void;
  onKeyPress: (key: string) => void;
  onBackspace: () => void;
  onClear: () => void;
  activeInput: number;
}

const hebrewKeys = [
  ['א', 'ב', 'ג', 'ד', 'ה', 'ו', 'ז'],
  ['ח', 'ט', 'י', 'כ', 'ל', 'מ', 'ן'],
  ['נ', 'ס', 'ע', 'פ', 'צ', 'ק', 'ר'],
  ['ש', 'ת', 'ך', 'ם', 'ף', 'ץ'],
];

const finalLetters = ['ך', 'ם', 'ן', 'ף', 'ץ'];

export function HebrewKeyboard({ isOpen, onClose, onKeyPress, onBackspace, onClear, activeInput }: HebrewKeyboardProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg w-full mx-4">
        <DialogHeader>
          <DialogTitle className="text-center text-white">
            ⌨️ Hebrew Keyboard
          </DialogTitle>
          <p className="text-center text-sm text-yellow-200 mt-2">
            Click letters to type in Hebrew. All buttons are gold on purple background.
          </p>
          <p className="text-center text-sm font-semibold text-yellow-100 mt-1">
            Currently typing in: {
              activeInput === 0 ? 'First Name' : 
              activeInput === 1 ? 'Second Name' : 
              activeInput === 2 ? 'Third Name' : 
              activeInput === 3 ? 'Fourth Name' : 
              'Fifth Name'
            }
          </p>
        </DialogHeader>
        
        <div className="hebrew-keyboard">
          <div className="keyboard-grid">
            {hebrewKeys.map((row, rowIndex) => (
              <div key={rowIndex} className="keyboard-row">
                {row.map((key) => (
                  <Button
                    key={key}
                    onClick={() => onKeyPress(key)}
                    className={`keyboard-key ${finalLetters.includes(key) ? 'final-letter' : ''}`}
                    variant="outline"
                  >
                    {key}
                  </Button>
                ))}
              </div>
            ))}
          </div>
          
          <div className="keyboard-controls">
            <Button
              onClick={onBackspace}
              className="control-button backspace-button"
              variant="outline"
            >
              ← Backspace
            </Button>
            
            <Button
              onClick={onClear}
              className="control-button clear-button"
              variant="outline"
            >
              Clear All
            </Button>
            
            <Button
              onClick={onClose}
              className="control-button done-button"
            >
              Done
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
