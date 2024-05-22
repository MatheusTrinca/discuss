'use client';

import { useSession } from 'next-auth/react';

export default function Profile() {
  const session = useSession();

  return (
    <div>
      {session.data?.user
        ? JSON.stringify(session.data.user)
        : 'Not signed in from client'}
    </div>
  );
}
