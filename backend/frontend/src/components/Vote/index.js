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
                <div className="Vote">
                    <div id="VoteContainer" className={this.state.result ? "Resulting" : "Voting"}>
                        <Pic pic={this.props.poll.flow} />
                        <Statement result={this.state.result} statement={this.props.poll.statement} />
                        <div className="Buttons">
                            <VoteButton yes={true} result={this.state.result} onButtonClick={this.state.result ? this.likeClick : this.yesClick}/>
                            <VoteButton yes={false} result={this.state.result} onButtonClick={this.state.result ? this.dislikeClick : this.noClick}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    click = () => {
        this.setState({
            result: !this.state.result
        })
        this.state.result && this.props.goNext()
    }

    yesClick = () => {
        axios.post('voteYes/', {'id': this.props.poll.id}, {headers: {'X-CSRFTOKEN': Cookies.get('csrftoken')}})
        this.click()
    }

    noClick = () => {
        axios.post('voteNo/', {'id': this.props.poll.id}, {headers: {'X-CSRFTOKEN': Cookies.get('csrftoken')}})
        this.click()
    }

    likeClick = () => {
        axios.post('voteLike/', {'id': this.props.poll.id}, {headers: {'X-CSRFTOKEN': Cookies.get('csrftoken')}})
        this.click()
    }

    dislikeClick = () => {
        axios.post('voteDislike/', {'id': this.props.poll.id}, {headers: {'X-CSRFTOKEN': Cookies.get('csrftoken')}})
        this.click()
    }
}

export default Vote
