import React, {PureComponent} from 'react'
import './style.css'


class Statement extends PureComponent {
    render() {
        let agree = this.props.poll.agree / (this.props.poll.agree + this.props.poll.disagree) * 100;
        let disagree = this.props.poll.disagree / (this.props.poll.agree + this.props.poll.disagree) * 100;
        return (
            <div className="Statement">  
                {this.props.result ? "Thanks!" : this.props.poll.statement}
                {this.props.result && (
                    <React.Fragment>
                        <div className="Result">
                            People choose answer:
                        </div>
                        <div className="Diagramm">
                            <div id="YesRate" style={{width: (agree > 10 ? agree.toFixed(0) : 10) + "%"}}>{"Yes " + agree + "%"}</div>
                            <div id="NoRate" style={{width: (disagree > 10 ? disagree.toFixed(0) : 10) + "%"}}>{"No " + disagree + "%"}</div>
                        </div>
                    </React.Fragment>
                )}
            </div>
        )
    }
}


export default Statement
