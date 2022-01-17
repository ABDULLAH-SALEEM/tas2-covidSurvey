import { useState } from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../Firebase/Firebase';
import './Login.css';
import { useNavigate } from 'react-router';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const onEmailChangeHandler = (e) => {
        setEmail(e.target.value);
    }

    const onPasswordChangeHandler = (e) => {
        setPassword(e.target.value);
    }

    const onFormSubmitHandler = (e) => {
        e.preventDefault();

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                localStorage.setItem('currentUser', JSON.stringify(user))
                navigate('/dashboard');
            })
            .catch((error) => {
                const errorCode = error.code
                const errorMessage = error.message;
                console.log(errorMessage);
            })

    }

    return (
        <div className='loginWraper' >
            <p className='loginHeading'>Admin Panel <br /> Email: admin@gmail.com <br/> Password: admin123 </p>
            <div className='loginFormDiv'>
                <form onSubmit={onFormSubmitHandler} className='loginForm' >
                    <TextField className="email" type='email' id="standard-basic" value={email} onChange={onEmailChangeHandler} label="Enter Email" variant="standard" />
                    <TextField className="password" type='password' id="standard-basic" value={password} onChange={onPasswordChangeHandler} label="Enter Password" variant="standard" />
                    <Button className="login" type='submit' variant="outlined">Login</Button>
                </form>
            </div>
        </div>

    )
}

export default Login
