import React, {Component} from 'react';
import VoteList from "../VoteList";
import Nav from '../Nav';
import Panel from '../Panel';
import './style.css';

class DataProvider extends Component {

    state = {
        data: [],
        loader: false,
        placeholder: 'Loading...'
    };

    componentDidMount() {
        fetch(this.props.endpoint)
            .then(response => {
                if (response.status !== 200) {
                    return this.setState({placeholder: 'Something went wrong'});
                }
                return response.json();
            })
            .then(data => this.setState({data: data, loader: true}));
    }

    render() {
        const {data, loader, placeholder} = this.state;
        return loader ? (<div className="App">
                             <Nav />
                             <VoteList data={data} />
                             <Panel user={this.props.user} />
                         </div>)
        : (
            <div className="loading">
                <p>{placeholder}</p>
            </div>
        );
        //return loader ? <p>{}</p> : <p className="Placeholder">{placeholder}</p>;
    }
}

export default DataProvider;
