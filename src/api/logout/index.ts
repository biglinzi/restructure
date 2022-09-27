import { get } from '@/components/serverComponent/http/instance'
export function logout() {
  return get({
    url: '/api/auth/doLogout',
  });
}
