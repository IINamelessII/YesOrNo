import React, {PureComponent} from 'react'
import Vote from '../Vote'
import './style.css'

let text = "\tWelcome to YesOrNo close pre-alpha v.0.0.0!\nTo start choose Flow or just hit the crazy \"Random!\" button in left column.\nHave a nice time!\n\t\t\t(c)IINamelessII";
let text2 = "You voted in all avaible polls in this Flow(or even in all, if you run Random Mode).\n If you want to create more polls... ";


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
                    ) : this.props.state.poll ? (
                        <Vote poll={this.props.state.poll} result={this.props.result} switcher={this.props.switcher} goNext={this.props.handleGo} />
                    ) : (
                        <div className="Empty">
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
