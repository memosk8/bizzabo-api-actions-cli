import { AuthenticationBuilder } from 'bizzabo-api';

export default async function getAuth(id, secret, acc) {
  const auth = new AuthenticationBuilder(id, secret, acc).build();
  const token = await auth.getClientCredentialsToken()
  return token.accessToken
}