import "./index.css";
import styled from "styled-components";



export function PokemonCard( { name, image, type1, id }) {
    var cardColor1 = "";
    var cardColor2 = "";
    var typeColor = "";
    const setTypeColor = () => {
        switch (type1) {
            case "grass":
                cardColor1 = "#59c37c";
                cardColor2 = "#60b953";
                typeColor = "#fff";
            break
            case "bug":
                cardColor1 = "#aec93b";
                cardColor2 = "#90c12d";
                typeColor = "#fff";
            break
            case "fire":
                cardColor1 = "#fdb862";
                cardColor2 = "#ff9c54";
                typeColor = "#fff";
            break
            case "water":
                cardColor1 = "#00aaf9";
                cardColor2 = "#1172fc";
                typeColor = "#fff";
            break
            case "poison":
                cardColor1 = "#c860d5";
                cardColor2 = "#a566c7";
                typeColor = "#fff";
            break
            case "electric":
                cardColor1 = "#f9e174";
                cardColor2 = "#f4d23d";
                typeColor = "#000";
            break
            case "ground":
                cardColor1 = "#d7892c";
                cardColor2 = "#70491b";
                typeColor = "#fff";
            break
            case "fairy":
                cardColor1 = "#ffbffd";
                cardColor2 = "#a25c9b";
                typeColor = "#fff";
            break
            case "fighting":
                cardColor1 = "#e3454e";
                cardColor2 = "#ce406a";
                typeColor = "#fff";
            break
            case "psychic":
                cardColor1 = "#fea399";
                cardColor2 = "#f86d74";
                typeColor = "#fff";
            break
            case "rock":
                cardColor1 = "#d7cd97";
                cardColor2 = "#c7b78b";
                typeColor = "#fff";
            break
            case "ghost":
                cardColor1 = "#928cf1";
                cardColor2 = "#5369ac";
                typeColor = "#fff";
            break

            default:
                break;
        }
    };
    setTypeColor();

    const P = styled.p`
    color: ${typeColor};
    
    `;

    const Div = styled.div`
    background-color: ${cardColor1};
    background: linear-gradient(180deg, ${cardColor1} 37%, ${cardColor2} 100%);
    `

    return (
        <Div className="card-content" type1={type1}>
            <span className="pokemon-id">
                {`#${id}`}
            </span>
            <img src={image} alt={`${name} Image`} loading="lazy" draggable="false" />
            <div className="card-description">
                <P className="pokemon-name">
                    {name}
                </P>
                <P className="pokemon-type">
                    {type1}
                </P>
            </div>
        </Div>
    )
}