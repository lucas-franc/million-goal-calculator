
import React from 'react';
import Calculator from '../components/Calculator';
import { PiggyBank, TrendingUp, Clock } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-primary to-white">
      <header className="py-12 md:py-20 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <span className="inline-block text-p6 font-medium bg-gradient-to-r from-contrast to-contrast/70 text-white px-4 py-2 rounded-full mb-6 shadow-sm transform hover:scale-105 transition-all duration-300">
            Calculadora de Investimentos
          </span>
          
          <h1 className="text-h2 md:text-h1 font-light mb-6 animate-fadeIn">
            Simule o caminho para seu{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand via-contrast to-brand animate-pulse">
              primeiro milhão
            </span>
          </h1>
          
          <p className="text-p3 max-w-2xl mx-auto opacity-90 mb-8 animate-slideUp">
            Descubra quanto tempo você levará para atingir 1 milhão de reais com nosso simulador de investimentos.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-12 h-12 bg-primary/50 rounded-full flex items-center justify-center mx-auto mb-4">
                <PiggyBank className="h-6 w-6 text-brand" />
              </div>
              <h3 className="text-h5 mb-2">Planeje seus investimentos</h3>
              <p className="text-p5 text-text/70">Simule diferentes cenários e descubra a melhor estratégia.</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-12 h-12 bg-primary/50 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-6 w-6 text-brand" />
              </div>
              <h3 className="text-h5 mb-2">Visualize seu crescimento</h3>
              <p className="text-p5 text-text/70">Acompanhe graficamente a evolução do seu patrimônio ao longo do tempo.</p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div className="w-12 h-12 bg-primary/50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-6 w-6 text-brand" />
              </div>
              <h3 className="text-h5 mb-2">Conquiste mais rápido</h3>
              <p className="text-p5 text-text/70">Descubra como pequenos ajustes podem encurtar significativamente seu caminho.</p>
            </div>
          </div>
        </div>
      </header>
      
      <main className="flex-grow px-6 pb-16">
        <div className="max-w-4xl mx-auto">
          <Calculator />
        </div>
      </main>
      
      <footer className="bg-text py-8 text-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-p5 mb-4 md:mb-0">© {new Date().getFullYear()} Calculadora do Primeiro Milhão</p>
            <div className="flex space-x-4">
              <a href="#" className="text-white/80 hover:text-white transition-colors duration-300">Termos de Uso</a>
              <a href="#" className="text-white/80 hover:text-white transition-colors duration-300">Privacidade</a>
              <a href="#" className="text-white/80 hover:text-white transition-colors duration-300">Contato</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
