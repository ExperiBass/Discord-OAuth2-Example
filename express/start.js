const Express = require("express")
const Chalk = require('chalk')
const app = Express()
const {getToken, revokeToken} = require('../utilityFunctions.js')
const {REDIRECT_URI} = require('../constants')

function start() {
    app.get("/", (req, res) => {
        res.sendFile(__dirname + "/main.html")
        const code = req.query['code']
        if (code) {
            console.log(Chalk.green(`Now we are in ${Chalk.yellow(`./${__dirname}/${__filename}`)}. You have successfully authed, and the request to ${Chalk.yellow(REDIRECT_URI)} has succeeded. Now, the app will strip the code from the request and get the token.`))
            console.log(`Code received: ${code}`)
            getToken(code).then(async res => {
                console.log(Chalk.green(`The response has succeeded! The token is below, with this data:\n    access_token: The actual token.\n    token_type: The type of token that was requested.\n    expires_in: The time, in seconds, that the token expires.\n    refresh_token: The token used to get a new access token.\n    scope: The scopes you requested.`))
                console.log(`Response: ${JSON.stringify(res, null, 2)}`)
                console.log(Chalk.green(`Now we will revoke the refresh token, so nobody can use it or the access token.`))
                try {
                    await revokeToken(res.refresh_token)
                } catch(e) {
                    console.error(e.stack, e)
                    process.exit(0)
                }
                console.log(Chalk.green(`Token revoked! Now the application will exit.`))
                process.exit(0)
            })
        }
    })
    app.listen(3000, () => {
        console.log("Server has started, and is running on localhost:3000")
    })
}
module.exports = start