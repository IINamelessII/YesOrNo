import React, {PureComponent} from 'react'
import axios from 'axios'
import * as Cookies from 'js-cookie'
import Pic from '../Pic'
import Statement from '../Statement'
import VoteButton from '../VoteButton'
import './style.css'


class Vote extends PureComponent {
    state = {
        result: false
    }
    render() {
        return (
            <div className="Wrap">
                <div className="ui-inverse-bordered Vote">
                    <Pic pic={this.props.poll.flow} />
                    <Statement poll={this.props.poll} />
                    {this.props.voted ? (
                        <div className="Buttons">
                            <VoteButton yes={true} result={this.state.result} onButtonClick={this.state.result ? this.likeClick : this.yesClick}/>
                            <VoteButton yes={false} result={this.state.result} onButtonClick={this.state.result ? this.dislikeClick : this.noClick}/>
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
        this.setState({result: true})
    }

    noClick = () => {
        axios.post('voteNo/', {'id': this.props.poll.id}, {headers: {'X-CSRFTOKEN': Cookies.get('csrftoken')}})
        this.setState({result: true})
    }

    likeClick = () => {
        axios.post('voteLike/', {'id': this.props.poll.id}, {headers: {'X-CSRFTOKEN': Cookies.get('csrftoken')}})
    }

    dislikeClick = () => {
        axios.post('voteDislike/', {'id': this.props.poll.id}, {headers: {'X-CSRFTOKEN': Cookies.get('csrftoken')}})
    }
}

export default Vote
