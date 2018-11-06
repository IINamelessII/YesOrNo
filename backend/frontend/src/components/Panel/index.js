import React, {PureComponent} from 'react'
import './style.css'
import DjangoCSRFToken from 'django-react-csrftoken'


class Panel extends PureComponent {
    state = {
        process: 0,
        message: this.props.user.message
    }

    render() {
        return this.props.show ? this.props.user.is_auth ? (
            <div className="Panel">
                <div className="ui button">Hello, {this.props.user.username}!</div>
                <a href="logout/">
                    <div className="ui button clickable disable-select">Sign out</div>
                </a>
            </div>
        ) : (
            <div className="Panel">
                <div id="LogPanelTabs">
                    <div className="ui LogPanelTab clickable lh" id={this.state.process === 0 ? "activeLogPanelTab" : ""} onClick={this.openSignUpTab}>Sign Up</div>
                    <div className="ui LogPanelTab clickable lh" id={this.state.process === 1 ? "activeLogPanelTab" : ""} onClick={this.openSignInTab}>Sign In</div>
                    <div className="ui LogPanelTab clickable lh_2line" id={this.state.process === 2 ? "activeLogPanelTab" : ""} onClick={this.openResetPassTab}>Reset Password</div>
                </div>
                <form action={this.state.process === 0 ? "signup/" : this.state.process === 1 ? "signin/" : "resetpassword/"} method="post">
                    <DjangoCSRFToken />
                    {this.state.process === 0 ? (
                        <div className="LogForm">
                            <div id="email" className="ui button">Email</div>
                            <input className="button input" type="email" placeholder="Enter Email" name="email" required></input>
                            <div id="username" className="ui button">Username</div>
                            <input className="button input" type="text" placeholder="Enter Username" name="username" required></input>
                            <div id="password" className="ui button">Password</div>
                            <input className="button input" type="password" placeholder="Enter Password" name="password" required></input>
                            <button id="LogButt" className="ui button disable-select clickable"  type="submit">Sign Up</button>
                        </div>
                    ) : this.state.process === 1 ? (
                        <div className="LogForm">
                            <div id="username" className="ui button">Username</div>
                            <input className="button input" type="text" placeholder="Enter Username" name="username" required></input>
                            <div id="password" className="ui button">Password</div>
                            <input className="button input" type="password" placeholder="Enter Password" name="password" required></input>
                            <button id="LogButt" className="ui button disable-select clickable"  type="submit">Sign In</button>
                        </div>
                    ) : (
                        <div className="LogForm">
                            <div id="email" className="ui button">Email</div>
                            <input className="button input" type="email" placeholder="Enter Email" name="email" required></input>
                            <button id="LogButt" className="ui button disable-select clickable"  type="submit">Reset Password</button>
                        </div>
                    )}
                </form>
                <div className="message">{this.state.message}</div>
            </div>
        ) : (
            <div className="Panel"></div>)
    }

    openSignUpTab = () => this.setState({
        process: 0,
        message: null
    })

    openSignInTab = () => this.setState({
        process: 1,
        message: null
    })

    openResetPassTab = () => this.setState({
        process: 2,
        message: null
    })

}


export default Panel

//<div id="regkey" className="ui button">Registration Key</div>
//<input className="button input" type="password" placeholder="Enter Registration Key" name="regkey" required></input>