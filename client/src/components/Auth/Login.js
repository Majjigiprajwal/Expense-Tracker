import React,{useState} from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'
import {FaRupeeSign} from "react-icons/fa"

const Login = () => {
   
  const navigate = useNavigate();

  const [user,setUser] = useState({
    name:"",
    email:"",
    password:"",
    confirmPassword:"",
    isPremium:false
  })

  const handleChange = (e)=>{
      setUser({
        ...user,
        [e.target.name]:e.target.value
      })
  }

  const handleSubmit = async (e)=>{
    e.preventDefault();
    if(user.name.trim()==="" || user.email.trim()==="" || user.password.trim()==="" || user.confirmPassword.trim()===""){
      toast.error('Fill all the details correctly', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
        return
    }
    else if(user.password !== user.confirmPassword){
      toast.error('Passwords do not match', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
        return
    }
    else if(user.password.length < 8){
      toast.error('Passwords should be alteast 8 characters', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
        return 
    }
    try{
      let response = await axios.post('http://localhost:4000/register',user);
      if(response.status === 201){
        toast.success('Account created successfully', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          });
         navigate("/")
      }
    }
    catch(error){
      if(error?.response?.status === 400){
        toast.error('Email already exists,Please try with different Email address',{
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          });
          return
      }  
      toast.error("Could not signup at the moment,please try after sometime",{
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
    }  
  }
  return (
    <>
    <div className="bg-black flex min-h-full  flex-1 flex-col h-screen items-center justify-center  px-6 py-12 lg:px-8 border border-solid border-gray-400 p-4">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="text-center text-3xl mb-5 text-yellow-400 font-bold leading-9 tracking-tight mb:text-2xl">
            Sign up for an account
          </h2>
        </div>

        <div className="mt-7 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={(e)=>{handleSubmit(e)}}>

          <div>
              <label htmlFor="name" className="block text-lg font-bold leading-6 text-yellow-400">
                Full Name
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  onChange={(e)=>{
                    handleChange(e)
                  }}
                  required
                  className="block w-full rounded-md border-0 py-1.5 px-1.5 text-xl font-semibold text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-black focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-lg font-bold leading-6 text-yellow-400">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  onChange={(e)=>{
                    handleChange(e)
                  }}
                  required
                  className="block w-full rounded-md border-0 py-1.5 px-1.5  text-xl font-semibold text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-black focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-lg font-bold leading-6 text-yellow-400">
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  onChange={(e)=>{
                    handleChange(e)
                  }}
                  required
                  className="block w-full rounded-md border-0 py-1.5 px-1.5 text-xl font-semibold text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-black focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="confirmPassword" className="block text-lg font-bold leading-6 text-yellow-400">
                  Confirm Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="Password"
                  onChange={(e)=>{
                    handleChange(e)
                  }}
                  required
                  className="block w-full rounded-md border-0 py-1.5 px-1.5 text-xl font-semibold text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-black focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-yellow-400 px-3 py-1.5 text-base font-semibold leading-6 text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 mt-10"
              >
                Create Account
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Login

