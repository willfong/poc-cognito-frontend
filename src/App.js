// App.js
import React, { useState } from "react";
import LoginComponent from "./login";
import SignupComponent from "./signup";
import SessionComponent from "./session";

function App() {
  const [auth, setAuth] = useState({});

  return (
    <div className="h-screen flex flex-col">
      <SignupComponent />
      <LoginComponent auth={auth} setAuth={setAuth} />
      <SessionComponent auth={auth} setAuth={setAuth} />
    </div>
  );
}

export default App;
