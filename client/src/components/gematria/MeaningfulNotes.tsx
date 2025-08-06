import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface MeaningfulNotesProps {
  text: string;
}

interface DetailedNameInfo {
  hebrewLetters: Array<{
    letter: string;
    meaning: string;
    numericalValue: number;
    spiritualSignificance: string;
  }>;
  culturalContext?: string;
  modernUsage?: string;
  variations?: string[];
  personalityTraits?: string[];
  lifePurpose?: string;
  spiritualGifts?: string[];
  challenges?: string[];
  blessings?: string[];
}

const getHebrewLetterDetails = (letter: string) => {
  const letterDetails: { [key: string]: { meaning: string; value: number; spiritual: string } } = {
    'א': { meaning: 'Ox/Leader', value: 1, spiritual: 'Unity, Divine breath, Leadership potential, Pioneering spirit' },
    'ב': { meaning: 'House/Inside', value: 2, spiritual: 'Blessing, Duality, Home-building, Protection' },
    'ג': { meaning: 'Camel/Lifting', value: 3, spiritual: 'Giving, Movement, Generosity, Bridge-building' },
    'ד': { meaning: 'Door/Path', value: 4, spiritual: 'Wisdom, Opening, Humility, Gateway to knowledge' },
    'ה': { meaning: 'Window/Breath', value: 5, spiritual: 'Divine grace, Revelation, Inspiration, Communication' },
    'ו': { meaning: 'Hook/Connect', value: 6, spiritual: 'Connection, Transformation, Harmony, Completion' },
    'ז': { meaning: 'Weapon/Memory', value: 7, spiritual: 'Memory, Struggle, Spiritual warfare, Completion' },
    'ח': { meaning: 'Fence/Life', value: 8, spiritual: 'Life force, Privacy, Renewal, New beginnings' },
    'ט': { meaning: 'Snake/Hidden', value: 9, spiritual: 'Hidden goodness, Transformation, Inner wisdom' },
    'י': { meaning: 'Hand/Deed', value: 10, spiritual: 'Divine spark, Potential, Action, Manifestation' },
    'כ': { meaning: 'Palm/Crown', value: 20, spiritual: 'Actualization, Authority, Receiving, Accomplishment' },
    'ל': { meaning: 'Goad/Learn', value: 30, spiritual: 'Learning, Teaching, Heart wisdom, Guidance' },
    'מ': { meaning: 'Water/Wisdom', value: 40, spiritual: 'Revealed wisdom, Flow, Adaptability, Nurturing' },
    'נ': { meaning: 'Fish/Soul', value: 50, spiritual: 'Faith, Soul expression, Fertility, Movement' },
    'ס': { meaning: 'Support/Cycle', value: 60, spiritual: 'Divine support, Cycles, Protection, Stability' },
    'ע': { meaning: 'Eye/Insight', value: 70, spiritual: 'Insight, Perception, Humility, Inner vision' },
    'פ': { meaning: 'Mouth/Word', value: 80, spiritual: 'Expression, Communication, Speech, Influence' },
    'צ': { meaning: 'Fish hook/Desire', value: 90, spiritual: 'Righteousness, Desire for good, Attraction' },
    'ק': { meaning: 'Back of head/Holy', value: 100, spiritual: 'Holiness, Time, Cycles, Sacred purpose' },
    'ר': { meaning: 'Head/Beginning', value: 200, spiritual: 'Leadership, Beginning, Poverty that leads to wealth' },
    'ש': { meaning: 'Tooth/Change', value: 300, spiritual: 'Divine fire, Change, Transformation, Spiritual power' },
    'ת': { meaning: 'Mark/Truth', value: 400, spiritual: 'Truth, Completion, Covenant, Divine signature' },
    // Final letters
    'ך': { meaning: 'Final Kaf', value: 500, spiritual: 'Completed actualization, Perfected receiving' },
    'ם': { meaning: 'Final Mem', value: 600, spiritual: 'Completed wisdom, Perfect flow' },
    'ן': { meaning: 'Final Nun', value: 700, spiritual: 'Completed faith, Perfect soul expression' },
    'ף': { meaning: 'Final Pei', value: 800, spiritual: 'Completed expression, Perfect communication' },
    'ץ': { meaning: 'Final Tzadi', value: 900, spiritual: 'Completed righteousness, Perfect desire' }
  };
  
  return letterDetails[letter] || { meaning: 'Unknown', value: 0, spiritual: 'Unique spiritual significance' };
};

