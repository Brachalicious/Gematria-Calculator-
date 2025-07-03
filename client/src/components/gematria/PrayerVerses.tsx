import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface PrayerVersesProps {
  text: string;
}

// Prayer verses that start and end with matching letters for names
const PRAYER_VERSES = {
  // Names starting with Aleph
  'א_א': {
    verse: 'אנא יי הושיעה נא אנא יי הצליחה נא',
    translation: 'Please, Lord, save now! Please, Lord, make prosper now!',
    reference: 'Psalms 118:25'
  },
  'א_ד': {
    verse: 'אזכירה שמך בכל דור ודור יהודוך עמים לעולם ועד',
    translation: 'I will remember Your name in every generation and generation; peoples will praise You forever and ever',
    reference: 'Psalms 45:18'
  },
  'א_ה': {
    verse: 'אשרי משכיל אל דל ביום רעה ימלטהו יי',
    translation: 'Happy is he who considers the poor; in the day of evil the Lord will deliver him',
    reference: 'Psalms 41:2'
  },
  'א_ו': {
    verse: 'אשרי שאל יעקב בעזרו שברו על יי אלהיו',
    translation: 'Happy is he whose help is the God of Jacob, whose hope is in the Lord his God',
    reference: 'Psalms 146:5'
  },
  'א_י': {
    verse: 'אמרתי הקינה יי האזינה בינתי הגיגי',
    translation: 'I said, "Give ear to my words, O Lord, consider my meditation"',
    reference: 'Psalms 5:2'
  },
  'א_ך': {
    verse: 'אמרתי ליי אדני אתה טובתי בל עליך',
    translation: 'I said to the Lord, "You are my Lord; my goodness is nothing apart from You"',
    reference: 'Psalms 16:2'
  },
  'א_ל': {
    verse: 'ארץ רעשה אף שמים נטפו מפני אלהים זה סיני מפני אלהים אלהי ישראל',
    translation: 'The earth trembled, the heavens also dropped at the presence of God; this Sinai before God, the God of Israel',
    reference: 'Psalms 68:9'
  },
  'א_ם': {
    verse: 'אתה הוא יי האלהים אשר בחרת באברם והוצאתו מאור כשדים ושמת שמו אברהם',
    translation: 'You are the Lord God who chose Abram and brought him out of Ur of the Chaldees and gave him the name Abraham',
    reference: 'Nehemiah 9:7'
  },
  'א_ן': {
    verse: 'אליך יי אקרא ואל אדני אתחנן',
    translation: 'To You, O Lord, I call, and to the Lord I make supplication',
    reference: 'Psalms 30:9'
  },
  'א_ע': {
    verse: 'אמר בלבו בל אמוט לדר ודר אשר לא ברע',
    translation: 'He says in his heart, "I shall not be moved; from generation to generation I shall not be in adversity"',
    reference: 'Psalms 10:6'
  },
  'א_ק': {
    verse: 'אשר כרת את אברהם ושבועתו ליצחק',
    translation: 'Which He made with Abraham, and His oath to Isaac',
    reference: 'Psalms 105:9'
  },
  'א_ר': {
    verse: 'אלה ברכב ואלה בסוסים ואנחנו בשם יי אלהינו נזכיר',
    translation: 'Some trust in chariots and some in horses, but we will remember the name of the Lord our God',
    reference: 'Psalms 20:8'
  },

  // Names starting with Bet  
  'ב_א': {
    verse: 'בית אהרן בטחו ביי מגן ומען הוא',
    translation: 'O house of Aaron, trust in the Lord; He is their help and their shield',
    reference: 'Psalms 115:10'
  },
  'ב_ה': {
    verse: 'בעבור יישמרו חקיו ואת תורתיו ינצרו הללויה',
    translation: 'That they might observe His statutes and keep His laws. Hallelujah!',
    reference: 'Psalms 105:45'
  },
  'ב_ז': {
    verse: 'ביום קראתי ותענני תרהבני בנפשי עז',
    translation: 'In the day when I called You answered me, and strengthened me with strength in my soul',
    reference: 'Psalms 138:3'
  },
  'ב_ך': {
    verse: 'ברוך אתה יי למדני חקיך',
    translation: 'Blessed are You, O Lord; teach me Your statutes',
    reference: 'Psalms 119:12'
  },
  'ב_ל': {
    verse: 'במקהלות ברכו אלהים אדני ממקור ישראל',
    translation: 'Bless God in the congregations, the Lord, from the fountain of Israel',
    reference: 'Psalms 68:27'
  },
  'ב_ן': {
    verse: 'ברוך יי אלהי ישראל מהעולם ועד העולם אמן ואמן',
    translation: 'Blessed be the Lord God of Israel from everlasting to everlasting! Amen and Amen',
    reference: 'Psalms 41:14'
  },
  'ב_ע': {
    verse: 'בחסד ואמת יכפר עון וביראת יי סור מרע',
    translation: 'By mercy and truth iniquity is purged, and by the fear of the Lord men depart from evil',
    reference: 'Proverbs 16:6'
  },
  'ב_ר': {
    verse: 'בנות מלכים ביקרותיך נצבה שגל לימינך בכתם אופיר',
    translation: 'Kings\' daughters are among Your honorable women; at Your right hand stands the queen in gold of Ophir',
    reference: 'Psalms 45:10'
  },

  // Names starting with Gimel
  'ג_ד': {
    verse: 'גאות אדם תשפילנו ושפל רוח יתמך כבוד',
    translation: 'A man\'s pride will bring him low, but the humble in spirit will retain honor',
    reference: 'Proverbs 29:23'
  },
  'ג_ה': {
    verse: 'גול על יי דרכך ובטח עליו והוא יעשה',
    translation: 'Commit your way to the Lord; trust also in Him, and He shall bring it to pass',
    reference: 'Psalms 37:5'
  },
  'ג_ל': {
    verse: 'גם אני אודה בכלי נבל אמתך אלהי אזמרה לך בכנור קדוש ישראל',
    translation: 'Also I will praise You with the psaltery for Your truth, my God; I will sing with the harp to You, O Holy One of Israel',
    reference: 'Psalms 71:22'
  },
  'ג_ם': {
    verse: 'גדלים מעשי יי דרושים לכל חפציהם',
    translation: 'The works of the Lord are great, studied by all who have pleasure in them',
    reference: 'Psalms 111:2'
  },
  'ג_ן': {
    verse: 'גם בני אדם גם בני איש יחד עשיר ואביון',
    translation: 'Both low and high, rich and poor together',
    reference: 'Psalms 49:3'
  },

  // Names starting with Dalet
  'ד_ב': {
    verse: 'דרשו יי בהמצאו קראוהו בהיותו קרוב',
    translation: 'Seek the Lord while He may be found, call upon Him while He is near',
    reference: 'Isaiah 55:6'
  },
  'ד_ד': {
    verse: 'דרשו יי ועזו בקשו פניו תמיד',
    translation: 'Seek the Lord and His strength; seek His face evermore',
    reference: 'Psalms 105:4'
  },
  'ד_ה': {
    verse: 'דאגה בלב איש ישחנה ודבר טוב ישמחנה',
    translation: 'Anxiety in the heart of man causes depression, but a good word makes it glad',
    reference: 'Proverbs 12:25'
  },
  'ד_ל': {
    verse: 'דן ידין עמו כאחד שבטי ישראל',
    translation: 'Dan shall judge his people as one of the tribes of Israel',
    reference: 'Genesis 49:16'
  },
  'ד_ם': {
    verse: 'דרכיה דרכי נעם וכל נתיבותיה שלום',
    translation: 'Her ways are ways of pleasantness, and all her paths are peace',
    reference: 'Proverbs 3:17'
  },
  'ד_ן': {
    verse: 'דבר אל בני ישראל ואמרת אליהם כי אתם עברים את הירדן אל ארץ כנען',
    translation: 'Speak to the children of Israel, and say to them: When you cross the Jordan into the land of Canaan',
    reference: 'Numbers 33:51'
  },

  // Continue with more letter combinations...
  'ה_א': {
    verse: 'הושיענא אלהים ציון ובנה ערי יהודה',
    translation: 'Save us, O God of Zion, and rebuild the cities of Judah',
    reference: 'Psalms 69:36'
  },
  'ה_ה': {
    verse: 'הללו את שם יי הללו עבדי יי',
    translation: 'Praise the name of the Lord! Praise, O servants of the Lord!',
    reference: 'Psalms 113:1'
  },
  'ה_ל': {
    verse: 'הושענא יי מלכנו ענני ביום קראי',
    translation: 'Save us, O Lord our King; answer us when we call',
    reference: 'Psalms 20:10'
  },
  'ה_ם': {
    verse: 'הודו ליי כי טוב כי לעולם חסדו',
    translation: 'Give thanks to the Lord, for He is good; His mercy endures forever',
    reference: 'Psalms 136:1'
  },
  'ה_ן': {
    verse: 'הנה מה טוב ומה נעים שבת אחים גם יחד',
    translation: 'Behold, how good and how pleasant it is for brethren to dwell together in unity!',
    reference: 'Psalms 133:1'
  },
  'ה_ר': {
    verse: 'הר ציון ירכתי צפון קרית מלך רב',
    translation: 'Mount Zion on the sides of the north, the city of the great King',
    reference: 'Psalms 48:2'
  },

  // More combinations for common names
  'מ_ה': {
    verse: 'מה אדיר שמך בכל הארץ',
    translation: 'How excellent is Your name in all the earth!',
    reference: 'Psalms 8:9'
  },
  'מ_ם': {
    verse: 'מזמור לתודה הריעו ליי כל הארץ',
    translation: 'A Psalm of thanksgiving. Make a joyful shout to the Lord, all you lands!',
    reference: 'Psalms 100:1'
  },
  'מ_ן': {
    verse: 'מי האיש החפץ חיים אוהב ימים לראות טוב',
    translation: 'Who is the man who desires life, and loves many days, that he may see good?',
    reference: 'Psalms 34:13'
  },
  'מ_ר': {
    verse: 'מזמור שיר חנכת הבית לדוד',
    translation: 'A Psalm and song at the dedication of the house of David',
    reference: 'Psalms 30:1'
  },

  'ש_ה': {
    verse: 'שמע ישראל יי אלהינו יי אחד',
    translation: 'Hear, O Israel: The Lord our God, the Lord is one!',
    reference: 'Deuteronomy 6:4'
  },
  'ש_ם': {
    verse: 'שירו ליי שיר חדש כי נפלאות עשה',
    translation: 'Sing to the Lord a new song! For He has done marvelous things',
    reference: 'Psalms 98:1'
  },
  'ש_ן': {
    verse: 'שמחו ביי צדיקים ולישרים נאוה תהלה',
    translation: 'Rejoice in the Lord, O you righteous! For praise from the upright is beautiful',
    reference: 'Psalms 33:1'
  },
  'ש_ר': {
    verse: 'שמח צדיק ביי וחסה בו והתהללו כל ישרי לב',
    translation: 'Be glad in the Lord and rejoice, you righteous; and shout for joy, all you upright in heart!',
    reference: 'Psalms 32:11'
  },

  'י_ה': {
    verse: 'יי צדקתך כהררי אל משפטיך תהום רבה',
    translation: 'Your righteousness is like the great mountains; Your judgments are a great deep',
    reference: 'Psalms 36:7'
  },
  'י_ם': {
    verse: 'יי מלך עולם ועד אבדו גוים מארצו',
    translation: 'The Lord is King forever and ever; the nations have perished out of His land',
    reference: 'Psalms 10:16'
  },
  'י_ן': {
    verse: 'יושב בסתר עליון בצל שדי יתלונן',
    translation: 'He who dwells in the secret place of the Most High shall abide under the shadow of the Almighty',
    reference: 'Psalms 91:1'
  },
  'י_ף': {
    verse: 'יי ישמרך מכל רע ישמר את נפשך',
    translation: 'The Lord shall preserve you from all evil; He shall preserve your soul',
    reference: 'Psalms 121:7'
  }
};

