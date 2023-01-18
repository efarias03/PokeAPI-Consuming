import { PokemonCard } from "../../Components/PokemonCard"
import { Navbar } from "../../Components/Navbar"
import React, { useState, useEffect } from 'react';
import axios from "axios";
import "./index.css"

export const Home = () => {
    axios
        .get("https://pokeapi.co/api/v2/pokemon?limit=50")
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    return (
        <div>
            <Navbar />
            <div className="main-content">
                <p>Hello World</p>
                <div className="pokemons-grid">
                    <ul>
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