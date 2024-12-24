export default function cookieConfig(expires: Date) {
  return {
    httpOnly: true,
    sameSite: 'strict' as const,
    secure: process.env.NODE_ENV === 'production',
    domain:
      process.env.NODE_ENV === 'production'
        ? `.${process.env.COOKIE_URL}`
        : process.env.COOKIE_URL || 'localhost', // use backend URL or 'localhost' as domain in development
    expires,
  };
}
