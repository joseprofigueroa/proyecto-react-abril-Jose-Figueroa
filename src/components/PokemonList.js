import React, { useContext, useState, useEffect } from 'react';
import { PokemonContext } from './context';
import './pokemonList.css';

function PokemonList() {
  const { pokemonList, onPokemonSelect, filter } = useContext(PokemonContext);
  const [allPokemonList, setAllPokemonList] = useState([]);

  useEffect(() => {
    const fetchAllPokemon = async () => {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
        const data = await response.json();
        setAllPokemonList(data.results);
      } catch (error) {
        console.error('Error fetching all pokemon:', error);
      }
    };

    fetchAllPokemon();
  }, []);

  const handlePokemonSelect = (pokemon) => {
    onPokemonSelect(pokemon);
  };

  const sortedAllPokemonList = [...allPokemonList].sort((a, b) => a.name.localeCompare(b.name));

  const filteredPokemonList = sortedAllPokemonList.filter((pokemon) =>
    filter ? pokemon.types.includes(filter) : true
  );

  const chunkedPokemonList = Array.from(
    { length: Math.ceil(filteredPokemonList.length / 5) },
    (_, i) => filteredPokemonList.slice(i * 5, i * 5 + 5)
  );

  const handleNewSearch = () => {
    window.location.reload();
  };

  return (
    <div>
      <h2>Lista Pokémon</h2>
      <button className="pokemonListButton" onClick={handleNewSearch}>
        Nueva Búsqueda
      </button>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Imagen</th>
          </tr>
        </thead>
        <tbody>
          {pokemonList.length > 0 ? (
            pokemonList.map((pokemon) => (
              <tr key={pokemon.id}>
                <td>
                  <button onClick={() => handlePokemonSelect(pokemon)}>
                    {pokemon.name}
                  </button>
                </td>
                <td>
                  <img src={pokemon.imageUrl} alt={pokemon.name} />
                </td>
              </tr>
            ))
          ) : (
            chunkedPokemonList.map((chunk, index) => (
              <tr key={index}>
                {chunk.map((pokemon) => (
                  <React.Fragment key={pokemon.name}>
                    <td>
                      <button onClick={() => handlePokemonSelect({ name: pokemon.name, id: pokemon.url.match(/\/(\d+)\//)[1] })}>
                        {pokemon.name}
                      </button>
                    </td>
                    <td>
                      <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url.match(/\/(\d+)\//)[1]}.png`} alt={pokemon.name} />
                    </td>
                  </React.Fragment>
                ))}
                {chunk.length < 5 && (
                  <>
                    {[...Array(5 - chunk.length)].map((_, i) => (
                      <td key={`empty-${i}`}></td>
                    ))}
                  </>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default PokemonList;
