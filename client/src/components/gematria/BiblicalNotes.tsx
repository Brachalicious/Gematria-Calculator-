import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface BiblicalNotesProps {
  text: string;
}

interface BiblicalContext {
  biblicalFigure?: string;
  biblicalReference?: string;
  historicalContext?: string;
  spiritualLessons?: string[];
  keyVerses?: Array<{
    verse: string;
    reference: string;
    translation: string;
  }>;
  modernRelevance?: string;
  familyConnections?: string[];
  propheticSignificance?: string;
}

const BIBLICAL_CONTEXTS: { [key: string]: BiblicalContext } = {
  'אברהם': {
    biblicalFigure: 'Abraham - The Father of Nations',
    biblicalReference: 'Genesis 12-25',
    historicalContext: 'Abraham lived around 2000 BCE and was called by God to leave his homeland in Ur of the Chaldeans. He became the first patriarch of the Jewish people and the father of monotheism.',
    spiritualLessons: [
      'Faith in divine promises even when circumstances seem impossible',
      'Willingness to sacrifice for God\'s will',
      'Hospitality and kindness to strangers',
      'Trust in God\'s timing and plan'
    ],
    keyVerses: [
      {
        verse: 'וַיַּאֲמֵן בַּיהוָה וַיַּחְשְׁבֶהָ לּוֹ צְדָקָה',
        reference: 'Genesis 15:6',
        translation: 'And he believed in the Lord, and He counted it to him for righteousness'
      },
      {
        verse: 'וְהָיִיתָ לְבְרָכָה',
        reference: 'Genesis 12:2',
        translation: 'And you shall be a blessing'
      }
    ],
    modernRelevance: 'Abraham represents the courage to step into the unknown when called by God, and the faith to believe in promises that seem impossible.',
    familyConnections: ['Isaac (son)', 'Ishmael (son)', 'Sarah (wife)', 'Hagar (concubine)'],
    propheticSignificance: 'Father of the covenant people, through whom all nations would be blessed'
  },

  'שרה': {
    biblicalFigure: 'Sarah - The Mother of Nations',
    biblicalReference: 'Genesis 11-23',
    historicalContext: 'Originally named Sarai, God changed her name to Sarah meaning "princess." She was Abraham\'s wife and Isaac\'s mother, becoming the first matriarch.',
    spiritualLessons: [
      'God\'s promises come to pass in His perfect timing',
      'Laughter and joy come after seasons of waiting',
      'God can accomplish the impossible through ordinary people',
      'Beauty and dignity in old age'
    ],
    keyVerses: [
      {
        verse: 'וַתִּצְחַק שָׂרָה בְּקִרְבָּהּ',
        reference: 'Genesis 18:12',
        translation: 'And Sarah laughed within herself'
      },
      {
        verse: 'הֲיִפָּלֵא מֵיְהוָה דָּבָר',
        reference: 'Genesis 18:14',
        translation: 'Is anything too difficult for the Lord?'
      }
    ],
    modernRelevance: 'Sarah teaches us about patience in waiting for God\'s promises and finding joy in unexpected blessings.',
    familyConnections: ['Abraham (husband)', 'Isaac (son)', 'Hagar (servant)'],
    propheticSignificance: 'Mother of the covenant people, representing the free woman and the promise'
  },

  'דוד': {
    biblicalFigure: 'David - The King After God\'s Own Heart',
    biblicalReference: '1 Samuel 16 - 1 Kings 2',
    historicalContext: 'David was the youngest son of Jesse, a shepherd who became Israel\'s greatest king around 1000 BCE. He united the tribes, established Jerusalem as the capital, and authored many Psalms.',
    spiritualLessons: [
      'God looks at the heart, not outward appearance',
      'Repentance and restoration after failure',
      'Worship and praise in all circumstances',
      'Courage in facing giants with faith in God'
    ],
    keyVerses: [
      {
        verse: 'וַיֹּאמֶר יְהוָה אֶל-שְׁמוּאֵל... כִּי לֹא אֲשֶׁר יִרְאֶה הָאָדָם כִּי הָאָדָם יִרְאֶה לַעֵינַיִם וַיהוָה יִרְאֶה לַלֵּבָב',
        reference: '1 Samuel 16:7',
        translation: 'For the Lord does not see as man sees; for man looks at the outward appearance, but the Lord looks at the heart'
      },
      {
        verse: 'לֵב טָהוֹר בְּרָא-לִי אֱלֹהִים וְרוּחַ נָכוֹן חַדֵּשׁ בְּקִרְבִּי',
        reference: 'Psalm 51:10',
        translation: 'Create in me a clean heart, O God, and renew a steadfast spirit within me'
      }
    ],
    modernRelevance: 'David shows us that God can use anyone, regardless of their background, and that sincere repentance leads to restoration.',
    familyConnections: ['Jesse (father)', 'Solomon (son)', 'Bathsheba (wife)', 'Jonathan (friend)'],
    propheticSignificance: 'Ancestor of the Messiah, establishing the Davidic covenant and eternal kingdom'
  },

  'משה': {
    biblicalFigure: 'Moses - The Great Lawgiver and Prophet',
    biblicalReference: 'Exodus - Deuteronomy',
    historicalContext: 'Moses led the Israelites out of Egyptian slavery around 1300 BCE, received the Torah at Mount Sinai, and guided them through 40 years in the wilderness.',
    spiritualLessons: [
      'God can use anyone despite their perceived limitations',
      'Leadership requires sacrifice and service to others',
      'The importance of intercession and standing in the gap',
      'Humility even in positions of great authority'
    ],
    keyVerses: [
      {
        verse: 'וְהָאִישׁ מֹשֶׁה עָנָו מְאֹד מִכֹּל הָאָדָם אֲשֶׁר עַל-פְּנֵי הָאֲדָמָה',
        reference: 'Numbers 12:3',
        translation: 'Now the man Moses was very humble, more than all men who were on the face of the earth'
      },
      {
        verse: 'שְׁמַע יִשְׂרָאֵל יְהוָה אֱלֹהֵינוּ יְהוָה אֶחָד',
        reference: 'Deuteronomy 6:4',
        translation: 'Hear, O Israel: The Lord our God, the Lord is one'
      }
    ],
    modernRelevance: 'Moses teaches us about reluctant leadership, the power of God working through weakness, and the importance of faithful service.',
    familyConnections: ['Aaron (brother)', 'Miriam (sister)', 'Amram (father)', 'Jochebed (mother)'],
    propheticSignificance: 'The greatest prophet, foreshadowing the coming Messiah who would deliver God\'s people'
  },

  'רחל': {
    biblicalFigure: 'Rachel - The Beloved Wife',
    biblicalReference: 'Genesis 29-35',
    historicalContext: 'Rachel was Jacob\'s beloved wife, daughter of Laban, and mother of Joseph and Benjamin. She represents the struggle of the barren woman who ultimately becomes fruitful.',
    spiritualLessons: [
      'God\'s timing in answering prayer',
      'The pain and joy of motherhood',
      'Love that endures through trials',
      'God\'s compassion for the suffering'
    ],
    keyVerses: [
      {
        verse: 'וַיִּזְכֹּר אֱלֹהִים אֶת-רָחֵל וַיִּשְׁמַע אֵלֶיהָ אֱלֹהִים וַיִּפְתַּח אֶת-רַחְמָהּ',
        reference: 'Genesis 30:22',
        translation: 'Then God remembered Rachel, and God listened to her and opened her womb'
      },
      {
        verse: 'קוֹל בְּרָמָה נִשְׁמָע נְהִי בְּכִי תַמְרוּרִים רָחֵל מְבַכָּה עַל-בָּנֶיהָ',
        reference: 'Jeremiah 31:15',
        translation: 'A voice was heard in Ramah, weeping and great mourning, Rachel weeping for her children'
      }
    ],
    modernRelevance: 'Rachel represents every woman who struggles with infertility and the faithfulness of God to answer prayer in His time.',
    familyConnections: ['Jacob (husband)', 'Joseph (son)', 'Benjamin (son)', 'Leah (sister)'],
    propheticSignificance: 'Mother of Joseph, who saved Israel from famine, and Benjamin, from whose tribe came King Saul'
  },

  'יוסף': {
    biblicalFigure: 'Joseph - The Dreamer and Provider',
    biblicalReference: 'Genesis 37-50',
    historicalContext: 'Joseph was Jacob\'s favored son, sold into slavery by his brothers, who became second-in-command in Egypt and saved his family from famine.',
    spiritualLessons: [
      'God can turn evil into good for His purposes',
      'Faithfulness in small things leads to greater responsibility',
      'Forgiveness toward those who hurt us',
      'God\'s sovereignty in difficult circumstances'
    ],
    keyVerses: [
      {
        verse: 'וְאַתֶּם חֲשַׁבְתֶּם עָלַי רָעָה אֱלֹהִים חֲשָׁבָהּ לְטֹבָה לְמַעַן עֲשֹׂה כַיּוֹם הַזֶּה לְהַחֲיֹת עַם-רָב',
        reference: 'Genesis 50:20',
        translation: 'But as for you, you meant evil against me; but God meant it for good, in order to bring it about as it is this day, to save many people alive'
      }
    ],
    modernRelevance: 'Joseph\'s story teaches us about resilience, the importance of dreams and vision, and trusting God\'s plan even in adversity.',
    familyConnections: ['Jacob (father)', 'Rachel (mother)', 'Benjamin (brother)', 'Eleven brothers'],
    propheticSignificance: 'A type of Christ - rejected by his brothers, suffered unjustly, and became the savior of his people'
  },

  'מרים': {
    biblicalFigure: 'Miriam - The Prophetess and Protector',
    biblicalReference: 'Exodus 2, 15; Numbers 12',
    historicalContext: 'Miriam was Moses\' sister who watched over him as a baby, led the women in celebration after crossing the Red Sea, and served as a prophetess.',
    spiritualLessons: [
      'Protective love and family loyalty',
      'Leadership among women',
      'The power of praise and worship',
      'The consequences of pride and criticism'
    ],
    keyVerses: [
      {
        verse: 'וַתִּקַּח מִרְיָם הַנְּבִיאָה אֲחוֹת אַהֲרֹן אֶת-הַתֹּף בְּיָדָהּ וַתֵּצֶאן כָל-הַנָּשִׁים אַחֲרֶיהָ בְּתֻפִּים וּבִמְחֹלֹת',
        reference: 'Exodus 15:20',
        translation: 'Then Miriam the prophetess, the sister of Aaron, took the timbrel in her hand; and all the women went out after her with timbrels and with dances'
      }
    ],
    modernRelevance: 'Miriam shows us the importance of celebrating God\'s victories and the role of women in spiritual leadership.',
    familyConnections: ['Moses (brother)', 'Aaron (brother)', 'Amram (father)', 'Jochebed (mother)'],
    propheticSignificance: 'A leader in the exodus from Egypt, representing worship and praise in times of deliverance'
  },

  'שלמה': {
    biblicalFigure: 'Solomon - The Wise King',
    biblicalReference: '1 Kings 1-11, 2 Chronicles 1-9',
    historicalContext: 'Solomon was David\'s son who became king of Israel around 970 BCE, known for his wisdom, wealth, and building the First Temple in Jerusalem.',
    spiritualLessons: [
      'The value of seeking wisdom above material wealth',
      'The importance of building God\'s house',
      'The dangers of compromise and divided loyalty',
      'The vanity of worldly pursuits without God'
    ],
    keyVerses: [
      {
        verse: 'וַיֹּאמֶר שְׁלֹמֹה... וְנָתַתָּ לְעַבְדְּךָ לֵב שֹׁמֵעַ לִשְׁפֹּט אֶת-עַמְּךָ לְהַבִין בֵּין-טוֹב לְרָע',
        reference: '1 Kings 3:9',
        translation: 'Give therefore your servant an understanding heart to judge your people, that I may discern between good and evil'
      },
      {
        verse: 'רֵאשִׁית חָכְמָה יִרְאַת יְהוָה',
        reference: 'Proverbs 9:10',
        translation: 'The fear of the Lord is the beginning of wisdom'
      }
    ],
    modernRelevance: 'Solomon teaches us to prioritize wisdom and spiritual understanding, while warning against the temptations of success.',
    familyConnections: ['David (father)', 'Bathsheba (mother)', 'Rehoboam (son)'],
    propheticSignificance: 'Builder of the Temple, representing the coming kingdom of peace under the Messiah'
  },

  'דניאל': {
    biblicalFigure: 'Daniel - The Faithful Prophet in Exile',
    biblicalReference: 'Book of Daniel',
    historicalContext: 'Daniel was taken captive to Babylon as a young man around 605 BCE, served in the royal court, and received prophetic visions about future kingdoms.',
    spiritualLessons: [
      'Maintaining faith and convictions in a foreign culture',
      'The power of prayer and fasting',
      'God\'s sovereignty over earthly kingdoms',
      'Courage to stand alone for what is right'
    ],
    keyVerses: [
      {
        verse: 'וְדָנִיֵּאל שָׂם עַל-לִבּוֹ אֲשֶׁר לֹא-יִתְגָּאַל בְּפַת-בַּג הַמֶּלֶךְ',
        reference: 'Daniel 1:8',
        translation: 'But Daniel purposed in his heart that he would not defile himself with the portion of the king\'s delicacies'
      },
      {
        verse: 'וְיָדַעְתָּ כִּי-שַׁלִּיט עִלָּאָה בְּמַלְכוּת אֲנָשָׁא',
        reference: 'Daniel 4:32',
        translation: 'And you shall know that the Most High rules in the kingdom of men'
      }
    ],
    modernRelevance: 'Daniel shows us how to maintain our faith and values while living in a secular society.',
    familyConnections: ['Hananiah/Shadrach (friend)', 'Mishael/Meshach (friend)', 'Azariah/Abednego (friend)'],
    propheticSignificance: 'Received visions of the coming Messiah and the end times, including the prophecy of the 70 weeks'
  },

  'אסתר': {
    biblicalFigure: 'Esther - The Queen Who Saved Her People',
    biblicalReference: 'Book of Esther',
    historicalContext: 'Esther was a Jewish orphan who became queen of Persia around 475 BCE and courageously saved the Jewish people from genocide.',
    spiritualLessons: [
      'God places people in positions for divine purposes',
      'Courage to act when others\' lives are at stake',
      'The power of fasting and prayer',
      'God\'s hidden providence in desperate times'
    ],
    keyVerses: [
      {
        verse: 'וּמִי יוֹדֵעַ אִם-לְעֵת כָּזֹאת הִגַּעַתְּ לַמַּלְכוּת',
        reference: 'Esther 4:14',
        translation: 'Yet who knows whether you have come to the kingdom for such a time as this?'
      }
    ],
    modernRelevance: 'Esther teaches us about divine timing, courage in crisis, and using our position to help others.',
    familyConnections: ['Mordecai (cousin/guardian)', 'King Ahasuerus (husband)'],
    propheticSignificance: 'Represents the hidden work of God in preserving His people even when He seems absent'
  },

  'רות': {
    biblicalFigure: 'Ruth - The Loyal Daughter-in-Law',
    biblicalReference: 'Book of Ruth',
    historicalContext: 'Ruth was a Moabite woman who chose to follow her mother-in-law Naomi to Israel, where she married Boaz and became an ancestor of King David.',
    spiritualLessons: [
      'Loyalty and commitment beyond blood relations',
      'God\'s grace extends to all peoples',
      'Faithfulness in small things leads to great blessings',
      'The beauty of redemption and restoration'
    ],
    keyVerses: [
      {
        verse: 'כִּי אֶל-אֲשֶׁר תֵּלְכִי אֵלֵךְ וּבַאֲשֶׁר תָּלִינִי אָלִין עַמֵּךְ עַמִּי וֵאלֹהַיִךְ אֱלֹהָי',
        reference: 'Ruth 1:16',
        translation: 'Wherever you go, I will go; and wherever you lodge, I will lodge; your people shall be my people, and your God, my God'
      }
    ],
    modernRelevance: 'Ruth demonstrates the beauty of conversion, loyalty, and how God includes outsiders in His family.',
    familyConnections: ['Naomi (mother-in-law)', 'Boaz (husband)', 'Obed (son)'],
    propheticSignificance: 'Ancestor of David and therefore the Messiah, showing God\'s inclusion of the Gentiles'
  },

  'יצחק': {
    biblicalFigure: 'Isaac - The Child of Promise',
    biblicalReference: 'Genesis 21-35',
    historicalContext: 'Isaac was the promised son of Abraham and Sarah, born when they were advanced in age. He represents the fulfillment of God\'s promises and the continuation of the covenant.',
    spiritualLessons: [
      'God\'s promises come to pass in His perfect timing',
      'Being a bridge between generations',
      'Submission to God\'s will even unto death',
      'The importance of meditation and prayer'
    ],
    keyVerses: [
      {
        verse: 'וַיֵּצֵא יִצְחָק לָשׂוּחַ בַּשָּׂדֶה לִפְנוֹת עָרֶב',
        reference: 'Genesis 24:63',
        translation: 'And Isaac went out to meditate in the field toward evening'
      }
    ],
    modernRelevance: 'Isaac teaches us about being a transitional generation, maintaining traditions while adapting to new circumstances.',
    familyConnections: ['Abraham (father)', 'Sarah (mother)', 'Rebecca (wife)', 'Jacob and Esau (sons)'],
    propheticSignificance: 'A type of the sacrificial offering, representing submission to God\'s will'
  },

  'יעקב': {
    biblicalFigure: 'Jacob/Israel - The Wrestler with God',
    biblicalReference: 'Genesis 25-49',
    historicalContext: 'Jacob, later renamed Israel, was Isaac\'s son who became the father of the twelve tribes. His life represents spiritual transformation and struggle.',
    spiritualLessons: [
      'Spiritual transformation through struggle',
      'The power of persistent prayer',
      'God\'s grace despite human flaws',
      'Building a legacy through family'
    ],
    keyVerses: [
      {
        verse: 'וַיִּוָּתֵר יַעֲקֹב לְבַדּוֹ וַיֵּאָבֵק אִישׁ עִמּוֹ עַד עֲלוֹת הַשָּׁחַר',
        reference: 'Genesis 32:24',
        translation: 'And Jacob was left alone, and a man wrestled with him until the breaking of the day'
      },
      {
        verse: 'לֹא יַעֲקֹב יֵאָמֵר עוֹד שִׁמְךָ כִּי אִם-יִשְׂרָאֵל',
        reference: 'Genesis 32:28',
        translation: 'Your name shall no longer be called Jacob, but Israel'
      }
    ],
    modernRelevance: 'Jacob shows us that transformation is possible and that God can use our struggles to shape our character.',
    familyConnections: ['Isaac (father)', 'Rebecca (mother)', 'Rachel and Leah (wives)', 'Twelve sons'],
    propheticSignificance: 'Father of the nation Israel, representing the chosen people\'s relationship with God'
  },

  'בנימין': {
    biblicalFigure: 'Benjamin - The Beloved Youngest',
    biblicalReference: 'Genesis 35, 42-45',
    historicalContext: 'Benjamin was Jacob\'s youngest son and Rachel\'s second child, born as she died. He was especially beloved by his father and represents the favor of the youngest.',
    spiritualLessons: [
      'Divine favor on the youngest and weakest',
      'The pain and joy of being specially loved',
      'Overcoming family jealousy through love',
      'The blessing of being born through sacrifice'
    ],
    keyVerses: [
      {
        verse: 'בֶּן-יָמִין זְאֵב יִטְרָף בַּבֹּקֶר יֹאכַל עַד וְלָעֶרֶב יְחַלֵּק שָׁלָל',
        reference: 'Genesis 49:27',
        translation: 'Benjamin is a ravenous wolf; in the morning he shall devour the prey, and at night he shall divide the spoil'
      }
    ],
    modernRelevance: 'Benjamin represents the special place of the youngest in God\'s heart and the strength that comes from being beloved.',
    familyConnections: ['Jacob (father)', 'Rachel (mother)', 'Joseph (brother)', 'Eleven half-brothers'],
    propheticSignificance: 'The smallest tribe that produced King Saul and later the Apostle Paul'
  },

  'לאה': {
    biblicalFigure: 'Leah - The Fruitful Mother',
    biblicalReference: 'Genesis 29-35',
    historicalContext: 'Leah was Jacob\'s first wife, though he initially loved her sister Rachel more. She became the mother of six tribes of Israel, representing the fruitful woman.',
    spiritualLessons: [
      'God sees and remembers the unloved',
      'Fruitfulness despite rejection',
      'Finding worth in being chosen by God',
      'The blessing of many children'
    ],
    keyVerses: [
      {
        verse: 'וַיַּרְא יְהוָה כִּי-שְׂנוּאָה לֵאָה וַיִּפְתַּח אֶת-רַחְמָהּ וְרָחֵל עֲקָרָה',
        reference: 'Genesis 29:31',
        translation: 'When the Lord saw that Leah was unloved, he opened her womb, but Rachel remained childless'
      }
    ],
    modernRelevance: 'Leah teaches us that God compensates for human rejection with divine blessing and purpose.',
    familyConnections: ['Jacob (husband)', 'Laban (father)', 'Rachel (sister)', 'Six sons including Judah and Levi'],
    propheticSignificance: 'Mother of the priestly and royal tribes, showing God\'s choice of the overlooked'
  },

  'אהרן': {
    biblicalFigure: 'Aaron - The High Priest',
    biblicalReference: 'Exodus, Leviticus, Numbers',
    historicalContext: 'Aaron was Moses\' brother who became the first High Priest of Israel. He represents the priestly ministry and intercession.',
    spiritualLessons: [
      'The importance of supporting leadership',
      'Priestly intercession and service',
      'The cost of compromise (golden calf)',
      'Restoration after failure'
    ],
    keyVerses: [
      {
        verse: 'וְאַהֲרֹן יִשָּׂא אֶת-עֲוֹן הַקֳּדָשִׁים',
        reference: 'Exodus 28:38',
        translation: 'So Aaron shall bear the iniquity of the holy things'
      }
    ],
    modernRelevance: 'Aaron shows us the role of spiritual leadership in bearing the burdens of others and mediating before God.',
    familyConnections: ['Moses (brother)', 'Miriam (sister)', 'Amram (father)', 'Jochebed (mother)'],
    propheticSignificance: 'Established the priesthood, foreshadowing Christ as our eternal High Priest'
  },

  'חנה': {
    biblicalFigure: 'Hannah - The Praying Mother',
    biblicalReference: '1 Samuel 1-2',
    historicalContext: 'Hannah was the mother of Samuel who prayed fervently for a child and dedicated him to God\'s service when her prayer was answered.',
    spiritualLessons: [
      'The power of persistent prayer',
      'Keeping vows made to God',
      'Finding strength in the Lord during trials',
      'The blessing of dedicating children to God'
    ],
    keyVerses: [
      {
        verse: 'וַתִּתְפַּלֵּל חַנָּה וַתֹּאמַר עָלַץ לִבִּי בַּיהוָה',
        reference: '1 Samuel 2:1',
        translation: 'And Hannah prayed and said: My heart rejoices in the Lord'
      }
    ],
    modernRelevance: 'Hannah teaches us about faithful prayer, dedication to God, and finding joy in His faithfulness.',
    familyConnections: ['Elkanah (husband)', 'Samuel (son)', 'Peninnah (co-wife)'],
    propheticSignificance: 'Mother of Samuel who anointed the first kings of Israel'
  },

  'נעמי': {
    biblicalFigure: 'Naomi - The Restored Mother-in-Law',
    biblicalReference: 'Book of Ruth',
    historicalContext: 'Naomi experienced great loss but was restored through the loyalty of her daughter-in-law Ruth and God\'s provision.',
    spiritualLessons: [
      'God\'s restoration after loss',
      'The value of relationships beyond blood',
      'Bitterness can be transformed to joy',
      'God\'s providence in difficult circumstances'
    ],
    keyVerses: [
      {
        verse: 'מְלֵאָה הָלַכְתִּי וְרֵיקָם הֱשִׁיבַנִי יְהוָה',
        reference: 'Ruth 1:21',
        translation: 'I went away full, and the Lord has brought me home again empty'
      }
    ],
    modernRelevance: 'Naomi shows us that even in loss and bitterness, God can bring restoration and new hope.',
    familyConnections: ['Elimelech (husband)', 'Ruth (daughter-in-law)', 'Orpah (daughter-in-law)'],
    propheticSignificance: 'Part of the lineage of David, showing God\'s plan working through difficult circumstances'
  }
};

