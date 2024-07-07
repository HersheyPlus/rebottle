import { useState } from "react";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useForm } from "react-hook-form";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, formState: { errors }, watch } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    // Here you would typically send the data to your backend
  };

  const password = watch("password");

  return (
    <section id="register" className="section-container h-screen">
      <div className="max-w-xl mx-auto mt-10 p-6 bg-gray-50 rounded-lg shadow-lg">
        <h2 className="text-2xl font-light mb-8">Welcome !</h2>
        <h1 className="text-4xl font-medium mb-3">Register</h1>
        <p className="text-gray-600 mb-12 font-light">Let&apos;s be a part of our website, for helping earth.</p>

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

          <div className="mb-10">
            <label htmlFor="password" className="block text-lg font-medium text-gray-700 mb-2">Password</label>
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"}
                id="password" 
                placeholder="Enter your password" 
                className={`w-full px-3 py-2 border rounded-md placeholder-secondary focus:outline-none focus:ring-2 ${errors.password ? 'border-red-500 focus:ring-red-500' : 'border-secondary focus:ring-secondary'}`}
                {...register("password", { 
                  required: "Password is required",
                  minLength: {
                    value: 4,
                    message: "Password must be at least 4 characters long"
                  }
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

          <div className="mb-16">
            <label htmlFor="confirmPassword" className="block text-lg font-medium text-gray-700 mb-2">Confirm Password</label>
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"}
                id="confirmPassword" 
                placeholder="Confirm your password" 
                className={`w-full px-3 py-2 border rounded-md placeholder-secondary focus:outline-none focus:ring-2 ${errors.confirmPassword ? 'border-red-500 focus:ring-red-500' : 'border-secondary focus:ring-secondary'}`}
                {...register("confirmPassword", { 
                  required: "Please confirm your password",
                  validate: value => value === password || "Passwords do not match"
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
            {errors.confirmPassword && <p className="mt-1 text-red-500 text-sm">{errors.confirmPassword.message}</p>}
          </div>

          <button 
            type="submit" 
            className="w-full bg-primary text-white p-4 rounded-2xl hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-secondary mb-16"
          >
            Register
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-gray-600">
          Already have an Account? 
          <Link to="/login" className="font-medium text-primary hover:underline underline-offset-2 ml-1">Log in</Link>
        </p>
      </div>
    </section>
  )
}

export default Register;