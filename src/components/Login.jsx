import { useState } from 'react'
import { withRouter, Redirect } from 'react-router-dom'
const INITIAL_USER_DATA = {
    user: '',
    pwd: ''
}
const LoginForm = ({ history, setUserPresent, userPresent }) => {
    const [loginData, setLoginData] = useState(INITIAL_USER_DATA)

    const handleLoginCredentialChange = (e) => {
        const { name, value } = e.target
        setLoginData(prev => ({ ...prev, [name]: value }))
    }
    const handleLogin = async () => {
        const sendLogin = await fetch(`http://localhost:9000/auth/login`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            mode: 'cors',
            body: JSON.stringify({
                "user": loginData.user,
                "password": loginData.pwd
            })
        })
        const loginJson = await sendLogin.json()
        localStorage.setItem('userData', JSON.stringify(loginJson.message))
        setUserPresent(JSON.parse(localStorage.getItem('userData')))
        setLoginData(INITIAL_USER_DATA)
    }
    return (
        <div className="login-modal">
            <input name='user' value={loginData.user} onChange={handleLoginCredentialChange} />
            <input name='pwd' value={loginData.pwd} onChange={handleLoginCredentialChange} />
            <button onClick={handleLogin}>Login</button>
        </div>
    )
}

export default withRouter(LoginForm)