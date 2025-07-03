import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface GematriaResultProps {
  result: {
    total: number;
    letters: Array<{
      letter: string;
      value: number;
    }>;
  };
  method: string;
}

export function GematriaResult({ result, method }: GematriaResultProps) {
  const getMethodName = (method: string) => {
    switch (method) {
      case 'standard': return 'רגילה (ראשון)';
      case 'ordinal': return 'סדרית (סדר)';
      case 'reduced': return 'מצומצמת (קטן)';
      case 'integral': return 'אינטגרלית מצומצמת';
      default: return method;
    }
  };

  return (
    <Card className="gematria-result-card mb-6">
      <CardHeader>
        <CardTitle className="text-primary">תוצאה - {getMethodName(method)}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center">
          <div className="text-6xl font-bold text-primary mb-4" style={{ fontFamily: 'Georgia, serif' }}>
            {result.total}
          </div>
          <p className="text-lg text-primary font-semibold">ערך גימטריה כולל</p>
        </div>
      </CardContent>
    </Card>
  );
}