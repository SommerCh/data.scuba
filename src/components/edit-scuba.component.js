import React, {Component} from 'react';
import axios from 'axios';


export default class EditScuba extends Component {

constructor(props) {
super(props);

this.onChangeScubaDescription = this.onChangeScubaDescription.bind(this);
this.onChangeScubaName = this.onChangeScubaName.bind(this);
this.onChangeScubaPris = this.onChangeScubaPris.bind(this);
this.onSubmit = this.onSubmit.bind(this);

this.state = {
scuba_description: '',
scuba_name: '',
scuba_pris: ''
}
}

componentDidMount() {
axios.get('http://localhost:4000/scubas/'+this.props.match.params.id)
.then(response => {
this.setState({
scuba_description: response.data.scuba_description,
scuba_name: response.data.scuba_name,
scuba_pris: response.data.scuba_pris
})
})
.catch(function(error) {
console.log(error)
})
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
const obj = {
scuba_description: this.state.scuba_description,
scuba_name: this.state.scuba_name,
scuba_pris: this.state.scuba_pris
};
axios.post('http://localhost:4000/scubas/update/'+this.props.match.params.id, obj)
.then(res => console.log(res.data));
// retunere til
this.props.history.push('/');
}

render() {
return (
<div>
    <h3>Opdatere Listen</h3>

    <form onSubmit={this.onSubmit}>

        <div className="form-group">
            <label>Produkt Navn: </label>
            <input type="text" className="form-control" value={this.state.scuba_name}
                onChange={this.onChangeScubaName} />
        </div>

        <div className="form-group">
            <label>Produkt beskrivelse: </label>
            <input type="text" className="form-control" value={this.state.scuba_description}
                onChange={this.onChangeScubaDescription} />
        </div>


        <div className="form-group">
            <label>Pris: </label>
            <input type="text" className="form-control" value={this.state.scuba_pris}
                onChange={this.onChangeScubaPris} />
        </div>
        <br />

        <div className="form-group">
            <input type="submit" value="Tilføj rettelse" className="btn btn-primary" />
        </div>
    </form>
</div>
)
}
}