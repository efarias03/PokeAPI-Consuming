import { PokemonCard } from "../../Components/PokemonCard"
import { Navbar } from "../../Components/Navbar"
import React, { useState, useEffect } from 'react';
import axios from "axios";
import "./index.css"

export const Home = () => {
    const [pokemons, setPokemons] = useState([]);

    useEffect(() => {
        getPokemons();
    }, []);

    const getPokemons = () => {
        axios
            .get("https://pokeapi.co/api/v2/pokemon?limit=20")
            .then((res) => setPokemons(res.data.results))
            .catch((err) => console.log(err));

    };
    return (
        <div>
            <Navbar />
            <div className="main-content">
                <div className="flex-container">
                    <ul className="pokemons-flex">
                        <li>
                            <PokemonCard />
                        </li>
                        <li>
                            <PokemonCard />
                        </li>
                        <li>
                            <PokemonCard />
                        </li>
                        <li>
                            <PokemonCard />
                        </li>
                        <li>
                            <PokemonCard />
                        </li>
                        <li>
                            <PokemonCard />
                        </li>
                        <li>
                            <PokemonCard />
                        </li>
                        <li>
                            <PokemonCard />
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )


}