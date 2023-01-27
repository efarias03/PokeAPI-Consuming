import { PokemonCard } from "../../Components/PokemonCard"
import { Navbar } from "../../Components/Navbar"
import React, { useState, useEffect } from 'react';
import axios from "axios";
import "./index.css";

export const Home = () => {
    const [pokemons, setPokemons] = useState([]);
    const [lastEndpoint, setLastEndpoint] = useState();

    useEffect(() => {
        getPokemons();
    }, []);

    useEffect(() => {
        const intersectionObserver = new IntersectionObserver((entries) => {
            if (pokemons.length > 150 && entries.some((entry) => entry.isIntersecting)) {
                console.log("Cheguei", entries);
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
        for (var i = 1; i < pokemons.length + 21; i++) {
            endpoints.push(`https://pokeapi.co/api/v2/pokemon/${i}/`);
        }

        
        var response = axios.all(endpoints.map((endpoint) => axios.get(endpoint))).then((res) => setPokemons(res)).catch((err) => console.log(err));
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

    if (pokemons.length < 150) {
        return (
            <div className="wrapper">
                <Navbar pokemonsFilter={pokemonsFilter} />
                <div className="main-content">
                    <div className="grid-container">
                        <h1 id="load-more-observer" className="loader">loading...</h1>
                    </div>
                </div>
            </div>
        )
    }

    else{
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


}