import { verify } from 'jsonwebtoken';

export function socketAuthenticationMiddleware(socket, next) {
  if (socket.handshake.query && socket.handshake.query.token) {
    verify(
      socket.handshake.query.token,
      process.env.JWT_TOKEN_SECRET,
      (err, decoded) => {
        if (err) return next(new Error('Authentication error'));
        socket.decoded = decoded;
        next();
      },
    );
  } else {
    next(new Error('Authentication error'));
  }
}
