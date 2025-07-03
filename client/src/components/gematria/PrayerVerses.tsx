import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface PrayerVersesProps {
  text: string;
}

// Prayer verses that start and end with matching letters for names
const PRAYER_VERSES = {
  // Names starting with Aleph
  'א_א': {
    verse: 'אָנָּא יְיָ הוֹשִׁיעָה נָּא אָנָּא יְיָ הַצְלִיחָה נָּא',
    translation: 'Please, Lord, save now! Please, Lord, make prosper now!',
    reference: 'Psalms 118:25'
  },
  'א_ד': {
    verse: 'אַזְכִּירָה שִׁמְךְ בְּכָל דּוֹר וָדֹר עַל כֵּן עַמִּים יְהוֹדוּךְ לְעוֹלָם וָעֶד',
    translation: 'I will remember Your name in every generation; peoples will praise You forever and ever',
    reference: 'Psalms 45:18'
  },
  'א_ה': {
    verse: 'אַשְׁרֵי מַשְׂכִּיל אֶל דָּל בְּיוֹם רָעָה יְמַלְּטֵהוּ יְיָ',
    translation: 'Happy is he who considers the poor; in the day of evil the Lord will deliver him',
    reference: 'Psalms 41:2'
  },
  'א_ו': {
    verse: 'אַשְׁרֵי שֶׁאֵל יַעֲקֹב בְּעֶזְרוֹ שִׂבְרוֹ עַל יְיָ אֱלֹהָיו',
    translation: 'Happy is he whose help is the God of Jacob, whose hope is in the Lord his God',
    reference: 'Psalms 146:5'
  },
  'א_י': {
    verse: 'אֲמָרַי הַאֲזִינָה יְיָ בִּינָה הֲגִיגִי',
    translation: 'Give ear to my words, O Lord, consider my meditation',
    reference: 'Psalms 5:2'
  },
  'א_ך': {
    verse: 'אָמַרְתִּי לַיְיָ אֲדֹנָי אָתָּה טוֹבָתִי בַּל עָלֶיךָ',
    translation: 'I said to the Lord, "You are my Lord; my goodness is nothing apart from You"',
    reference: 'Psalms 16:2'
  },
  'א_ל': {
    verse: 'אֶרֶץ רָעֲשָׁה אַף שָׁמַיִם נָטְפוּ מִפְּנֵי אֱלֹהִים זֶה סִינַי מִפְּנֵי אֱלֹהִים אֱלֹהֵי יִשְׂרָאֵל',
    translation: 'The earth trembled, the heavens also dropped at the presence of God; this Sinai before God, the God of Israel',
    reference: 'Psalms 68:9'
  },
  'א_ם': {
    verse: 'אַתָּה הוּא יְיָ הָאֱלֹהִים אֲשֶׁר בָּחַרְתָּ בְּאַבְרָם וְהוֹצֵאתוֹ מֵאוּר כַּשְׂדִּים וְשַׂמְתָּ שְׁמוֹ אַבְרָהָם',
    translation: 'You are the Lord God who chose Abram and brought him out of Ur of the Chaldees and gave him the name Abraham',
    reference: 'Nehemiah 9:7'
  },
  'א_ן': {
    verse: 'אֵלֶיךָ יְיָ אֶקְרָא וְאֶל אֲדֹנָי אֶתְחַנָּן',
    translation: 'To You, O Lord, I call, and to the Lord I make supplication',
    reference: 'Psalms 30:9'
  },
  'א_ע': {
    verse: 'אָמַר בְּלִבּוֹ בַּל אֶמּוֹט לְדֹר וָדֹר אֲשֶׁר לֹא בְרָע',
    translation: 'He says in his heart, "I shall not be moved; from generation to generation I shall not be in adversity"',
    reference: 'Psalms 10:6'
  },
  'א_ק': {
    verse: 'אֲשֶׁר כָּרַת אֶת אַבְרָהָם וּשְׁבוּעָתוֹ לְיִצְחָק',
    translation: 'Which He made with Abraham, and His oath to Isaac',
    reference: 'Psalms 105:9'
  },
  'א_ר': {
    verse: 'אֵלֶּה בָרֶכֶב וְאֵלֶּה בַסּוּסִים וַאֲנַחְנוּ בְּשֵׁם יְיָ אֱלֹהֵינוּ נַזְכִּיר',
    translation: 'Some trust in chariots and some in horses, but we will remember the name of the Lord our God',
    reference: 'Psalms 20:8'
  },

  // Names starting with Bet  
  'ב_א': {
    verse: 'בֵּית אַהֲרֹן בִּטְחוּ בַיְיָ עֶזְרָם וּמָגִנָּם הוּא',
    translation: 'O house of Aaron, trust in the Lord; He is their help and their shield',
    reference: 'Psalms 115:10'
  },
  'ב_ה': {
    verse: 'בַּעֲבוּר יִשְׁמְרוּ חֻקָּיו וְתוֹרֹתָיו יִנְצֹרוּ הַלְלוּיָהּ',
    translation: 'That they might observe His statutes and keep His laws. Hallelujah!',
    reference: 'Psalms 105:45'
  },
  'ב_ז': {
    verse: 'בְּיוֹם קָרָאתִי וַתַּעֲנֵנִי תַּרְהִבֵנִי בְנַפְשִׁי עֹז',
    translation: 'In the day when I called You answered me, and strengthened me with strength in my soul',
    reference: 'Psalms 138:3'
  },
  'ב_ך': {
    verse: 'בָּרוּךְ אַתָּה יְיָ לַמְּדֵנִי חֻקֶּיךָ',
    translation: 'Blessed are You, O Lord; teach me Your statutes',
    reference: 'Psalms 119:12'
  },
  'ב_ל': {
    verse: 'בְּמַקְהֵלוֹת בָּרְכוּ אֱלֹהִים אֲדֹנָי מִמְּקוֹר יִשְׂרָאֵל',
    translation: 'Bless God in the congregations, the Lord, from the fountain of Israel',
    reference: 'Psalms 68:27'
  },
  'ב_ן': {
    verse: 'בָּרוּךְ יְיָ אֱלֹהֵי יִשְׂרָאֵל מֵהָעוֹלָם וְעַד הָעוֹלָם אָמֵן וְאָמֵן',
    translation: 'Blessed be the Lord God of Israel from everlasting to everlasting! Amen and Amen',
    reference: 'Psalms 41:14'
  },
  'ב_ע': {
    verse: 'בְּחֶסֶד וֶאֱמֶת יְכֻפַּר עָוֹן וּבְיִרְאַת יְיָ סוּר מֵרָע',
    translation: 'By mercy and truth iniquity is purged, and by the fear of the Lord men depart from evil',
    reference: 'Proverbs 16:6'
  },
  'ב_ר': {
    verse: 'בְּנוֹת מְלָכִים בִּיקְרוֹתֶיךָ נִצְּבָה שֵׁגַל לִימִינְךָ בְּכֶתֶם אוֹפִיר',
    translation: 'Kings\' daughters are among Your honorable women; at Your right hand stands the queen in gold of Ophir',
    reference: 'Psalms 45:10'
  },

  // Names starting with Gimel
  'ג_ד': {
    verse: 'גַּאֲוַת אָדָם תַּשְׁפִּילֶנּוּ וּשְׁפַל רוּחַ יִתְמֹךְ כָּבוֹד',
    translation: 'A man\'s pride will bring him low, but the humble in spirit will retain honor',
    reference: 'Proverbs 29:23'
  },
  'ג_ה': {
    verse: 'גּוֹל עַל יְיָ דַּרְכֶּךָ וּבְטַח עָלָיו וְהוּא יַעֲשֶׂה',
    translation: 'Commit your way to the Lord; trust also in Him, and He shall bring it to pass',
    reference: 'Psalms 37:5'
  },
  'ג_ל': {
    verse: 'גַּם אֲנִי אוֹדְךָ בִכְלִי נֵבֶל אֲמִתְּךָ אֱלֹהָי אֲזַמְּרָה לְּךָ בְכִנּוֹר קְדוֹשׁ יִשְׂרָאֵל',
    translation: 'Also I will praise You with the psaltery for Your truth, my God; I will sing with the harp to You, O Holy One of Israel',
    reference: 'Psalms 71:22'
  },
  'ג_ם': {
    verse: 'גְּדֹלִים מַעֲשֵׂי יְיָ דְּרוּשִׁים לְכָל חֶפְצֵיהֶם',
    translation: 'The works of the Lord are great, studied by all who have pleasure in them',
    reference: 'Psalms 111:2'
  },
  'ג_ן': {
    verse: 'גַּם בְּנֵי אָדָם גַּם בְּנֵי אִישׁ יַחַד עָשִׁיר וְאֶבְיוֹן',
    translation: 'Both low and high, rich and poor together',
    reference: 'Psalms 49:3'
  },

  // Names starting with Dalet
  'ד_ב': {
    verse: 'דִּרְשׁוּ יְיָ בְּהִמָּצְאוֹ קְרָאֻהוּ בִּהְיוֹתוֹ קָרוֹב',
    translation: 'Seek the Lord while He may be found, call upon Him while He is near',
    reference: 'Isaiah 55:6'
  },
  'ד_ד': {
    verse: 'דִּרְשׁוּ יְיָ וְעֻזּוֹ בַּקְּשׁוּ פָנָיו תָּמִיד',
    translation: 'Seek the Lord and His strength; seek His face evermore',
    reference: 'Psalms 105:4'
  },
  'ד_ה': {
    verse: 'דְּאָגָה בְלֶב אִישׁ יַשְׁחֶנָּה וְדָבָר טוֹב יְשַׂמְּחֶנָּה',
    translation: 'Anxiety in the heart of man causes depression, but a good word makes it glad',
    reference: 'Proverbs 12:25'
  },
  'ד_ל': {
    verse: 'דָּן יָדִין עַמּוֹ כְּאַחַד שִׁבְטֵי יִשְׂרָאֵל',
    translation: 'Dan shall judge his people as one of the tribes of Israel',
    reference: 'Genesis 49:16'
  },
  'ד_ם': {
    verse: 'דְּרָכֶיהָ דַרְכֵי נֹעַם וְכָל נְתִיבוֹתֶיהָ שָׁלוֹם',
    translation: 'Her ways are ways of pleasantness, and all her paths are peace',
    reference: 'Proverbs 3:17'
  },
  'ד_ן': {
    verse: 'דַּבֵּר אֶל בְּנֵי יִשְׂרָאֵל וְאָמַרְתָּ אֲלֵהֶם כִּי אַתֶּם עֹבְרִים אֶת הַיַּרְדֵּן אֶל אֶרֶץ כְּנָעַן',
    translation: 'Speak to the children of Israel, and say to them: When you cross the Jordan into the land of Canaan',
    reference: 'Numbers 33:51'
  },

  // Names starting with Heh
  'ה_א': {
    verse: 'הַצּוּר תָּמִים פָּעֳלוֹ כִּי כָל דְּרָכָיו מִשְׁפָּט אֵל אֱמוּנָה וְאֵין עָוֶל צַדִּיק וְיָשָׁר הוּא',
    translation: 'The Rock! His work is perfect, for all His ways are justice; a God of faithfulness and without iniquity, righteous and upright is He',
    reference: 'Deuteronomy 32:4'
  },
  'ה_ה': {
    verse: 'הָפַכְתָּ מִסְפְּדִי לְמָחוֹל לִי פִּתַּחְתָּ שַׂקִּי וַתְּאַזְּרֵנִי שִׂמְחָה',
    translation: 'You have turned for me my mourning into dancing; You have put off my sackcloth and clothed me with gladness',
    reference: 'Psalms 30:12'
  },
  'ה_ל': {
    verse: 'הַקְשִׁיבָה לְקוֹל שַׁוְעִי מַלְכִּי וֵאלֹהָי כִּי אֵלֶיךָ אֶתְפַּלָּל',
    translation: 'Give heed to the voice of my cry, my King and my God, for to You I will pray',
    reference: 'Psalms 5:3'
  },

  // Names starting with Vav
  'ו_ל': {
    verse: 'וְאַתָּה קָדוֹשׁ יוֹשֵׁב תְּהִלּוֹת יִשְׂרָאֵל',
    translation: 'But You are holy, enthroned in the praises of Israel',
    reference: 'Psalms 22:4'
  },

  // Names starting with Zayin  
  'ז_ב': {
    verse: 'זֵכֶר צַדִּיק לִבְרָכָה וְשֵׁם רְשָׁעִים יִרְקָב',
    translation: 'The memory of the righteous is blessed, but the name of the wicked will rot',
    reference: 'Proverbs 10:7'
  },
  'ז_ה': {
    verse: 'זֹאת מְנוּחָתִי עֲדֵי עַד פֹּה אֵשֵׁב כִּי אִוִּתִיהָ',
    translation: 'This is My resting place forever; here I will dwell, for I have desired it',
    reference: 'Psalms 132:14'
  },

  // Names starting with Chet
  'ח_א': {
    verse: 'חִדְלוּ לָכֶם מִן הָאָדָם אֲשֶׁר נְשָׁמָה בְּאַפּוֹ כִּי בַמֶּה נֶחְשָׁב הוּא',
    translation: 'Cease from man, whose breath is in his nostrils; for of what account is he?',
    reference: 'Isaiah 2:22'
  },
  'ח_ה': {
    verse: 'חַרְבָּם תָּבוֹא בְלִבָּם וְקַשְּׁתוֹתָם תִּשָּׁבַרְנָה',
    translation: 'Their sword shall enter their own heart, and their bows shall be broken',
    reference: 'Psalms 37:15'
  },
  'ח_ם': {
    verse: 'חֹנֶה מַלְאַךְ יְיָ סָבִיב לִירֵאָיו וַיְחַלְּצֵם',
    translation: 'The angel of the Lord encamps all around those who fear Him, and delivers them',
    reference: 'Psalms 34:8'
  },

  // Names starting with Tet
  'ט_א': {
    verse: 'טוֹב יַנְחִיל בְּנֵי בָנִים וְצָפוּן לַצַּדִּיק חֵיל חוֹטֵא',
    translation: 'A good man leaves an inheritance to his children\'s children, but the wealth of the sinner is stored up for the righteous',
    reference: 'Proverbs 13:22'
  },

  // Names starting with Yod
  'י_ה': {
    verse: 'יְיָ צִדְקָתְךָ כְּהַרְרֵי אֵל מִשְׁפָּטֶיךָ תְּהוֹם רַבָּה',
    translation: 'Your righteousness is like the great mountains; Your judgments are a great deep',
    reference: 'Psalms 36:7'
  },
  'י_ם': {
    verse: 'יְיָ מֶלֶךְ עוֹלָם וָעֶד אָבְדוּ גוֹיִם מֵאַרְצוֹ',
    translation: 'The Lord is King forever and ever; the nations have perished out of His land',
    reference: 'Psalms 10:16'
  },
  'י_ן': {
    verse: 'יוֹשֵׁב בְּסֵתֶר עֶלְיוֹן בְּצֵל שַׁדַּי יִתְלוֹנָן',
    translation: 'He who dwells in the secret place of the Most High shall abide under the shadow of the Almighty',
    reference: 'Psalms 91:1'
  },
  'י_ף': {
    verse: 'יְיָ יִשְׁמָרְךָ מִכָּל רָע יִשְׁמֹר אֶת נַפְשֶׁךָ',
    translation: 'The Lord shall preserve you from all evil; He shall preserve your soul',
    reference: 'Psalms 121:7'
  },

  // Names starting with Kaf
  'כ_ב': {
    verse: 'כִּי לֹא יִטֹּשׁ יְיָ עַמּוֹ וְנַחֲלָתוֹ לֹא יַעֲזֹב',
    translation: 'For the Lord will not forsake His people, nor will He abandon His inheritance',
    reference: 'Psalms 94:14'
  },
  'כ_ל': {
    verse: 'כִּי מֶלֶךְ כָּל הָאָרֶץ אֱלֹהִים זַמְּרוּ מַשְׂכִּיל',
    translation: 'For God is the King of all the earth; sing praises with understanding',
    reference: 'Psalms 47:8'
  },

  // Names starting with Lamed
  'ל_א': {
    verse: 'לְדָוִד אֵלֶיךָ יְיָ נַפְשִׁי אֶשָּׂא',
    translation: 'A Psalm of David. To You, O Lord, I lift up my soul',
    reference: 'Psalms 25:1'
  },
  'ל_ה': {
    verse: 'לַיְיָ הַיְשׁוּעָה עַל עַמְּךָ בִרְכָתֶךָ סֶּלָה',
    translation: 'Salvation belongs to the Lord. Your blessing is upon Your people. Selah',
    reference: 'Psalms 3:9'
  },

  // Names starting with Mem
  'מ_ה': {
    verse: 'מָה אַדִּיר שִׁמְךָ בְּכָל הָאָרֶץ',
    translation: 'How excellent is Your name in all the earth!',
    reference: 'Psalms 8:9'
  },
  'מ_ם': {
    verse: 'מִזְמוֹר לְתוֹדָה הָרִיעוּ לַיְיָ כָּל הָאָרֶץ',
    translation: 'A Psalm of thanksgiving. Make a joyful shout to the Lord, all you lands!',
    reference: 'Psalms 100:1'
  },
  'מ_ן': {
    verse: 'מִי הָאִישׁ הֶחָפֵץ חַיִּים אֹהֵב יָמִים לִרְאוֹת טוֹב',
    translation: 'Who is the man who desires life, and loves many days, that he may see good?',
    reference: 'Psalms 34:13'
  },
  'מ_ר': {
    verse: 'מִזְמוֹר שִׁיר חֲנֻכַּת הַבַּיִת לְדָוִד',
    translation: 'A Psalm and song at the dedication of the house of David',
    reference: 'Psalms 30:1'
  },

  // Names starting with Nun
  'נ_א': {
    verse: 'נַפְשֵׁנוּ חִכְּתָה לַיְיָ עֶזְרֵנוּ וּמָגִנֵּנוּ הוּא',
    translation: 'Our soul waits for the Lord; He is our help and our shield',
    reference: 'Psalms 33:20'
  },
  'נ_ה': {
    verse: 'נְקִי כַפַּיִם וּבַר לֵבָב אֲשֶׁר לֹא נָשָׂא לַשָּׁוְא נַפְשִׁי וְלֹא נִשְׁבַּע לְמִרְמָה',
    translation: 'He who has clean hands and a pure heart, who has not lifted up his soul to an idol, nor sworn deceitfully',
    reference: 'Psalms 24:4'
  },

  // Names starting with Samech
  'ס_ה': {
    verse: 'סֹבּוּ צִיּוֹן וְהַקִּיפוּהָ סִפְרוּ מִגְדָּלֶיהָ',
    translation: 'Walk about Zion, and go all around her. Count her towers',
    reference: 'Psalms 48:13'
  },

  // Names starting with Ayin
  'ע_א': {
    verse: 'עַתָּה אָקוּם יֹאמַר יְיָ עַתָּה אֵרוֹמָם עַתָּה אֶנָּשֵׂא',
    translation: 'Now I will rise," says the Lord; "Now I will be exalted, Now I will lift Myself up',
    reference: 'Isaiah 33:10'
  },

  // Names starting with Peh
  'פ_ה': {
    verse: 'פִּתְחוּ לִי שַׁעֲרֵי צֶדֶק אָבֹא בָם אוֹדֶה יָהּ',
    translation: 'Open to me the gates of righteousness; I will go through them, and I will praise the Lord',
    reference: 'Psalms 118:19'
  },

  // Names starting with Tzadi
  'צ_ה': {
    verse: 'צִיּוֹן בְּמִשְׁפָּט תִּפָּדֶה וְשָׁבֶיהָ בִּצְדָקָה',
    translation: 'Zion will be redeemed with justice, and her penitents with righteousness',
    reference: 'Isaiah 1:27'
  },

  // Names starting with Qof
  'ק_ל': {
    verse: 'קוֹל רִנָּה וִישׁוּעָה בְּאָהֳלֵי צַדִּיקִים יְמִין יְיָ עֹשָׂה חָיִל',
    translation: 'The voice of rejoicing and salvation is in the tents of the righteous; the right hand of the Lord does valiantly',
    reference: 'Psalms 118:15'
  },

  // Names starting with Resh
  'ר_ה': {
    verse: 'רַבּוֹת רָעוֹת צַדִּיק וּמִכֻּלָּם יַצִּילֶנּוּ יְיָ',
    translation: 'Many are the afflictions of the righteous, but the Lord delivers him out of them all',
    reference: 'Psalms 34:20'
  },

  // Names starting with Shin
  'ש_ה': {
    verse: 'שְׁמַע יִשְׂרָאֵל יְיָ אֱלֹהֵינוּ יְיָ אֶחָד',
    translation: 'Hear, O Israel: The Lord our God, the Lord is one!',
    reference: 'Deuteronomy 6:4'
  },
  'ש_ם': {
    verse: 'שִׁירוּ לַיְיָ שִׁיר חָדָשׁ כִּי נִפְלָאוֹת עָשָׂה',
    translation: 'Sing to the Lord a new song! For He has done marvelous things',
    reference: 'Psalms 98:1'
  },
  'ש_ן': {
    verse: 'שִׂמְחוּ בַיְיָ צַדִּיקִים וְלַיְשָׁרִים נָאוָה תְהִלָּה',
    translation: 'Rejoice in the Lord, O you righteous! For praise from the upright is beautiful',
    reference: 'Psalms 33:1'
  },
  'ש_ר': {
    verse: 'שְׂמַח צַדִּיק בַּיְיָ וְחָסָה בוֹ וְהִתְהַלְלוּ כָּל יִשְׁרֵי לֵב',
    translation: 'Be glad in the Lord and rejoice, you righteous; and shout for joy, all you upright in heart!',
    reference: 'Psalms 32:11'
  },

  // Names starting with Tav
  'ת_ה': {
    verse: 'תַּעֲרֹךְ לְפָנַי שֻׁלְחָן נֶגֶד צֹרְרָי דִּשַּׁנְתָּ בַשֶּׁמֶן רֹאשִׁי כּוֹסִי רְוָיָה',
    translation: 'You prepare a table before me in the presence of my enemies; You anoint my head with oil; my cup runs over',
    reference: 'Psalms 23:5'
  },
  'ת_ם': {
    verse: 'תְּנוּ עֹז לֵאלֹהִים עַל יִשְׂרָאֵל גַּאֲוָתוֹ וְעֻזּוֹ בַּשְּׁחָקִים',
    translation: 'Ascribe strength to God; His excellence is over Israel, and His strength is in the clouds',
    reference: 'Psalms 68:35'
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
