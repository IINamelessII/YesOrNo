import React, {PureComponent} from 'react'
import './style.css'


class Pic extends PureComponent {
    render() {
        return (
            <div className="Pic">
                <div className="Flow ui">
                    {this.props.pic}
                </div>
            </div>
        )
    }
}


export default Pic
