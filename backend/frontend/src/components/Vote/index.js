import React, {PureComponent} from 'react'
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
                            <VoteButton yes={true} result={this.state.result} onButtonClick={this.yesClick}/>
                            <VoteButton yes={false} result={this.state.result} onButtonClick={this.noClick}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    yesClick = () => {
        this.state.result && this.props.goNext()
        this.setState({
            result: !this.state.result
        })
        //Changing data
    }

    noClick = () => {
        this.state.result && this.props.goNext()
        this.setState({
            result: !this.state.result
        })
        //Changing data
    }
}

export default Vote
