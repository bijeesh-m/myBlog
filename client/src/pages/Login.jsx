import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {

  const [formValues, setFormValues] = useState({
    username: "",
    password: ""
  })


  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value })
  }


  const handleSubmit = async (e) => {
    e.preventDefault();


    // login functionality

    const res = await fetch("http://localhost:5000/login", {
      method: "POST", body: JSON.stringify(formValues),
      headers: { "Content-Type": "application/json" }, credentials: 'include'
    })

    const data = await res.json()

    if (data.success) {
      alert("Login successfull")
      navigate("/")
    } else {
      alert(data.message)
    }


  }




  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-80 rounded-lg bg-white p-8 shadow-lg">

        <h2 className="mb-6 text-center text-2xl font-bold">
          Login
        </h2>

        <form onSubmit={handleSubmit}>
          <input
            name='username'
            value={formValues.username}
            onChange={handleChange}
            type="text"
            placeholder="username"
            className="mb-4 w-full rounded border p-3 outline-none focus:border-blue-500"
          />

          <input
            name='password'
            value={formValues.password}
            onChange={handleChange}
            type="password"
            placeholder="Password"
            className="mb-4 w-full rounded border p-3 outline-none focus:border-blue-500"
          />

          <button
            type="submit"
            className="w-full rounded bg-blue-500 p-3 text-white hover:bg-blue-600"
          >
            Login
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?
          <a href="#" className="ml-1 text-blue-500">
            Register
          </a>
        </p>

      </div>
    </div>
  );
}

export default Login;