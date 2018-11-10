import React, {PureComponent} from "react";
import ReactDOM from "react-dom";
import Nav from '../Nav';
import Panel from '../Panel';
import VoteList from "../VoteList";
import './style.css';


function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (0 !== currentIndex) {

        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
  
    
class App extends PureComponent {
    state = {
        show: false,
        data : [],
        plug: true,
    }  
    render() {
        return(
            <div className="App">
                <Nav show={this.state.show} switcher={this.switch_show} getPolls={this.getPolls} getRandomPolls={this.getRandomPolls} />
                <VoteList state={this.state} />
                <Panel show={this.state.show} user={JSON.parse(document.getElementById('props_user').textContent)} />
            </div>);
    }

    switch_show = () => this.setState({show: true})

    getPolls = (flow) => {
        fetch("api/polls_by_flow/" + flow)
            .then(response => {
                return response.json();
            })
            .then(data => {
                this.setState({data: data, plug: false});
            });
    }

    getRandomPolls = () => {
        fetch("api/polls/")
            .then(response => {
                return response.json();
            })
            .then(data => {
                this.setState({data: shuffle(data), plug: false});
            });
    }
}

const wrapper = document.getElementById("root");
wrapper ? ReactDOM.render(<App />, wrapper) : null;

//<DataProvider user={JSON.parse(document.getElementById('props_user').textContent)} endpoint="api/polls/"/>
//<div>{JSON.parse(document.getElementById('props_user').textContent).is_auth}</div>
//<DataProvider switcher={this.switch_show} name="VoteList" render={data => <VoteList data={data} />} endpoint="api/polls/"/>