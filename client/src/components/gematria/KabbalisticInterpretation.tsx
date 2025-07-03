import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface KabbalisticInterpretationProps {
  letters: Array<{
    letter: string;
    value: number;
  }>;
}

const KABBALISTIC_MEANINGS = {
  'א': {
    name: 'Aleph',
    meaning: 'Represents divinity, fundamental unity, the primal force that drives everything',
    spiritual: 'Air element, spiritual leadership, new beginning',
    zohar: 'The Zohar teaches that Aleph contains the entire Torah within itself. It represents the breath of the Divine (Ruach Elohim) and the silent Aleph in the center connects the upper Yud with the lower Yud, symbolizing the bridge between Heaven and Earth. "From Aleph, all letters emerge" (Zohar Bereishit 2b).',
    sefirah: 'Keter (Crown) - The divine will and infinite light'
  },
  'ב': {
    name: 'Bet',
    meaning: 'The house, blessing, duality, creation and the physical world',
    spiritual: 'Creation, building, structure and foundation, practical wisdom',
    zohar: 'The Zohar reveals that Bet was chosen to begin the Torah because it represents blessing (Bracha). "With Bet, the Holy One created the world" (Zohar Bereishit 15a). The letter has an opening facing forward, symbolizing that creation moves toward the future, while the back is closed to hide the mysteries of what came before.',
    sefirah: 'Chochmah (Wisdom) - The flash of divine inspiration'
  },
  'ג': {
    name: 'Gimel',
    meaning: 'Acts of kindness, giving, movement and development',
    spiritual: 'Spiritual ascent, growth, compassion and generosity',
    zohar: 'According to the Zohar, Gimel represents the rich man running after the poor man (Dalet) to give him charity. "Gimel is the one who bestows kindness upon Dalet" (Zohar Bereishit 2b). It embodies the divine attribute of Chesed (loving-kindness) flowing downward to creation.',
    sefirah: 'Chesed (Loving-kindness) - Divine benevolence and expansion'
  },
  'ד': {
    name: 'Dalet',
    meaning: 'The door, knowledge, four worlds, stability and strong foundation',
    spiritual: 'Practical wisdom, discipline, structure and order',
    zohar: 'The Zohar describes Dalet as the poor person who receives from Gimel. "Dalet is impoverished because she has nothing of her own" (Zohar Bereishit 2b). It represents the Shechina in exile, the divine presence that dwells within the physical world, awaiting redemption and return to unity.',
    sefirah: 'Malchut (Kingdom) - Divine presence in the physical world'
  },
  'ה': {
    name: 'Heh',
    meaning: 'Glory and splendor, divine revelation, the soul and inspiration',
    spiritual: 'Divine breath, creativity, expression and revelation',
    zohar: 'The Zohar teaches that the two Heh letters in the Tetragrammaton (יהוה) represent the divine exhale and inhale, creation and return. "Heh is the breath of life that the Holy One breathed into Adam" (Zohar Bereishit 23a). It symbolizes the divine feminine aspect and the lower Heh represents the physical world receiving divine influx.',
    sefirah: 'Binah (Understanding) - Divine feminine receptivity and comprehension'
  },
  'ו': {
    name: 'Vav',
    meaning: 'Connection, joining, being and repairing the world',
    spiritual: 'Uniting opposing points, bridge between worlds',
    zohar: 'The Zohar reveals Vav as the pillar that connects heaven and earth. "Vav is the righteous one who connects all the worlds" (Zohar Bereishit 1b). It represents Zeir Anpin (the Small Face), the central column of the sefirot that balances divine judgment and mercy, and channels divine energy to the lower worlds.',
    sefirah: 'Tiferet (Beauty/Harmony) - Balance between mercy and judgment'
  },
  'ז': {
    name: 'Zayin',
    meaning: 'Spiritual weapon, memory, time and merit',
    spiritual: 'Spiritual struggle, remembrance and holy memory',
    zohar: 'The Zohar describes Zayin as the weapon of the righteous in their spiritual battles. "Zayin is the sword of the Holy One that protects the righteous" (Zohar Bereishit 2b). It represents the power to cut through illusion and reveal divine truth, as well as the crown (Zeter) that adorns the Hebrew letters.',
    sefirah: 'Netzach (Victory/Eternity) - Divine persistence and endurance'
  },
  'ח': {
    name: 'Chet',
    meaning: 'Life, grace and wisdom, kindness and compassion',
    spiritual: 'Life force, spiritual boundaries, protection',
    zohar: 'The Zohar connects Chet to Chaim (life) and Chen (grace). "From Chet flows the river of life that nourishes all creation" (Zohar Bereishit 16a). It represents the divine life force that animates all existence and the protective barriers that separate holy from profane.',
    sefirah: 'Hod (Glory/Splendor) - Divine majesty and acknowledgment'
  },
  'ט': {
    name: 'Tet',
    meaning: 'Good, purity, hidden treasure and secret',
    spiritual: 'Interiority, concealment and revelation, hidden good',
    zohar: 'The Zohar teaches that Tet represents the hidden good within apparent evil. "Tet is the serpent that becomes the staff of Moses" (Zohar Shemot 3a). It symbolizes the divine sparks concealed within the husks of materiality, waiting to be elevated and redeemed through spiritual practice.',
    sefirah: 'Yesod (Foundation) - The channel through which divine energy flows to our world'
  },
  'י': {
    name: 'Yod',
    meaning: 'The divine hand, starting point of everything, spiritual seed',
    spiritual: 'Creative power, infinite potential, divine spark',
    zohar: 'The Zohar reveals Yod as the primordial point from which all creation emerges. "Yod is the seed of all letters, containing everything in potential" (Zohar Bereishit 1a). It represents the divine hand that shapes reality and the initial contraction (Tzimtzum) that allows for the existence of finite worlds within the infinite.',
    sefirah: 'Chochmah (Wisdom) - The initial flash of divine insight'
  },
  'כ': {
    name: 'Kaf',
    meaning: 'Crown, honor, power and spiritual covering',
    spiritual: 'Supreme crown, kingdom and divine glory',
    zohar: 'The Zohar describes Kaf as the palm of the divine hand that holds and protects creation. "Kaf is the crown that adorns the King of Kings" (Zohar Bereishit 2b). In its bent form, it represents humility before the divine, while in its final form (ך) it stands straight, symbolizing the ultimate rectification.',
    sefirah: 'Keter (Crown) - The divine will that transcends understanding'
  },
  'ך': {
    name: 'Kaf (final)',
    meaning: 'Crown, honor, power and spiritual covering',
    spiritual: 'Supreme crown, kingdom and divine glory',
    zohar: 'The final Kaf represents the completion of divine justice and the ultimate rectification. "When Kaf stands straight at the end, it proclaims the final redemption" (Zohar Vayikra 5a).',
    sefirah: 'Keter (Crown) - Divine will in its completed state'
  },
  'ל': {
    name: 'Lamed',
    meaning: 'Learning, heart and tongue, tower reaching upward',
    spiritual: 'Spiritual ascent, learning and Torah, connection of heart and mind',
    zohar: 'The Zohar teaches that Lamed is the tower that rises above all other letters, symbolizing the study of Torah that elevates the soul. "Lamed is the heart of the wise that seeks to ascend to the throne of glory" (Zohar Bereishit 2b). It represents the aspiration of the human heart to connect with divine wisdom.',
    sefirah: 'Tiferet (Beauty) - The harmony achieved through study and understanding'
  },
  'מ': {
    name: 'Mem',
    meaning: 'Water, source of life, mother and the best',
    spiritual: 'Flow of spiritual abundance, hidden wisdom',
    zohar: 'The Zohar reveals Mem as the womb of creation from which all life emerges. "Mem is the water above and the water below, containing the mystery of life" (Zohar Bereishit 16b). It represents the divine mother who nurtures all existence and the hidden wisdom (Chochmah Nistarah) that flows like water.',
    sefirah: 'Binah (Understanding) - The divine mother who gives birth to all knowledge'
  },
  'ם': {
    name: 'Mem (final)',
    meaning: 'Water, source of life, mother and the best',
    spiritual: 'Flow of spiritual abundance, hidden wisdom',
    zohar: 'The closed Mem represents the hidden wellsprings of wisdom that will be revealed in the messianic era. "The final Mem contains the waters of the World to Come" (Zohar Bereishit 16b).',
    sefirah: 'Binah (Understanding) - Hidden wisdom awaiting revelation'
  },
  'נ': {
    name: 'Nun',
    meaning: 'Soul, prophecy, fish and spiritual abundance',
    spiritual: 'Faith, prophecy and soul, deep life',
    zohar: 'The Zohar describes Nun as the fish swimming in the waters of wisdom. "Nun is the faithful soul that swims in the sea of divine knowledge" (Zohar Bereishit 2b). It represents the spark of prophecy within every Jewish soul and the 50 gates of understanding (Nun equals 50).',
    sefirah: 'Netzach (Victory) - The enduring quality of the divine soul'
  },
  'ן': {
    name: 'Nun (final)',
    meaning: 'Soul, prophecy, fish and spiritual abundance',
    spiritual: 'Faith, prophecy and soul, deep life',
    zohar: 'The final Nun extends below the line, representing the soul\'s descent into the physical world to elevate it. "The bent Nun is the tzaddik who descends to lift up the fallen sparks" (Zohar Vayikra 15a).',
    sefirah: 'Netzach (Victory) - Persistent effort in spiritual elevation'
  },
  'ס': {
    name: 'Samech',
    meaning: 'Support, aid and assistance, circle and protection',
    spiritual: 'Divine protection, heavenly assistance',
    zohar: 'The Zohar teaches that Samech is the divine support that holds up those who fall. "Samech is the hand of the Holy One that supports all who stumble" (Zohar Bereishit 2b). Its circular shape represents the divine providence that surrounds and protects creation from all sides.',
    sefirah: 'Yesod (Foundation) - The divine support that maintains all existence'
  },
  'ע': {
    name: 'Ayin',
    meaning: 'Eye, spiritual sight, depth and understanding',
    spiritual: 'Eye of divine providence, deep wisdom',
    zohar: 'The Zohar reveals Ayin as the divine eye that sees all and the spring (Ayin) from which all knowledge flows. "Ayin is the eye of the Holy One that never sleeps nor slumbers" (Zohar Bereishit 1b). It represents the 70 (Ayin equals 70) faces of Torah and the depth of divine understanding.',
    sefirah: 'Chochmah (Wisdom) - The divine eye that perceives all reality'
  },
  'פ': {
    name: 'Peh',
    meaning: 'Mouth, speech and prayer, opening and expression',
    spiritual: 'Power of holy speech, prayer and request',
    zohar: 'The Zohar describes Peh as the mouth of the divine that spoke creation into existence. "From the mouth of the Holy One emerged the 10 utterances that created the world" (Zohar Bereishit 15a). It represents the power of holy speech to create and transform reality.',
    sefirah: 'Malchut (Kingdom) - Divine speech manifesting in the physical world'
  },
  'ף': {
    name: 'Peh (final)',
    meaning: 'Mouth, speech and prayer, opening and expression',
    spiritual: 'Power of holy speech, prayer and request',
    zohar: 'The final Peh extends downward, representing the divine word descending to elevate the physical world. "The bent Peh is the mouth that speaks words of redemption" (Zohar Shemot 4a).',
    sefirah: 'Malchut (Kingdom) - Divine speech transforming the lower worlds'
  },
  'צ': {
    name: 'Tzadik',
    meaning: 'Righteous one, justice and modesty, fisher of souls',
    spiritual: 'Righteousness, holiness and repairing the world',
    zohar: 'The Zohar teaches that Tzadik represents the righteous person who is the foundation of the world. "The tzaddik is the pillar upon which the world stands" (Zohar Bereishit 59b). It embodies the divine quality of justice tempered with mercy and the soul\'s mission to elevate the physical world.',
    sefirah: 'Yesod (Foundation) - The righteous one who channels divine energy'
  },
  'ץ': {
    name: 'Tzadik (final)',
    meaning: 'Righteous one, justice and modesty, fisher of souls',
    spiritual: 'Righteousness, holiness and repairing the world',
    zohar: 'The final Tzadik extends below, representing the hidden tzaddikim who work in concealment to elevate the world. "The bent Tzadik is the hidden saint who redeems the sparks from the depths" (Zohar Vayikra 27a).',
    sefirah: 'Yesod (Foundation) - Hidden righteousness working for redemption'
  },
  'ק': {
    name: 'Qof',
    meaning: 'Holiness, calling and closeness to God',
    spiritual: 'Supreme holiness, drawing close to the Creator',
    zohar: 'The Zohar reveals Qof as the call of holiness that awakens the soul. "Qof is the voice calling from the depths: Return, O children, to your Father" (Zohar Bereishit 2b). It represents the 100 (Qof equals 100) blessings recited daily and the divine call to teshuvah (repentance).',
    sefirah: 'Keter (Crown) - The holy call from the highest divine level'
  },
  'ר': {
    name: 'Resh',
    meaning: 'Head, beginning and poverty, spiritual wealth',
    spiritual: 'New beginning, spiritual leadership',
    zohar: 'The Zohar describes Resh as the head that can be either lifted up in righteousness or bowed down in shame. "Resh is the choice between good and evil, between raising the head in holiness or bowing it in transgression" (Zohar Bereishit 2b). It represents leadership and the responsibility that comes with wisdom.',
    sefirah: 'Chochmah (Wisdom) - Divine wisdom that leads and guides'
  },
  'ש': {
    name: 'Shin',
    meaning: 'The holy name, spiritual fire and peace',
    spiritual: 'Fire of holiness, power of transformation',
    zohar: 'The Zohar teaches that Shin is the divine fire that both destroys and purifies. "Shin is the flame of the Holy One that consumes evil and illuminates good" (Zohar Bereishit 50a). Its three heads represent the three patriarchs and the three-fold divine light that illuminates all worlds.',
    sefirah: 'Binah (Understanding) - The divine fire of comprehension'
  },
  'ת': {
    name: 'Tav',
    meaning: 'Torah, perfect and complete, end and seal',
    spiritual: 'Completion, absolute truth, seal of God',
    zohar: 'The Zohar reveals Tav as the seal of divine truth that marks the righteous for salvation. "Tav is the sign of life marked upon the foreheads of those who fear sin" (Zohar Bereishit 2b). It represents the completion of the aleph-bet and the ultimate destiny of creation returning to its divine source.',
    sefirah: 'Malchut (Kingdom) - The completion of divine manifestation in creation'
  }
};

