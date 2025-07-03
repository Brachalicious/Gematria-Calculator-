import * as React from 'react';
import { GematriaCalculator } from '@/components/gematria/GematriaCalculator';

function App() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <GematriaCalculator />
      </div>
    </div>
  );
}

export default App;