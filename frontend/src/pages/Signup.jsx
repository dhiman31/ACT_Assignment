import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ firstName: '', lastName: '', emailId: '', password: '' });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  

  const validate = () => {
    const newErrors = {};
    if (!form.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!form.emailId.trim()) newErrors.emailId = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.emailId)) newErrors.emailId = 'Enter a valid email address';
    if (!form.password) newErrors.password = 'Password is required';
    else if (form.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    return newErrors;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
    setServerError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/v1/user/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setServerError(data.message || 'Signup failed. Please try again.');
      } else {
        localStorage.setItem("token", data.data.token);
        localStorage.setItem("user", JSON.stringify(data.data.user));
        navigate("/dashboard");
      }
    } catch (err) {
      setServerError('Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md bg-gray-900 border border-gray-800 rounded-2xl p-8 shadow-xl">

        {/* Brand */}
        <div className="flex items-center gap-2 mb-1">
          <span className="text-indigo-400 text-xl">◈</span>
          <span className="text-white font-extrabold tracking-widest text-lg">
Avyukt Core Technology</span>
        </div>
        <p className="text-gray-500 text-sm mb-7">Create your account to get started</p>

        {/* Server Error */}
        {serverError && (
          <div className="flex items-start gap-2 bg-red-950 border border-red-700 text-red-400 rounded-xl px-4 py-3 text-sm mb-5">
            <span className="mt-0.5">⚠</span>
            <span>{serverError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">

          {/* First + Last Name Row */}
          <div className="flex gap-3">
            <div className="flex flex-col gap-1 flex-1">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">First Name</label>
              <input
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                placeholder="John"
                className={`bg-gray-800 border ${errors.firstName ? 'border-red-500' : 'border-gray-700'} rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 outline-none focus:border-indigo-500 transition-colors w-full`}
              />
              {errors.firstName && <span className="text-xs text-red-400">{errors.firstName}</span>}
            </div>
            <div className="flex flex-col gap-1 flex-1">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Last Name</label>
              <input
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                placeholder="Doe"
                className="bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 outline-none focus:border-indigo-500 transition-colors w-full"
              />
            </div>
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Email Address</label>
            <input
              name="emailId"
              type="email"
              value={form.emailId}
              onChange={handleChange}
              placeholder="john@example.com"
              className={`bg-gray-800 border ${errors.emailId ? 'border-red-500' : 'border-gray-700'} rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 outline-none focus:border-indigo-500 transition-colors`}
            />
            {errors.emailId && <span className="text-xs text-red-400">{errors.emailId}</span>}
          </div>

          {/* Password */}
          {/* Password */}
          <div className="flex flex-col gap-1 relative">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Password
              </label>

              <input
                name="password"
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className={`bg-gray-800 border ${
                        errors.password ? 'border-red-500' : 'border-gray-700'
                } rounded-xl px-4 py-3 pr-12 text-sm text-white placeholder-gray-600 outline-none focus:border-indigo-500 transition-colors`}
              />
              {/* Toggle */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-9 text-gray-400 hover:text-indigo-400 transition"
                >
                   <span className="material-icons text-[20px]">
                   {showPassword ? "visibility_off" : "visibility"}
                   </span>
                </button>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="mt-1 w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-xl py-3 text-sm tracking-wide transition-colors flex items-center justify-center gap-2"
          >
            {loading ? (
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
              </svg>
            ) : (
              'Create Account →'
            )}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-indigo-400 font-semibold hover:text-indigo-300 transition-colors">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}