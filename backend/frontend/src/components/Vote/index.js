import React, {PureComponent} from 'react'
import axios from 'axios'
import * as Cookies from 'js-cookie'
import Pic from '../Pic'
import Statement from '../Statement'
import VoteButton from '../VoteButton'
import './style.css'


class Vote extends PureComponent {
    state = {
        voted : this.props.voted,
        rated : this.props.rated,
        rate: (this.props.poll.likes + this.props.poll.dislikes) > 0 ? Math.floor(this.props.poll.likes / (this.props.poll.likes + this.props.poll.dislikes) * 100) : 50,
        agree_rate: (this.props.poll.agree + this.props.poll.disagree) > 0 ? Math.floor(this.props.poll.agree / (this.props.poll.agree + this.props.poll.disagree)* 100) : 50
    }

    render() {
        return (
            <div className="Wrap">
                <div className="ui-inverse-bordered Vote">
                    <Pic pic={this.props.poll.flow} />
                    <Statement poll={this.props.poll} agree_rate={this.state.agree_rate} />
                    {this.props.voted ? (
                        <div className="Buttons">
                            <div className="left-buttons">
                                <VoteButton yes={true} result={false} selected={this.state.voted == 1} onButtonClick={this.yesClick}/>
                                <VoteButton yes={false} result={false} selected={this.state.voted == 2} onButtonClick={this.noClick}/>
                            </div>
                            <div className="right-buttons">
                                <VoteButton yes={true} result={true} selected={this.state.rated == 1} onButtonClick={this.likeClick}/>
                                <div className="ui-inverse-bordered rate">{this.state.rate}%</div>
                                <VoteButton yes={false} result={true} selected={this.state.rated == 2} onButtonClick={this.dislikeClick}/>
                            </div>
                        </div>
                    ) : (
                        <div className="Buttons">
                            <div className="ui-inverse-bordered self-rate">{this.state.rate}%</div>
                        </div>
                    )}
                </div>
            </div>
        )
    }

    yesClick = () => {
        let prom = new Promise((res, rej) => {
            this.state.voted === 1 ? 
                axios.post('unvoteYes/', {'id': this.props.poll.id}, {headers: {'X-CSRFTOKEN': Cookies.get('csrftoken')}})
            : 
                axios.post('voteYes/', {'id': this.props.poll.id}, {headers: {'X-CSRFTOKEN': Cookies.get('csrftoken')}})
        })
        .then(response => {
            this.state.voted === 2 && axios.post('unvoteNo/', {'id': this.props.poll.id}, {headers: {'X-CSRFTOKEN': Cookies.get('csrftoken')}})
        })
        .finally(response => {
            axios.get('api/shortpoll_by_id/' + this.props.poll.id)
            .then(response => {
                this.setState({agree_rate: response.data['agree_rate'], rate: response.data['rate'], voted: this.state.voted === 1 ? 3 : 1})
            })
        })
    }

    noClick = () => {
        (this.state.voted === 1 && axios.post('unvoteYes/', {'id': this.props.poll.id}, {headers: {'X-CSRFTOKEN': Cookies.get('csrftoken')}}))
        .then(response => {
            this.state.voted === 2 ? 
                axios.post('unvoteNo/', {'id': this.props.poll.id}, {headers: {'X-CSRFTOKEN': Cookies.get('csrftoken')}})
            : 
                axios.post('voteNo/', {'id': this.props.poll.id}, {headers: {'X-CSRFTOKEN': Cookies.get('csrftoken')}})
        })
        .then(response => {
            axios.get('api/shortpoll_by_id/' + this.props.poll.id)
            .then(response => {
                this.setState({agree_rate: response.data['agree_rate'], rate: response.data['rate']})
            })
        })
        .then(response => {this.setState({voted: this.state.voted === 2 ? 3 : 2})})
    }

    likeClick = () => {
        (this.state.rated === 2 && axios.post('unvoteDislike/', {'id': this.props.poll.id}, {headers: {'X-CSRFTOKEN': Cookies.get('csrftoken')}}))
        .then(response => {
            this.state.rated === 1 ? 
                axios.post('unvoteLike/', {'id': this.props.poll.id}, {headers: {'X-CSRFTOKEN': Cookies.get('csrftoken')}})
            : 
                axios.post('voteLike/', {'id': this.props.poll.id}, {headers: {'X-CSRFTOKEN': Cookies.get('csrftoken')}})
        })
        .then(response => {
            axios.get('api/shortpoll_by_id/' + this.props.poll.id)
            .then(response => {
                this.setState({agree_rate: response.data['agree_rate'], rate: response.data['rate']})
            })
        })
        .then(response => {this.setState({rated: this.state.rated === 1 ? 3 : 1})})
    }

    dislikeClick = () => {
        (this.state.voted === 1 && axios.post('unvoteLike/', {'id': this.props.poll.id}, {headers: {'X-CSRFTOKEN': Cookies.get('csrftoken')}}))
        .then(response => {
            this.state.voted === 2 ? 
                axios.post('unvoteDislike/', {'id': this.props.poll.id}, {headers: {'X-CSRFTOKEN': Cookies.get('csrftoken')}})
            : 
                axios.post('voteDislike/', {'id': this.props.poll.id}, {headers: {'X-CSRFTOKEN': Cookies.get('csrftoken')}})
        })
        .then(response => {
            axios.get('api/shortpoll_by_id/' + this.props.poll.id)
            .then(response => {
                this.setState({agree_rate: response.data['agree_rate'], rate: response.data['rate']})
            })
        })
        .then(response => {this.setState({rated: this.state.rated === 2 ? 3 : 2})})
    }
}

export default Vote
