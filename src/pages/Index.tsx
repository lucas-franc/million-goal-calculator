
import React from 'react';
import Calculator from '../components/Calculator';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-primary to-white">
      <header className="py-8 md:py-12 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <span className="inline-block text-p6 font-medium bg-contrast bg-opacity-20 text-contrast px-3 py-1 rounded-full mb-4">Calculadora de Investimentos</span>
          <h1 className="text-h2 md:text-h1 text-text font-light mb-3">Simule o caminho para seu <span className="text-brand">primeiro milhão</span></h1>
          <p className="text-p3 text-text max-w-2xl mx-auto opacity-80">Descubra quanto tempo você levará para atingir 1 milhão de reais com nosso simulador de investimentos.</p>
        </div>
      </header>
      
      <main className="flex-grow px-6 pb-16">
        <div className="max-w-4xl mx-auto">
          <Calculator />
        </div>
      </main>
      
      <footer className="bg-text py-6 text-white text-center">
        <div className="container mx-auto">
          <p className="text-p6">© {new Date().getFullYear()} Calculadora do Primeiro Milhão</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
