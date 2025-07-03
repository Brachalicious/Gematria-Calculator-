import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface LetterBreakdownProps {
  letters: Array<{
    letter: string;
    value: number;
  }>;
}

export function LetterBreakdown({ letters }: LetterBreakdownProps) {
  if (letters.length === 0) return null;

  return (
    <Card className="gematria-result-card">
      <CardHeader>
        <CardTitle className="text-primary">פירוט אותיות</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-right font-bold text-lg">אות</TableHead>
              <TableHead className="text-right font-bold text-lg">ערך</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {letters.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="text-right text-2xl" style={{ fontFamily: 'Georgia, serif' }}>
                  {item.letter}
                </TableCell>
                <TableCell className="text-right text-lg font-semibold">
                  {item.value}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="mt-6 pt-4 border-t-2 border-accent">
          <div className="flex justify-between items-center text-xl font-bold text-primary">
            <span>סכום כולל:</span>
            <span style={{ fontFamily: 'Georgia, serif' }}>{letters.reduce((sum, item) => sum + item.value, 0)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}