export function BiblicalNotes({ text }: BiblicalNotesProps) {
  const cleanText = text.replace(/[^\u0590-\u05FF]/g, '').trim();
  
  if (!cleanText) return null;

  const biblicalContext = BIBLICAL_CONTEXTS[cleanText];

  if (!biblicalContext) {
    // For names not in the database, provide general biblical context
    return (
      <Card className="gematria-result-card border-l-4 border-l-blue-600">
        <CardHeader>
          <CardTitle className="text-blue-700 flex items-center">
            📖 Biblical Context
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <p className="text-gray-700">
              While specific biblical information for "{cleanText}" is not available in our database, 
              Hebrew names often carry deep spiritual significance and connections to biblical themes.
            </p>
            <div className="bg-blue-50 p-3 rounded-lg">
              <p className="text-sm text-blue-800">
                💡 <strong>Tip:</strong> Many Hebrew names reflect attributes of God, natural elements, 
                or spiritual concepts that were meaningful to ancient Hebrew families.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="gematria-result-card border-l-4 border-l-blue-600">
      <CardHeader>
        <CardTitle className="text-blue-700 flex items-center">
          📖 Biblical Context for {cleanText}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Biblical Figure */}
          <div>
            <h4 className="font-bold text-blue-800 mb-2">{biblicalContext.biblicalFigure}</h4>
            <p className="text-gray-700">{biblicalContext.historicalContext}</p>
            <p className="text-sm text-blue-600 mt-1">
              <strong>Scripture Reference:</strong> {biblicalContext.biblicalReference}
            </p>
          </div>

          {/* Key Verses */}
          {biblicalContext.keyVerses && (
            <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
              <h5 className="font-semibold text-amber-800 mb-3">📜 Key Biblical Verses</h5>
              {biblicalContext.keyVerses.map((verse, index) => (
                <div key={index} className="mb-3 last:mb-0">
                  <div className="text-right hebrew-text text-lg mb-1" dir="rtl">
                    "{verse.verse}"
                  </div>
                  <div className="text-sm text-gray-700 italic mb-1">
                    "{verse.translation}"
                  </div>
                  <div className="text-xs text-amber-700 font-semibold">
                    — {verse.reference}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Spiritual Lessons */}
          {biblicalContext.spiritualLessons && (
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h5 className="font-semibold text-green-800 mb-3">✨ Spiritual Lessons</h5>
              <ul className="space-y-2">
                {biblicalContext.spiritualLessons.map((lesson, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-green-600 mr-2">•</span>
                    <span className="text-green-800">{lesson}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Family Connections */}
          {biblicalContext.familyConnections && (
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
              <h5 className="font-semibold text-purple-800 mb-3">👨‍👩‍👧‍👦 Family Connections</h5>
              <div className="flex flex-wrap gap-2">
                {biblicalContext.familyConnections.map((connection, index) => (
                  <span key={index} className="bg-purple-200 text-purple-800 px-2 py-1 rounded-full text-sm">
                    {connection}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Prophetic Significance */}
          {biblicalContext.propheticSignificance && (
            <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200">
              <h5 className="font-semibold text-indigo-800 mb-2">🔮 Prophetic Significance</h5>
              <p className="text-indigo-700">{biblicalContext.propheticSignificance}</p>
            </div>
          )}

          {/* Modern Relevance */}
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h5 className="font-semibold text-gray-800 mb-2">🌟 Modern Relevance</h5>
            <p className="text-gray-700">{biblicalContext.modernRelevance}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