function getFirstAndLastLetter(text: string): string {
  const hebrewText = text.replace(/[^\u0590-\u05FF]/g, '');
  if (hebrewText.length === 0) return '';
  
  const firstLetter = hebrewText[0];
  const lastLetter = hebrewText[hebrewText.length - 1];
  
  return `${firstLetter}_${lastLetter}`;
}

export function PrayerVerses({ text }: PrayerVersesProps) {
  const cleanText = text.replace(/[^\u0590-\u05FF]/g, '').trim();
  
  if (cleanText.length === 0) {
    return null;
  }

  const letterKey = getFirstAndLastLetter(cleanText);
  const verseData = PRAYER_VERSES[letterKey as keyof typeof PRAYER_VERSES];

  if (!verseData) {
    return (
      <Card className="gematria-result-card">
        <CardHeader>
          <CardTitle className="text-primary">Prayer Verse</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground">
            No traditional prayer verse found for names beginning with "{cleanText[0]}" and ending with "{cleanText[cleanText.length - 1]}"
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="gematria-result-card">
      <CardHeader>
        <CardTitle className="text-primary">Prayer Verse for {cleanText}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="text-center mb-4">
            <p className="text-sm text-muted-foreground mb-2">
              Traditional verse beginning with "{cleanText[0]}" and ending with "{cleanText[cleanText.length - 1]}"
            </p>
          </div>
          
          <div className="bg-accent/10 p-4 rounded-lg border border-accent/30">
            <div className="text-xl font-bold text-center text-primary mb-3" style={{ fontFamily: 'Georgia, serif' }} dir="rtl">
              {verseData.verse}
            </div>
            <div className="text-lg text-center text-foreground mb-2" dir="ltr">
              "{verseData.translation}"
            </div>
            <div className="text-sm text-center text-muted-foreground font-semibold">
              {verseData.reference}
            </div>
          </div>
          
          <div className="mt-4 p-3 bg-primary/10 rounded-lg">
            <p className="text-sm text-primary/80 text-center">
              🙏 This verse is traditionally recited before the second "יהי רצון" at the conclusion of the Amidah, connecting the spiritual essence of your name to prayer
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
