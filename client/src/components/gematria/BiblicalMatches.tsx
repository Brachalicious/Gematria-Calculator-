import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface BiblicalMatchesProps {
  gematriaValue: number;
}

const BIBLICAL_PHRASES = {
  26: ["יהוה (YHVH)", "הויה (Being)", "אחד (One)"],
  86: ["אלהים (Elohim)", "הטבע (Nature)", "פה (Mouth)"],
  87: ["לבנה (Moon)", "אליהו (Elijah)"],
  112: ["יהוה אלהים (YHVH Elohim)"],
  150: ["קדוש (Holy)", "נצח (Eternity)"],
  181: ["אלף (Aleph)", "פקד (Remember)"],
  200: ["צדיק (Righteous)", "ריש (Head)"],
  242: ["אמר (Said)", "גבריאל (Gabriel)"],
  300: ["רוח אלהים (Spirit of God)", "שין (Shin)"],
  358: ["משיח (Messiah)", "נחש (Serpent)"],
  400: ["שמות (Names)", "תאו (Tav)"],
  541: ["ישראל (Israel)", "ראשית (Beginning)"],
  777: ["שמע ישראל (Hear O Israel)"],
  888: ["יהושע (Jesus/Yeshua)"],
  913: ["בראשית (In the beginning)"],
  1000: ["אלף (Thousand)", "ברית (Covenant)"]
};

export function BiblicalMatches({ gematriaValue }: BiblicalMatchesProps) {
  const matches = BIBLICAL_PHRASES[gematriaValue as keyof typeof BIBLICAL_PHRASES];
  
  if (!matches || matches.length === 0) {
    return (
      <Card className="gematria-result-card">
        <CardHeader>
          <CardTitle className="text-primary">התאמות מקראיות</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground">
            לא נמצאו ביטויים מקראיים מוכרים עם ערך גימטריה זה ({gematriaValue})
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="gematria-result-card">
      <CardHeader>
        <CardTitle className="text-primary">התאמות מקראיות</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-lg font-semibold text-center mb-4">
            ביטויים מקראיים עם ערך גימטריה {gematriaValue}:
          </p>
          <div className="grid gap-3">
            {matches.map((phrase, index) => (
              <div key={index} className="bg-accent/10 p-3 rounded-lg border border-accent/30">
                <div className="text-xl font-bold text-center text-primary" style={{ fontFamily: 'Georgia, serif' }}>
                  {phrase}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 p-3 bg-primary/10 rounded-lg">
            <p className="text-sm text-primary/80 text-center">
              💡 התאמות גימטריה מצביעות על קשרים עמוקים בין מילים ומושגים בתורה
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
