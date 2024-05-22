import { auth } from '@/auth';
import {
  Avatar,
  Button,
  NavbarItem,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@nextui-org/react';
import * as actions from '@/actions';

export default async function AuthContent() {
  const session = await auth();

  if (session?.user) {
    return (
      <Popover placement="left">
        <PopoverTrigger>
          <Avatar src={session.user.image || ''} />
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
