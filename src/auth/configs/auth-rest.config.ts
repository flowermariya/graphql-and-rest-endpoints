require('dotenv').config();

const restAuthConfig = {
  secret: process.env.JWT_TOKEN_SECRET,
  signOptions: { expiresIn: Number(process.env.JWT_TOKEN_LIFE) },
};

export default restAuthConfig;
