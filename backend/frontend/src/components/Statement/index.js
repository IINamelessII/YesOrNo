import React, {PureComponent} from 'react'
import './style.css'


class Statement extends PureComponent {
    render() {
        return (
            <div className="ui Statement">  
                {this.props.result ? "Thanks!" : this.props.statement}
            </div>
        )
    }
}


export default Statement
