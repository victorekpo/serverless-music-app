import { useRef, useState } from "react"
import "./login.css"
import "./mobile.css"
// import { CircularProgress } from "@mui/material"
import { Link } from "react-router-dom"
// import { log } from "../../utils/wsclient";
// import { useStore } from "../../Context/Context";
// import { loginCall } from "../../login";

export default function LoginPage() {

  const emailOrUsername: any = useRef();
  const password: any = useRef();

  const [user, setUser] = useState('vic');
  const error = undefined;

  const handleClick = async (e) => {
    e.preventDefault();
    //  loginCall({ emailOrUsername: emailOrUsername.current.value, password: password.current.value }, setStore);
    // console.log('user just set', user);
  }

  (user || error) && console.info({ user, error }, "Login details");

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Music App</h3>
          <span className="loginDesc">Login to your music collection.</span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <input placeholder="Email or User Name" required type="text" className="loginInput"
                   ref={emailOrUsername}/>
            <input placeholder="Password" required type="password" minLength={7} className="loginInput"
                   ref={password}/>
            <button className="loginButton">Log In</button>
            <span className="loginForgot">Forgot Password?</span>
            <Link className="loginRegisterButtonContainer" to="/register">
              <button className="loginRegisterButton">Create A New Account</button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  )
}
