'use client';

import { useRouter } from 'next/navigation';
import { routes } from '../routes';
export const useRouterGuard = () => {
  const router = useRouter();

  const goHome = () => router.push(routes.home);
  const goLogin = () => router.push(routes.login);
  const goDashboard = () => router.push(routes.dashboard);

  return { goHome, goLogin, goDashboard };
};
