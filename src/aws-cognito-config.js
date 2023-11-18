const awsCognitoConfig = {
  Region: process.env.REACT_APP_AWS_REGION,
  UserPoolId: process.env.REACT_APP_AWS_USER_POOL_ID,
  ClientId: process.env.REACT_APP_AWS_CLIENT_ID,
};

export default awsCognitoConfig;
