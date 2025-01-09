import { NavLink, useNavigate } from "react-router-dom";
import Input from "../components/Input";
import { useState } from "react";
import axios from "axios";

const baseUrl = "http://localhost:4000/api/v1";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
   
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form submission
    setIsLoading(true); // Add loading state

    try {
      // Disable default form submission
      e.stopPropagation();
      
      // Make API call
      const response = await axios.post(`${baseUrl}/user/signin`, formData);
      
      // Log response for debugging
      console.log("Signup Response:", response.data);

      // Check if response is successful
      if (response.data) {
        // Store token if it exists
        if (response.data.token) {
          localStorage.setItem('token', response.data.token);
        }

        // Wait a brief moment before navigation
        setTimeout(() => {
          navigate('/dashboard', { replace: true });
        }, 100);
      }
    } catch (error) {
      console.error("Signup Error:", error);
      setError(
        error.response?.data?.message || 
        "Error signing up. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-[#7F7F7F]">
      <div className="flex flex-col px-12 py-4 bg-white border border-slate-500 gap-4 rounded-lg">
        <span className="flex flex-col items-center gap-2 ">
          <h1 className="text-3xl font-bold ">Sign In</h1>
          <p className="font-light text-sm text-center">
            Enter your credentials to access your account
          </p>
        </span>

        <form 
          onSubmit={handleSubmit} 
          className="flex flex-col gap-3"
          method="POST" 
        >
          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}
          
          <Input
            label={"Username"}
            onChange={handleInputChange}
            placeholder={"@xyz"}
            type={"text"}
            value={formData.username}
            name="username"
          />
          <Input
            label={"password"}
            onChange={handleInputChange}
            placeholder={"!!*/+=!`><"}
            type={"password"}
            value={formData.password}
            name="password"
          />

          <button 
            type="submit" 
            className="bg-gray-800 text-white py-1 rounded-xl mt-3"
            disabled={isLoading}
          >
            {isLoading ? 'Signing up...' : 'Sign Up'}
          </button>
        </form>
        <p className="text-xs">
         Dont have an Account?{" "}
          <span className="underline">
            <NavLink to={"/signup"}>Login </NavLink>
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;