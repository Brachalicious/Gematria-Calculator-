import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface NameMeaningProps {
  text: string;
}

const HEBREW_NAME_MEANINGS = {
  // Common Hebrew names and their meanings
  'אברהם': {
    meaning: 'Father of Many Nations',
    etymology: 'From אב (father) + המון (multitude)',
    significance: 'The first patriarch, symbol of faith and divine covenant'
  },
  'יצחק': {
    meaning: 'He Will Laugh',
    etymology: 'From צחק (to laugh)',
    significance: 'Joy and divine promise fulfilled in old age'
  },
  'יעקב': {
    meaning: 'Heel Holder / Supplanter',
    etymology: 'From עקב (heel)',
    significance: 'Later renamed Israel, represents spiritual transformation'
  },
  'שרה': {
    meaning: 'Princess / Noblewoman',
    etymology: 'From שר (to rule, be a prince)',
    significance: 'Mother of nations, symbol of nobility and leadership'
  },
  'רבקה': {
    meaning: 'To Bind / Captivating Beauty',
    etymology: 'From רבק (to bind, tie)',
    significance: 'Mother of twins, represents divine choice and wisdom'
  },
  'רחל': {
    meaning: 'Ewe / Gentle Sheep',
    etymology: 'From רחל (female sheep)',
    significance: 'Beloved wife, symbol of devotion and maternal love'
  },
  'לאה': {
    meaning: 'Weary / Wild Cow',
    etymology: 'From לאה (to be weary)',
    significance: 'Mother of six tribes, represents perseverance and fertility'
  },
  'משה': {
    meaning: 'Drawn Out (from water)',
    etymology: 'From משה (to draw out)',
    significance: 'Greatest prophet, lawgiver, and leader of Israel'
  },
  'אהרן': {
    meaning: 'Mountain of Strength / Enlightened',
    etymology: 'Possibly from הר (mountain) or אור (light)',
    significance: 'First High Priest, symbol of peace and divine service'
  },
  'מרים': {
    meaning: 'Bitterness / Beloved / Rebellious',
    etymology: 'From מר (bitter) or מרה (to rebel)',
    significance: 'Prophetess, symbol of leadership and protection'
  },
  'דוד': {
    meaning: 'Beloved',
    etymology: 'From דוד (beloved, uncle)',
    significance: 'Greatest king of Israel, ancestor of the Messiah'
  },
  'שלמה': {
    meaning: 'Peace / Complete',
    etymology: 'From שלם (peace, complete)',
    significance: 'Wisest king, builder of the First Temple'
  },
  'יוסף': {
    meaning: 'He Will Add',
    etymology: 'From יסף (to add, increase)',
    significance: 'Dreamer and provider, symbol of divine providence'
  },
  'בנימין': {
    meaning: 'Son of the Right Hand',
    etymology: 'From בן (son) + ימין (right hand)',
    significance: 'Beloved youngest son, represents strength and favor'
  },
  'דן': {
    meaning: 'Judge',
    etymology: 'From דין (to judge)',
    significance: 'One of the twelve tribes, represents justice'
  },
  'נפתלי': {
    meaning: 'My Struggle',
    etymology: 'From פתל (to wrestle, struggle)',
    significance: 'Represents spiritual wrestling and victory'
  },
  'גד': {
    meaning: 'Fortune / Troop',
    etymology: 'From גד (good fortune)',
    significance: 'Represents blessing and divine favor'
  },
  'אשר': {
    meaning: 'Happy / Blessed',
    etymology: 'From אשר (happiness, blessing)',
    significance: 'Represents joy and divine blessing'
  },
  'יששכר': {
    meaning: 'There is Reward',
    etymology: 'From יש (there is) + שכר (reward)',
    significance: 'Represents learning and divine recompense'
  },
  'זבולון': {
    meaning: 'Dwelling / Honor',
    etymology: 'From זבל (to dwell, honor)',
    significance: 'Represents commerce and divine provision'
  },
  'יהודה': {
    meaning: 'Praise',
    etymology: 'From ידה (to praise, thank)',
    significance: 'Royal tribe, source of kingship and Messiah'
  },
  'שמעון': {
    meaning: 'Heard',
    etymology: 'From שמע (to hear)',
    significance: 'Represents attentive listening to divine voice'
  },
  'ראובן': {
    meaning: 'See, a Son',
    etymology: 'From ראה (see) + בן (son)',
    significance: 'Firstborn, represents vision and leadership'
  },
  'לוי': {
    meaning: 'Joined / Attached',
    etymology: 'From לוה (to join, accompany)',
    significance: 'Priestly tribe, represents divine service'
  },
  'אליהו': {
    meaning: 'My God is YHVH',
    etymology: 'From אלי (my God) + יה (divine name)',
    significance: 'Great prophet, herald of the Messiah'
  },
  'אלישע': {
    meaning: 'God is Salvation',
    etymology: 'From אלי (my God) + שע (salvation)',
    significance: 'Prophet, represents divine healing and miracles'
  },
  'שמואל': {
    meaning: 'Heard by God',
    etymology: 'From שמע (heard) + אל (God)',
    significance: 'Last judge, first prophet, represents divine calling'
  },
  'נח': {
    meaning: 'Rest / Comfort',
    etymology: 'From נוח (to rest)',
    significance: 'Righteous man saved from the flood, new beginning'
  },
  'אדם': {
    meaning: 'Man / Red Earth',
    etymology: 'From אדמה (earth, ground)',
    significance: 'First human being, represents humanity'
  },
  'חוה': {
    meaning: 'Living',
    etymology: 'From חיה (to live)',
    significance: 'First woman, mother of all living'
  },
  'נועה': {
    meaning: 'Movement / Beauty',
    etymology: 'From נוע (to move, wander)',
    significance: 'Represents grace and divine beauty'
  },
  'רינה': {
    meaning: 'Joyful Song',
    etymology: 'From רנן (to sing joyfully)',
    significance: 'Represents praise and celebration'
  },
  'ברכה': {
    meaning: 'Blessing',
    etymology: 'From ברך (to bless)',
    significance: 'Divine favor and abundance from above'
  },
  'שלום': {
    meaning: 'Peace',
    etymology: 'From שלם (to be complete, peaceful)',
    significance: 'Divine harmony and completeness'
  },
  'חן': {
    meaning: 'Grace / Favor',
    etymology: 'From חנן (to be gracious)',
    significance: 'Divine grace and charm'
  },
  'אמונה': {
    meaning: 'Faith',
    etymology: 'From אמן (to believe, be faithful)',
    significance: 'Trust and steadfast belief in God'
  },
  'חיה': {
    meaning: 'Life',
    etymology: 'From חיי (life, living)',
    significance: 'Divine life force and vitality'
  },
  'שמחה': {
    meaning: 'Joy',
    etymology: 'From שמח (to rejoice)',
    significance: 'Divine joy and happiness'
  },
  'זהר': {
    meaning: 'Radiance / Brightness',
    etymology: 'From זהר (to shine, be bright)',
    significance: 'Divine light and spiritual illumination'
  },
  'אור': {
    meaning: 'Light',
    etymology: 'From אור (light)',
    significance: 'Divine illumination and spiritual enlightenment'
  },
  'חכמה': {
    meaning: 'Wisdom',
    etymology: 'From חכם (to be wise)',
    significance: 'Divine wisdom and understanding'
  },
  'בינה': {
    meaning: 'Understanding',
    etymology: 'From בין (to understand, discern)',
    significance: 'Divine comprehension and insight'
  },
  'דעת': {
    meaning: 'Knowledge',
    etymology: 'From ידע (to know)',
    significance: 'Divine knowledge and intimate understanding'
  },
  'אמת': {
    meaning: 'Truth',
    etymology: 'From אמן (to be firm, true)',
    significance: 'Divine truth and reliability'
  },
  'צדק': {
    meaning: 'Righteousness',
    etymology: 'From צדק (to be righteous)',
    significance: 'Divine justice and moral perfection'
  },
  'רחמים': {
    meaning: 'Mercy / Compassion',
    etymology: 'From רחם (womb, compassion)',
    significance: 'Divine mercy and motherly compassion'
  },
  'אהבה': {
    meaning: 'Love',
    etymology: 'From אהב (to love)',
    significance: 'Divine love and affection'
  },
  'יראה': {
    meaning: 'Fear / Awe of God',
    etymology: 'From ירא (to fear, revere)',
    significance: 'Reverent awe and respect for the divine'
  },
  'קדושה': {
    meaning: 'Holiness',
    etymology: 'From קדש (to be holy, separate)',
    significance: 'Divine sanctity and separation for sacred purpose'
  },
  'תפילה': {
    meaning: 'Prayer',
    etymology: 'From פלל (to pray, intercede)',
    significance: 'Communication and connection with the divine'
  },
  'תשובה': {
    meaning: 'Repentance / Return',
    etymology: 'From שוב (to return)',
    significance: 'Spiritual return and transformation'
  },
  'גאולה': {
    meaning: 'Redemption',
    etymology: 'From גאל (to redeem)',
    significance: 'Divine salvation and liberation'
  },
  'ישועה': {
    meaning: 'Salvation',
    etymology: 'From ישע (to save)',
    significance: 'Divine deliverance and rescue'
  },
  'נחמה': {
    meaning: 'Comfort',
    etymology: 'From נחם (to comfort)',
    significance: 'Divine consolation and solace'
  },
  'תקווה': {
    meaning: 'Hope',
    etymology: 'From קוה (to wait, hope)',
    significance: 'Divine expectation and trust in the future'
  },
  'ממשה': {
    meaning: 'From Moses',
    etymology: 'Related to משה (Moses)',
    significance: 'Connected to the great lawgiver and prophet'
  }
};

