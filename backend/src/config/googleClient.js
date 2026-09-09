import { OAuth2Client } from "google-auth-library"
import config from "./index.js"

const googleClient = new OAuth2Client(
  config.GOOGLE_CLIENT_ID,
  config.GOOGLE_CLIENT_SECRET,
  config.GOOGLE_REDIRECT_URI
)

export default googleClient