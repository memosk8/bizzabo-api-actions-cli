import { AuthenticationBuilder } from 'bizzabo-api';

export default async function getAuth(id, secret, acc) {

  const
    CLIENT_ID = id,
    CLIENT_SECRET = secret,
    ACCOUNT_ID = acc,
    auth = new AuthenticationBuilder(CLIENT_ID, CLIENT_SECRET, ACCOUNT_ID).build(),
    token = await auth.getClientCredentialsToken()

  return token;
}