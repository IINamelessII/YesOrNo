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
        likes: this.props.poll.likes,
        dislikes: this.props.poll.dislikes,
        agree: this.props.poll.agree,
        disagree: this.props.poll.disagree
    }

    render() {
        return (
            <div className="Wrap">
                <div className="ui-inverse-bordered Vote">
                    <Pic pic={this.props.poll.flow} />
                    <Statement poll={this.props.poll} agree_rate={(this.state.agree + this.state.disagree) > 0 ? Math.floor(this.state.agree / (this.state.agree + this.state.disagree)* 100) : 50} />
                    {this.props.voted ? (
                        <div className="Buttons">
                            <div className="left-buttons">
                                <VoteButton yes={true} result={false} selected={this.state.voted == 1} onButtonClick={() => {this.yesClick(this.state.voted)}}/>
                                <div className="ui-inverse">or</div>
                                <VoteButton yes={false} result={false} selected={this.state.voted == 2} onButtonClick={() => {this.noClick(this.state.voted)}}/>
                            </div>
                            <div className="right-buttons">
                                <VoteButton yes={true} result={true} selected={this.state.rated == 1} onButtonClick={() => {this.likeClick(this.state.rated)}}/>
                                <div className="ui-inverse rate">{(this.state.likes + this.state.dislikes) > 0 ? Math.floor(this.state.likes / (this.state.likes + this.state.dislikes) * 100) : 50}%</div>
                                <VoteButton yes={false} result={true} selected={this.state.rated == 2} onButtonClick={() => {this.dislikeClick(this.state.rated)}}/>
                            </div>
                        </div>
                    ) : (
                        <div className="Buttons">
                            
                        </div>
                    )}
                </div>
            </div>
        )
    }

    yesClick = (voted) => {
        this.setState({
            voted: voted === 1 ? 3 : 1,
            agree: voted === 1 ? this.state.agree - 1 : this.state.agree + 1,
            disagree: voted === 2 ? this.state.disagree - 1 : this.state.disagree
        })
        axios.post(voted === 1 ? 'unvoteYes/' : voted === 2 ? 'switchtoYes/' : 'voteYes/', {'id': this.props.poll.id}, {headers: {'X-CSRFTOKEN': Cookies.get('csrftoken')}})
    }

    noClick = (voted) => {
        this.setState({
            voted: voted === 2 ? 3 : 2,
            agree: voted === 1 ? this.state.agree - 1 : this.state.agree,
            disagree: voted === 2 ? this.state.disagree - 1 : this.state.disagree + 1
        })
        axios.post(voted === 1 ? 'switchtoNo/' : voted === 2 ? 'unvoteNo/' : 'voteNo/', {'id': this.props.poll.id}, {headers: {'X-CSRFTOKEN': Cookies.get('csrftoken')}})
    }

    likeClick = (rated) => {
        this.setState({
            rated: rated === 1 ? 3 : 1,
            likes: rated === 1 ? this.state.likes - 1 : this.state.likes + 1,
            dislikes: rated === 2 ? this.state.dislikes - 1 : this.state.dislikes
        })
        axios.post(rated === 1 ? 'unvoteLike/' : rated === 2 ? 'switchtoLike/' : 'voteLike/', {'id': this.props.poll.id}, {headers: {'X-CSRFTOKEN': Cookies.get('csrftoken')}})
    }

    dislikeClick = (rated) => {
        this.setState({
            rated: rated === 2 ? 3 : 2,
            likes: rated === 1 ? this.state.likes - 1 : this.state.likes,
            dislikes: rated === 2 ? this.state.dislikes - 1 : this.state.dislikes + 1
        })
        axios.post(rated === 1 ? 'switchtoDislike/' : rated === 2 ? 'unvoteDislike/' : 'voteDislike/', {'id': this.props.poll.id}, {headers: {'X-CSRFTOKEN': Cookies.get('csrftoken')}})
    }
}

export default Vote
