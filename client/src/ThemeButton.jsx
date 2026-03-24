import React, { useEffect } from 'react';

export default function ThemeButton() {
  const [theme, setTheme] = React.useState(
    window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  );

  function switchTheme() {
    setTheme((theme) => (theme === 'light' ? 'dark' : 'light'));
  }

  useEffect(() => {
    document.startViewTransition(() => {
      document.documentElement.setAttribute('data-theme', theme);
    });
  }, [theme]);

  return (
    <button onClick={switchTheme} class="header-link">
      {theme === 'dark' ? (
        <img src="./images/icon-sun.svg" alt="icon sun" />
      ) : (
        <img src="./images/icon-moon.svg" alt="icon moon" />
      )}
    </button>
  );
}
