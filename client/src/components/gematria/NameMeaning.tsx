import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface NameMeaningProps {
  text: string;
}

const HEBREW_NAME_MEANINGS = {
  // Biblical Patriarchs and Matriarchs
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

  // Leaders and Prophets
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
  'שמואל': {
    meaning: 'Heard by God',
    etymology: 'From שמע (heard) + אל (God)',
    significance: 'Last judge, first prophet, represents divine calling'
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

  // The Twelve Tribes
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
  'יהודה': {
    meaning: 'Praise',
    etymology: 'From ידה (to praise, thank)',
    significance: 'Royal tribe, source of kingship and Messiah'
  },
  'ראובן': {
    meaning: 'See, a Son',
    etymology: 'From ראה (see) + בן (son)',
    significance: 'Firstborn, represents vision and leadership'
  },
  'שמעון': {
    meaning: 'Heard',
    etymology: 'From שמע (to hear)',
    significance: 'Represents attentive listening to divine voice'
  },
  'לוי': {
    meaning: 'Joined / Attached',
    etymology: 'From לוה (to join, accompany)',
    significance: 'Priestly tribe, represents divine service'
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

  // First Humans and Early Figures
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
  'נח': {
    meaning: 'Rest / Comfort',
    etymology: 'From נוח (to rest)',
    significance: 'Righteous man saved from the flood, new beginning'
  },

  // Female Names with Spiritual Significance
  'חנה': {
    meaning: 'Grace / Favor',
    etymology: 'From חנן (to be gracious)',
    significance: 'Mother of Samuel, symbol of prayer and devotion'
  },
  'אסתר': {
    meaning: 'Hidden / Star',
    etymology: 'From סתר (to hide) or from Persian "star"',
    significance: 'Queen who saved the Jewish people, represents hidden strength'
  },
  'רות': {
    meaning: 'Friend / Companion',
    etymology: 'From רעה (to befriend)',
    significance: 'Symbol of loyalty and conversion, ancestor of David'
  },
  'נעמי': {
    meaning: 'Pleasant / Beautiful',
    etymology: 'From נעם (pleasantness)',
    significance: 'Mother-in-law of Ruth, represents wisdom through suffering'
  },
  'דינה': {
    meaning: 'Judged / Vindicated',
    etymology: 'From דין (judgment)',
    significance: 'Daughter of Jacob, represents justice and protection'
  },
  'תמר': {
    meaning: 'Palm Tree',
    etymology: 'From תמר (date palm)',
    significance: 'Symbol of righteousness and uprightness'
  },
  'ציפורה': {
    meaning: 'Bird',
    etymology: 'From ציפור (bird)',
    significance: 'Wife of Moses, represents freedom and spiritual flight'
  },
  'צִפּוֹרָה': {
    meaning: 'Bird',
    etymology: 'From ציפור (bird)',
    significance: 'Wife of Moses, represents freedom and spiritual flight'
  },
  'זיפו': {
    meaning: 'Bird',
    etymology: 'From ציפור (bird), shortened form',
    significance: 'Represents freedom, grace, and spiritual elevation'
  },

  // Additional Biblical Names
  'אבא': {
    meaning: 'Father',
    etymology: 'From אב (father)',
    significance: 'Intimate term for father'
  },
  'אבי': {
    meaning: 'My Father',
    etymology: 'From אב (father) + י (my)',
    significance: 'Personal connection to paternal guidance'
  },
  'אביאסף': {
    meaning: 'My Father has Gathered',
    etymology: 'From אבי (my father) + אסף (gathered)',
    significance: 'Divine gathering and collection'
  },
  'אביתר': {
    meaning: 'Father of Excellence',
    etymology: 'From אב (father) + יתר (excellence)',
    significance: 'Priestly lineage and spiritual excellence'
  },
  'אבידן': {
    meaning: 'My Father has Judged',
    etymology: 'From אבי (my father) + דן (judged)',
    significance: 'Divine judgment and justice'
  },
  'אביאל': {
    meaning: 'My Father is God',
    etymology: 'From אבי (my father) + אל (God)',
    significance: 'Recognition of divine paternity'
  },
  'אביעזר': {
    meaning: 'My Father is Help',
    etymology: 'From אבי (my father) + עזר (help)',
    significance: 'Divine assistance and support'
  },
  'אביגיל': {
    meaning: 'My Father is Joy',
    etymology: 'From אבי (my father) + גיל (joy)',
    significance: 'Divine joy and celebration'
  },
  'עדן': {
    meaning: 'Pleasure',
    etymology: 'From עדן (pleasure, delight)',
    significance: 'Paradise and divine pleasure'
  },
  'עדנה': {
    meaning: 'Pleasure / Beautiful',
    etymology: 'From עדן (pleasure)',
    significance: 'Divine delight and beauty'
  },
  'אהוד': {
    meaning: 'Unity / Praised',
    etymology: 'From אחד (one) or הוד (praise)',
    significance: 'Divine unity and praise'
  },
  'איתן': {
    meaning: 'Strong / Steadfast',
    etymology: 'From איתן (strong, firm)',
    significance: 'Spiritual strength and reliability'
  },
  'עקיבא': {
    meaning: 'To Follow',
    etymology: 'From עקב (heel, to follow)',
    significance: 'Great sage, spiritual following'
  },
  'עליזה': {
    meaning: 'Joyful',
    etymology: 'From עלז (to rejoice)',
    significance: 'Divine joy and celebration'
  },
  'אלון': {
    meaning: 'Oak Tree',
    etymology: 'From אלון (oak)',
    significance: 'Strength and endurance'
  },
  'אלוף': {
    meaning: 'Champion',
    etymology: 'From אלף (champion, leader)',
    significance: 'Leadership and strength'
  },
  'אמציה': {
    meaning: 'Strength of God',
    etymology: 'From אמץ (strength) + יה (God)',
    significance: 'Divine empowerment'
  },
  'עמי': {
    meaning: 'My People',
    etymology: 'From עם (people) + י (my)',
    significance: 'Connection to the Jewish nation'
  },
  'עמיעד': {
    meaning: 'My People Forever',
    etymology: 'From עמי (my people) + עד (forever)',
    significance: 'Eternal connection to the Jewish people'
  },
  'עמיחי': {
    meaning: 'My People Live',
    etymology: 'From עמי (my people) + חי (alive)',
    significance: 'The vitality and survival of the Jewish people'
  },
  'עמיקם': {
    meaning: 'My People Rise',
    etymology: 'From עמי (my people) + קם (rise)',
    significance: 'The resurrection and renewal of Israel'
  },
  'אמיר': {
    meaning: 'Treetop',
    etymology: 'From אמיר (treetop)',
    significance: 'Height and spiritual elevation'
  },
  'עמיר': {
    meaning: 'Sheaf',
    etymology: 'From עמיר (sheaf of grain)',
    significance: 'Harvest and abundance'
  },
  'אמירה': {
    meaning: 'Saying / Speech',
    etymology: 'From אמר (to say)',
    significance: 'Divine speech and communication'
  },
  'עמירה': {
    meaning: 'Sheaf Binding',
    etymology: 'From עמיר (sheaf)',
    significance: 'Gathering and unity'
  },
  'עמירם': {
    meaning: 'My People are Exalted',
    etymology: 'From עמי (my people) + רם (high)',
    significance: 'The elevation of the Jewish people'
  },
  'עמירן': {
    meaning: 'My People Sing',
    etymology: 'From עמי (my people) + רן (sing)',
    significance: 'Joy and celebration of the nation'
  },
  'עמית': {
    meaning: 'Friend / Colleague',
    etymology: 'From עמית (friend)',
    significance: 'Companionship and fellowship'
  },
  'אמתי': {
    meaning: 'Truthful',
    etymology: 'From אמת (truth)',
    significance: 'Divine truth and honesty'
  },
  'עמיה': {
    meaning: 'My People of God',
    etymology: 'From עמי (my people) + יה (God)',
    significance: 'The chosen people of God'
  },
  'עמיצור': {
    meaning: 'My People are a Rock',
    etymology: 'From עמי (my people) + צור (rock)',
    significance: 'The strength and stability of Israel'
  },
  'עמיאל': {
    meaning: 'My People of God',
    etymology: 'From עמי (my people) + אל (God)',
    significance: 'The divine nature of the Jewish people'
  },
  'עמינדב': {
    meaning: 'My People are Noble',
    etymology: 'From עמי (my people) + נדב (noble)',
    significance: 'The nobility of Israel'
  },
  'אמנון': {
    meaning: 'Faithful',
    etymology: 'From אמן (faith)',
    significance: 'Faithfulness and reliability'
  },
  'עמוס': {
    meaning: 'Burdened',
    etymology: 'From עמס (to bear a load)',
    significance: 'Prophet who bore God\'s message'
  },
  'אמוץ': {
    meaning: 'Strong',
    etymology: 'From אמץ (strength)',
    significance: 'Divine strength and courage'
  },
  'עמרם': {
    meaning: 'Exalted People',
    etymology: 'From עם (people) + רם (high)',
    significance: 'Father of Moses, spiritual elevation'
  },
  'אנאל': {
    meaning: 'Please God',
    etymology: 'From אנא (please) + אל (God)',
    significance: 'Supplication and prayer'
  },
  'ענת': {
    meaning: 'Response',
    etymology: 'From ענה (to answer)',
    significance: 'Divine response and communication'
  },
  'ענר': {
    meaning: 'Sharp / Alert',
    etymology: 'From ענר (alert)',
    significance: 'Spiritual alertness and awareness'
  },
  'ארם': {
    meaning: 'High / Exalted',
    etymology: 'From רום (height)',
    significance: 'Ancient region, spiritual elevation'
  },
  'ערבה': {
    meaning: 'Desert / Willow',
    etymology: 'From ערב (desert)',
    significance: 'Spiritual journey through wilderness'
  },
  'ארבל': {
    meaning: 'God\'s Ambush',
    etymology: 'From ארב (ambush) + אל (God)',
    significance: 'Mountain in Galilee, divine protection'
  },
  'ארי': {
    meaning: 'Lion',
    etymology: 'From ארי (lion)',
    significance: 'Strength and courage'
  },
  'אריאל': {
    meaning: 'Lion of God',
    etymology: 'From ארי (lion) + אל (God)',
    significance: 'Divine strength and courage'
  },
  'אריאלה': {
    meaning: 'Lion of God',
    etymology: 'From ארי (lion) + אל (God)',
    significance: 'Divine strength and courage'
  },
  'ארנון': {
    meaning: 'Roaring Stream',
    etymology: 'From ארן (roar)',
    significance: 'River in the Bible, divine power'
  },
  'ארנונה': {
    meaning: 'Roaring Stream',
    etymology: 'From ארן (roar)',
    significance: 'Divine power and strength'
  },
  'אריה': {
    meaning: 'Lion',
    etymology: 'From אריה (lion)',
    significance: 'Strength and royal power'
  },
  'אסא': {
    meaning: 'Healer',
    etymology: 'From אסא (to heal)',
    significance: 'King of Judah, divine healing'
  },
  'עשהאל': {
    meaning: 'God has Made',
    etymology: 'From עשה (made) + אל (God)',
    significance: 'Divine creation and purpose'
  },
  'אסף': {
    meaning: 'Gatherer',
    etymology: 'From אסף (to gather)',
    significance: 'Levite musician, spiritual gathering'
  },
  'אסנת': {
    meaning: 'Belonging to Neith',
    etymology: 'Egyptian origin',
    significance: 'Wife of Joseph, integration of nations'
  },
  'עטרה': {
    meaning: 'Crown',
    etymology: 'From עטר (to crown)',
    significance: 'Royal dignity and honor'
  },
  'עטרת': {
    meaning: 'Crown',
    etymology: 'From עטר (to crown)',
    significance: 'Divine majesty and glory'
  },
  'עתליה': {
    meaning: 'God has Shown',
    etymology: 'From עת (time) + אל (God)',
    significance: 'Divine revelation and timing'
  },

  // Divine Attributes and Spiritual Concepts
  'אמונה': {
    meaning: 'Faith',
    etymology: 'From אמן (to believe, be faithful)',
    significance: 'Trust and steadfast belief in God'
  },
  'אהבה': {
    meaning: 'Love',
    etymology: 'From אהב (to love)',
    significance: 'Divine love and affection'
  },
  'שלום': {
    meaning: 'Peace',
    etymology: 'From שלם (to be complete, peaceful)',
    significance: 'Divine harmony and completeness'
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

  // Spiritual Actions and States
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

  // Light and Joy
  'אור': {
    meaning: 'Light',
    etymology: 'From אור (light)',
    significance: 'Divine illumination and spiritual enlightenment'
  },
  'זהר': {
    meaning: 'Radiance / Brightness',
    etymology: 'From זהר (to shine, be bright)',
    significance: 'Divine light and spiritual illumination'
  },
  'נר': {
    meaning: 'Candle / Light',
    etymology: 'From נר (lamp, candle)',
    significance: 'Divine light that guides through darkness'
  },
  'שמחה': {
    meaning: 'Joy',
    etymology: 'From שמח (to rejoice)',
    significance: 'Divine joy and happiness'
  },
  'רינה': {
    meaning: 'Joyful Song',
    etymology: 'From רנן (to sing joyfully)',
    significance: 'Represents praise and celebration'
  },
  'גילה': {
    meaning: 'Rejoicing',
    etymology: 'From גיל (to rejoice)',
    significance: 'Divine joy and exultation'
  },

  // Life and Vitality
  'חיה': {
    meaning: 'Life',
    etymology: 'From חיי (life, living)',
    significance: 'Divine life force and vitality'
  },
  'חן': {
    meaning: 'Grace / Favor',
    etymology: 'From חנן (to be gracious)',
    significance: 'Divine grace and charm'
  },
  'ברכה': {
    meaning: 'Blessing',
    etymology: 'From ברך (to bless)',
    significance: 'Divine favor and abundance from above'
  },

  // Beauty and Excellence
  'נועה': {
    meaning: 'Movement / Beauty',
    etymology: 'From נוע (to move, wander)',
    significance: 'Represents grace and divine beauty'
  },
  'יפה': {
    meaning: 'Beautiful',
    etymology: 'From יפה (to be beautiful)',
    significance: 'Divine beauty and aesthetic perfection'
  },
  'הדר': {
    meaning: 'Glory / Splendor',
    etymology: 'From הדר (to glorify, honor)',
    significance: 'Divine majesty and magnificence'
  },

  // Modern Hebrew Names
  'גבריאל': {
    meaning: 'Strength of God',
    etymology: 'From גבר (strength) + אל (God)',
    significance: 'Archangel, divine messenger and strength'
  },
  'מיכאל': {
    meaning: 'Who is Like God?',
    etymology: 'From מי (who) + כ (like) + אל (God)',
    significance: 'Archangel, divine protection and leadership'
  },
  'רפאל': {
    meaning: 'God Heals',
    etymology: 'From רפא (to heal) + אל (God)',
    significance: 'Archangel of healing and divine restoration'
  },
  'אוריאל': {
    meaning: 'Light of God',
    etymology: 'From אור (light) + אל (God)',
    significance: 'Archangel of divine illumination'
  },

  // Nature Names
  'דפנה': {
    meaning: 'Laurel',
    etymology: 'From דפנה (laurel tree)',
    significance: 'Victory and honor'
  },
  'דלית': {
    meaning: 'Vine Branch',
    etymology: 'From דלה (to draw up)',
    significance: 'Spiritual growth and elevation'
  },
  'דליה': {
    meaning: 'Branch / Dahlia',
    etymology: 'From דלה (branch)',
    significance: 'Beauty and growth'
  },
  'דנה': {
    meaning: 'She Judges',
    etymology: 'From דין (to judge)',
    significance: 'Justice and discernment'
  },
  'דניאלה': {
    meaning: 'God is My Judge',
    etymology: 'From דן (judge) + אל (God)',
    significance: 'Divine justice and wisdom'
  },
  'דנית': {
    meaning: 'Judge',
    etymology: 'From דין (to judge)',
    significance: 'Justice and righteousness'
  },
  'דני': {
    meaning: 'My Judge',
    etymology: 'From דן (judge)',
    significance: 'Divine judgment and guidance'
  },
  'דתיה': {
    meaning: 'Religion of God',
    etymology: 'From דת (religion) + יה (God)',
    significance: 'Divine law and faith'
  },
  'דויד': {
    meaning: 'Beloved',
    etymology: 'From דוד (beloved)',
    significance: 'King of Israel, divine love'
  },
  'דוידה': {
    meaning: 'Beloved',
    etymology: 'From דוד (beloved)',
    significance: 'Divine love and affection'
  },
  'דביר': {
    meaning: 'Holy of Holies',
    etymology: 'From דבר (word, speak)',
    significance: 'Sacred space in the Temple'
  },
  'דבורה': {
    meaning: 'Bee',
    etymology: 'From דבור (speech) or דבורה (bee)',
    significance: 'Prophetess, industriousness and wisdom'
  },
  'דקל': {
    meaning: 'Palm Tree',
    etymology: 'From דקל (palm)',
    significance: 'Righteousness and uprightness'
  }
};

function cleanHebrewText(text: string): string {
  // Remove Hebrew vowel points (niqqud) and keep only consonants
  return text.replace(/[\u0591-\u05C7]/g, '');
}

export function NameMeaning({ text }: NameMeaningProps) {
  const cleanText = text.replace(/[^\u0590-\u05FF]/g, '').trim();
  const cleanedForLookup = cleanHebrewText(cleanText);
  
  if (cleanText.length === 0) {
    return null;
  }

  // First try with the original text, then with cleaned text (no vowel points)
  let nameData = HEBREW_NAME_MEANINGS[cleanText as keyof typeof HEBREW_NAME_MEANINGS];
  if (!nameData) {
    nameData = HEBREW_NAME_MEANINGS[cleanedForLookup as keyof typeof HEBREW_NAME_MEANINGS];
  }

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
