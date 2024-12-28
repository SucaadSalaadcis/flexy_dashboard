
import React, { useState } from 'react'
import axiosPublicURL from '../../views/hooks/AxiosHook'
import Cookies from 'js-cookie'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function Sign_in() {

  const [show, setShow] = useState(false);

  const handleClick = () => {
    setShow(!show);
  };

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {

    const use_axios = axiosPublicURL();

    e.preventDefault();
    try {
      if (email == '' && password == '') {
        toast.success("All Fields are required")
      }
      const user_data = await use_axios.post('api/user/login',
        { email, password }, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      }).then((res) => {
        // ku store garey token in cookie 
        // console.log(res.data.accessToken);
        Cookies.set('token', res.data.accessToken, { expires: 7, });
        toast.success('User Logged In Successfully');
        // // Redirect user to dashboard
        navigate('/');

      })

    } catch (error) {
      console.error('Error user_data:', error.response);
    }
  }


  return (
    <body className="flex items-center justify-center h-screen overflow-hidden" style={{ background: "#edf2f7" }}>

      <div
        className="absolute top-0 bottom-0 left-0 w-full h-full overflow-hidden leading-5 bg-purple-900 bg-gradient-to-b from-[#a41af4] via-[#2552bd] to-[#a41af4]">

      </div>
      <div
        className="relative justify-center min-h-screen bg-transparent shadow-xl sm:flex sm:flex-row rounded-3xl">
        <div className="z-10 flex flex-col self-center lg:px-14 sm:max-w-4xl xl:max-w-md">
          <div className="flex-col self-start hidden text-gray-300 lg:flex">

            <h1 className="my-3 text-4xl font-semibold ">Welcome back</h1>
            <p className="pr-3 text-sm opacity-75">🚀 Adwaar Technologies: Innovating the Future of Software Development 🚀🌟 Our Origin: Adwaar Technologies, originally founded as Cawaale ICT in 2019 in Mogadishu, Somalia, began with a vision to revolutionize the software development landscape. Our roots ar...

            </p>
          </div>
        </div>
        <div className="z-10 flex self-center justify-center mt-1 md:mt-0">
          <div className="p-12 mx-auto bg-white h-[500px] rounded-3xl w-96 ">
            <div className="mb-7">
              <h3 className="text-2xl font-semibold text-gray-800">Sign In </h3>
              <p className="text-gray-400">Don'thave an account? <a href="#"
                className="text-sm text-[#a41af4]">Sign Up</a></p>
            </div>
            <div className="space-y-6">
              <div className="">
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 text-sm bg-gray-200 border border-gray-200 rounded-lg focus:bg-gray-100 focus:outline-none focus:border-[#1e4db7]"
                  type=""
                  placeholder="Email" />
              </div>


              <div className="relative" x-data="{ show: true }">
                <div>
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    type={show ? 'text' : 'password'} // Conditionally change type
                    className="w-full px-4 py-3 text-sm text-gray-500 bg-gray-200 border border-gray-200 rounded-lg focus:bg-gray-100 focus:outline-none focus:border-[#1e4db7]"
                  />
                  <button onClick={handleClick} className="mt-2 text-[#a41af4]">
                    Password
                  </button>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center mr-3 text-sm leading-5">

                </div>
              </div>


              <div className="flex items-center justify-between">

                <div className="ml-auto text-sm">
                  <a href="#" className="text-[#a41af4] ">
                    Forgot your password?
                  </a>
                </div>
              </div>
              <div>
                <button
                  onClick={handleSubmit}
                  className="flex justify-center w-full p-3 font-semibold tracking-wide text-gray-100 transition duration-500 ease-in bg-[#a41af4] rounded-lg cursor-pointer hover:bg-[#d5a9f3] hover:text-black">
                  Sign in
                </button>
              </div>
            
            </div>
            <div className="text-xs text-center text-gray-300 mt-7">
              <span>
                Copyright © 2024
                <a href="https://adwaar.com/" rel="" target="_blank" title="Codepen aji" className="text-[#a41af4] ">adwar</a></span>
            </div>
          </div>
        </div >
      </div >
      <footer className="absolute bottom-0 left-0 z-30 w-full bg-transparent">
        <div className="container flex items-center justify-between p-5 mx-auto ">
          <div className="flex mr-auto">
            <a href="https://adwaar.com/" target="_blank" title="codepen aji" className="text-center text-gray-700 "><strong>ADWAAR</strong></a>
          </div>

        </div>
      </footer>

      <svg className="absolute bottom-0 left-0 " xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#fff" fill-opacity="1" d="M0,0L40,42.7C80,85,160,171,240,197.3C320,224,400,192,480,154.7C560,117,640,75,720,74.7C800,75,880,117,960,154.7C1040,192,1120,224,1200,213.3C1280,203,1360,149,1400,122.7L1440,96L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"></path></svg>
    </body>
  )
}





