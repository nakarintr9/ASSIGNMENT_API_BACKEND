require('dotenv').config();

module.exports = {
    PORT: process.env.PORT,
    DOMAIN: process.env.DOMAIN,
    JWT_SECRET: process.env.JWT_SECRET,
    GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY,
    LINE_MESSAGING_API_ACCESS_TOKEN: process.env.LINE_MESSAGING_API_ACCESS_TOKEN,
    LINE_MESSAGING_API_SECRET: process.env.LINE_MESSAGING_API_SECRET
}