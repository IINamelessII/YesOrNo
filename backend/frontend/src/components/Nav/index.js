import React, {PureComponent, Component} from 'react'
import './style.css'


class Nav extends Component {
    state = {
        data: [],
        hidden: true,
        load: false
    }

    componentDidMount() {
        fetch(this.props.endpoint)
            .then(response => {
                if (response.status !== 200) {
                    return this.setState({load: false});
                }
                return response.json();
            })
            .then(data => this.setState({data: data, load: true}));
    }

    render() {
        let list = this.state.load && !this.state.hidden && this.state.data.map(flow => (<div key={flow.id} className="ui flowLabel disable-select clickable" onClick={this.goFlow(flow)}>{flow.name}</div>));
        return this.props.show ? (
            <div className="Nav">
                <div className="flowListUp">
                    <div className="ui chooseLabel disable-select clickable" onClick={this.switch_hidden}>
                        {this.state.hidden ? "Show Flows" : "Hide Flows"}
                    </div>
                    <div className="flowList">
                        {list}
                    </div>
                </div>
                <div className="ui GoRandom">
                    Random!
                </div>
            </div>
        ) : (
            <div className="Nav"></div>
        )
    }

    goFlow = (flow) => {
        console.log(flow.name + "Hello");
    }

    switch_hidden = () => this.setState({hidden: !this.state.hidden})
}


export default Nav
