import React from 'react';
import {useState} from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import {FaRupeeSign} from "react-icons/fa"

const Signup = () => {

  const navigate = useNavigate();
      
  const [user,setUser] = useState({
    email:"",
    password :""
  })
  const handleChange = (e)=>{
      setUser({
        ...user,
        [e.target.name]:e.target.value
      })
      
  }
  const handleSubmit = async (e)=>{
    e.preventDefault();
    if(user.email.trim()==="" || user.password.trim()===""){
      toast.error('Fill all the details', {
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
      let response = await axios.post('http://localhost:4000/login',user)
      toast.success("Login Succesful", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
      window.localStorage.setItem('token',JSON.stringify(response.data.token))  
      console.log(response.data.token)
      navigate("/dashboard");
    }
    catch(error){
     if(error?.response?.status === 401){
        toast.error("Password is incorrect", {
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

      if(error?.response?.status === 404){
        toast.error("Please register for an account,",{
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          });
          navigate("/signup")
          return
      }

      toast.error("Could not login at the moment,please try after sometime",{
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
  }
  return (
    <>
    <div className="bg-black flex min-h-full  flex-1 flex-col h-screen items-center justify-center   px-6 py-12 lg:px-8 border border-solid border-gray-400 p-4">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-yellow-400 mb:text-2xl mb:mb-5">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm mb:w-full">
          <form className="space-y-6 text-lg mb:text-lg" onSubmit={(e)=>{handleSubmit(e)}} >
            <div>
              <label htmlFor="email" className="block  font-bold leading-6 text-yellow-400 mb:text-xl">
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
                  className="block w-full rounded-md border-0 py-1 px-1.5 text-lg font-medium text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-black focus:ring-2 focus:ring-inset focus:ring-indigo-600 mb:text-xl"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block  font-bold leading-6 text-yellow-400 mb:text-xl">
                  Password
                </label>
                <div className="mb:text-right mb:text-xs text-sm">
                  <a className="font-semibold text-yellow-400 hover:text-white cursor-pointer" onClick={()=>navigate('/sendMail')}>
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  onChange={(e)=>{
                    handleChange(e)
                  }}
                  required
                  className="block w-full rounded-md border-0 py-1 px-1.5 text-black text-lg shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-black focus:ring-2 focus:ring-inset focus:ring-indigo-600 mb:text-xl"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-yellow-400 px-3 py-1.5 text-lg font-semibold leading-6 text-black shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 mb:text-xl"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-white">
          Don't have an account?{' '}
            <a  className="font-semibold leading-6 text-yellow-400 hover:text-white  cursor-pointer" onClick={()=>navigate('/signup')} >
              Signup
            </a>
          </p>
        </div>
      </div>
    </>
  )
}

export default Signup   