const generatePersonalityProfile = (letters: string[]): DetailedNameInfo => {
  const letterDetails = letters.map(letter => {
    const details = getHebrewLetterDetails(letter);
    return {
      letter,
      meaning: details.meaning,
      numericalValue: details.value,
      spiritualSignificance: details.spiritual
    };
  });

  // Generate personality traits based on letter combinations
  const personalityTraits: string[] = [];
  const spiritualGifts: string[] = [];
  const challenges: string[] = [];
  const blessings: string[] = [];

  // Analyze first letter (primary influence)
  if (letters[0]) {
    const firstLetter = getHebrewLetterDetails(letters[0]);
    switch (letters[0]) {
      case 'א':
        personalityTraits.push('Natural leader', 'Independent thinker', 'Pioneer spirit');
        spiritualGifts.push('Leadership abilities', 'Vision and innovation');
        challenges.push('Learning to work with others', 'Avoiding pride');
        blessings.push('Breakthrough abilities', 'Inspiring others');
        break;
      case 'ב':
        personalityTraits.push('Nurturing nature', 'Home-focused', 'Protective instincts');
        spiritualGifts.push('Creating safe spaces', 'Blessing others');
        challenges.push('Over-protection', 'Fear of change');
        blessings.push('Building lasting relationships', 'Creating stability');
        break;
      case 'ד':
        personalityTraits.push('Wise counselor', 'Humble approach', 'Knowledge seeker');
        spiritualGifts.push('Wisdom and discernment', 'Teaching abilities');
        challenges.push('Over-analyzing', 'Perfectionism');
        blessings.push('Opening doors for others', 'Sharing wisdom');
        break;
      case 'מ':
        personalityTraits.push('Flowing adaptability', 'Nurturing spirit', 'Emotional depth');
        spiritualGifts.push('Healing abilities', 'Intuitive wisdom');
        challenges.push('Emotional overwhelm', 'Boundary issues');
        blessings.push('Bringing refreshment', 'Emotional healing');
        break;
      case 'ש':
        personalityTraits.push('Transformative energy', 'Change agent', 'Spiritual fire');
        spiritualGifts.push('Catalyzing transformation', 'Spiritual discernment');
        challenges.push('Impatience with slow change', 'Intensity management');
        blessings.push('Igniting positive change', 'Spiritual awakening');
        break;
      case 'ר':
        personalityTraits.push('Natural head/leader', 'New beginning maker', 'Visionary');
        spiritualGifts.push('Starting new projects', 'Leading initiatives');
        challenges.push('Learning from past', 'Avoiding repeated mistakes');
        blessings.push('Fresh starts', 'Inspiring new directions');
        break;
      default:
        personalityTraits.push('Unique spiritual calling', 'Individual path');
        spiritualGifts.push('Special divine purpose');
        challenges.push('Finding their unique way');
        blessings.push('Fulfilling divine destiny');
    }
  }

  // Analyze name length
  if (letters.length <= 3) {
    personalityTraits.push('Focused energy', 'Direct approach', 'Clear purpose');
    spiritualGifts.push('Concentrated spiritual power');
    blessings.push('Clarity of purpose', 'Efficient action');
  } else if (letters.length <= 5) {
    personalityTraits.push('Balanced nature', 'Multi-faceted abilities', 'Harmonious approach');
    spiritualGifts.push('Balance between spiritual and physical');
    blessings.push('Harmony in life', 'Multiple talents');
  } else {
    personalityTraits.push('Complex nature', 'Many talents', 'Deep spiritual mission');
    spiritualGifts.push('Multi-dimensional spiritual gifts');
    blessings.push('Rich life experience', 'Many opportunities to serve');
  }

  // Check for divine name elements
  const nameString = letters.join('');
  if (nameString.includes('אל')) {
    spiritualGifts.push('Strong connection to divine power');
    blessings.push('Divine protection and guidance');
  }
  if (nameString.includes('יה')) {
    spiritualGifts.push('Prophetic sensitivity');
    blessings.push('Divine inspiration and revelation');
  }

  const lifePurpose = `To express the divine qualities of ${letterDetails.map(l => l.meaning.toLowerCase()).join(', ')} through practical action and spiritual service.`;

  return {
    hebrewLetters: letterDetails,
    personalityTraits,
    spiritualGifts,
    challenges,
    blessings,
    lifePurpose,
    culturalContext: 'Hebrew names were traditionally chosen to reflect hoped-for qualities or divine attributes that parents desired for their children.',
    modernUsage: 'Today, this name carries forward ancient wisdom while adapting to contemporary spiritual understanding.'
  };
};

