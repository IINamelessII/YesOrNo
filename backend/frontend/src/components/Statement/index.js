import React, {PureComponent} from 'react'
import './style.css'


class Statement extends PureComponent {
    render() {
        // let agree = Math.min(Math.max(parseInt(this.props.poll.agree_rate), 10), 90)
        // let disagree = 100 - agree
        return (
            <div className="ui-inverse-bordered Statement">  
                {this.props.poll.statement}
                {this.props.result && (
                    <React.Fragment>
                        <div className="ui-inverse Result">
                            Percentage of people who chose the answer:
                        </div>
                        <div className="ui-inverse Labels">
                            <div className="CountYes">{"Yes " + this.props.poll.agree_rate + "%"}</div>
                            <div className="CountNo">{"No " + (100 - this.props.poll.agree_rate) + "%"}</div>
                        </div>
                        <div className="Diagramm">
                            <div id="YesRate" style={{width: this.props.poll.agree_rate + "%"}}></div>
                            <div id="NoRate" style={{width:  (100 - this.props.poll.agree_rate) + "%"}}></div>
                        </div>
                    </React.Fragment>
                )}
            </div>
        )
    }
}


export default Statement
