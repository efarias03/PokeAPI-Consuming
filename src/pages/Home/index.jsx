import { PokemonCard } from "../../Components/PokemonCard"
import { Navbar } from "../../Components/Navbar"
import React, { useState, useEffect } from 'react';
import axios from "axios";
import "./index.css";

export const Home = () => {
    const [pokemons, setPokemons] = useState([]);

    useEffect(() => {
        getPokemons();
    }, []);

    const getPokemons = () => {
        var endpoints = [];
        for (var i = 1; i < 101; i++) {
            endpoints.push(`https://pokeapi.co/api/v2/pokemon/${i}/`);
        }

        var response = axios.all(endpoints.map((endpoint) => axios.get(endpoint))).then((res) => setPokemons(res));
        
    };
    console.log(pokemons);
    
    const pokemonsFilter = (name) => {
        if (name === "") {
            getPokemons();
        }
        var filteredPokemons = [];

        for (var i in pokemons) {
            if (pokemons[i].data.name.includes(name)) {
                filteredPokemons.push(pokemons[i]);
            }
        }
    }



    return (
        <div>
            <Navbar pokemonsFilter={pokemonsFilter} />
            <div className="main-content">
                <div className="grid-container">
                    <ul className="pokemons-grid">
                        {pokemons.map((pokemon, key) => (
                            <li key={key}>
                                <PokemonCard name={pokemon.data.name} image={pokemon.data.sprites.front_default} id={pokemon.data.id} type1={pokemon.data.types[0].type.name}  />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )


}