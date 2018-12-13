import React, {PureComponent} from 'react'
import './style.css'
import axios from 'axios';
import * as Cookies from 'js-cookie'


class Panel extends PureComponent {
    state = {
        process: 0,
        message: this.props.state.message
    }

    componentDidUpdate(prevProps) {
        if (prevProps.state.message !== this.props.state.message)
            this.setState({message: this.props.state.message})
    }

    render() {
        return this.props.state.show ? this.props.state.is_auth ? (
            <div className="Panel">
                <div className="ui button">Hello, {this.props.state.username}!</div>
                <div className="ui button clickable disable-select" onClick={this.props.getPollsByUser}>Your polls</div>
                <div className="ui button clickable disable-select" onClick={this.signOut} >Sign out</div>
            </div>
        ) : (
            <div className="Panel">
                <div id="LogPanelTabs">
                    <div className={this.state.process === 0 ? "ui-selected LogPanelTab clickable lh" : "ui LogPanelTab clickable lh"} onClick={this.openSignUpTab}>Sign Up</div>
                    <div className={this.state.process === 1 ? "ui-selected LogPanelTab clickable lh" : "ui LogPanelTab clickable lh"} onClick={this.openSignInTab}>Sign In</div>
                    <div className={this.state.process === 2 ? "ui-selected LogPanelTab clickable lh_2line" : "ui LogPanelTab clickable lh_2line"} onClick={this.openResetPassTab}>Reset Password</div>
                </div>                
                {this.state.process === 0 ? (
                    <form className="LogForm" onSubmit={this.signUp}>
                        <div id="email" className="ui button">Email</div>
                        <input className="button input" type="email" placeholder="Enter Email" id="signup-email" autocomplete="email"></input>
                        <div id="username" className="ui button">Username</div>
                        <input className="button input" type="text" placeholder="Enter Username" id="signup-username" autocomplete="username"></input>
                        <div id="password" className="ui button">Password</div>
                        <input className="button input" type="password" placeholder="Enter Password" id="signup-password" autocomplete="new-password"></input>
                        <div id="rep-password" className="ui button">Password</div>
                        <input className="button input" type="password" placeholder="Repeat Password" id="signup-rep-password" autocomplete="new-password"></input>
                        <button id="LogButt" className="ui button disable-select clickable" type="submit">Sign Up</button>
                        {this.state.message && (
                            <div id="message" className="ui-inverse message">{this.state.message}</div>
                        )}
                    </form>
                ) : this.state.process === 1 ? (
                    <form className="LogForm" onSubmit={this.signIn}>
                        <div id="username" className="ui button">Username</div>
                        <input id="signin-username" className="button input" type="text" placeholder="Enter Username" autocomplete="username"></input>
                        <div id="password" className="ui button">Password</div>
                        <input id="signin-password" className="button input" type="password" placeholder="Enter Password" autocomplete="current-password"></input>
                        <button id="LogButt" className="ui button disable-select clickable" type="submit">Sign In</button>
                        {this.state.message && (
                            <div id="message" className="ui-inverse message">{this.state.message}</div>
                        )}
                    </form>
                ) : (
                    <form className="LogForm" onSubmit={this.resetPass}>
                        <div id="email" className="ui button">Email</div>
                        <input className="button input" type="email" placeholder="Enter Email" id="rp-email" autocomplete="email"></input>
                        <button id="LogButt" className="ui button disable-select clickable" type="submit">Reset Password</button>
                        {this.state.message && (
                            <div id="message" className="ui-inverse message">{this.state.message}</div>
                        )}
                    </form>
                )}
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

    signOut = () => {
        axios.get('logout/', {withCredentials: true})
        .then(response => {
            this.props.getProfile()
        })
    }

    signUp = (e) => {
        e.preventDefault()
        let p1 = document.getElementById('signup-password').value
        let p2 = document.getElementById('signup-rep-password').value
        let em = document.getElementById('signup-email').value
        let us = document.getElementById('signup-username').value
        let validateEmail = (email) => {
            let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(email).toLowerCase());
        }
        let f0 = /^[0-9a-zA-Z_]{5,}$/.test(us)
        let f1 = validateEmail(em)
        let f2 = p1 === p2
        f0 && f1 && f2 ?
            (axios.post('signup/', {
                'username': us,
                'email': em,
                'password': p1
            }, {headers: {'X-CSRFTOKEN': Cookies.get('csrftoken')}}, {withCredentials: true})
            .then(response => {
                this.props.getProfile()
            }))
        : !f0 && !f1 && !f2 ? this.setState({message: "Incorrect username, email and password repeat"})
        : !f0 && !f1 ? this.setState({message: "Incorrect username and email"}) 
        : !f0 && !f2 ? this.setState({message: "Invalid username and password repeat"})
        : !f1 && !f2 ? this.setState({message: "Invalid email and password repeat"})
        : !f0 ? this.setState({message: "Invalid username"})
        : !f1 ? this.setState({message: "Invalid email"})
        : this.setState({message: "Invalid username and password repeat"})
        if (!f0) {
            document.getElementById('signup-username').value = ""
        } 
        if (!f1) {
            document.getElementById('signup-email').value = ""
        }
        if (!f2) {
            document.getElementById('signup-password').value = ""
            document.getElementById('signup-rep-password').value = ""
        }
    }
    
    signIn = (e) => {
        e.preventDefault()
        axios.post('signin/', {
            'username': document.getElementById('signin-username').value,
            'password': document.getElementById('signin-password').value
        }, {headers: {'X-CSRFTOKEN': Cookies.get('csrftoken')}}, {withCredentials: true})
        .then(response => {
            this.props.getProfile()
        })
    }

    resetPass = (e) => {
        e.preventDefault()
        axios.post('resetpassword/', {'email': document.getElementById('rp-email').value}, {headers: {'X-CSRFTOKEN': Cookies.get('csrftoken')}}, {withCredentials: true})
        .then(response => {
            this.props.getProfile()
        })
    }
}


export default Panel