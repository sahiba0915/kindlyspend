import React, { useContext, useState } from 'react'
import AuthLayout from "../../components/layouts/AuthLayout"
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../components/inputs/Input';
import { validateEmail } from '../../utils/helper';
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from '../../utils/apiPaths';
import { UserContext } from '../../context/userContext';

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const {updateUser} = useContext(UserContext)

  const navigate = useNavigate()

  const handleLogin = async(e) => {
    e.preventDefault();

    if(!validateEmail(email)){
      setError("Please enter a valid email address");
      return;
    }

    if(!password){
      setError("Please enter the password");
      return;
    }

    setError("")

    // LOGIN API CALL
    try{
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });
      const{token, user} = response.data;

      if(token){
        localStorage.setItem("token", token);
        updateUser(user)
        navigate("/dashboard");
      }
    }catch(error){
      if(error.response && error.response.data.message){
        setError(error.response.data.message);
      }else{
        setError("Something went wrong. Please try again.")
      }
    }
  }

  console.log(error)
  return (
    <AuthLayout>
    <div className='lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center'>
      <h3 className='text-xl font-semibold text-black'>Welcome</h3>
       <p className='text-xs text-slate-700 mt-[5px] mb-6'>Please enter your details to login</p>
       <form onSubmit={handleLogin}>
        <Input 
        value={email}
        label="Email Address"
        placeholder="john@emaple.com"
        type="text"
        onChange={({target}) => setEmail(target.value)}/>

       <Input 
        value={password}
        label="Password"
        placeholder="Min 8 Characters"
        type="password"
        onChange={({target}) => setPassword(target.value)}/>

        {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}

        <button type="submit" className='btn-primary'>
         LOGIN
        </button>

        <p className='text-[13px] text-slate-800 mt-3 '>
          Don&apos;t have and account?{" "}
          <Link className="underline font-medium text-primary" to="/signup">
          Signup
          </Link>
        </p>
         
       </form>
    </div>
    </AuthLayout>
  )
}

export default Login