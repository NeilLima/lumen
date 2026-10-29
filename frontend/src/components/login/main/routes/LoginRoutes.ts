export const loginRoutes = {
  login: '/login',
  register: '/registro',
  dashboard: '/',
};

export const LOGIN_API = {
  endpoint: 'auth/login',
  successRedirect: loginRoutes.dashboard,
};
