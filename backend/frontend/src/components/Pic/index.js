import React, {PureComponent} from 'react'
import './style.css'


class Pic extends PureComponent {
    render() {
        return (
            <div className="Pic">
                {this.props.pic}
            </div>
        )
    }
}


export default Pic
