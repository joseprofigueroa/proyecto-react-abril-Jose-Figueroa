import React, { useState } from 'react';
import './App.css';
import PokemonSearch from './PokemonSearch';
import PokemonList from './components/PokemonList';
import PokemonFilter from './components/PokemonFilter';
import { PokemonProvider } from './components/context';
import PokemonDetail from './components/PokemonDetail';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('All');

  return (
    <PokemonProvider>
      <div className="AppWrapper">
        <div className="App">
          <div className="SearchFilterWrapper">
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <br/>
              <br/>
              <PokemonSearch onSearch={(searchTerm) => setSearchTerm(searchTerm)} />
              <div style={{ paddingTop: 5 }}>
                <PokemonFilter onFilter={(selectedType) => setSelectedType(selectedType)} />
              </div>
            </div>
          </div>
          <div className="PokemonListWrapper">
            <PokemonList searchTerm={searchTerm} selectedType={selectedType} />
          </div>
          <div className="PokemonDetailWrapper">
            <PokemonDetail />
          </div>
        </div>
      </div>
    </PokemonProvider>
  );
}

export default App;
