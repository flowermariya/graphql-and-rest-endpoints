const restAuthConfig = {
  secret: 'jwt-secret',
  signOptions: { expiresIn: 60 * 60 * 24 },
};

export default restAuthConfig;
