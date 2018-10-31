import React, {PureComponent} from "react";
import ReactDOM from "react-dom";
import DataProvider from "../DataProvider";
//import VoteList from "../VoteList";
import Nav from '../Nav';
import Panel from '../Panel';
import './style.css';

class App extends PureComponent {
    render() {
        return (
            <div className="App">
                <Nav />
                <DataProvider endpoint="api/polls/"/>
                <Panel />
            </div>
        )
    }
}

const wrapper = document.getElementById("root");
wrapper ? ReactDOM.render(<App />, wrapper) : null;
