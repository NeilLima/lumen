export const registerRoutes = {
  register: '/registro',
  login: '/login',
  dashboard: '/',
};

export const REGISTER_API = {
  endpoint: 'auth/register',
  successRedirect: registerRoutes.dashboard,
};
