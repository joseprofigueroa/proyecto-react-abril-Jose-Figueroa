import React, { useState } from 'react';

export const PokemonContext = React.createContext();

export function PokemonProvider({ children }) {
  const [pokemonList, setPokemonList] = useState([]);
  const [filter, setFilter] = useState('');

  const onPokemonSelect = (p) => {
    setPokemonList((prevPokemonList) => {
      const filteredPokemonList = prevPokemonList.filter((pokemon) => pokemon.id !== p.id);
      return [p, ...filteredPokemonList];
    });
  };

  const addPokemonToList = (p) => {
    setPokemonList((prevPokemonList) => [...prevPokemonList, p]);
  };

  const filteredPokemonList = filter
    ? pokemonList.filter((p) => p.type.toLowerCase().includes(filter.toLowerCase()))
    : pokemonList;

  const value = {
    pokemonList: filteredPokemonList,
    filter,
    setFilter,
    onPokemonSelect,
    addPokemonToList,
  };

  return <PokemonContext.Provider value={value}>{children}</PokemonContext.Provider>;
}


