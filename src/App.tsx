import Calculator from './components/Calculator'

function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
          Profit Margin Calculator
        </h1>
        <p className="mt-4 text-xl text-gray-500 max-w-2xl mx-auto">
          Evaluate your product pricing strategy instantly with real-time profit analysis.
        </p>
      </header>
      
      <main className="w-full max-w-4xl">
        <Calculator />
      </main>
      
      <footer className="mt-16 text-gray-400 text-sm">
        &copy; {new Date().getFullYear()} Profit Calculator. All rights reserved.
      </footer>
    </div>
  )
}

export default App