export function NameMeaning({ text }: NameMeaningProps) {
  const cleanText = text.replace(/[^\u0590-\u05FF]/g, '').trim();
  
  if (cleanText.length === 0) {
    return null;
  }

  const nameData = HEBREW_NAME_MEANINGS[cleanText as keyof typeof HEBREW_NAME_MEANINGS];

  if (!nameData) {
    return (
      <Card className="gematria-result-card">
        <CardHeader>
          <CardTitle className="text-primary">Name Meaning</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground">
            The meaning of "{cleanText}" is not found in our database of traditional Hebrew names and words.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="gematria-result-card">
      <CardHeader>
        <CardTitle className="text-primary">Meaning of {cleanText}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="text-center mb-4">
            <div className="text-3xl font-bold text-primary mb-2" style={{ fontFamily: 'Georgia, serif' }} dir="rtl">
              {cleanText}
            </div>
          </div>
          
          <div className="bg-accent/10 p-4 rounded-lg border border-accent/30">
            <div className="space-y-3">
              <div>
                <span className="font-semibold text-primary text-lg">Meaning: </span>
                <span className="text-foreground text-lg">{nameData.meaning}</span>
              </div>
              
              <div>
                <span className="font-semibold text-primary">Etymology: </span>
                <span className="text-foreground">{nameData.etymology}</span>
              </div>
              
              <div>
                <span className="font-semibold text-primary">Significance: </span>
                <span className="text-foreground">{nameData.significance}</span>
              </div>
            </div>
          </div>
          
          <div className="mt-4 p-3 bg-primary/10 rounded-lg">
            <p className="text-sm text-primary/80 text-center">
              📖 Hebrew names carry profound meanings that often reflect divine attributes, blessings, or spiritual qualities
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
