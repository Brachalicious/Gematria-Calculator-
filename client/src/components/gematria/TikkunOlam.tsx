import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface TikkunOlamProps {
  text: string;
  gematriaValue: number;
}

interface TikkunOlamInsight {
  primaryTikkun: string;
  spiritualMission: string;
  zoharWisdom: string;
  practicalActions: string[];
  soulCorrectionAreas: string[];
  divineAttributes: string[];
  worldRepair: string;
  kabbalisticPath: string;
}

const getTikkunOlamByGematria = (value: number): Partial<TikkunOlamInsight> => {
  // Zohar-based insights based on numerical patterns
  const modTen = value % 10;
  const modSeven = value % 7;
  const modTwelve = value % 12;
  
  const insights: Partial<TikkunOlamInsight> = {};
  
  // Based on final digit (Sefirot connections)
  switch (modTen) {
    case 1:
      insights.divineAttributes = ['Keter (Crown) - Divine will', 'Unity consciousness'];
      insights.primaryTikkun = 'Unifying opposites and revealing divine unity in the world';
      break;
    case 2:
      insights.divineAttributes = ['Chochmah (Wisdom) - Divine insight', 'Illumination'];
      insights.primaryTikkun = 'Bringing divine wisdom and insight to those in darkness';
      break;
    case 3:
      insights.divineAttributes = ['Binah (Understanding) - Comprehension', 'Motherly compassion'];
      insights.primaryTikkun = 'Nurturing understanding and providing emotional healing';
      break;
    case 4:
      insights.divineAttributes = ['Chesed (Loving-kindness) - Boundless love', 'Generosity'];
      insights.primaryTikkun = 'Spreading unconditional love and acts of kindness';
      break;
    case 5:
      insights.divineAttributes = ['Gevurah (Strength/Judgment) - Divine strength', 'Boundaries'];
      insights.primaryTikkun = 'Establishing justice and providing strength to the oppressed';
      break;
    case 6:
      insights.divineAttributes = ['Tiferet (Beauty/Harmony) - Divine beauty', 'Balance'];
      insights.primaryTikkun = 'Creating harmony and beauty in relationships and environment';
      break;
    case 7:
      insights.divineAttributes = ['Netzach (Victory/Endurance) - Eternal triumph', 'Perseverance'];
      insights.primaryTikkun = 'Inspiring perseverance and spiritual victory over materialism';
      break;
    case 8:
      insights.divineAttributes = ['Hod (Glory/Humility) - Divine splendor', 'Humble service'];
      insights.primaryTikkun = 'Serving others with humility while revealing divine glory';
      break;
    case 9:
      insights.divineAttributes = ['Yesod (Foundation) - Divine foundation', 'Connection'];
      insights.primaryTikkun = 'Building strong spiritual foundations and connecting souls';
      break;
    case 0:
      insights.divineAttributes = ['Malchut (Kingdom) - Divine presence', 'Manifestation'];
      insights.primaryTikkun = 'Manifesting divine presence in the physical world';
      break;
  }
  
  // Based on modulo 7 (days of creation)
  switch (modSeven) {
    case 1:
      insights.worldRepair = 'Illuminating consciousness - bringing light to mental darkness';
      break;
    case 2:
      insights.worldRepair = 'Healing divisions - bridging gaps between people and ideas';
      break;
    case 3:
      insights.worldRepair = 'Nurturing growth - helping others reach their potential';
      break;
    case 4:
      insights.worldRepair = 'Creating stability - providing security and structure';
      break;
    case 5:
      insights.worldRepair = 'Inspiring movement - motivating positive change';
      break;
    case 6:
      insights.worldRepair = 'Harmonizing relationships - bringing peace between conflicting parties';
      break;
    case 0:
      insights.worldRepair = 'Sanctifying the material - elevating the physical to spiritual heights';
      break;
  }
  
  return insights;
};

