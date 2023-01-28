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

    useEffect(() => {
        const intersectionObserver = new IntersectionObserver((entries) => {
            if (pokemons.length > 150 && entries.some((entry) => entry.isIntersecting)) {
                getMorePokemons();
            }
        });

        intersectionObserver.observe(document.querySelector("#load-more-observer"));

        return () => intersectionObserver.disconnect();
    });


    const getPokemons = () => {
        var endpoints = [];
        for (var i = 1; i < 151; i++) {
            endpoints.push(`https://pokeapi.co/api/v2/pokemon/${i}/`);
            
        }

        var response = axios.all(endpoints.map((endpoint) => axios.get(endpoint))).then((res) => setPokemons(res)).catch((err) => console.log(err));
    };

    const getMorePokemons = () => {
        var endpoints = [];

        for (var i = pokemons.length + 1; (pokemons.length >= 990 ? i < pokemons.length + 18 : i < pokemons.length + 21); i++) {
            endpoints.push(`https://pokeapi.co/api/v2/pokemon/${i}/`);
        };

        
        var response = 
        axios.all(endpoints.map((endpoint) => axios.get(endpoint)))
        .then((res) => setPokemons((pokemons) => [...pokemons, ...res]))
        .catch((err) => console.log(err));
    };

    const pokemonsFilter = (name) => {
        if (name === "") {
            getPokemons();
        }
        var filteredPokemons = [];

        for (var i in pokemons) {
            if (pokemons[i].data.name.includes(name.toLowerCase())) {
                filteredPokemons.push(pokemons[i]);
            }
        }
        setPokemons(filteredPokemons);
    }

    if (pokemons.length == 0) {
        return (
            <div className="wrapper">
                <Navbar pokemonsFilter={pokemonsFilter} />
                <div className="main-content">
                    <div className="loader" id="load-more-observer">
                        <div className="pokemon-svg">
                            <img className="bulbasaur" src="https://img.icons8.com/color/48/null/bullbasaur.png" alt="Bulbasaur icon" />
                            <img className="squirtle" src="https://img.icons8.com/color/48/null/squirtle.png" alt="Squirtle icon" />
                            <img className="charmander" src="https://img.icons8.com/color/48/null/charmander.png" alt="Charmander icon" />
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    else if (pokemons.length >= 150){
        return (
            <div className="wrapper">
                <Navbar pokemonsFilter={pokemonsFilter} />
                <div className="main-content">
                    <div className="grid-container">
                        <ul className="pokemons-grid">
                            {pokemons.map((pokemon, key) => (
                                <li key={key}>
                                    <PokemonCard name={pokemon.data.name} image={`${pokemon.data.sprites.front_default != null ? pokemon.data.sprites.front_default : pokemon.data.sprites.other["official-artwork"].front_default}`} id={pokemon.data.id} type1={pokemon.data.types[0].type.name} />
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div id="load-more-observer" className={`load-more-div ${pokemons.length > 150 ? "loading" : ""}`}>
                        <a onClick={getMorePokemons}>{`${pokemons.length <= 150 ? "Load More Pokemons!" : "Loading!" }`}</a>
                        <img src="https://img.icons8.com/fluency/48/null/pokeball.png" />
                    </div>
                </div>
            </div>
        )
    }

    else if (pokemons.length < 150 && pokemons.length > 0){
        return (
            <div className="wrapper">
                <Navbar pokemonsFilter={pokemonsFilter} />
                <div className="main-content">
                    <div className="grid-container">
                        <ul className="pokemons-grid">
                            {pokemons.map((pokemon, key) => (
                                <li key={key}>
                                    <PokemonCard name={pokemon.data.name} image={pokemon.data.sprites.front_default} id={pokemon.data.id} type1={pokemon.data.types[0].type.name} />
                                </li>
                            ))}
                            <li id="load-more-observer" />
                        </ul>
                    </div>
                </div>
            </div>
        )
    }


}