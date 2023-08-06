import { AuthenticationBuilder } from 'bizzabo-api';

const 
  CLIENT_ID = '',
  CLIENT_SECRET = '',
  ACCOUNT_ID = '',
  auth = new AuthenticationBuilder(CLIENT_ID, CLIENT_SECRET, ACCOUNT_ID).build(),
  token = await auth.getClientCredentialsToken();

export default token;