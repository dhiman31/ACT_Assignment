import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    emailId: "",
    password: "",
    role: "CLIENT",
  });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const errs = {};
    if (!form.firstName.trim()) errs.firstName = "First name is required";
    if (!form.emailId) {
      errs.emailId = "emailId is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.emailId)) {
      errs.emailId = "Enter a valid emailId";
    }
    if (!form.password) errs.password = "Password is required";
    else if (form.password.length < 6)
      errs.password = "Password must be at least 6 characters";
    return errs;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
    setServerError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) return setErrors(errs);

    setLoading(true);
    try {
      const res = await fetch("http://localhost:3001/v1/user/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: form.firstName,
          lastName: form.lastName,
          emailIdId: form.emailId,
          password: form.password,
          role: form.role,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Signup failed");
      navigate("/login");
    } catch (err) {
      setServerError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <h1 className="text-2xl font-semibold text-gray-800 mb-1">Create account</h1>
        <p className="text-sm text-gray-500 mb-6">Fill in the details to get started</p>

        {serverError && (
          <div className="mb-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded px-3 py-2">
            {serverError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-3">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                First name
              </label>
              <input
                type="text"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                placeholder="John"
                className={`w-full border rounded px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-400 transition ${
                  errors.firstName ? "border-red-400" : "border-gray-300"
                }`}
              />
              {errors.firstName && (
                <p className="text-xs text-red-500 mt-1">{errors.firstName}</p>
              )}
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Last name
              </label>
              <input
                type="text"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                placeholder="Doe"
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-400 transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              emailId
            </label>
            <input
              type="text"
              name="emailId"
              value={form.emailId}
              onChange={handleChange}
              placeholder="you@example.com"
              className={`w-full border rounded px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-400 transition ${
                errors.emailId ? "border-red-400" : "border-gray-300"
              }`}
            />
            {errors.emailId && (
              <p className="text-xs text-red-500 mt-1">{errors.emailId}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="min. 6 characters"
              className={`w-full border rounded px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-400 transition ${
                errors.password ? "border-red-400" : "border-gray-300"
              }`}
            />
            {errors.password && (
              <p className="text-xs text-red-500 mt-1">{errors.password}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Role
            </label>
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-400 transition bg-white"
            >
              <option value="CLIENT">Client</option>
              <option value="ADMIN">Admin</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gray-800 text-white text-sm font-medium py-2 rounded hover:bg-gray-700 transition disabled:opacity-60"
          >
            {loading ? "Creating account..." : "Sign up"}
          </button>
        </form>

        <p className="text-sm text-gray-500 mt-5 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-gray-800 font-medium hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}