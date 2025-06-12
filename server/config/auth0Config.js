import {auth} from 'express-oauth2-jwt-bearer'

const jwtCheck = auth({
    audience: "https://real-estate-app.com/api",
    issuerBaseURL: "https://dev-2v34ccldaqvwxn6m.us.auth0.com",
    tokenSigningAlg: "RS256"
})

export default jwtCheck