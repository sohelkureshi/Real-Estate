import '../style/signin.css';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice';
import OAuth from '../components/OAuth';

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      navigate('/');
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className="signin-container">
      <div className="auth-curve"></div>
      
      <div className="signin-card">
        <div className="auth-header">
          <h1>Welcome Back</h1>
          <p>Sign in to access your personalized dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="input-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              className="auth-input"
              placeholder="name@example.com"
              onChange={handleChange}
              autoComplete="email"
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              className="auth-input"
              placeholder="••••••••"
              onChange={handleChange}
              autoComplete="current-password"
            />
          </div>

          <button disabled={loading} className="auth-btn">
            {loading ? (
              <div className="loader"></div>
            ) : (
              'Sign In →'
            )}
          </button>

          <div className="divider">
            <span>or continue with</span>
          </div>

          <OAuth />
        </form>

        <div className="auth-footer">
          <p>New to EstateEase? <Link to="/sign-up" className="auth-link">Create account</Link></p>
        </div>

        {error && <div className="auth-error">{error}</div>}
      </div>

      <div className="auth-decoration">
        <div className="deco-circle"></div>
        <div className="deco-wave"></div>
      </div>
    </div>
  );
}
