const Chalk = require('chalk')
const server = require('./express/start')
const {
    AUTH_URL,
    CLIENT_ID,
    SCOPES,
    STATE,
    REDIRECT_URI
} = require('./constants')

async function start() {
    console.log(Chalk.green.italic(`Logs in green are the narration of what is currently happening. Logs in ${Chalk.redBright("red")} are warnings. All other logs are the program itself.`))
    console.log(Chalk.green(`This is a small example to show how the Discord OAuth2 flow works, with a bit of extra flair.`))
    console.log(Chalk.green(`First we'll start a server so you don't need to manually grab the code from the URL.`))
    console.log(Chalk.green(`Make sure to fill in your client ID and secret in the "constants.js" file, and add ${Chalk.yellow(REDIRECT_URI)} to your list of redirect URIs.`))
    await server()
    console.log(Chalk.green(`Now that the server is running, we'll create the URL so the end user can auth.`))
    console.log(`Visit this URL in your browser: ${Chalk.yellowBright(`${AUTH_URL}?response_type=code&client_id=${CLIENT_ID}&scope=${SCOPES[0]}&state=${STATE}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&prompt=consent`)}`)
}
start()