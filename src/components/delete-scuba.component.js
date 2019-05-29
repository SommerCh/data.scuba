import React, { Component } from 'react'
import axios from 'axios';


export default class DeleteScuba extends Component {
  
    state = {
        scuba_description: '',
        scuba_name: '',
        scuba_pris: ''
    }



componentDidMount() {
    axios.get('http://localhost:4000/scubas/'+ this.props.match.params.id)
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

onClickDelete=(e)=>{
    axios.delete('http://localhost:4000/scubas/delete/'+ this.props.match.params.id)
    .then(res=> console.log("hej"))
    this.props.history.push('/');
}

onClickfortryd=(e)=>{
    this.props.history.push('/');
}

  render() {
    return (
      <div className="card mt-5">
          <div className="card-body">
              <h3 className="card-title">
                  Vil du slette produktet?
              </h3>
              <h5>Produkt navn: {this.state.scuba_name}</h5> 
              <p>Produkt beskrivelse: {this.state.scuba_description}</p> 
              <p>Pris: {this.state.scuba_pris} </p>
              
              <button className="btn btn-danger mr-3" onClick={this.onClickDelete} >Slet</button>
              <button className="btn btn-success" onClick={this.onClickfortryd} >Fortryd</button>
          </div>
      </div>
    )
  }
}