const getLetterBasedTikkun = (letters: string[]): Partial<TikkunOlamInsight> => {
  const insights: Partial<TikkunOlamInsight> = {
    soulCorrectionAreas: [],
    practicalActions: []
  };
  
  letters.forEach(letter => {
    switch (letter) {
      case 'א':
        insights.soulCorrectionAreas?.push('Overcoming ego and embracing unity');
        insights.practicalActions?.push('Lead with humility, unite divided groups');
        break;
      case 'ב':
        insights.soulCorrectionAreas?.push('Creating sacred spaces and blessing others');
        insights.practicalActions?.push('Build homes for the homeless, bless those in need');
        break;
      case 'ג':
        insights.soulCorrectionAreas?.push('Developing generosity and supporting others');
        insights.practicalActions?.push('Give charity, support struggling individuals');
        break;
      case 'ד':
        insights.soulCorrectionAreas?.push('Opening doors of wisdom and opportunity');
        insights.practicalActions?.push('Teach, mentor, and provide educational opportunities');
        break;
      case 'ה':
        insights.soulCorrectionAreas?.push('Revealing divine grace and inspiration');
        insights.practicalActions?.push('Inspire others through art, music, and spiritual guidance');
        break;
      case 'ו':
        insights.soulCorrectionAreas?.push('Connecting the spiritual and physical realms');
        insights.practicalActions?.push('Bridge differences, heal relationships');
        break;
      case 'ז':
        insights.soulCorrectionAreas?.push('Preserving spiritual memory and tradition');
        insights.practicalActions?.push('Document wisdom, preserve culture and traditions');
        break;
      case 'ח':
        insights.soulCorrectionAreas?.push('Bringing new life and renewal');
        insights.practicalActions?.push('Heal the sick, revitalize communities');
        break;
      case 'ט':
        insights.soulCorrectionAreas?.push('Revealing hidden goodness in difficult situations');
        insights.practicalActions?.push('Help those who have fallen, reveal potential in others');
        break;
      case 'י':
        insights.soulCorrectionAreas?.push('Manifesting divine potential in action');
        insights.practicalActions?.push('Take initiative in good works, be a catalyst for change');
        break;
      case 'כ':
        insights.soulCorrectionAreas?.push('Receiving and channeling divine energy');
        insights.practicalActions?.push('Accept responsibility, channel resources to those in need');
        break;
      case 'ל':
        insights.soulCorrectionAreas?.push('Teaching and guiding others to wisdom');
        insights.practicalActions?.push('Educate, counsel, and guide others on their spiritual path');
        break;
      case 'מ':
        insights.soulCorrectionAreas?.push('Flowing with divine wisdom and compassion');
        insights.practicalActions?.push('Provide emotional support, share wisdom freely');
        break;
      case 'נ':
        insights.soulCorrectionAreas?.push('Expressing the soul\'s deepest truths');
        insights.practicalActions?.push('Encourage authenticity, help others express their true selves');
        break;
      case 'ס':
        insights.soulCorrectionAreas?.push('Providing support and protection');
        insights.practicalActions?.push('Protect the vulnerable, provide stability to the unstable');
        break;
      case 'ע':
        insights.soulCorrectionAreas?.push('Developing spiritual insight and perception');
        insights.practicalActions?.push('Counsel wisely, help others see truth clearly');
        break;
      case 'פ':
        insights.soulCorrectionAreas?.push('Speaking truth and divine words');
        insights.practicalActions?.push('Speak for the voiceless, teach divine wisdom');
        break;
      case 'צ':
        insights.soulCorrectionAreas?.push('Pursuing righteousness and justice');
        insights.practicalActions?.push('Fight injustice, advocate for the oppressed');
        break;
      case 'ק':
        insights.soulCorrectionAreas?.push('Sanctifying time and creating holy moments');
        insights.practicalActions?.push('Create meaningful rituals, sanctify ordinary moments');
        break;
      case 'ר':
        insights.soulCorrectionAreas?.push('Leading with wisdom and new vision');
        insights.practicalActions?.push('Pioneer new solutions, lead with innovative approaches');
        break;
      case 'ש':
        insights.soulCorrectionAreas?.push('Transforming through divine fire and change');
        insights.practicalActions?.push('Catalyze positive transformation, inspire spiritual awakening');
        break;
      case 'ת':
        insights.soulCorrectionAreas?.push('Completing divine purposes and truth');
        insights.practicalActions?.push('Complete important works, seal covenants and commitments');
        break;
    }
  });
  
  return insights;
};

