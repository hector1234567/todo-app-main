import { createLazyFileRoute, Link } from '@tanstack/react-router';
import { useState } from 'react';

export const Route = createLazyFileRoute('/login')({
  component: RouteComponent,
});

function RouteComponent() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  async function submitLoginForm(event) {
    event.preventDefault();

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      console.log('Login successful:', data);
      // Handle successful login (e.g., store token, redirect)
    } catch (error) {
      console.error('Error logging in:', error);
    }
  }

  return (
    <main>
      <form action="" className="login-form" onSubmit={submitLoginForm}>
        <h2>Login</h2>
        <input
          type="text"
          id="username"
          name="username"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
        <Link to="/register" className="register-link">
          Don't have an account? Register
        </Link>
      </form>
    </main>
  );
}
