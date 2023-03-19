import "./Login.scss";
import Button from "~/components/Button/Button";
import { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {};

  return (
    <div className="login-container">
      <div className="login-header">Don't have an account yet?</div>
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
      </div>
    </div>
  );
}

export default Login;
