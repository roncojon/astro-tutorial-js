export function checkOrigin(request: Request, allowedOrigins: string[]): boolean {
  // console.log('request.headers', request.headers);
  console.log('request.headers.getOrigin', request.headers.get('origin') );
  console.log('request.headers.getReferer', request.headers.get('referer') );
  const origin = request.headers.get('origin') || request.headers.get('referer');
  return allowedOrigins.some(allowedOrigin => origin?.startsWith(allowedOrigin));
}

export const allowedOrigins = ['https://irachile.com', 'https://www.irachile.com', 'http://localhost:4321'];