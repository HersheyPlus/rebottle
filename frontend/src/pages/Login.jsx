import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useAuth } from "../contexts/AuthContext";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const { login } = useAuth();

  const onSubmit = async (data) => {
    setIsLoading(true);
    setError("");
    try {
      await login(data.email, data.password);
      navigate("/profile");
    } catch (err) {
      console.error('Login error:', err);
      setError(err.message || err.response?.data?.message || "An error occurred during login");
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <section id="login" className="section-container h-screen">
      <div className="max-w-xl mx-auto mt-10 p-6 bg-gray-50 rounded-lg shadow-lg">
        <h2 className="text-2xl font-light mb-8">Welcome !</h2>
        <h1 className="text-4xl font-medium mb-3">Log in</h1>
        <p className="text-gray-600 mb-12 font-light">Let&apos;s join our website, get various of reward.</p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-10">
            <label htmlFor="email" className="block text-lg font-medium text-primary mb-2">Email</label>
            <input 
              type="email" 
              id="email" 
              placeholder="Enter your email" 
              className={`w-full px-3 py-2 border rounded-md placeholder-secondary focus:outline-none focus:ring-2 ${errors.email ? 'border-red-500 focus:ring-red-500' : 'border-secondary focus:ring-secondary'}`}
              {...register("email", { 
                required: "Email is required", 
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address"
                }
              })}
            />
            {errors.email && <p className="mt-1 text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          <div className="mb-16">
            <label htmlFor="password" className="block text-lg font-medium text-gray-700 mb-2">Password</label>
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"}
                id="password" 
                placeholder="Enter your password" 
                className={`w-full px-3 py-2 border rounded-md placeholder-secondary focus:outline-none focus:ring-2 ${errors.password ? 'border-red-500 focus:ring-red-500' : 'border-secondary focus:ring-secondary'}`}
                {...register("password", { 
                  required: "Password is required",
                })}
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showPassword ? <FaEye className="h-5 w-5 text-gray-400" /> : <FaEyeSlash className="h-5 w-5 text-gray-400" />}
              </button>
            </div>
            {errors.password && <p className="mt-1 text-red-500 text-sm">{errors.password.message}</p>}
          </div>

          {error && <p className="mt-1 text-red-500 text-sm mb-4">{error}</p>}
          <button 
            type="submit" 
            className="w-full bg-primary text-white p-4 rounded-2xl hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-secondary mb-16"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Log in"}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-gray-600">
          Don&apos;t have an Account? 
          <Link to="/register" className="font-medium text-primary hover:underline underline-offset-2 ml-1">Register</Link>
        </p>
      </div>
    </section>
  );
};

export default Login;