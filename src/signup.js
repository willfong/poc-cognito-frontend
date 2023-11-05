import React, { useState } from "react";
import { signUp, confirmSignUp } from "./aws-cognito";

const SignupComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confimCode, setConfirmCode] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleSignUp = async () => {
    try {
      await signUp(email, password);
      const message = `A confirmation code has been sent to ${email}. Please check your email to confirm your account.`;
      setMessage(message);
      setPassword("");
    } catch (error) {
      setError(error.message || JSON.stringify(error));
    }
  };

  const handleConfirmCode = async () => {
    try {
      await confirmSignUp(email, confimCode);
      const message = `Your account has been confirmed.`;
      setMessage(message);
    } catch (error) {
      setError(error.message || JSON.stringify(error));
    }
  };

  return (
    <div className="flex-grow-0 flex-shrink-0 h-2/5 p-4 mx-4 my-2 bg-sky-100">
      <h1 className="text-xl mb-2">Sign Up Example</h1>
      <div className="flex">
        <div className="flex-1 p-2">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email
            </label>
            <div className="mt-2">
              <input
                type="email"
                name="email"
                id="email"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Password
            </label>
            <div className="mt-2">
              <input
                type="password"
                name="password"
                id="password"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                placeholder="secret"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <button
            type="button"
            className="rounded-md bg-sky-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 mt-6"
            onClick={handleSignUp}
          >
            Login
          </button>
        </div>
        <div className="flex-1 p-2">
          {message && (
            <>
              <div>
                <label
                  htmlFor="confirmCode"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Confirmation Code
                </label>
                <div className="mt-2">
                  <input
                    type="tel"
                    name="confirmCode"
                    id="confirmCode"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
                    placeholder="123456"
                    value={confimCode}
                    onChange={(e) => setConfirmCode(e.target.value)}
                  />
                </div>
              </div>
              <button
                type="button"
                className="rounded-md bg-sky-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 mt-6"
                onClick={handleConfirmCode}
              >
                Confirm
              </button>
            </>
          )}
        </div>
      </div>
      {error && <div className="text-red-600">{error}</div>}
      {message && <div className="text-green-600">{message}</div>}
    </div>
  );
};

export default SignupComponent;
