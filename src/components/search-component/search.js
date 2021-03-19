import React from 'react';
import { Link } from 'react-router-dom';

import SearchInput, { createFilter } from 'react-search-input';

class Search extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            searchTerm: '',
            listOfPokemon: this.props.pokemonToSearch
        };
        this.searchUpdated = this.searchUpdated.bind(this);
    }

    searchUpdated(term) {
        this.setState({ searchTerm: term });
    }

    render() {

        const filteredPokemon = this.state.listOfPokemon.filter(
            createFilter(this.state.searchTerm, 'species.name')
        );

        return(
            <div>
                <SearchInput placeholder="Search Pokemon By Name..." className="search-input" onChange={this.searchUpdated}/>

                {filteredPokemon.map(filtered => {
                    return (
                        <div className="card">
                            <div className="card-body">
                                <img className="img-fluid card-img-top poke-img" src= { filtered.sprites.other['official-artwork'].front_default } height="50px"></img>
                                <h5 className="card-title">{ filtered.name }</h5>
                                <ul>
                                    <li>Height: { filtered.height }</li>
                                    <li>Weight: { filtered.weight } </li>
                                </ul>
                                <button className="btn btn-outline-success">
                                    <Link to={`/pokemon-details/${filtered.id}`}>Pokemon Details</Link>
                                </button>
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default Search