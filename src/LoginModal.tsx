import { useState } from "react";
import { Button, TextField } from "@mui/material";
import { API } from "./API";

type LogInModalProps = {
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
};

export const LoginModal = ({ setLoggedIn }: LogInModalProps) => {
  const [name, setName] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [logInFail, setLogInFail] = useState<boolean>(false);

  const { Login } = API();

  const handleLogin = async () => {
    if (name && email) {
      const loginSuccess: boolean = await Login(name, email);
      if (loginSuccess) {
        setLoggedIn(true);
        setLogInFail(false);
      } else {
        setLogInFail(true);
      }
    }
  };
  return (
    <div className="login-modal">
      <div>Login to be matched with the Dog of your dreams!</div>
      <TextField
        className="login-modal-input"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <TextField
        className="login-modal-input"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      {email && name && (
        <Button className="login-modal-button" onClick={handleLogin}>
          Login
        </Button>
      )}
      {logInFail && <div>*Please input valid email</div>}
    </div>
  );
};
