/**
 * Cookie Security Middleware
 * Implements SameSite=Strict for all cookies to prevent CSRF attacks
 */
export function onRequest({ request, cookies, redirect }) {
  // Ensure all cookies have SameSite=Strict
  for (const cookie of cookies.getAll()) {
    cookies.set(cookie.name, cookie.value, {
      ...cookie,
      sameSite: 'strict',
      secure: true,
      httpOnly: true
    });
  }
  
  return;
}