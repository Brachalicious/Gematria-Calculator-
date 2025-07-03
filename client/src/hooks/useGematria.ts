import * as React from 'react';

// Hebrew letter values for different gematria methods
const HEBREW_VALUES = {
  standard: {
    'א': 1, 'ב': 2, 'ג': 3, 'ד': 4, 'ה': 5, 'ו': 6, 'ז': 7, 'ח': 8, 'ט': 9,
    'י': 10, 'כ': 20, 'ל': 30, 'מ': 40, 'נ': 50, 'ס': 60, 'ע': 70, 'פ': 80, 'צ': 90,
    'ק': 100, 'ר': 200, 'ש': 300, 'ת': 400,
    // Final forms
    'ך': 20, 'ם': 40, 'ן': 50, 'ף': 80, 'ץ': 90
  },
  ordinal: {
    'א': 1, 'ב': 2, 'ג': 3, 'ד': 4, 'ה': 5, 'ו': 6, 'ז': 7, 'ח': 8, 'ט': 9,
    'י': 10, 'כ': 11, 'ל': 12, 'מ': 13, 'נ': 14, 'ס': 15, 'ע': 16, 'פ': 17, 'צ': 18,
    'ק': 19, 'ר': 20, 'ש': 21, 'ת': 22,
    // Final forms
    'ך': 11, 'ם': 13, 'ן': 14, 'ף': 17, 'ץ': 18
  }
};

export function useGematria() {
  const isHebrewText = React.useCallback((text: string): boolean => {
    const hebrewPattern = /[\u0590-\u05FF]/;
    return hebrewPattern.test(text);
  }, []);

  const reduceToSingleDigit = React.useCallback((num: number): number => {
    while (num > 9) {
      num = num.toString().split('').reduce((sum, digit) => sum + parseInt(digit), 0);
    }
    return num;
  }, []);

  const calculateGematria = React.useCallback((text: string, method: string = 'standard') => {
    const letters: Array<{ letter: string; value: number }> = [];
    let total = 0;

    for (const char of text) {
      if (HEBREW_VALUES.standard[char as keyof typeof HEBREW_VALUES.standard]) {
        let value = 0;
        
        switch (method) {
          case 'standard':
            value = HEBREW_VALUES.standard[char as keyof typeof HEBREW_VALUES.standard];
            break;
          case 'ordinal':
            value = HEBREW_VALUES.ordinal[char as keyof typeof HEBREW_VALUES.ordinal];
            break;
          case 'reduced':
            value = HEBREW_VALUES.standard[char as keyof typeof HEBREW_VALUES.standard];
            value = reduceToSingleDigit(value);
            break;
          case 'integral':
            value = HEBREW_VALUES.ordinal[char as keyof typeof HEBREW_VALUES.ordinal];
            value = reduceToSingleDigit(value);
            break;
          default:
            value = HEBREW_VALUES.standard[char as keyof typeof HEBREW_VALUES.standard];
        }

        letters.push({ letter: char, value });
        total += value;
      }
    }

    return { total, letters };
  }, [reduceToSingleDigit]);

  return {
    calculateGematria,
    isHebrewText
  };
}