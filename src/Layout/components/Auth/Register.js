import { useState } from "react";
import { AiTwotoneEyeInvisible, AiTwotoneEye } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import "./Auth.scss";
import Button from "~/components/Button/Button";
import { postSignup } from "~/services/ApiServices";

function Register() {
  const navigate = useNavigate();

  const handleNavigateLogin = () => {
    navigate("/login");
  };

  const handleBackHome = () => {
    navigate("/");
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUserNames] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowIconPassword, setIsShowIconPassword] = useState(false);

  const handleShowHidePassword = () => {
    setIsShowPassword(!isShowPassword);
    setIsShowIconPassword(!isShowIconPassword);
  };

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  const handleSignup = async () => {
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
    let data = await postSignup(email, password, username);
    console.log(data);
    if (data && data.EC === 0) {
      toast.success(data.EM);
      navigate("/login");
    }

    if (data && +data.EC !== 0) {
      toast.error(data.EM);
    }
  };

  return (
    <div className="register-container">
      <div className="register-header">
        <span>Already have an account </span>
        <Button
          outline
          className="sign-btn"
          onClick={() => handleNavigateLogin()}
        >
          Log in
        </Button>
      </div>
      <div className="register-title col-4  mx-auto">Hoi dan IT</div>
      <div className="register-welcome col-4  mx-auto">Start your journey</div>
      <div className="register-form col-4 mx-auto">
        <div className="form-group">
          <label>Email (*) </label>
          <input
            type={"email"}
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group ">
          <label>Password (*)</label>
          <div className="password-group">
            <input
              type={!isShowPassword ? "password" : "text"}
              className="form-control input-password "
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="password-icon">
              {!isShowIconPassword ? (
                <AiTwotoneEyeInvisible
                  onClick={() => handleShowHidePassword()}
                />
              ) : (
                <AiTwotoneEye onClick={() => handleShowHidePassword()} />
              )}
            </div>
          </div>
        </div>
        <div className="form-group">
          <label>Username (*)</label>
          <input
            type={"useName"}
            className="form-control"
            value={username}
            onChange={(e) => setUserNames(e.target.value)}
          />
        </div>
        <div>
          <Button
            primary
            className="register-btn"
            onClick={() => handleSignup()}
          >
            Create a free account
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

export default Register;
