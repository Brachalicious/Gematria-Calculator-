import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface EnhancedNameMeaningProps {
  text: string;
}

interface NameInterpretation {
  meaning: string;
  etymology: string;
  significance: string;
  numerological?: string;
  spiritual?: string;
  source?: string;
}

// Extended database with more interpretations
const getHebrewLetterMeaning = (letter: string): string => {
  const letterMeanings: { [key: string]: string } = {
    'א': 'Aleph - Unity, Divine breath, Leadership',
    'ב': 'Bet - House, Blessing, Duality',
    'ג': 'Gimel - Camel, Giving, Movement',
    'ד': 'Dalet - Door, Wisdom, Humility',
    'ה': 'Hey - Window, Divine grace, Revelation',
    'ו': 'Vav - Hook, Connection, Transformation',
    'ז': 'Zayin - Sword, Memory, Struggle',
    'ח': 'Chet - Fence, Life, Privacy',
    'ט': 'Tet - Snake, Good within evil, Hidden goodness',
    'י': 'Yud - Hand, Divine point, Potential',
    'כ': 'Kaf - Palm, Crown, Actualization',
    'ל': 'Lamed - Ox goad, Learning, Teaching',
    'מ': 'Mem - Water, Wisdom, Revealed',
    'נ': 'Nun - Fish, Soul, Faith',
    'ס': 'Samech - Support, Divine protection, Cycles',
    'ע': 'Ayin - Eye, Insight, Humility',
    'פ': 'Pei - Mouth, Word, Expression',
    'צ': 'Tzadi - Fishhook, Righteousness, Desire',
    'ק': 'Quf - Monkey, Holiness, Time',
    'ר': 'Resh - Head, Beginning, Poverty',
    'ש': 'Shin - Tooth, Divine fire, Change',
    'ת': 'Tav - Mark, Truth, Completion'
  };
  return letterMeanings[letter] || `${letter} - Ancient Hebrew letter`;
};

const generateNumerologicalInterpretation = (text: string): string => {
  const cleanText = text.replace(/[^\u0590-\u05FF]/g, '');
  const letters = cleanText.split('');
  
  const interpretations = letters.map(letter => getHebrewLetterMeaning(letter)).join(', ');
  
  return `The letters in "${cleanText}" carry deep spiritual significance: ${interpretations}. This combination suggests a name with qualities of divine connection, spiritual growth, and purposeful existence.`;
};

const generateSpiritualInterpretation = (text: string): string => {
  const cleanText = text.replace(/[^\u0590-\u05FF]/g, '');
  const letterCount = cleanText.length;
  
  let spiritual = '';
  
  if (letterCount <= 3) {
    spiritual = 'Short names often represent focused divine energy and direct spiritual purpose. They carry concentrated power and clear intention.';
  } else if (letterCount <= 5) {
    spiritual = 'Names of this length typically balance earthly and spiritual aspects, representing harmony between the physical and divine realms.';
  } else {
    spiritual = 'Longer names often indicate complex spiritual missions and multifaceted divine purposes, suggesting a soul with many talents and responsibilities.';
  }
  
  // Add more specific interpretations based on patterns
  if (cleanText.includes('אל')) {
    spiritual += ' The presence of "אל" (El) indicates a strong connection to divine power and godly attributes.';
  }
  if (cleanText.includes('יה')) {
    spiritual += ' The divine name "יה" (Yah) suggests divine inspiration and prophetic potential.';
  }
  
  return spiritual;
};

export function EnhancedNameMeaning({ text }: EnhancedNameMeaningProps) {
  const [showEnhanced, setShowEnhanced] = React.useState(false);
  const [isGenerating, setIsGenerating] = React.useState(false);
  const [enhancedInterpretation, setEnhancedInterpretation] = React.useState<NameInterpretation | null>(null);

  const cleanText = text.replace(/[\u0591-\u05C7]/g, '').trim();

  const generateEnhancedInterpretation = async () => {
    if (!cleanText) return;
    
    setIsGenerating(true);
    
    // Simulate processing time for better UX
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const interpretation: NameInterpretation = {
      meaning: `Deep Analysis of "${cleanText}"`,
      etymology: `Mystical breakdown: Each letter carries divine significance and contributes to the overall spiritual energy of this name.`,
      significance: `This name represents a unique spiritual path with specific divine attributes and earthly missions.`,
      numerological: generateNumerologicalInterpretation(cleanText),
      spiritual: generateSpiritualInterpretation(cleanText),
      source: 'Enhanced Kabbalistic Analysis'
    };
    
    setEnhancedInterpretation(interpretation);
    setIsGenerating(false);
    setShowEnhanced(true);
  };

  if (!cleanText) return null;

  return (
    <Card className="enhanced-interpretation">
      <CardHeader>
        <CardTitle className="text-white">🔮 Enhanced Mystical Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="text-center mb-4">
            <div className="text-3xl font-bold text-primary mb-2" style={{ fontFamily: 'Georgia, serif' }} dir="rtl">
              {cleanText}
            </div>
          </div>
          
          {!showEnhanced && !isGenerating && (
            <div className="text-center">
              <p className="text-muted-foreground mb-4">
                Get a deeper, mystical interpretation of this name using advanced Kabbalistic analysis.
              </p>
              <Button
                onClick={generateEnhancedInterpretation}
                className="gematria-button"
              >
                🔮 Generate Enhanced Interpretation
              </Button>
            </div>
          )}

          {isGenerating && (
            <div className="text-center">
              <div className="animate-pulse">
                <div className="loading-spinner mb-2"></div>
                <div className="text-lg font-semibold text-primary mb-2">
                  🌟 Analyzing mystical properties...
                </div>
                <div className="text-sm text-muted-foreground">
                  Consulting ancient wisdom and Kabbalistic sources
                </div>
              </div>
            </div>
          )}

          {showEnhanced && enhancedInterpretation && (
            <div className="space-y-4">
              <div className="bg-accent/10 p-4 rounded-lg border border-accent/30">
                <div className="space-y-3">
                  <div>
                    <span className="font-semibold text-primary text-lg">Mystical Meaning: </span>
                    <span className="text-foreground text-lg">{enhancedInterpretation.meaning}</span>
                  </div>
                  
                  <div>
                    <span className="font-semibold text-primary">Deep Etymology: </span>
                    <span className="text-foreground">{enhancedInterpretation.etymology}</span>
                  </div>
                  
                  <div>
                    <span className="font-semibold text-primary">Spiritual Significance: </span>
                    <span className="text-foreground">{enhancedInterpretation.significance}</span>
                  </div>
                </div>
              </div>

              {enhancedInterpretation.numerological && (
                <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                  <div className="space-y-2">
                    <span className="font-semibold text-purple-700">🔢 Numerological Analysis: </span>
                    <p className="text-purple-800">{enhancedInterpretation.numerological}</p>
                  </div>
                </div>
              )}

              {enhancedInterpretation.spiritual && (
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <div className="space-y-2">
                    <span className="font-semibold text-blue-700">✨ Spiritual Insights: </span>
                    <p className="text-blue-800">{enhancedInterpretation.spiritual}</p>
                  </div>
                </div>
              )}

              <div className="mt-4 p-3 bg-gradient-to-r from-purple-100 to-blue-100 rounded-lg border border-purple-200">
                <p className="text-sm text-purple-800 text-center font-semibold">
                  🌟 Enhanced analysis generated using mystical principles and Kabbalistic wisdom
                </p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
