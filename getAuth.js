import { AuthenticationBuilder } from 'bizzabo-api';

const 
  CLIENT_ID = 'Jl9UYGiCmMnYlAf6mUMNcv6raa4cHQfm',
  CLIENT_SECRET = '17jnuMwihVTevNwnsdy-RPQ2Kjxe7kXg83xifNwPWP3N1fbaYuWjTDYYmd0cwZe9',
  ACCOUNT_ID = '192668',
  auth = new AuthenticationBuilder(CLIENT_ID, CLIENT_SECRET, ACCOUNT_ID).build(),
  token = await auth.getClientCredentialsToken();

export default token;