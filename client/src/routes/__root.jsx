import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { Link } from '@tanstack/react-router';
import ThemeButton from '../ThemeButton';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import ErrorBoundary from '../ErrorBoundary';
import iconUser from '/images/icon-user.svg';

export const Route = createRootRoute({
  component: ErrorBoundaryWrappedRootComponent,
});

function ErrorBoundaryWrappedRootComponent() {
  return (
    <ErrorBoundary>
      <RootComponent />
    </ErrorBoundary>
  );
}

function RootComponent() {
  return (
    <>
      <header>
        <h1>
          <Link to="/">Todo</Link>
        </h1>
        <Link to="/login" className="header-link">
          <img src={iconUser} alt="icon user" />
        </Link>
        <ThemeButton />
      </header>
      <Outlet />
      {/* <TanStackRouterDevtools />
      <ReactQueryDevtools /> */}
    </>
  );
}
