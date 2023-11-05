// App.js
import React from "react";
import LoginComponent from "./login";
import SignupComponent from "./signup";

function App() {
  return (
    <div className="h-screen flex flex-col">
      <SignupComponent />
      <LoginComponent />
    </div>
  );
}

export default App;
