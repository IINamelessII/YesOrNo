import React, {PureComponent} from 'react'
import './style.css'
import DjangoCSRFToken from 'django-react-csrftoken'


class Panel extends PureComponent {
    render() {
        return this.props.user.is_auth ? (
            <div className="Panel">
                <div className="ui button">Hello, {this.props.user.username}!</div>
                <a href="logout/">
                    <div className="ui button disable-select">Log out</div>
                </a>
            </div>
        ) : (
            <div className="Panel">
                <form action="login/" method="post">
                    <DjangoCSRFToken />
                    <div id="username" className="ui button">Username</div>
                    <input class="button input" type="text" placeholder="Enter Username" name="username" required></input>
                    <div id="password" className="ui button">Password</div>
                    <input class="button input" type="password" placeholder="Enter Password" name="password" required></input>
                    <button id="login" className="ui button input disable-select"  type="submit">Log in</button>
                    <div id="fpass" className="ui button disable-select">Forget password?</div>
                 </form>
            </div>
        )
    }
}


export default Panel

//<a href="login/" id="login" className="ui button disable-select">Log in</a>