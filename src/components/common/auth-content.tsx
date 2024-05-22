'use client';

import {
  Avatar,
  Button,
  NavbarItem,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@nextui-org/react';
import * as actions from '@/actions';
import { useSession } from 'next-auth/react';

export default function AuthContent() {
  const session = useSession();

  if (session.status === 'loading') {
    return null;
  }

  if (session.data?.user) {
    return (
      <Popover placement="left">
        <PopoverTrigger>
          <Avatar src={session.data?.user.image || ''} />
        </PopoverTrigger>
        <PopoverContent>
          <div className="py-4">
            <form action={actions.signOut}>
              <Button type="submit">Sign Out</Button>
            </form>
          </div>
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <div className="flex gap-4">
      <NavbarItem>
        <form action={actions.signIn}>
          <Button type="submit" color="secondary" variant="bordered">
            Sign In
          </Button>
        </form>
      </NavbarItem>
      <NavbarItem>
        <form action={actions.signIn}>
          <Button type="submit" color="primary" variant="flat">
            Sign Up
          </Button>
        </form>
      </NavbarItem>
    </div>
  );
}
