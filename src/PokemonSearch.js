import React, { useState, useContext } from 'react';
import { PokemonContext } from './components/context';
import axios from 'axios';
import './components/pokemonSearch.css';

function PokemonSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [errorMsg, setErrorMsg] = useState(null);
  const { onPokemonSelect } = useContext(PokemonContext);
  const [showPopup, setShowPopup] = useState(false);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${searchTerm.toLowerCase()}`);
      const pokemon = {
        name: response.data.name,
        type: response.data.types.map((t) => t.type.name).join(', '),
        id: response.data.id,
        image: response.data.sprites.front_default,
      };
      onPokemonSelect(pokemon);
      setSearchTerm('');
      setErrorMsg(null);
    } catch (error) {
      console.error(error);
      setErrorMsg('Pokémon no existe');
      setShowPopup(true);
    }
  };

  const handleKeyUp = (event) => {
    if (event.keyCode === 13) {
      handleSearch();
    }
  };

  const handleRetry = () => {
    setShowPopup(false);
    window.location.reload();
  };

  return (
    <div className="search">
      <input
        type="text"
        placeholder="Búsca tu Pokémon"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyUp={handleKeyUp}
      />
      <button onClick={handleSearch}>Buscar</button>
      {showPopup && (
        <div className="overlay">
          <div className="popup">
            <div className="popup-content">
              <h2>{errorMsg}</h2>
              <button onClick={handleRetry}>Intentar de nuevo</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PokemonSearch;
