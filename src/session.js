import React, { useState } from "react";
import * as AWS from "./aws-cognito";

const SessionComponent = ({ auth }) => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [mfaCode, setMfaCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");

  const setupMfa = async () => {
    try {
      const secretCode = await AWS.setupMfa(auth.AccessToken);
      const message = `Your MFA secret code is ${secretCode}`;
      setMessage(message);
      setError("");
    } catch (error) {
      setMessage("");
      setError(JSON.stringify(error));
    }
  };

  const verifyMfa = async () => {
    try {
      await AWS.verifyMFA(auth.AccessToken, mfaCode);
      const message = `Your MFA has been verified.`;
      setMessage(message);
      setError("");
    } catch (error) {
      setMessage("");
      setError(error.message || JSON.stringify(error));
    }
  };

  const handleChangePassword = async () => {
    try {
      await AWS.changePassword(auth.AccessToken, oldPassword, newPassword);
      const message = `Your password has been changed.`;
      setMessage(message);
      setError("");
    } catch (error) {
      setMessage("");
      setError(error.message || JSON.stringify(error));
    }
  };

  return (
    <div className="flex-grow-0 flex-shrink-0 h-2/5 p-4 mx-4 my-2 bg-yellow-50">
      <h1 className="text-xl mb-2">Session Example</h1>
      <div>
        Auth: <pre>{JSON.stringify(auth, null, 2)}</pre>
      </div>
      {error && <div className="text-red-600">{error}</div>}
      {message && <div className="text-green-600">{message}</div>}

      <div>
        <button
          type="button"
          className="rounded-md bg-sky-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 mt-6"
          onClick={setupMfa}
        >
          Enable MFA
        </button>
        <div>
          <label
            htmlFor="verify-mfa"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Verify MFA Code
          </label>
          <div className="mt-2">
            <input
              type="tel"
              name="verify-mfa"
              id="verify-mfa"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
              placeholder="123456"
              value={mfaCode}
              onChange={(e) => setMfaCode(e.target.value)}
            />
          </div>
          <button
            type="button"
            className="rounded-md bg-sky-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 mt-6"
            onClick={verifyMfa}
          >
            Verify MFA
          </button>
        </div>
        <div>
          <label
            htmlFor="verify-mfa"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Old Password
          </label>
          <div className="mt-2">
            <input
              type="password"
              name="session-old-password"
              id="session-old-password"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
              placeholder="old secrets"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </div>
          <label
            htmlFor="verify-mfa"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            New Password
          </label>
          <div className="mt-2">
            <input
              type="password"
              name="session-new-password"
              id="session-new-password"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6"
              placeholder="new secrets"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <button
            type="button"
            className="rounded-md bg-sky-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 mt-6"
            onClick={handleChangePassword}
          >
            Update Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default SessionComponent;
