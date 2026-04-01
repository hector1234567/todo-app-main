import { createLazyFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import Modal from '../Modal';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const Route = createLazyFileRoute('/register')({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  // const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  async function submitRegisterForm(event) {
    event.preventDefault();

    if (password !== confirmPassword) {
      console.log('Passwords do not match');
      setMessage('Passwords do not match');
      return;
    }

    try {
      const response = await fetch(`${BASE_URL || ''}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error('Registration failed');
      }

      const data = await response.json();
      console.log('Registration successful:', data);
      // Handle successful registration (e.g., redirect to login)
      navigate({ to: '/login' });
    } catch (error) {
      console.error('Error registering:', error);
      if (error.message.indexOf('UNIQUE')) {
        setMessage('Username already exists. Please choose a different one.');
      } else {
        setMessage('Registration failed.');
      }
    }
  }

  return (
    <main>
      <form action="" className="login-form" onSubmit={submitRegisterForm}>
        <h2>Register</h2>
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
          autoComplete="webauthn new-password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={confirmPassword}
          required
          autoComplete="webauthn repeat-password"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button type="submit">Register</button>
      </form>

      {message && (
        <Modal>
          <p>{message}</p>
          <button onClick={() => setMessage('')}>Close</button>
        </Modal>
      )}
    </main>
  );
}
