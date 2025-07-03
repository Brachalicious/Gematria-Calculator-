import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface BiblicalVersesProps {
  text: string;
  gematriaValue: number;
}

const BIBLICAL_NAMES_VERSES = {
  // Original names
  'אברהם': {
    verse: 'וְלֹא־יִקָּרֵא עוֹד אֶת־שִׁמְךָ אַבְרָם וְהָיָה שִׁמְךָ אַבְרָהָם כִּי אַב־הֲמוֹן גּוֹיִם נְתַתִּיךָ',
    translation: 'No longer will you be called Abram; your name will be Abraham, for I have made you a father of many nations',
    reference: 'Genesis 17:5'
  },
  'אדם': {
    verse: 'וַיִּיצֶר יְהוָה אֱלֹהִים אֶת־הָאָדָם עָפָר מִן־הָאֲדָמָה וַיִּפַּח בְּאַפָּיו נִשְׁמַת חַיִּים',
    translation: 'And the Lord God formed man from the dust of the ground and breathed into his nostrils the breath of life',
    reference: 'Genesis 2:7'
  },
  'משה': {
    verse: 'וַתִּקְרָא שְׁמוֹ מֹשֶׁה וַתֹּאמֶר כִּי מִן־הַמַּיִם מְשִׁיתִהוּ',
    translation: 'She named him Moses, saying, "I drew him out of the water"',
    reference: 'Exodus 2:10'
  },
  'דוד': {
    verse: 'וַיִּשְׁלַח יְהוָה אֶת־נָתָן אֶל־דָּוִד',
    translation: 'And the Lord sent Nathan to David',
    reference: '2 Samuel 12:1'
  },
  'שלמה': {
    verse: 'וַיִּקְרָא אֶת־שְׁמוֹ יְדִידְיָה בַּעֲבוּר יְהוָה',
    translation: 'And he called his name Jedidiah, because of the Lord',
    reference: '2 Samuel 12:25'
  },
  'מרים': {
    verse: 'וַתִּקַּח מִרְיָם הַנְּבִיאָה אֲחוֹת אַהֲרֹן אֶת־הַתֹּף בְּיָדָהּ',
    translation: 'Then Miriam the prophetess, the sister of Aaron, took a timbrel in her hand',
    reference: 'Exodus 15:20'
  },
  'שרה': {
    verse: 'וַיֹּאמֶר אֱלֹהִים אֶל־אַבְרָהָם שָׂרַי אִשְׁתְּךָ לֹא־תִקְרָא אֶת־שְׁמָהּ שָׂרָי כִּי שָׂרָה שְׁמָהּ',
    translation: 'And God said to Abraham, "As for Sarai your wife, you shall not call her name Sarai, but Sarah shall be her name"',
    reference: 'Genesis 17:15'
  },
  'יעקב': {
    verse: 'וַיֹּאמֶר לֹא יַעֲקֹב יֵאָמֵר עוֹד שִׁמְךָ כִּי אִם־יִשְׂרָאֵל',
    translation: 'And he said, "Your name shall no longer be called Jacob, but Israel"',
    reference: 'Genesis 32:28'
  },
  'יוסף': {
    verse: 'וַתִּקְרָא אֶת־שְׁמוֹ יוֹסֵף לֵאמֹר יֹסֵף יְהוָה לִי בֵּן אַחֵר',
    translation: 'And she called his name Joseph, saying, "The Lord shall add to me another son"',
    reference: 'Genesis 30:24'
  },
  'בנימין': {
    verse: 'וַיְהִי בְצֵאת נַפְשָׁהּ כִּי מֵתָה וַתִּקְרָא שְׁמוֹ בֶּן־אוֹנִי וְאָבִיו קָרָא־לוֹ בִנְיָמִין',
    translation: 'And as her soul was departing (for she died), she called his name Ben-Oni; but his father called him Benjamin',
    reference: 'Genesis 35:18'
  },
  // Additional names from the traditional text
  'אהרן': {
    verse: 'בֵּית אַהֲרֹן בִּטְחוּ בַיי מָגֵן וּמָעֵן הוּא',
    translation: 'O house of Aaron, trust in the Lord; He is their help and shield',
    reference: 'Psalms 115:10'
  },
  'דן': {
    verse: 'דָּן יָדִין עַמּוֹ כְּאַחַד שִׁבְטֵי יִשְׂרָאֵל',
    translation: 'Dan will judge his people as one of the tribes of Israel',
    reference: 'Genesis 49:16'
  },
  'גד': {
    verse: 'גָּד גְּדוּד יְגוּדֶנּוּ וְהוּא יָגֻד עָקֵב',
    translation: 'Gad will be attacked by a band of raiders, but he will attack them at their heels',
    reference: 'Genesis 49:19'
  },
  'אליהו': {
    verse: 'וַיֹּאמֶר אֱלִיָּהוּ הַנָּבִיא אֶל־הָעָם גְּשׁוּ אֵלַי',
    translation: 'And Elijah the prophet said to all the people, "Come near to me"',
    reference: '1 Kings 18:30'
  },
  'נח': {
    verse: 'נֹחַ אִישׁ צַדִּיק תָּמִים הָיָה בְּדֹרֹתָיו',
    translation: 'Noah was a righteous man, blameless in his generation',
    reference: 'Genesis 6:9'
  },
  'לוי': {
    verse: 'לְלֵוִי אָמַר תֻּמֶּיךָ וְאוּרֶיךָ לְאִישׁ חֲסִידֶךָ',
    translation: 'Of Levi he said: Your Thummim and Urim belong to your faithful servant',
    reference: 'Deuteronomy 33:8'
  },
  'גברי': {
    verse: 'גַּם אֲנִי אוֹדֶה בִכְלֵי נֶבֶל אֲמִתֶּךָ אֱלֹהַי',
    translation: 'I will also praise you with the harp for your faithfulness, my God',
    reference: 'Psalms 71:22'
  },
  'חנה': {
    verse: 'וַתִּתְפַּלֵּל חַנָּה וַתֹּאמַר עָלַץ לִבִּי בַיי',
    translation: 'Then Hannah prayed and said: My heart rejoices in the Lord',
    reference: '1 Samuel 2:1'
  },
  'יצחק': {
    verse: 'וַיִּקְרָא אַבְרָהָם שֵׁם־בְּנוֹ הַנּוֹלַד־לוֹ יִצְחָק',
    translation: 'Abraham gave the name Isaac to the son Sarah bore him',
    reference: 'Genesis 21:3'
  },
  'רבקה': {
    verse: 'וַיְהִי רִבְקָה שֹׁמַעַת בְּדַבֵּר יִצְחָק אֶל־עֵשָׂו בְּנוֹ',
    translation: 'Now Rebekah was listening when Isaac spoke to his son Esau',
    reference: 'Genesis 27:5'
  },
  'לאה': {
    verse: 'וַתַּהַר לֵאָה וַתֵּלֶד בֵּן וַתִּקְרָא שְׁמוֹ רְאוּבֵן',
    translation: 'Leah became pregnant and gave birth to a son. She named him Reuben',
    reference: 'Genesis 29:32'
  },
  'רחל': {
    verse: 'וַיַּרְא יַעֲקֹב אֶת־רָחֵל בַּת־לָבָן אֲחִי אִמּוֹ',
    translation: 'When Jacob saw Rachel daughter of his uncle Laban',
    reference: 'Genesis 29:10'
  },
  'שמואל': {
    verse: 'וַתִּקְרָא אֶת־שְׁמוֹ שְׁמוּאֵל כִּי מֵיְהוָה שְׁאִלְתִּיו',
    translation: 'She named him Samuel, saying, "Because I asked the Lord for him"',
    reference: '1 Samuel 1:20'
  },
  'אליעזר': {
    verse: 'וַיֹּאמֶר אַבְרָם אֲדֹנָי יְהוִה מַה־תִּתֶּן־לִי וְאָנֹכִי הוֹלֵךְ עֲרִירִי וּבֶן־מֶשֶׁק בֵּיתִי הוּא דַּמֶּשֶׂק אֱלִיעֶזֶר',
    translation: 'But Abram said, "Sovereign Lord, what can you give me since I remain childless and the one who will inherit my estate is Eliezer of Damascus"',
    reference: 'Genesis 15:2'
  },
  'יהודה': {
    verse: 'וַתַּהַר עוֹד וַתֵּלֶד בֵּן וַתֹּאמֶר הַפַּעַם אוֹדֶה אֶת־יְהוָה עַל־כֵּן קָרְאָה שְׁמוֹ יְהוּדָה',
    translation: 'She conceived again, and when she gave birth to a son she said, "This time I will praise the Lord." So she named him Judah',
    reference: 'Genesis 29:35'
  },
  'בועז': {
    verse: 'וְהִנֵּה בֹעַז בָּא מִבֵּית לֶחֶם וַיֹּאמֶר לַקּוֹצְרִים יְהוָה עִמָּכֶם',
    translation: 'Just then Boaz arrived from Bethlehem and greeted the harvesters, "The Lord be with you!"',
    reference: 'Ruth 2:4'
  },
  'רות': {
    verse: 'וַתֹּאמֶר רוּת אַל־תִּפְגְּעִי־בִי לְעָזְבֵךְ לָשׁוּב מֵאַחֲרָיִךְ',
    translation: 'But Ruth replied, "Don\'t urge me to leave you or to turn back from you"',
    reference: 'Ruth 1:16'
  },
  'אסתר': {
    verse: 'וַתִּלָּקַח אֶסְתֵּר אֶל־הַמֶּלֶךְ אֲחַשְׁוֵרוֹשׁ אֶל־בֵּית מַלְכוּתוֹ',
    translation: 'She was taken to King Xerxes in the royal residence',
    reference: 'Esther 2:16'
  },
  'מרדכי': {
    verse: 'אִישׁ יְהוּדִי הָיָה בְּשׁוּשַׁן הַבִּירָה וּשְׁמוֹ מָרְדֳּכַי',
    translation: 'Now there was in the citadel of Susa a Jew of the tribe of Benjamin, named Mordecai',
    reference: 'Esther 2:5'
  },
  'נעמי': {
    verse: 'וַתֹּאמֶר אֲלֵיהֶן אַל־תִּקְרֶאנָה לִי נָעֳמִי קְרֶאןָ לִי מָרָא',
    translation: 'Don\'t call me Naomi," she told them. "Call me Mara"',
    reference: 'Ruth 1:20'
  },
  'יונתן': {
    verse: 'וִיהוֹנָתָן בֶּן־שָׁאוּל חָפֵץ בְּדָוִד מְאֹד',
    translation: 'And Jonathan son of Saul delighted greatly in David',
    reference: '1 Samuel 19:1'
  },
  'גדעון': {
    verse: 'וַיֹּאמֶר אֵלָיו יְהוָה שָׁלוֹם לְךָ אַל־תִּירָא לֹא תָמוּת',
    translation: 'But the Lord said to him, "Peace! Do not be afraid. You are not going to die"',
    reference: 'Judges 6:23'
  },
  'שמשון': {
    verse: 'וַתֵּלֶד הָאִשָּׁה בֵּן וַתִּקְרָא אֶת־שְׁמוֹ שִׁמְשׁוֹן',
    translation: 'The woman gave birth to a boy and named him Samson',
    reference: 'Judges 13:24'
  },
  'נחמיה': {
    verse: 'דִּבְרֵי נְחֶמְיָה בֶן־חֲכַלְיָה וַיְהִי בְחֹדֶשׁ כִּסְלֵו',
    translation: 'The words of Nehemiah son of Hakaliah: In the month of Kislev',
    reference: 'Nehemiah 1:1'
  },
  'עזרא': {
    verse: 'וְעֶזְרָא הַסֹּפֵר עָמַד עַל־מִגְדַּל־עֵץ אֲשֶׁר עָשׂוּ לַדָּבָר',
    translation: 'Ezra the teacher of the Law stood on a high wooden platform built for the occasion',
    reference: 'Nehemiah 8:4'
  }
};

export function BiblicalVerses({ text, gematriaValue }: BiblicalVersesProps) {
  // Clean the text and check for biblical names
  const cleanText = text.replace(/[^\u0590-\u05FF]/g, '').trim();
  const nameData = BIBLICAL_NAMES_VERSES[cleanText as keyof typeof BIBLICAL_NAMES_VERSES];

  if (!nameData) {
    return null;
  }

  return (
    <Card className="gematria-result-card">
      <CardHeader>
        <CardTitle className="text-primary">Biblical Verse for {cleanText}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="bg-accent/10 p-4 rounded-lg border border-accent/30">
            <div className="text-xl font-bold text-center text-primary mb-3" style={{ fontFamily: 'Georgia, serif' }} dir="rtl">
              {nameData.verse}
            </div>
            <div className="text-lg text-center text-foreground mb-2" dir="ltr">
              "{nameData.translation}"
            </div>
            <div className="text-sm text-center text-muted-foreground font-semibold">
              {nameData.reference}
            </div>
          </div>
          
          <div className="mt-4 p-3 bg-primary/10 rounded-lg">
            <p className="text-sm text-primary/80 text-center">
              📖 This biblical verse is associated with the name {cleanText} and carries deep spiritual significance
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
