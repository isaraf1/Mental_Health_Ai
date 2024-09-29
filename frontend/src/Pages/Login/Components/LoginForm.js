import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginForm = ({ switchToSignup }) => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/landing'); // Redirect to landing page after successful login
    } catch (err) {
      if (err.code === 'auth/user-not-found') {
        setError('User not found. Redirecting to sign up...');
        // Switch to signup form after a short delay
        setTimeout(() => {
          switchToSignup();
        }, 2000);
      } else if (err.code === 'auth/wrong-password') {
        setError('Incorrect password. Please try again.');
      } else {
        setError('Failed to log in. Please check your credentials.');
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {/* Email Field */}
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <FloatingLabel
            controlId="floatingInput"
            label="Email address"
            className="mb-3"
          >
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </FloatingLabel>
        </Form.Group>
        {/* Password Field */}
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <FloatingLabel controlId="floatingPassword" label="Password">
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </FloatingLabel>
        </Form.Group>
        <Button variant="primary" type="submit">
          Login
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
