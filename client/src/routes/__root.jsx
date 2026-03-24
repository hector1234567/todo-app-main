import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { Link } from '@tanstack/react-router';
import ThemeButton from '../ThemeButton';

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <>
      <header>
        <h1>
          <Link to="/">Todo</Link>
        </h1>
        <Link to="/auth" class="header-link">
          <img src="./images/icon-user.svg" alt="icon user" />
        </Link>
        <ThemeButton />
      </header>
      <main>
        <Outlet />
        <TanStackRouterDevtools />
      </main>
    </>
  );
}
