import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Ret from '../img/ret.png'
import Slet from '../img/slet.png'

const Scuba = props => (
    <tr>
    
           
           
        
        <td>  {props.scuba.scuba_description}  </td>
        <td> {props.scuba.scuba_name} </td>
        <td> {props.scuba.scuba_pris} </td>
        <td>
        <Link to={"/edit/"+props.scuba._id}><img src={Ret} alt="ret"/></Link>
        <Link to={"/delete/"+props.scuba._id}><img className="delete" src={Slet} alt="delete"/> </Link>
        </td>
    </tr>
)

export default class ScubasList extends Component {
    
    _isMounted=false;

    constructor(props) {
        super(props);
        this.state = {scubas: []};
    }

    componentDidMount() {
       this._isMounted=true;
        axios.get('http://localhost:4000/scubas/')
            .then(response => {
                if (this._isMounted){
                    this.setState({scubas: response.data})
                } ;
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    componentDidUpdate() {

        axios.get('http://localhost:4000/scubas/')
        .then(response => {
            if (this._isMounted){
                this.setState({scubas: response.data})
            } 
        })
        .catch(function (error) {
            console.log(error);
        })   
    }

    componentWillUnmount(){
        this._isMounted=false;
    }

    scubaList() {
        return this.state.scubas.map(function(currentScuba, i) {
            return <Scuba scuba={currentScuba} key={i} />;
        });
    }

    render() {
        return (
            <div>
                <h3>Produkt Listen</h3>
                <table className="table table-striped" style={{ marginTop: 50 }}>
                    <thead>
                        <tr>
                            <th>Produkt navn</th>
                            <th>Produkt beskrivelse</th>
                            <th>Pris i kr.</th>
                            <th>Ret / Slet</th>
                        </tr>
                    </thead>
                    
                    <tbody>
                        { this.scubaList() }
                        
                    </tbody>
                </table>
            </div>
        )
    }
}