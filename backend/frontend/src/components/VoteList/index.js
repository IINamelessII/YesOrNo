import React, {PureComponent} from 'react'
import Vote from '../Vote'
import './style.css'


class VoteList extends PureComponent {
    render() {
        return this.props.state.show ? (
            <div className="VoteList">
                {
                    this.props.state.plug ? (
                        <div className="VotePlug">
                            <div className="ui-inverse-bordered text">
                                Welcome to YesOrNo alpha v.0.1!
                                <br/>
                                To start choose Flow or just push "Random!" button in left column.
                                <br/>
                                To each alpha-tester is recommended to add at least 5 polls distributed among any flows and also vote in polls created by other users.
                                <br/>
                                Report problems found to <em className="email">theyesornoproject@gmail.com</em> or to <em><a className="tg-link no-selection clickable"href="https://web.telegram.org/#/im?p=@IInamelessII">me in Telegram</a></em>
                                <br/>
                                Have a nice time!
                                <br/>
                                IINamelessII
                            </div>
                        </div>
                    ) : this.props.state.data.length ? (
                        <div className="ListWrap">
                            {this.props.state.data.map((poll) => (<Vote key={poll.id}
                                poll={poll} 
                                voted={this.props.state.is_auth ? poll.id in this.props.state.voted ? this.props.state.voted[poll.id] ? 1 : 2 : 3: null}
                                rated={this.props.state.is_auth ? poll.id in this.props.state.rated ? this.props.state.rated[poll.id] ? 1 : 2 : 3: null}
                                getVoted={this.props.getVoted} getRated={this.props.getRated}
                            />))}
                        </div>
                    ) : (
                        <div className="VotePlug">
                            <div className="ui-inverse-bordered text">
                            O_o There now polls, be first and create one or even more!
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
