import {
  CognitoIdentityProviderClient,
  SignUpCommand,
  ConfirmSignUpCommand,
  InitiateAuthCommand,
  GlobalSignOutCommand,
  AssociateSoftwareTokenCommand,
  VerifySoftwareTokenCommand,
  RespondToAuthChallengeCommand,
  ChangePasswordCommand,
} from "@aws-sdk/client-cognito-identity-provider";
import awsCognitoConfig from "./aws-cognito-config";

const client = new CognitoIdentityProviderClient({
  region: awsCognitoConfig.Region,
});

export const signUp = async (email, password) => {
  const params = {
    ClientId: awsCognitoConfig.ClientId,
    Username: email,
    Password: password,
    UserAttributes: [{ Name: "email", Value: email }],
  };

  const command = new SignUpCommand(params);
  try {
    const response = await client.send(command);
    return response;
  } catch (error) {
    throw error;
  }
};

export const confirmSignUp = async (email, confirmationCode) => {
  const params = {
    ClientId: awsCognitoConfig.ClientId,
    Username: email,
    ConfirmationCode: confirmationCode,
  };

  const command = new ConfirmSignUpCommand(params);
  try {
    const response = await client.send(command);
    return response; // Contains the confirmation result
  } catch (error) {
    throw error; // An error occurred
  }
};

export const signIn = async (email, password) => {
  const params = {
    AuthFlow: "USER_PASSWORD_AUTH",
    ClientId: awsCognitoConfig.ClientId,
    AuthParameters: {
      USERNAME: email,
      PASSWORD: password,
    },
  };

  const command = new InitiateAuthCommand(params);
  try {
    const response = await client.send(command);
    return response; // Contains the authentication result
  } catch (error) {
    throw error; // An error occurred
  }
};

export const signOut = async (accessToken) => {
  const params = {
    AccessToken: accessToken,
  };

  const command = new GlobalSignOutCommand(params);
  try {
    const response = await client.send(command);
    return response; // Contains the sign-out result
  } catch (error) {
    throw error; // An error occurred
  }
};

export const setupMfa = async (accessToken) => {
  const params = {
    AccessToken: accessToken, // AccessToken is needed to associate software token
  };

  const command = new AssociateSoftwareTokenCommand(params);
  try {
    const response = await client.send(command);
    return response.SecretCode; // Contains the MFA setup result
  } catch (error) {
    throw error; // An error occurred
  }
};

export const verifyMFA = async (accessToken, verificationCode) => {
  const params = {
    AccessToken: accessToken,
    UserCode: verificationCode,
  };

  const command = new VerifySoftwareTokenCommand(params);
  try {
    const response = await client.send(command);
    return response; // Contains the verify MFA result
  } catch (error) {
    throw error; // An error occurred
  }
};

export const sendMfaCode = async (email, code) => {
  // This function depends on the context. Typically, you need to use the session returned from InitiateAuthCommand
  // If you have a session, you can pass it as a parameter to RespondToAuthChallengeCommand
  // Assuming you have a session, here's a hypothetical example of how this might be implemented:
  const params = {
    ClientId: awsCognitoConfig.ClientId,
    ChallengeName: "SOFTWARE_TOKEN_MFA",
    ChallengeResponses: {
      USERNAME: email,
      SOFTWARE_TOKEN_MFA_CODE: code,
    },
    // Session: 'the session string from InitiateAuthCommand response', // This is required if the user has started an auth flow
  };

  const command = new RespondToAuthChallengeCommand(params);
  try {
    const response = await client.send(command);
    return response; // Contains the result of MFA code verification
  } catch (error) {
    throw error; // An error occurred
  }
};

export const changePassword = async (accessToken, oldPassword, newPassword) => {
  const params = {
    AccessToken: accessToken, // Access token of the authenticated user
    PreviousPassword: oldPassword, // Current password
    ProposedPassword: newPassword, // New password
  };

  const command = new ChangePasswordCommand(params);

  try {
    const response = await client.send(command);
    return response; // Response from Cognito
  } catch (error) {
    throw error; // Handle or throw the error
  }
};

// For sessionDetails, setupMfa, verifyMFA, and sendMfaCode, you'll need to use tokens obtained during authentication
// and implement similar patterns to the above using other commands from @aws-sdk/client-cognito-identity-provider.

