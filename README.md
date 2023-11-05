# POC Cognito Frontend

This is just a simple React app that demonstrates how React works with AWS Cognito.

This app is configured for signing up with email and password. Cognito will use SES to send a confirmation code that needs to be entered to verify the address.

Once the user has been confirmed, successful logins will print to the console the JWT.

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
  "sub": "af9d639d-62fe-4e65-a78f-456ad948dcc3",
  "email_verified": true,
  "iss": "https://cognito-idp.ap-southeast-1.amazonaws.com/ap-southeast-1_abcd1234",
  "cognito:username": "af9d639d-62fe-4e65-a78f-456ad948dcc3",
  "origin_jti": "315eadb7-0fa7-4124-b64e-e490a69d40d0",
  "aud": "2hgel84cqofajbffhmk05ft618",
  "event_id": "6eb900e2-a387-479f-ada3-56f094832352",
  "token_use": "id",
  "auth_time": 1699193394,
  "exp": 1699196994,
  "iat": 1699193394,
  "jti": "a1a2e190-f76d-4b23-b181-749a3a230f44",
  "email": "you@example.com"
}
```
