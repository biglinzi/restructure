import { get } from '@/components/serverComponent/http/instance'
export function logout() {
  return get(
    '/api/auth/doLogout'
  );
}
