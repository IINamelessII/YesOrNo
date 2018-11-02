import React, {PureComponent} from "react";
import ReactDOM from "react-dom";
import DataProvider from "../DataProvider";
//import VoteList from "../VoteList";
import './style.css';

class App extends PureComponent {
    render() {
        return (
            <DataProvider user={JSON.parse(document.getElementById('props_user').textContent)} endpoint="api/polls/"/>
        )
    }
}

const wrapper = document.getElementById("root");
wrapper ? ReactDOM.render(<App />, wrapper) : null;

//<DataProvider user={JSON.parse(document.getElementById('props_user').textContent)} endpoint="api/polls/"/>
//<div>{JSON.parse(document.getElementById('props_user').textContent).is_auth}</div>