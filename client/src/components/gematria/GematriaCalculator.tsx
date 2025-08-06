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
import { HebrewKeyboard } from './HebrewKeyboard';
import { EnhancedNameMeaning } from './EnhancedNameMeaning';
import { BiblicalNotes } from './BiblicalNotes';
import { MeaningfulNotes } from './MeaningfulNotes';
import { TikkunOlam } from './TikkunOlam';

export function GematriaCalculator() {
  const [names, setNames] = React.useState<string[]>(['', '', '', '', '']);
  const [method, setMethod] = React.useState('standard');
  const [logoError, setLogoError] = React.useState(false);
  const [showFullList, setShowFullList] = React.useState(false);
  const [keyboardOpen, setKeyboardOpen] = React.useState(false);
  const [activeInput, setActiveInput] = React.useState<number>(0);
  const { calculateGematria, isHebrewText } = useGematria();

  const handleNameChange = (index: number, value: string) => {
    const newNames = [...names];
    newNames[index] = value;
    setNames(newNames);
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

  const openKeyboard = (inputIndex: number) => {
    setActiveInput(inputIndex);
    setKeyboardOpen(true);
  };

  const handleKeyPress = (key: string) => {
    const newNames = [...names];
    newNames[activeInput] = newNames[activeInput] + key;
    setNames(newNames);
  };

  const handleBackspace = () => {
    const newNames = [...names];
    newNames[activeInput] = newNames[activeInput].slice(0, -1);
    setNames(newNames);
  };

  const handleClear = () => {
    const newNames = [...names];
    newNames[activeInput] = '';
    setNames(newNames);
  };

  const getActiveNames = () => names.filter(name => name.trim() !== '');
  const activeNames = getActiveNames();
  
  const nameResults = activeNames.map(name => ({
    name,
    result: calculateGematria(name, method)
  }));

  const combinedResult = activeNames.length > 1 ? 
    calculateGematria(activeNames.join(' '), method) : null;

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
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">Calculate Gematria and Meaning of Your Name</h1>
        <p className="text-sm sm:text-base text-primary px-2">Discover the spiritual significance and numerical value of your name</p>
        {/* Force refresh 2025-08-06 */}
        
        <div className="mt-4 flex flex-col sm:flex-row gap-2 sm:gap-4 justify-center items-center">
          <Button 
            onClick={toggleFullList}
            variant={showFullList ? "secondary" : "outline"}
            className="gematria-button w-full sm:w-auto"
          >
            {showFullList ? "Hide Names Database" : "View All Hebrew Names"}
          </Button>
          
          <Button 
            onClick={() => {
              const sampleNames = ['דוד', 'שרה', 'אברהם', 'רחל', 'משה'];
              const newNames = [...names];
              sampleNames.forEach((name, index) => {
                if (index < 5) newNames[index] = name;
              });
              setNames(newNames);
            }}
            variant="outline"
            className="gematria-button w-full sm:w-auto"
          >
            🌟 Try Sample Names
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
              {[0, 1, 2, 3, 4].map((index) => (
                <div key={index} className="space-y-2">
                  <Label htmlFor={`name-${index}`} className="font-bold text-lg">
                    {index === 0 ? 'First' : index === 1 ? 'Second' : index === 2 ? 'Third' : index === 3 ? 'Fourth' : 'Fifth'} Hebrew Name {index > 0 ? '(Optional)' : ''}
                  </Label>
                  <div className="name-input-container">
                    <Input
                      id={`name-${index}`}
                      value={names[index]}
                      onChange={(e) => handleNameChange(index, e.target.value)}
                      placeholder={`Enter ${index === 0 ? 'first' : index === 1 ? 'second' : index === 2 ? 'third' : index === 3 ? 'fourth' : 'fifth'} Hebrew name...`}
                      className="gematria-input text-right text-lg"
                      dir="rtl"
                    />
                    <Button
                      onClick={() => openKeyboard(index)}
                      className="keyboard-toggle-button"
                      type="button"
                    >
                      ⌨️ Hebrew
                    </Button>
                    {names[index] && (
                      <Button
                        onClick={() => handleNameChange(index, '')}
                        className="ml-2 px-2 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                        type="button"
                      >
                        ✕
                      </Button>
                    )}
                  </div>
                </div>
              ))}
              
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
              
              {activeNames.length > 0 && (
                <div className="text-center mt-4">
                  <Button
                    onClick={() => setNames(['', '', '', '', ''])}
                    variant="outline"
                    className="bg-red-500 text-white hover:bg-red-600 border-red-500"
                  >
                    🗑️ Clear All Names
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {activeNames.length > 0 && (
            <div className="names-summary">
              <h3 className="text-xl font-bold">Names Analysis Summary</h3>
              <div className="names-list">
                {activeNames.map((name, index) => (
                  <div key={index} className="name-chip">
                    {name}
                  </div>
                ))}
              </div>
              <p className="text-sm text-purple-700 font-semibold">
                {activeNames.length === 1 ? 
                  'Analyzing one Hebrew name' : 
                  `Analyzing ${activeNames.length} Hebrew names individually and combined`
                }
              </p>
            </div>
          )}

          {nameResults.map((nameResult, index) => (
            <div key={index} className="name-section">
              <h2 className="text-2xl font-bold text-center">
                {index === 0 ? 'First' : index === 1 ? 'Second' : index === 2 ? 'Third' : index === 3 ? 'Fourth' : 'Fifth'} Name: {nameResult.name}
              </h2>
              <div className="space-y-4">
                <GematriaResult result={nameResult.result} method={method} />
                <LetterBreakdown letters={nameResult.result.letters} />
                <NameMeaning text={nameResult.name} />
                <BiblicalNotes text={nameResult.name} />
                <MeaningfulNotes text={nameResult.name} />
                <TikkunOlam text={nameResult.name} gematriaValue={nameResult.result.total} />
                <EnhancedNameMeaning text={nameResult.name} />
                <PrayerVerses text={nameResult.name} />
                <BiblicalVerses text={nameResult.name} gematriaValue={nameResult.result.total} />
                <BiblicalMatches gematriaValue={nameResult.result.total} />
                <KabbalisticInterpretation letters={nameResult.result.letters} />
              </div>
            </div>
          ))}

          {combinedResult && (
            <div className="combined-section">
              <h2 className="text-2xl font-bold text-center">🌟 Combined Names: {activeNames.join(' ')} 🌟</h2>
              <div className="space-y-4">
                <Card className="combined-result-card">
                  <CardHeader>
                    <CardTitle className="text-center">✨ Combined Gematria Result ✨</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <GematriaResult result={combinedResult} method={method} />
                  </CardContent>
                </Card>
                <LetterBreakdown letters={combinedResult.letters} />
                <NameMeaning text={activeNames.join(' ')} />
                <BiblicalNotes text={activeNames.join(' ')} />
                <MeaningfulNotes text={activeNames.join(' ')} />
                <TikkunOlam text={activeNames.join(' ')} gematriaValue={combinedResult.total} />
                <EnhancedNameMeaning text={activeNames.join(' ')} />
                <PrayerVerses text={activeNames.join(' ')} />
                <BiblicalVerses text={activeNames.join(' ')} gematriaValue={combinedResult.total} />
                <BiblicalMatches gematriaValue={combinedResult.total} />
                <KabbalisticInterpretation letters={combinedResult.letters} />
              </div>
            </div>
          )}

          {names.some((name, index) => name && !isHebrewText(name)) && (
            <Card className="gematria-card border-yellow-500 bg-yellow-50 mt-6">
              <CardContent className="pt-6">
                <p className="text-yellow-800">
                  ⚠️ Some names contain non-Hebrew characters. Only Hebrew letters will be calculated.
                </p>
              </CardContent>
            </Card>
          )}

          <HebrewKeyboard
            isOpen={keyboardOpen}
            onClose={() => setKeyboardOpen(false)}
            onKeyPress={handleKeyPress}
            onBackspace={handleBackspace}
            onClear={handleClear}
          />
        </>
      )}
    </div>
  );
}
