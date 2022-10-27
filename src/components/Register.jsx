import { useState } from 'react'
import { withRouter, Redirect } from 'react-router-dom'
const INITIAL_USER_DATA = {
    user: '',
    pwd: ''
}
const RegisterForm = ({ history, setUserPresent, userPresent }) => {
    const [signUpData, setSignUpData] = useState(INITIAL_USER_DATA)

    const handleSignUpCredentialChange = (e) => {
        const { name, value } = e.target
        setSignUpData(prev => ({ ...prev, [name]: value }))
    }
    const handleSignUp = async () => {
        const sendSignUp = await fetch(`http://localhost:9000/auth/register`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            mode: 'cors',
            body: JSON.stringify({
                "user": signUpData.user,
                "password": signUpData.pwd
            })
        })
        const signUpJson = await sendSignUp.json()
        localStorage.setItem('userData', JSON.stringify(signUpJson.message))
        setUserPresent(JSON.parse(localStorage.getItem('userData')))
        setSignUpData(INITIAL_USER_DATA)
    }
    return (
        <div div className="signup-modal" >
            <input name='user' value={signUpData.user} onChange={handleSignUpCredentialChange} />
            <input name='pwd' value={signUpData.pwd} onChange={handleSignUpCredentialChange} />
            <button onClick={handleSignUp}>Sign Up</button>
            <button onClick={() => history.push('/login')}>Already Registered? Login Here</button>
        </div >
    )
}

export default withRouter(RegisterForm)