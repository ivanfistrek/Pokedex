import React from 'react';
import { textChangeRangeIsUnchanged } from 'typescript';

import searchImage from '../../assets/img/icons/loupe.png';

class PokemonTypesModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            types: this.props.pokemonTypes,
            selectedType: '',
            typeInfo: [],
            loading: true
        }
    }

    componentDidMount() {
    }

    getPokemonTypeDetails() {
        setTimeout(() => {
            fetch(this.state.selectedType)
            .then(response => response.json())
            .then(data => {
                this.setState({typeInfo: data.pokemon});
                this.setState({ loading: false });
            })
            .catch((err) => {console.log(err)})
        }, 1000);
    }
    
    render() {
        return(
            <div className="pokemon-type-list">
                 { this.props.pokemonTypes.map(result => {
                    return <div>
                        <button onClick={() => {
                            this.setState({ selectedType: result.type.url })
                            this.getPokemonTypeDetails();
                        }} type="button" className="btn btn btn-outline-success" data-toggle="modal" data-target="#exampleModal">
                            Search all {result.type.name} pokemon
                        </button>

                        <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">Pokemon List</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    { this.state.loading ? <p className="lead">Loading the Pokemon...</p> : '' }
                                    <ul>
                                        {this.state.typeInfo.map(result => {
                                            return <li className="pokemon-types">{result.pokemon.name}</li>
                                        })} 
                                    </ul>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                </div>
                                </div>
                            </div>
                        </div>

                    </div>
                }) }
            </div>
        )
    }
}

export default PokemonTypesModal