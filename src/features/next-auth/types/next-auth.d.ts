import type { DefaultSession } from 'next-auth';

import type { SessionUser } from '../models';

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session extends DefaultSession {
    user: SessionUser;
  }
}
