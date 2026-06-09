import { InputForm } from "./components/InputForm";
import { calculateLoads } from "../../../core/rtsEngine";
import type { FormData } from "./schemas/form";
import { useState } from "react";
import ResultsDisplay from "./components/ResultsDisplay";


function App() {

  type LoadResults = ReturnType<typeof calculateLoads>;

  const [result, setResult] = useState<LoadResults | null>(null);

  const handleCalculate = (data: FormData) => {
    const resultado = calculateLoads(data)
    setResult(resultado)
  }

  return (
    <main className="mx-auto grid min-h-screen max-w-7xl grid-cols-1 gap-6 bg-slate-50 p-3 md:grid-cols-[minmax(320px,440px)_minmax(0,1fr)] md:gap-4 md:p-6 lg:gap-6">
      <InputForm onSubmit={handleCalculate} />

      <div className="min-w-0">
        {result && <ResultsDisplay results={result} />}
      </div>
    </main >

  )
}

export default App
