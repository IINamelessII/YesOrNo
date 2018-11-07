import React, {PureComponent, Component} from 'react'
import './style.css'


class Nav extends Component {
    state = {
        data: [],
        hidden: true,
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
        let data = [...this.state.data].sort((a, b) => a.name > b.name);
        let list = this.state.load && !this.state.hidden && data.map(flow => (<div key={flow.id} className="ui disable-select clickable flowLabel" onClick={() => {this.props.getPolls(flow.name)}}>{flow.name}</div>));
        return this.props.show ? (
            <div className="Nav">
                <div className="ui disable-select clickable header" onClick={this.switch_hidden}>
                    {this.state.hidden ? "Show Flows" : "Hide Flows"}
                </div>
                <div className="flowList">
                    {list}
                </div>
                <div className="ui disable-select clickable header" onClick={this.props.getRandomPolls}>
                    Random!
                </div>
            </div>
        ) : (
            <div className="Nav"></div>
        )
    }

    switch_hidden = () => this.setState({hidden: !this.state.hidden})
}


export default Nav
