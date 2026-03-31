import { createLazyFileRoute, Link } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import Modal from '../Modal';

export const Route = createLazyFileRoute('/login')({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

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
      localStorage.setItem('token', 'Bearer ' + data.token); // Store token in localStorage

      if (window.PasswordCredential && password) {
        const credential = new PasswordCredential({
          id: username,
          username,
          password,
        });
        navigator.credentials.store(credential);
      }

      navigate({ to: '/' }); // Redirect to home page after successful login
    } catch (error) {
      console.error('Error logging in:', error);
      setMessage('Login failed. Please check your credentials and try again.');
    }
  }

  async function autologin() {
    if (window.PasswordCredential) {
      const credentials = await navigator.credentials.get({ password: true });
      try {
        setUsername(credentials.id);
        setPassword(credentials.password);
        // await submitLoginForm(new Event('submit'));
      } catch (e) {
        console.error('Autologin failed:', e);
      }
    }
  }

  useEffect(() => {
    autologin();
  }, []);

  if (message) {
    return (
      <Modal>
        <p>{message}</p>
        <button onClick={() => setMessage('')}>Close</button>
      </Modal>
    );
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
          required
          autoComplete="webauthn username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          value={password}
          required
          autoComplete="webauthn current-password"
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
