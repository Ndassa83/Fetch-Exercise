import { Button, TextField } from "@mui/material";
import { useState } from "react";

type logInModalProps = {
  loggedIn: boolean;
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
};

export const LoginModal = ({ setLoggedIn }: logInModalProps) => {
  const [name, setName] = useState<null | string>(null);
  const [email, setEmail] = useState<null | string>(null);
  const [logInFail, setLogInFail] = useState<boolean>(false);

  const login = async () => {
    const response = await fetch(
      "https://frontend-take-home-service.fetch.com/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          name: name,
          email: email,
        }),
      }
    );

    if (response.ok) {
      setLoggedIn(true);
      setLogInFail(false);

      console.log("Login successful!");
    } else {
      setLogInFail(true);
      console.error("Login failed:", response.statusText);
    }
  };
  console.log(name, email);
  return (
    <div className="login-modal">
      <div style={{ fontSize: "28px" }}>
        Login to be matched with the Dog of your dreams!
      </div>
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
        <Button className="login-modal-button" onClick={login}>
          Login
        </Button>
      )}
      {logInFail && <div>*Please input valid email</div>}
    </div>
  );
};
