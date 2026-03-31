import React, { useEffect } from 'react';
import iconSun from '/images/icon-sun.svg';
import iconMoon from '/images/icon-moon.svg';

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
    <button onClick={switchTheme} className="header-link">
      {theme === 'dark' ? (
        <img src={iconSun} alt="icon sun" />
      ) : (
        <img src={iconMoon} alt="icon moon" />
      )}
    </button>
  );
}
