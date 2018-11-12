import React, {PureComponent} from "react";
import ReactDOM from "react-dom";
import axios from 'axios'
import * as Cookies from 'js-cookie'
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
        voted: this.getVoted(),
        rated: this.getRated(),
        plug: true,
        adding: null,
        currFlow: null,
        currRand: false
    }  
    render() {
        // let prom = new Promise(JSON.parse(document.getElementById('props_user').textContent))
        // prom()
        // .then(response => response.json())
        // .then(data => {
        //     console.log(data)
        //     let user_data = data
        //     data.is_auth && this.getVotedAndRated()
        // })
        let user_data = JSON.parse(document.getElementById('props_user').textContent)
        // console.log(this.state.voted)
        // console.log(this.state.rated)
        return(
            <div className="App">
                <Nav show={this.state.show} switcher={this.switch_show} getPolls={this.getPolls} getRandomPolls={this.getRandomPolls} openAddPoll={this.openAddPoll} is_auth={user_data.is_auth}/>
                <VoteList state={this.state} is_auth={user_data.is_auth}/>
                <Panel show={this.state.show} user={user_data} />
                {this.state.adding && (
                    <div className="add-the-poll-window">
                        <div className="ui-inverse-bordered add-the-poll-content">
                            <div className="labels">
                                <div className="ui-inverse-bordered add-poll-label">Adding a poll to {this.state.adding} flow</div>
                                <div className="ui exit disable-select clickable" onClick={this.closeAddPoll}>x</div>
                            </div>
                            <div className="ui-inverse text advise">We advise you to formulate a statement in the yes-no question format without using negatives to avoid confusion.</div>
                            <textarea cols="50" rows="10" id="statement-input" className="ui-inverse-bordered" placeholder="What do you want to ask?"></textarea>
                            <div className="add-poll-container">
                                <div id="AddPollMessage" text="message"></div>
                                <div className="ui add-poll disable-select clickable" onClick={this.addPoll}>Add this poll to the flow</div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            );
    }

    switch_show = () => this.setState({show: true})

    getPolls = (flow) => {
        fetch("api/polls_by_flow/" + flow)
            .then(response => {
                return response.json();
            })
            .then(data => {
                this.setState({data: data, plug: false, currFlow: flow, currRand: false});
            });
    }

    getRandomPolls = () => {
        fetch("api/polls/")
            .then(response => {
                return response.json();
            })
            .then(data => {
                this.setState({data: shuffle(data), plug: false, currFlow: null, currRand: true});
            });
    }

    openAddPoll = (flow) => {
        this.setState({adding: flow});
    }

    closeAddPoll = () => {
        this.setState({adding: null})
    }

    addPoll = () => {
        let statement = document.getElementById('statement-input')
        statement.value.length > 9 && statement.value.length < 501 ? 
            axios.post('addPoll/', {'flow': this.state.adding, 'statement': statement.value}, {headers: {'X-CSRFTOKEN': Cookies.get('csrftoken')}})
            .then(response => {
                return this.state.currFlow === this.state.adding ? this.getPolls(this.state.adding) : this.state.currRand ? this.getRandomPolls() : this.closeAddPoll();
            })
            .then(response => {
                return this.closeAddPoll();
            })
        : statement.value.length < 10 ? 
            document.getElementById('AddPollMessage').innerHTML = "Statement must be 10 characters at least!"
        :    
          document.getElementById('AddPollMessage').innerHTML = "Statement must be no more than 500 characters!"
    }

    getVoted = () => {
        axios.get('api/profile/')
        .then(data => {
            return data.data['voted']
        })
    }

    getRated = () => {
        axios.get('api/profile/')
        .then(data => {
            return data.data['rated']
        })
    }
}

const wrapper = document.getElementById("root");
wrapper ? ReactDOM.render(<App />, wrapper) : null;
