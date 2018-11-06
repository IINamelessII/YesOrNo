import React, {Component} from 'react';
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
            .then(data => {
                this.setState({data: data, loader: true});
                this.props.switcher();
            });
    }

    render() {
        return this.state.loader ? this.props.render(this.state.data) : (
            <div className={this.props.name}>
                <p className="loading">{this.state.placeholder}</p>
            </div>
        )
    }
}

export default DataProvider;
