import React, { useContext, useState, useEffect } from 'react';
import { PokemonContext } from './context';
import './pokemonDetail.css';

function PokemonDetail() {
  const { pokemonList } = useContext(PokemonContext);
  const [showDialog, setShowDialog] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  const handleCloseDialog = () => {
    setShowDialog(false);
  };

  useEffect(() => {
    async function fetchData() {
      if (pokemonList.length > 0) {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonList[0].name}`);
        const data = await response.json();
        setSelectedPokemon(data);
      }
    }
    fetchData();
  }, [pokemonList]);

  if (pokemonList.length === 0) {
    return <div>Seleccciona un Pokémon para ver detalles</div>;
  }

  return (
    <div style={{ paddingTop: '15px' }}>
      <button onClick={() => setShowDialog(true)}>Ver Detalles</button>
      {showDialog && selectedPokemon && (
        <div className="dialog">
          <div className="dialog-content">
            <button onClick={handleCloseDialog}>Ver lista</button>
            <h2>{selectedPokemon.name}</h2>
            <img
              src={selectedPokemon.sprites.front_default}
              alt={selectedPokemon.name}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://via.placeholder.com/150';
              }}
            />
            <table>
              <thead>
                <tr>
                  <th>Tipo</th>
                  <th>Altura</th>
                  <th>Peso</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{selectedPokemon.types[0].type.name}</td>
                  <td>{selectedPokemon.height}</td>
                  <td>{selectedPokemon.weight}</td>
                </tr>
              </tbody>
            </table>
            <h3>Stadísticas</h3>
            <table>
              <thead>
                <tr>
                  <th>Atributo</th>
                  <th>Valor</th>
                </tr>
              </thead>
              <tbody>
                {selectedPokemon.stats &&
                  selectedPokemon.stats.map((stat) => (
                    <tr key={stat.stat.name}>
                      <td>{stat.stat.name}</td>
                      <td>{stat.base_stat}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <h3>Habilidades</h3>
            <table>
              <thead>
                <tr>
                  <th>Habilidad</th>
                </tr>
              </thead>
              <tbody>
                {selectedPokemon.abilities &&
                  selectedPokemon.abilities.map((ability) => (
                    <tr key={ability.ability.name}>
                      <td>{ability.ability.name}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default PokemonDetail;
