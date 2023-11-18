# POC Cognito Frontend

This is just a simple React app that demonstrates how React works with AWS Cognito.

This app is configured for signing up with email and password. Cognito will use SES to send a confirmation code that needs to be entered to verify the address.

Once the user has been confirmed, successful logins will print to the console the JWT.

## TODO

1. MFA - Adding the MFA seems to work because verification passed. But the signIn doesn't seem to require it. Need to find out how to require MFA if it has been added.
1. Refresh - Automatically update the access token.

## Design Considerations

1. We'd like to make MFA optional, since not all applications may need this level of compelxity.
1. We're not supporting SMS MFA, since that's crap to use and costs money and sucks to support.

## Setup

Create an `.env` file:

```sh
REACT_APP_AWS_USER_POOL_ID=ap-southeast-1_abcd1234
REACT_APP_AWS_CLIENT_ID=2hg...618
```

## Run

```sh
npm run start
```

## Example JWT

```sh
{
  "sub": "072b086a-e4d8-4af3-b1bd-321a48961091",
  "iss": "https://cognito-idp.ap-southeast-1.amazonaws.com/ap-southeast-1_4jibAIl4a",
  "client_id": "1885rf7od4q4mv6h3s087ibut1",
  "origin_jti": "578f26f0-88d4-4d06-9231-463f9332e5bc",
  "event_id": "4a7559a8-a7b7-4737-9a71-1a00ad7fbdb4",
  "token_use": "access",
  "scope": "aws.cognito.signin.user.admin",
  "auth_time": 1700298196,
  "exp": 1700301796,
  "iat": 1700298196,
  "jti": "7732b2c5-3a6a-4078-8d14-fda04d21b38a",
  "username": "072b086a-e4d8-4af3-b1bd-321a48961091"
}
```
