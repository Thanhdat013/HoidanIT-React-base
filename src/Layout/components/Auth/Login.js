import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import "./Auth.scss";
import Button from "~/components/Button/Button";
import { postLogin } from "~/services/ApiServices";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  const handleLogin = async () => {
    //validate
    const isValidEmail = validateEmail(email);
    if (!isValidEmail) {
      toast.error("Invalid email");
      return;
    }
    if (!password) {
      toast.error("Invalid password");
      return;
    }
    // submit Api
    let data = await postLogin(email, password);
    if (data && data.EC === 0) {
      toast.success(data.EM);
      navigate("/");
    }

    if (data && +data.EC !== 0) {
      toast.error(data.EM);
    }
  };

  // Navigate
  const navigate = useNavigate();

  const handleBackHome = () => {
    navigate("/");
  };

  const handleNavigateSignup = () => {
    navigate("/signup");
  };

  return (
    <div className="login-container">
      <div className="login-header">
        <span>Don't have an account yet?</span>
        <Button
          outline
          className="sign-btn"
          onClick={() => handleNavigateSignup()}
        >
          Sign up
        </Button>
      </div>
      <div className="login-title col-4  mx-auto">Hoi dan IT</div>
      <div className="login-welcome col-4  mx-auto">Hello, Who's this ?</div>
      <div className="login-form col-4 mx-auto">
        <div className="form-group">
          <label>Email</label>
          <input
            type={"email"}
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type={"password"}
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <span className="forgot-password">Forgot password?</span>
        <div>
          <Button primary className="login-btn" onClick={() => handleLogin()}>
            Login to HoiDanIt
          </Button>
        </div>
        <div className="text-center ">
          <Button
            outline
            className="back-home-btn"
            onClick={() => handleBackHome()}
          >
            &#60;&#60; Go to homepage
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Login;
