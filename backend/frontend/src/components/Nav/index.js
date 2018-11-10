import React, {PureComponent, Component} from 'react'
import './style.css'


class Nav extends Component {
    state = {
        data: [],
        load: false
    }

    componentDidMount() {
        fetch("api/flows/")
            .then(response => {
                if (response.status !== 200) {
                    return this.setState({load: false});
                }
                return response.json();
            })
            .then(data => {
                this.setState({data: data, load: true});
                this.props.switcher();
            });
    }

    render() {
        return this.props.show ? (
            <div className="Nav">
                <div className="ui disable-select header">
                    Choose Flow
                </div>
                <div className="flowList">
                    {this.state.load && !this.state.hidden && this.state.data.map(flow => (
                    <div key={flow.id} className="ui disable-select clickable flowLabel">
                        <div className="flowText clickable" onClick={() => {this.props.getPolls(flow.name)}}>{flow.name}</div>
                        <div className="plus clickable">+</div>
                    </div>))}
                </div>
                <div className="ui disable-select clickable header Random" onClick={this.props.getRandomPolls}>
                    Random!
                </div>
            </div>
        ) : (
            <div className="Nav"></div>
        )
    }
}


export default Nav
