import React, { useContext } from 'react';
import { PokemonContext } from './context';

function PokemonFilter() {
  const { filter, setFilter, pokemonList, setPokemonList } = useContext(PokemonContext);

  const handleFilterChange = (e) => {
    const selectedFilter = e.target.value;
    setFilter(selectedFilter);

    if (selectedFilter === "") {
      setPokemonList([]);
    } else {
      const filteredList = pokemonList.filter(pokemon => pokemon.types.includes(selectedFilter));
      setPokemonList(filteredList);
    }
  };

  return (
    <div className="filter">
      <label htmlFor="type-filter">Filtrar por tipo:</label>
      <select id="type-filter" value={filter} onChange={handleFilterChange}>
        <option value="">Todos</option>
        <option value="normal">Normal</option>
        <option value="fire">Fire</option>
        <option value="water">Water</option>
        <option value="electric">Electric</option>
        <option value="grass">Grass</option>
        <option value="ice">Ice</option>
        <option value="fighting">Fighting</option>
        <option value="poison">Poison</option>
        <option value="ground">Ground</option>
        <option value="flying">Flying</option>
        <option value="psychic">Psychic</option>
        <option value="bug">Bug</option>
        <option value="rock">Rock</option>
        <option value="ghost">Ghost</option>
        <option value="dragon">Dragon</option>
        <option value="dark">Dark</option>
        <option value="steel">Steel</option>
        <option value="fairy">Fairy</option>
      </select>
    </div>
  );
}

export default PokemonFilter;
