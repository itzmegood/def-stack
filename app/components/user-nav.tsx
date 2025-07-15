import { HomeIcon, LogOutIcon, UserCogIcon } from 'lucide-react';
import { useNavigate, useSubmit } from 'react-router';
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';
import { Button } from './ui/button';

export function UserNav({
  user,
}: {
  user: { name: string; email: string; image: string };
}) {
  const navigate = useNavigate();
  const submit = useSubmit();
  const avatar = `https://api.dicebear.com/9.x/glass/svg?seed=${user?.name}`;
  const initials = user?.name?.slice(0, 2);
  const alt = user?.name ?? 'User avatar';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="size-8 rounded-full" size="icon" variant="ghost">
          <Avatar className="size-8">
            <AvatarImage alt={alt} src={avatar} />
            <AvatarFallback className="font-bold text-xs uppercase">
              {initials}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48" sideOffset={4}>
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
            <Avatar className="h-8 w-8 rounded-full">
              <AvatarImage alt={alt} src={avatar} />
              <AvatarFallback className="rounded-lg">{initials}</AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">{user.name}</span>
              <span className="truncate text-muted-foreground text-xs">
                {user.email}
              </span>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            navigate('/');
          }}
        >
          <HomeIcon />
          Home
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            navigate('/settings/account');
          }}
        >
          <UserCogIcon />
          Settings
        </DropdownMenuItem>

        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            setTimeout(() => {
              submit(null, { method: 'POST', action: '/auth/sign-out' });
            }, 100);
          }}
        >
          <LogOutIcon />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
