import React from 'react';
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';
import './style.css';
import { isUserLoggedIn, isUserNameUsed, login } from '../../services/LoginService';
import bcrypt from 'bcryptjs';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../App';
import Typography from '@mui/material/Typography';

function Login() {
    let navigate = useNavigate();
    const [username,setUsername]= React.useState('');
    const [password,setPassword]= React.useState('');
    const [userNameError,setUserNameError] = React.useState('');
    const [passwordError,setPasswordError] = React.useState('');
    const context = React.useContext(UserContext);


    const checkValidUserName = () =>{
        if(username.length<3)
        {
            setUserNameError("UserName must be atleast 3 characters");
            return false;
        }
        setUserNameError('');
        return true;
    }

    const checkValidPassWord = () =>{
        if(password.length<6)
        {
            setPasswordError('Password must have atleast 6 characters');
            return false;
        }
        setPasswordError('');
        return true;
    }
    

    const loginUser = () =>{
        if((checkValidUserName() && checkValidPassWord()))
        {
            const salt = '$2a$10$x7213ema7KND6FQ6I/Wt0O'
            const hashedPassword= bcrypt.hashSync(password,salt);
            let isValidLogin=login(username,hashedPassword);
            if(isValidLogin)
            {
                navigate('/');
                const user=isUserLoggedIn();
                context.setUser(user);
            }
            else{
                setPasswordError('Invalid password!!')
            }
        }
        
    }

    React.useEffect(()=>{
        if(context.user)
        {
            navigate('/')
        }
    },[])

  return (
    <div className='loginWrapper'>
        <div className='loginInputContainer'>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Login to Task Manager App
            </Typography>
            <div className='textField'>
                <TextField id="username" error={userNameError!==''} helperText={userNameError} label="Username" variant="standard" onChange={(event)=>{setUsername(event.target.value)}} />
            </div>
            <div className='textField'>
                <TextField id="password" error={passwordError!==''} helperText={passwordError} label="Password" variant="standard" onChange={(event)=>{setPassword(event.target.value)}} />
            </div>
        </div>
        <div>
            <Button id="loginBtn" onClick={loginUser} variant='outlined'>LOGIN</Button>
        </div>
    </div>
  );
}

export default Login;
