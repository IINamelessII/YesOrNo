import React, {PureComponent} from 'react'
import './style.css'


class VoteButton extends PureComponent {
    render() {
        return (
            <div id={this.props.yes ? "YesButton" : "NoButton"} className={this.props.selected ? "VoteButton ui-selected-p disable-select clickable" : "VoteButton ui disable-select clickable"} onClick={this.props.onButtonClick}>
                {this.props.result ? this.props.yes ? "Like" : "Dislike" : this.props.yes ? "Yes" : "No"}
            </div>
        )
    }
}


export default VoteButton
