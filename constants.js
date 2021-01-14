module.exports = {
    AUTH_URL: `https://discord.com/api/oauth2/authorize`,
    TOKEN_URL: `https://discord.com/api/oauth2/token`,
    TOKEN_REVOKE_URL: `https://discord.com/api/oauth2/token/revoke`,
    HEADERS: {
        "Content-Type": "application/x-www-form-urlencoded"
    },
    REDIRECT_URI: `http://localhost:3000`,
    SCOPES: ['identify'],
    // edit these below
    STATE: "THIS_IS_A_STATE",
    CLIENT_ID: `ID`,
    CLIENT_SECRET: `SECRET`
}