export function MeaningfulNotes({ text }: MeaningfulNotesProps) {
  const cleanText = text.replace(/[^\u0590-\u05FF]/g, '').trim();
  
  if (!cleanText) return null;

  const letters = cleanText.split('');
  const detailedInfo = generatePersonalityProfile(letters);

  return (
    <Card className="gematria-result-card border-l-4 border-l-purple-600">
      <CardHeader>
        <CardTitle className="text-purple-700 flex items-center">
          🌟 Meaningful Notes & Life Insights
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Letter Analysis */}
          <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
            <h5 className="font-semibold text-purple-800 mb-3">🔤 Letter-by-Letter Analysis</h5>
            <div className="space-y-2">
              {detailedInfo.hebrewLetters.map((letterInfo, index) => (
                <div key={index} className="flex items-start space-x-3 p-2 bg-white rounded border">
                  <div className="text-2xl font-bold text-purple-700" dir="rtl">{letterInfo.letter}</div>
                  <div className="flex-1">
                    <div className="font-semibold text-purple-800">
                      {letterInfo.meaning} (Value: {letterInfo.numericalValue})
                    </div>
                    <div className="text-sm text-purple-600">{letterInfo.spiritualSignificance}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Life Purpose */}
          <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200">
            <h5 className="font-semibold text-indigo-800 mb-2">🎯 Life Purpose</h5>
            <p className="text-indigo-700">{detailedInfo.lifePurpose}</p>
          </div>

          {/* Personality Traits */}
          {detailedInfo.personalityTraits && (
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h5 className="font-semibold text-green-800 mb-3">👤 Personality Traits</h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {detailedInfo.personalityTraits.map((trait, index) => (
                  <div key={index} className="flex items-center">
                    <span className="text-green-600 mr-2">✓</span>
                    <span className="text-green-800">{trait}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Spiritual Gifts */}
          {detailedInfo.spiritualGifts && (
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h5 className="font-semibold text-blue-800 mb-3">✨ Spiritual Gifts</h5>
              <div className="space-y-2">
                {detailedInfo.spiritualGifts.map((gift, index) => (
                  <div key={index} className="flex items-start">
                    <span className="text-blue-600 mr-2">🎁</span>
                    <span className="text-blue-800">{gift}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Challenges & Growth Areas */}
          {detailedInfo.challenges && (
            <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
              <h5 className="font-semibold text-orange-800 mb-3">🌱 Growth Opportunities</h5>
              <div className="space-y-2">
                {detailedInfo.challenges.map((challenge, index) => (
                  <div key={index} className="flex items-start">
                    <span className="text-orange-600 mr-2">⚡</span>
                    <span className="text-orange-800">{challenge}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Blessings & Potential */}
          {detailedInfo.blessings && (
            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-300">
              <h5 className="font-semibold text-yellow-800 mb-3">🌟 Blessings & Potential</h5>
              <div className="space-y-2">
                {detailedInfo.blessings.map((blessing, index) => (
                  <div key={index} className="flex items-start">
                    <span className="text-yellow-600 mr-2">🌈</span>
                    <span className="text-yellow-800">{blessing}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Cultural Context */}
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h5 className="font-semibold text-gray-800 mb-2">📚 Cultural & Modern Context</h5>
            <p className="text-gray-700 mb-2">{detailedInfo.culturalContext}</p>
            <p className="text-gray-700">{detailedInfo.modernUsage}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
