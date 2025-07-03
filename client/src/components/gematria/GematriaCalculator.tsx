import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { useGematria } from '@/hooks/useGematria';
import { GematriaResult } from './GematriaResult';
import { LetterBreakdown } from './LetterBreakdown';
import { NameMeaning } from './NameMeaning';
import { BiblicalMatches } from './BiblicalMatches';
import { BiblicalVerses } from './BiblicalVerses';
import { PrayerVerses } from './PrayerVerses';
import { KabbalisticInterpretation } from './KabbalisticInterpretation';
import { FullNamesList } from './FullNamesList';

export function GematriaCalculator() {
  const [text, setText] = React.useState('');
  const [method, setMethod] = React.useState('standard');
  const [logoError, setLogoError] = React.useState(false);
  const [showFullList, setShowFullList] = React.useState(false);
  const { calculateGematria, isHebrewText } = useGematria();

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleMethodChange = (value: string) => {
    setMethod(value);
  };

  const handleLogoError = () => {
    setLogoError(true);
  };

  const toggleFullList = () => {
    setShowFullList(!showFullList);
  };

  const result = text ? calculateGematria(text, method) : null;

  return (
    <div className="gematria-container">
      <div className="text-center mb-6">
        {!logoError ? (
          <img 
            src="/mysticminded-logo.png" 
            alt="Mystic Minded Logo" 
            className="gematria-logo"
            onError={handleLogoError}
          />
        ) : (
          <div className="gematria-logo flex items-center justify-center bg-primary/10 border-2 border-dashed border-primary/30 rounded-lg">
            <div className="text-center p-4">
              <div className="text-2xl font-bold text-primary mb-2">🔮</div>
              <div className="text-sm text-primary font-semibold">Mystic Minded</div>
              <div className="text-xs text-muted-foreground">Logo placeholder</div>
            </div>
          </div>
        )}
        <h1 className="text-4xl font-bold mb-2">Gematria Calculator</h1>
        <p className="text-muted-foreground">Calculate numerical values of Hebrew text</p>
        
        <div className="mt-4">
          <Button 
            onClick={toggleFullList}
            variant={showFullList ? "secondary" : "outline"}
            className="gematria-button"
          >
            {showFullList ? "Hide Names Database" : "View All Hebrew Names"}
          </Button>
        </div>
      </div>

      {showFullList ? (
        <FullNamesList />
      ) : (
        <>
          <Card className="gematria-card mb-6">
            <CardHeader>
              <CardTitle>Input</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="text" className="font-bold text-lg">Hebrew Name</Label>
                <Input
                  id="text"
                  value={text}
                  onChange={handleTextChange}
                  placeholder="Enter Hebrew text..."
                  className="gematria-input text-right text-lg"
                  dir="rtl"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="method" className="font-bold text-lg">Calculation Method</Label>
                <Select value={method} onValueChange={handleMethodChange}>
                  <SelectTrigger className="gematria-input">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="standard">Standard (Rishon)</SelectItem>
                    <SelectItem value="ordinal">Ordinal (Seder)</SelectItem>
                    <SelectItem value="reduced">Reduced (Katan)</SelectItem>
                    <SelectItem value="integral">Integral Reduced</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {result && (
            <div className="space-y-6">
              <GematriaResult result={result} method={method} />
              <LetterBreakdown letters={result.letters} />
              <NameMeaning text={text} />
              <PrayerVerses text={text} />
              <BiblicalVerses text={text} gematriaValue={result.total} />
              <BiblicalMatches gematriaValue={result.total} />
              <KabbalisticInterpretation letters={result.letters} />
            </div>
          )}

          {text && !isHebrewText(text) && (
            <Card className="gematria-card border-yellow-500 bg-yellow-50 mt-6">
              <CardContent className="pt-6">
                <p className="text-yellow-800">
                  ⚠️ The entered text contains non-Hebrew characters. Only Hebrew letters will be calculated.
                </p>
              </CardContent>
            </Card>
          )}
        </>
      )}
    </div>
  );
}
