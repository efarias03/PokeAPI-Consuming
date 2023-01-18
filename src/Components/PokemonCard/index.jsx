import "./index.css";

export function PokemonCard() {

    return(
        <div className="card">
            <div className="card-content">
                <span className="card-number">
                    1
                </span>
                <img src="/assets/vite.svg" alt="" />
                <div className="card-description">
                    <p className="poke-name">
                        Charizard
                    </p>
                    <p>
                        Fire
                    </p>
                </div>
            </div>
        </div>
    )
}