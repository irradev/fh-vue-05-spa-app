import type { RouterGuard } from '@/modules/common/interfaces/router-guard.interface';

const isAuthenticatedGuard: RouterGuard = (to, from, next) => {
  const userId = localStorage.getItem('userId');

  // console.log(to);
  localStorage.setItem('lastPath', to.path);

  if (!userId) {
    return next({ name: 'login' });
  }

  return next();
};

export default isAuthenticatedGuard;
