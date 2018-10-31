import React, {Component} from 'react';
import VoteList from "../VoteList";

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
        return loader ? <VoteList data={data} /> : <p>{placeholder}</p>;
        //return loader ? <p>{}</p> : <p>{placeholder}</p>;
    }
}

export default DataProvider;
