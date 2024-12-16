import { useRef } from "react"
// import axios from "axios";
import { Link, useNavigate } from "react-router-dom"
import "./register.css"
import "./mobile.css"
// import { log } from "../../utils/wsclient";

export default function RegisterPage() {
  // CSS for that Page (Fix Scrolling)
  // document.querySelector("body").style.height = "100vh";
  // document.querySelector("body").style.overflow = "hidden";

  const displayName: any = useRef();
  const username: any = useRef();
  const email: any = useRef();
  const password: any = useRef();
  const passwordAgain: any = useRef();
  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    if (passwordAgain.current.value !== password.current.value) {
      passwordAgain.current.setCustomValidity("Passwords do not match, try again.")
    } else {
      const user = {
        displayName: displayName.current.value,
        username: username.current.value,
        email: email.current.value,
        password: password.current.value
      }

      try {
        //  await axios.post("auth/register?", user);
        navigate("/login", { replace: true });

      } catch (err: any) {
        console.error({ err }, `Error occurred while registering new user; error=${err.message}`);
      }
    }
  }

  return (
    <div className="register">
      <div className="registerWrapper">
        <div className="registerLeft">
          <h3 className="registerLogo">Music App</h3>
          <span className="registerDesc">Create an account to add your personal music collection.</span>
        </div>
        <div className="registerRight">
          <form className="registerBox" onSubmit={handleClick}>
            <input placeholder="Name" required ref={displayName} className="registerInput"/>
            <input placeholder="Username" required ref={username} className="registerInput"/>
            <input placeholder="Email" type="email" required ref={email} className="registerInput"/>
            <input placeholder="Password" type="password" minLength={7} required ref={password}
                   className="registerInput"/>
            <input placeholder="Password Again" type="password" minLength={7} required ref={passwordAgain}
                   className="registerInput"/>
            <button className="registerButton">Sign Up</button>
            <Link className="registerLoginButtonContainer" to="/login">
              <button className="registerLoginButton">Login To Your Account</button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  )
}
