import React, {PureComponent} from 'react'
import axios from 'axios'
import * as Cookies from 'js-cookie'
import Pic from '../Pic'
import Statement from '../Statement'
import VoteButton from '../VoteButton'
import './style.css'


class Vote extends PureComponent {
    render() {
        return (
            <div className="Wrap">
                <div className="ui-inverse-bordered Vote">
                    <Pic pic={this.props.poll.flow} />
                    <Statement poll={this.props.poll} />
                    {this.props.voted ? (
                        <div className="Buttons">
                            <VoteButton yes={true} result={false} selected={this.props.voted == 1} onButtonClick={this.yesClick}/>
                            <VoteButton yes={false} result={false} selected={this.props.voted == 2} onButtonClick={this.noClick}/>
                            <VoteButton yes={true} result={true} selected={this.props.rated == 1} onButtonClick={this.likeClick}/>
                            <VoteButton yes={false} result={true} selected={this.props.rated == 2} onButtonClick={this.dislikeClick}/>
                        </div>
                    ) : (
                        <div className="Buttons"></div>
                    )}
                    
                </div>
            </div>
        )
    }

    yesClick = () => {
        axios.post('voteYes/', {'id': this.props.poll.id}, {headers: {'X-CSRFTOKEN': Cookies.get('csrftoken')}})
        this.props.getVoted()
    }

    noClick = () => {
        axios.post('voteNo/', {'id': this.props.poll.id}, {headers: {'X-CSRFTOKEN': Cookies.get('csrftoken')}})
        this.props.getVoted()
    }

    likeClick = () => {
        axios.post('voteLike/', {'id': this.props.poll.id}, {headers: {'X-CSRFTOKEN': Cookies.get('csrftoken')}})
        this.props.getRated()
    }

    dislikeClick = () => {
        axios.post('voteDislike/', {'id': this.props.poll.id}, {headers: {'X-CSRFTOKEN': Cookies.get('csrftoken')}})
        this.props.getRated()
    }
}

export default Vote
