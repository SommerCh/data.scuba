
import React, {Component} from 'react';
import axios from 'axios';

export default class CreateScuba extends Component {

    constructor(props) {
        super(props);

        this.onChangeScubaDescription = this.onChangeScubaDescription.bind(this);
        this.onChangeScubaName = this.onChangeScubaName.bind(this);
        this.onChangeScubaPris = this.onChangeScubaPris.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            scuba_name: '',
            scuba_description: '',  
            scuba_pris: ''

        }
    }

    onChangeScubaDescription(e) {
        this.setState({
            scuba_description: e.target.value
        });
    }

    onChangeScubaName(e) {
        this.setState({
            scuba_name: e.target.value
        });
    }

    onChangeScubaPris(e) {
        this.setState({
            scuba_pris: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        console.log(`Form submitted:`);
        console.log(`Scuba Description: ${this.state.scuba_description}`);
        console.log(`Scuba Name: ${this.state.scuba_name}`);
        console.log(`Scuba Pris: ${this.state.scuba_pris}`);


        const newScuba = {
            scuba_description: this.state.scuba_description,
            scuba_name: this.state.scuba_name,
            scuba_pris: this.state.scuba_pris
        }

        axios.post('http://localhost:4000/scubas/add', newScuba)
            .then(res => console.log(res.data));

        this.setState({
            scuba_description: '',
            scuba_name: '',
            scuba_pris: ''
        })
    }

    render() {
        return (
            <div style={{marginTop: 20}}>
                <h3>Opret et nyt produkt</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Produkt navn: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.scuba_name}
                                onChange={this.onChangeScubaName}
                                />
                    </div>

                    <div className="form-group">
                        <label>Produkt Beskrivelse: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.scuba_description}
                                onChange={this.onChangeScubaDescription}
                                />
                    </div>

                    
                    <div className="form-group">
                        <label>Pris: </label>
                        <input  type="number"
                                className="form-control"
                                value={this.state.scuba_pris}
                                onChange={this.onChangeScubaPris}
                                />
                    </div>
                    
                    <div className="form-group">
                        <input type="submit" value="Tilføj Produkt" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}