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
        currentId: 0,
        poll: null,
        plug: true
    }  
    render() {
        return(
            <div className="App">
                <Nav show={this.state.show} switcher={this.switch_show} getPolls={this.getPolls} getRandomPolls={this.getRandomPolls} />
                <VoteList state={this.state} handleGo={this.handleGo}/>
                <Panel show={this.state.show} user={JSON.parse(document.getElementById('props_user').textContent)} />
            </div>);
    }

    switch_show = () => this.setState({show: true})

    handleGo = () => {
        this.setState({
            poll: this.state.currentId + 1 < this.state.data.length ? this.state.data[this.state.currentId + 1] : null,
            currentId: this.state.currentId + 1
        });
    }

    getPolls = (flow) => {
        fetch("api/polls_by_flow/" + flow)
            .then(response => {
                return response.json();
            })
            .then(data => {
                this.setState({data: data, plug: false, currentId: 0, poll: data ? data[0]: null});
            });
    }

    getRandomPolls = () => {
        fetch("api/polls/")
            .then(response => {
                return response.json();
            })
            .then(data => {
                this.setState({data: shuffle(data), plug: false, currentId: 0, poll: data ? data[0]: null});
            });
    }
}

const wrapper = document.getElementById("root");
wrapper ? ReactDOM.render(<App />, wrapper) : null;

//<DataProvider user={JSON.parse(document.getElementById('props_user').textContent)} endpoint="api/polls/"/>
//<div>{JSON.parse(document.getElementById('props_user').textContent).is_auth}</div>
//<DataProvider switcher={this.switch_show} name="VoteList" render={data => <VoteList data={data} />} endpoint="api/polls/"/>