/*
import {
  CognitoUserPool,
  CognitoUserAttribute,
  CognitoUser,
  AuthenticationDetails,
} from "amazon-cognito-identity-js";
import awsCognitoConfig from "./aws-cognito-config";

const userPool = new CognitoUserPool({
  UserPoolId: awsCognitoConfig.UserPoolId,
  ClientId: awsCognitoConfig.ClientId,
});

export const signUp = (email, password) => {
  return new Promise((resolve, reject) => {
    const attributeList = [
      new CognitoUserAttribute({ Name: "email", Value: email }),
    ];
    userPool.signUp(email, password, attributeList, null, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(true);
      }
    });
  });
};

export const confirmSignUp = (email, confirmationCode) => {
  return new Promise((resolve, reject) => {
    const cognitoUser = new CognitoUser({
      Username: email,
      Pool: userPool,
    });

    cognitoUser.confirmRegistration(confirmationCode, true, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(true);
      }
    });
  });
};

export const signIn = (email, password) => {
  return new Promise((resolve, reject) => {
    const authenticationDetails = new AuthenticationDetails({
      Username: email,
      Password: password,
    });

    const cognitoUser = new CognitoUser({
      Username: email,
      Pool: userPool,
    });

    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: (session) => {
        //const token = session.getIdToken().getJwtToken();
        resolve("success");
      },
      onFailure: (err) => {
        reject(err);
      },
      totpRequired: (challengeName, challengeParameters) => {
        // Software TOTP MFA is required; prompt the user to enter the TOTP code.
        console.log(challengeName, challengeParameters);
        resolve("totpRequired");
      },
    });
  });
};

export const signOut = () => {
  return new Promise((resolve, reject) => {
    const cognitoUser = userPool.getCurrentUser();

    if (cognitoUser != null) {
      cognitoUser.signOut();
    }
    resolve(true);
  });
};

export const sessionDetails = () => {
  return new Promise((resolve, reject) => {
    const cognitoUser = userPool.getCurrentUser();

    if (cognitoUser != null) {
      cognitoUser.getSession(function (err, session) {
        if (err) {
          reject(err);
          return;
        }

        if (session.isValid()) {
          console.log("Session is valid.");

          // Print tokens
          console.log("ID Token:", session.getIdToken().getJwtToken());
          console.log("Access Token:", session.getAccessToken().getJwtToken());
          console.log("Refresh Token:", session.getRefreshToken().getToken());

          // Print session information
          console.log("Session validity:", session.isValid());
          console.log(
            "Session expiration:",
            new Date(session.getIdToken().getExpiration() * 1000)
          );
          console.log("User attributes:", session.getIdToken().payload);

          // You can also print user's groups if they are included in the ID token
          const groups = session.getIdToken().payload["cognito:groups"];
          if (groups) {
            console.log("User groups:", groups);
          }
          resolve("ok");
        } else {
          console.log("Session is not valid.");
          reject("Session is not valid.");
          return;
        }
      });
    } else {
      console.log("No user is currently logged in.");
      reject("No user is currently logged in.");
    }
  });
};

export const setupMfa = () => {
  return new Promise((resolve, reject) => {
    const cognitoUser = userPool.getCurrentUser();

    cognitoUser.getSession(function (err, session) {
      if (err) {
        console.error(err);
        return;
      }

      if (session.isValid()) {
        cognitoUser.associateSoftwareToken({
          associateSecretCode: (secretCode) => {
            resolve(secretCode);
          },
          onFailure: (err) => {
            reject(err);
          },
        });
      } else {
        reject("Session is not valid, user must be signed in to set up MFA.");
      }
    });
  });
};

export const verifyMFA = (verificationCode) => {
  return new Promise((resolve, reject) => {
    const cognitoUser = userPool.getCurrentUser();

    cognitoUser.getSession(function (err, session) {
      if (err) {
        console.error(err);
        return;
      }

      if (session.isValid()) {
        cognitoUser.verifySoftwareToken(verificationCode, "My TOTP device", {
          onSuccess: (result) => {
            resolve(result);
          },
          onFailure: (err) => {
            reject(err);
          },
        });
      } else {
        reject("Session is not valid, user must be signed in to set up MFA.");
      }
    });
  });
};

export const sendMfaCode = (email, code) => {
  return new Promise((resolve, reject) => {
    const cognitoUser = new CognitoUser({
      Username: email,
      Pool: userPool,
    });

    cognitoUser.sendMFACode(code, {
      onSuccess: (session) => {
        console.log(session);
        resolve("success");
      },
      onFailure: (err) => {
        console.log(err);
        reject(err);
      },
    });
  });
};
*/
