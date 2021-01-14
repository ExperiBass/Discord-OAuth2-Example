const querystring = require('querystring')
const Axios = require('axios')
const Chalk = require('chalk')
const {
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI,
    TOKEN_URL,
    HEADERS,
    TOKEN_REVOKE_URL
} = require('./constants')

module.exports = {
    async getToken(code) {
        const DATA = {
            'client_id': CLIENT_ID,
            'client_secret': CLIENT_SECRET,
            'grant_type': 'authorization_code',
            'code': code,
            'redirect_uri': REDIRECT_URI,
            'scope': 'identify'
        }
        console.log(Chalk.green(`Now we are in ${Chalk.yellow(`./${__dirname}/${__filename}`)}. Here we send the request to get the end users token, using the client secret to confirm that this, is in fact, you.`))
        console.log(Chalk.redBright(`Don't ever share your client secret! If you accidentally do, you can create a new secret on the application page, revoking the original.`))
        const res = await Axios.post(`${TOKEN_URL}`, querystring.stringify(DATA), {
            headers: HEADERS
        })
        return res.data
    },
    async revokeToken(token) {
        const DATA = {
            token: token,
            token_type_hint: "refresh_token",
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET
        }
        try {
            const res = await Axios.post(`${TOKEN_REVOKE_URL}`, querystring.stringify(DATA), {
                headers: HEADERS
            })
            return res.data
        } catch(e) {
            throw e
        }
    }
}