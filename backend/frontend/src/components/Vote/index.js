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
                            <VoteButton yes={true} result={false} selected={this.state.voted == 1} onButtonClick={this.yesClick}/>
                            <VoteButton yes={false} result={false} selected={this.state.voted == 2} onButtonClick={this.noClick}/>
                            <VoteButton yes={true} result={true} selected={this.state.rated == 1} onButtonClick={this.likeClick}/>
                            <VoteButton yes={false} result={true} selected={this.state.rated == 2} onButtonClick={this.dislikeClick}/>
                            <div className="ui-inverse-bordered rate">{this.state.rate}%</div>
                        </div>
                    ) : (
                        <div className="Buttons">
                            <div className="ui-inverse-bordered rate">{this.state.rate}%</div>
                        </div>
                    )}
                </div>
            </div>
        )
    }

    yesClick = () => {
        this.setState({voted: 1})
        this.state.voted == 2 && axios.post('unvoteNo/', {'id': this.props.poll.id}, {headers: {'X-CSRFTOKEN': Cookies.get('csrftoken')}})
        this.state.voted != 1 && axios.post('voteYes/', {'id': this.props.poll.id}, {headers: {'X-CSRFTOKEN': Cookies.get('csrftoken')}})
        .then(response => {
            axios.get('api/shortpoll_by_id/' + this.props.poll.id)
            .then(response => {
                this.setState({agree_rate: response.data['agree_rate'], rate: response.data['rate']})
            })
        })
    }

    noClick = () => {
        this.setState({voted: 2})
        this.state.voted == 1 && axios.post('unvoteYes/', {'id': this.props.poll.id}, {headers: {'X-CSRFTOKEN': Cookies.get('csrftoken')}})
        this.state.voted != 2 && axios.post('voteNo/', {'id': this.props.poll.id}, {headers: {'X-CSRFTOKEN': Cookies.get('csrftoken')}})
        .then(response => {
            axios.get('api/shortpoll_by_id/' + this.props.poll.id)
            .then(response => {
                this.setState({agree_rate: response.data['agree_rate'], rate: response.data['rate']})
            })
        })
    }

    likeClick = () => {
        this.setState({rated: 1})
        this.state.rated == 2 && axios.post('unvoteDislike/', {'id': this.props.poll.id}, {headers: {'X-CSRFTOKEN': Cookies.get('csrftoken')}})
        this.state.rated != 1 && axios.post('voteLike/', {'id': this.props.poll.id}, {headers: {'X-CSRFTOKEN': Cookies.get('csrftoken')}})
        .then(response => {
            axios.get('api/shortpoll_by_id/' + this.props.poll.id)
            .then(response => {
                this.setState({agree_rate: response.data['agree_rate'], rate: response.data['rate']})
            })
        })
    }

    dislikeClick = () => {
        this.setState({rated: 2})
        this.state.rated == 1 && axios.post('unvoteLike/', {'id': this.props.poll.id}, {headers: {'X-CSRFTOKEN': Cookies.get('csrftoken')}})
        this.state.rated != 2 && axios.post('voteDislike/', {'id': this.props.poll.id}, {headers: {'X-CSRFTOKEN': Cookies.get('csrftoken')}})
        .then(response => {
            axios.get('api/shortpoll_by_id/' + this.props.poll.id)
            .then(response => {
                this.setState({agree_rate: response.data['agree_rate'], rate: response.data['rate']})
            })
        })
    }
}

export default Vote
