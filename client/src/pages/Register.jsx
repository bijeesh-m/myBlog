import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'


const Register = () => {


    const [formData, setFormData] = useState({

        username: "",

        email: "",

        password: "",

        age: ""

    })

    const navigate = useNavigate()




    const handleChange = (e) => {

        const { name, value } = e.target


        setFormData({

            ...formData,

            [name]: value

        })

    }


    const handleSubmit = async (e) => {

        e.preventDefault()

        try {

            const res = await fetch("http://localhost:5000/register", { method: "POST", body: JSON.stringify(formData), headers: { 'Content-Type': 'application/json' } })


            const data = await res.json()


            console.log(data);

            if (data.success) {

                setFormData({ username: "", password: "", email: "", age: "" })

                alert("User registration successfull")
                navigate("/login")

            }


        } catch (error) {

            console.log(error);


        }

    }


    return (

        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">

            <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">


                <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">

                    Create Account

                </h1>


                <p className="text-center text-gray-500 mb-6">

                    Register to create your account

                </p>


                <form onSubmit={handleSubmit} className="space-y-5">


                    {/* Username */}

                    <div>

                        <label className="block text-sm font-medium text-gray-700 mb-2">

                            Username

                        </label>


                        <input

                            type="text"

                            name="username"

                            value={formData.username}

                            onChange={handleChange}

                            placeholder="Enter your username"

                            className="w-full px-4 py-3 border border-gray-300 rounded-lg

                            focus:outline-none focus:ring-2 focus:ring-blue-500

                            focus:border-blue-500"

                        />

                    </div>


                    {/* Email */}

                    <div>

                        <label className="block text-sm font-medium text-gray-700 mb-2">

                            Email

                        </label>


                        <input

                            type="email"

                            name="email"

                            value={formData.email}

                            onChange={handleChange}

                            placeholder="Enter your email"

                            className="w-full px-4 py-3 border border-gray-300 rounded-lg

                            focus:outline-none focus:ring-2 focus:ring-blue-500

                            focus:border-blue-500"

                        />

                    </div>


                    {/* Password */}

                    <div>

                        <label className="block text-sm font-medium text-gray-700 mb-2">

                            Password

                        </label>


                        <input

                            type="password"

                            name="password"

                            value={formData.password}

                            onChange={handleChange}

                            placeholder="Enter your password"

                            className="w-full px-4 py-3 border border-gray-300 rounded-lg

                            focus:outline-none focus:ring-2 focus:ring-blue-500

                            focus:border-blue-500"

                        />

                    </div>


                    {/* Age */}

                    <div>

                        <label className="block text-sm font-medium text-gray-700 mb-2">

                            Age

                        </label>


                        <input

                            type="number"

                            name="age"

                            value={formData.age}

                            onChange={handleChange}

                            placeholder="Enter your age"

                            className="w-full px-4 py-3 border border-gray-300 rounded-lg

                            focus:outline-none focus:ring-2 focus:ring-blue-500

                            focus:border-blue-500"

                        />

                    </div>


                    {/* Register Button */}

                    <button

                        type="submit"

                        className="w-full bg-blue-600 text-white py-3 rounded-lg

                        font-semibold hover:bg-blue-700 transition duration-200"

                    >

                        Register

                    </button>


                </form>


                <p className="text-center text-sm text-gray-500 mt-6">

                    Already have an account?{' '}

                    <a

                        href="#"

                        className="text-blue-600 font-medium hover:underline"

                    >

                        Login

                    </a>

                </p>


            </div>

        </div>

    )

}


export default Register








