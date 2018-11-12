import React, {PureComponent} from 'react'
import Vote from '../Vote'
import './style.css'

let text = "\tWelcome to YesOrNo close pre-alpha v.0.0.0!\nTo start choose Flow or just hit the crazy \"Random!\" button in left column.\nHave a nice time!\n\t\t\t(c)IINamelessII";
let text2 = "There now polls in this flow, be first and create one or even more!";


class VoteList extends PureComponent {
    render() {
        return this.props.state.show ? (
            <div className="VoteList">
                {
                    this.props.state.plug ? (
                        <div className="VotePlug">
                            <div className="ui-inverse-bordered text">
                                {text}
                            </div>
                        </div>
                    ) : this.props.state.data.length ? (
                        <div className="ListWrap">
                            {this.props.state.data.map((poll) => (<Vote
                                poll={poll} 
                                voted={this.props.state.is_auth ? poll.id in this.props.state.voted ? this.props.state.voted[poll.id] ? 1 : 2 : 3: null}
                                rated={this.props.state.is_auth ? poll.id in this.props.state.rated ? this.props.state.rated[poll.id] ? 1 : 2 : 3: null} />))}
                        </div>
                    ) : (
                        <div className="VotePlug">
                            <div className="ui-inverse-bordered text">
                                {text2}
                            </div>
                        </div>
                    )
                }
            </div>
        ) : (
            <div className="VoteList">
                <p className="ui-inverse loading">Loading...</p>
            </div>
        )
    }
}

export default VoteList;
