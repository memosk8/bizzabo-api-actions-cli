import { AuthenticationBuilder } from 'bizzabo-api';
import * as fs from 'fs'

export default async function getAuth(id, secret, acc) {

  let token = fs.readFileSync('public/tk.json', { encoding: 'utf8', flag: 'r' })

  // if there is no token in the file
  // create a new one 
  if (token == "") {

    const
      CLIENT_ID = 'BirLN0YIR9QD8grWZ9TGHLLceC6tPtay',
      CLIENT_SECRET = '1FjXvLzkjW_tVS8Ysy33C5SsIF-uH3Zy8_w12PsCQ39ciM5Z_lR-g4JQm8gFG8ih',
      ACCOUNT_ID = 192668,
      auth = new AuthenticationBuilder(CLIENT_ID, CLIENT_SECRET, ACCOUNT_ID).build();

    token = await auth.getClientCredentialsToken()

    // save new token to file ti
    const newToken = {
      date: new Date(),
      ...token
    }
    fs.writeFileSync('public/tk.json', JSON.stringify(newToken), { encoding: 'utf8' })
  }

  else if (token != "") {
    let tk = JSON.parse(token)
    let aDay = new Date().getTime() + (24*60*60*1000)
    if(tk.date >= aDay){
      // @TODO refactor code to generate token 
    }
  }

  return token;
}

getAuth()