const getZoharWisdomByName = (text: string): string => {
  const cleanText = text.replace(/[^\u0590-\u05FF]/g, '');
  const letterCount = cleanText.length;
  
  // Zohar teaches that names have mystical significance
  const zoharTeachings = [
    "The Zohar teaches that every soul descends with a specific mission to repair the world",
    "According to the Zohar, the letters of one's name contain the blueprint of their spiritual purpose",
    "The Zohar reveals that each person has unique sparks of holiness to elevate",
    "Mystical tradition holds that names are not coincidental but divinely ordained",
    "The Zohar explains that through Tikkun, we restore the divine light scattered in creation",
    "Ancient wisdom teaches that every person has a specific contribution to cosmic repair",
    "The Zohar indicates that the numerical value of names corresponds to spiritual missions"
  ];
  
  // Select wisdom based on name characteristics
  if (cleanText.includes('אל')) {
    return "The Zohar teaches that names containing 'El' (God) indicate souls with special divine missions to reveal Godliness in the world.";
  } else if (cleanText.includes('יה')) {
    return "The Zohar explains that names with 'Yah' carry prophetic energy and the ability to inspire divine consciousness in others.";
  } else if (letterCount <= 3) {
    return "The Zohar suggests that short names carry concentrated spiritual power and focused missions in the world.";
  } else {
    return zoharTeachings[letterCount % zoharTeachings.length];
  }
};

