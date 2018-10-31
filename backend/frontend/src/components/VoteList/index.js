import React, {PureComponent} from 'react'
import Vote from '../Vote'
import './style.css'


class VoteList extends PureComponent {
    //it = makeIterator(his.props.data)
    state = {
        currentId: 0,
        poll: this.props.data[0]
    }

    render() {
        return this.state.poll ? (
            <div className="VoteList">
                    <Vote poll={this.state.poll} goNext = {this.handleGo} />
            </div>
        ) : (
            <div className="Empty">
                <p>You voted in all avaible polls, congratulations!</p>
            </div>
        )
    }

    handleGo = () => {
        this.setState({
            currentId: this.state.currentId + 1
        })

        this.setState({
            poll: this.state.currentId < this.props.data.length ? this.props.data[this.state.currentId] : null
        })
    }
}

export default VoteList;