export function KabbalisticInterpretation({ letters }: KabbalisticInterpretationProps) {
  if (letters.length === 0) return null;

  const uniqueLetters = letters.reduce((acc, curr) => {
    if (!acc.some(item => item.letter === curr.letter)) {
      acc.push(curr);
    }
    return acc;
  }, [] as Array<{letter: string; value: number}>);

  return (
    <Card className="gematria-result-card">
      <CardHeader>
        <CardTitle className="text-primary">Kabbalistic & Zoharic Letter Interpretations</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {uniqueLetters.map((item, index) => {
            const interpretation = KABBALISTIC_MEANINGS[item.letter as keyof typeof KABBALISTIC_MEANINGS];
            if (!interpretation) return null;

            return (
              <div key={index} className="border border-accent/30 rounded-lg p-4 bg-accent/5">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-3xl font-bold text-primary" style={{ fontFamily: 'Georgia, serif' }}>
                    {item.letter}
                  </div>
                  <div className="text-lg font-semibold text-primary">
                    {interpretation.name} ({item.value})
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <span className="font-semibold text-primary">Basic Meaning: </span>
                    <span className="text-foreground">{interpretation.meaning}</span>
                  </div>
                  
                  <div>
                    <span className="font-semibold text-primary">Spiritual Aspect: </span>
                    <span className="text-foreground">{interpretation.spiritual}</span>
                  </div>

                  <div className="bg-primary/10 p-3 rounded-lg">
                    <span className="font-semibold text-primary">Zohar Teaching: </span>
                    <span className="text-foreground text-sm italic">{interpretation.zohar}</span>
                  </div>

                  <div>
                    <span className="font-semibold text-primary">Sefirah Connection: </span>
                    <span className="text-foreground">{interpretation.sefirah}</span>
                  </div>
                </div>
              </div>
            );
          })}
          
          <div className="mt-6 p-4 bg-primary/10 rounded-lg">
            <p className="text-sm text-primary/80 text-center">
              🔮 Each Hebrew letter carries profound mystical meanings from the Zohar and Kabbalistic tradition, revealing the divine blueprint encoded within every word
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