export function TikkunOlam({ text, gematriaValue }: TikkunOlamProps) {
  const cleanText = text.replace(/[^\u0590-\u05FF]/g, '').trim();
  
  if (!cleanText) return null;

  const letters = cleanText.split('');
  const gematriaInsights = getTikkunOlamByGematria(gematriaValue);
  const letterInsights = getLetterBasedTikkun(letters);
  const zoharWisdom = getZoharWisdomByName(cleanText);

  const tikkunInsight: TikkunOlamInsight = {
    primaryTikkun: gematriaInsights.primaryTikkun || 'Bringing divine light into the world through acts of loving-kindness',
    spiritualMission: `Your soul's mission involves ${gematriaInsights.primaryTikkun?.toLowerCase() || 'serving the divine plan'}`,
    zoharWisdom,
    practicalActions: letterInsights.practicalActions || ['Perform acts of kindness', 'Study Torah and wisdom', 'Support those in need'],
    soulCorrectionAreas: letterInsights.soulCorrectionAreas || ['Developing compassion', 'Increasing divine awareness'],
    divineAttributes: gematriaInsights.divineAttributes || ['Divine compassion', 'Spiritual wisdom'],
    worldRepair: gematriaInsights.worldRepair || 'Contributing to universal healing and divine revelation',
    kabbalisticPath: `Through the path of ${gematriaInsights.divineAttributes?.[0]?.split(' - ')[0] || 'Divine service'}, your soul seeks to elevate sparks of holiness and complete its cosmic purpose.`
  };

  return (
    <Card className="tikkun-olam-card border-l-4 border-l-yellow-600">
      <CardHeader>
        <CardTitle className="text-yellow-700 flex items-center flex-wrap text-sm sm:text-base lg:text-lg">
          🌍 Calculate Gematria and Meaning of Your Name - Tikkun Olam Mission
        </CardTitle>
      </CardHeader>
      <CardContent className="p-3 sm:p-4 lg:p-6">
        <div className="space-y-3 sm:space-y-4">
          {/* Primary Tikkun */}
          <div className="bg-yellow-50 p-3 sm:p-4 rounded-lg border border-yellow-200">
            <h5 className="font-semibold text-yellow-800 mb-2 text-sm sm:text-base">🎯 Primary Soul Mission</h5>
            <p className="text-yellow-700 font-medium text-sm sm:text-base">{tikkunInsight.primaryTikkun}</p>
          </div>

          {/* Zohar Wisdom */}
          <div className="bg-amber-50 p-3 sm:p-4 rounded-lg border border-amber-200">
            <h5 className="font-semibold text-amber-800 mb-2 text-sm sm:text-base">📜 Zohar Wisdom</h5>
            <p className="text-amber-700 italic text-sm sm:text-base">"{tikkunInsight.zoharWisdom}"</p>
          </div>

          {/* Divine Attributes */}
          <div className="bg-orange-50 p-3 sm:p-4 rounded-lg border border-orange-200">
            <h5 className="font-semibold text-orange-800 mb-3 text-sm sm:text-base">✨ Divine Attributes to Channel</h5>
            <div className="space-y-2">
              {tikkunInsight.divineAttributes.map((attribute, index) => (
                <div key={index} className="flex items-center">
                  <span className="text-orange-600 mr-2">🌟</span>
                  <span className="text-orange-800 text-sm sm:text-base">{attribute}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Soul Correction Areas */}
          <div className="bg-red-50 p-3 sm:p-4 rounded-lg border border-red-200">
            <h5 className="font-semibold text-red-800 mb-3 text-sm sm:text-base">🔧 Soul Correction Areas</h5>
            <div className="space-y-2">
              {tikkunInsight.soulCorrectionAreas.map((area, index) => (
                <div key={index} className="flex items-start">
                  <span className="text-red-600 mr-2">⚡</span>
                  <span className="text-red-800 text-sm sm:text-base">{area}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Practical Actions */}
          <div className="bg-green-50 p-3 sm:p-4 rounded-lg border border-green-200">
            <h5 className="font-semibold text-green-800 mb-3 text-sm sm:text-base">🛠️ Practical Tikkun Actions</h5>
            <div className="space-y-2">
              {tikkunInsight.practicalActions.map((action, index) => (
                <div key={index} className="flex items-start">
                  <span className="text-green-600 mr-2">✅</span>
                  <span className="text-green-800 text-sm sm:text-base">{action}</span>
                </div>
              ))}
            </div>
          </div>

          {/* World Repair */}
          <div className="bg-blue-50 p-3 sm:p-4 rounded-lg border border-blue-200">
            <h5 className="font-semibold text-blue-800 mb-2 text-sm sm:text-base">🌍 Your Contribution to World Repair</h5>
            <p className="text-blue-700 text-sm sm:text-base">{tikkunInsight.worldRepair}</p>
          </div>

          {/* Kabbalistic Path */}
          <div className="bg-purple-50 p-3 sm:p-4 rounded-lg border border-purple-200">
            <h5 className="font-semibold text-purple-800 mb-2 text-sm sm:text-base">🔮 Kabbalistic Spiritual Path</h5>
            <p className="text-purple-700 text-sm sm:text-base">{tikkunInsight.kabbalisticPath}</p>
          </div>

          {/* Summary */}
          <div className="bg-gradient-to-r from-yellow-100 to-orange-100 p-3 sm:p-4 rounded-lg border border-yellow-300">
            <h5 className="font-semibold text-yellow-800 mb-2 text-sm sm:text-base">🌟 Divine Mission Summary</h5>
            <p className="text-yellow-800 text-sm sm:text-base">
              Your name <span className="font-bold" dir="rtl">{cleanText}</span> with gematria value {gematriaValue} 
              indicates a soul destined to {tikkunInsight.primaryTikkun.toLowerCase()}. Through your unique 
              combination of divine attributes and practical actions, you contribute to the cosmic repair 
              that will ultimately reveal divine light throughout creation.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
