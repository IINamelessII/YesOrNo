import React, {PureComponent} from "react";
import ReactDOM from "react-dom";
import DataProvider from "../DataProvider";
import Nav from '../Nav';
import Panel from '../Panel';
import VoteList from "../VoteList";
import './style.css';


class App extends PureComponent {
    state = {
        show: false
    }  
    render() {
        return(
            <div className="App">
                <Nav show={this.state.show} endpoint="api/flows"/>
                <DataProvider switcher={this.switch_show} name="VoteList" render={data => <VoteList data={data} />} endpoint="api/polls/"/>
                <Panel show={this.state.show}user={JSON.parse(document.getElementById('props_user').textContent)} />
            </div>);
    }

    switch_show = () => this.setState({show: true})
}

const wrapper = document.getElementById("root");
wrapper ? ReactDOM.render(<App />, wrapper) : null;

//<DataProvider user={JSON.parse(document.getElementById('props_user').textContent)} endpoint="api/polls/"/>
//<div>{JSON.parse(document.getElementById('props_user').textContent).is_auth}</div>