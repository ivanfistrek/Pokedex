import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import goBack from '../../assets/img/icons/left-arrow.png';

import PokemonTypesModal from '../modal/pokemon-types-modal';

class PokemonDetails extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            pokemonId: this.props.match.params.id,
            pokemon: [],
            pokemonType: [],
            selectedPokemonType: '',
            showModal: false
        }
    }

    componentDidMount() {
        this.getPokemonDetails();
    }

    getPokemonDetails() {
        const url = "https://pokeapi.co/api/v2/pokemon/" + this.state.pokemonId + "/";
        fetch(url)
            .then(response => response.json())
            .then(data => {
                if(data) {
                    this.setState({ pokemon: data });
                    this.setState({ pokemonType: data.types });
                }
            })
            .catch(console.log);
    }

    render() {

        return(
            <div className="container pokedex">
                <div className="row w-25">
                    <div className="col align-self-start">
                        <button type="button" class="btn btn-outline-success btn-block">
                            <Link to={'/'}>Home</Link>
                        </button>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <img className="img img-fluid pokemon-details-img" src={ this.state.pokemon.sprites ? this.state.pokemon.sprites.other['official-artwork'].front_default : ''}></img>
                        <h3>Pokemon details</h3>
                        <p className="lead">Name: <b>{ this.state.pokemon.name }</b></p>
                        <p className="lead">Body info:</p>
                        <ul>
                            <li>Weight: { this.state.pokemon.weight }</li>
                            <li>Heigh: { this.state.pokemon.height }</li>
                        </ul>
                        <p className="lead">Pokemon type info: </p>
                        <ul>
                            { this.state.pokemonType.map((result, index) => {
                                return <div>
                                    <li className="pokemon-type-item pb-2">
                                        <p id={index}>{ result.type.name } type</p>
                                    </li>
                                </div>
                            }) }
                        </ul>
                        <p className="lead">Find Pokemons of the same type: </p>
                        {console.log("Ispis iz roditelja: ", this.state.pokemonType)}
                        { <PokemonTypesModal pokemonTypes={this.state.pokemonType}/>}
                    </div>
                </div>
            </div>
        )
    }
}

export default PokemonDetails