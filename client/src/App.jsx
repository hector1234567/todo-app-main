import { createRoot } from 'react-dom/client';
import ThemeButton from './ThemeButton';
import { StrictMode } from 'react';
import { Link, RouterProvider, createRouter } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';

const router = createRouter({ routeTree });

function App() {
  return <RouterProvider router={router} />;
}

const root = createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
