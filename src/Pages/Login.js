import { useState, useEffect } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import useValidPhone from "../Hooks/useValidPhone";
import { CircularProgress } from "@mui/material";
import { useAuth } from "../context/auth";
import axios from "axios";
import { Bars } from "react-loader-spinner";
import { ThreeDots } from "react-loader-spinner";
import { ToastContainer, toast, Zoom, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../Utils/style.css";
const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [phone, setPhone, PhoneError] = useValidPhone();
  const [hasPhone, sethasPhone] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handlShowPasword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  const handleSubmit = (e) => {
    if (e.key === "Enter") {
      LoginHandler();
    }
  };
  const LoginHandler = () => {
    if (!hasPhone) {
      if (!email) {
        toast.info(
          "please enter email",
          { theme: "colored" },
          {
            position: "bottom-center",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
          }
        );
        return;
      }
      if (!password) {
        toast.info(
          "please enter password",
          { theme: "colored" },
          {
            position: "bottom-center",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
          }
        );
        return;
      }
      loginMutationSubmitHandler();
    }
  };

  const loginMutation = useMutation(
    async (newData) =>
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}login`, newData, {
        headers,
      }),
    {
      retry: false,
    }
  );

  const loginMutationSubmitHandler = async (values) => {
    try {
      let formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);
      loginMutation.mutate(formData, {
        onSuccess: (responseData) => {
          console.log(responseData?.data);

          login(responseData?.data?.token, responseData?.data?.user);
        },
        onError: (err) => {
          toast.error(
            err?.response?.data?.message,
            { theme: "colored" },
            {
              position: "bottom-center",
              autoClose: 3000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true,
              progress: undefined,
            }
          );
        },
      });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <div className="relative flex items-center justify-center min-h-screen bg-[#edf2f6] p-2">
        <div className="max-w-sm mx-auto w-full flex flex-col items-center space-y-2  bg-white shadow-sm p-3 rounded-md">
          <div className="flex flex-col items-center space-y-1">
            {/* <img src={Logo} /> */}
            <h1 className="font-medium text-[#216fed]">
              Log in to your account
            </h1>
          </div>
          {/* form */}
          <div className="flex flex-col items-start space-y-2  w-full">
            <div className="w-full flex flex-col items-start space-y-1">
              <p className="text-[13px] font-medium text-[#216fed]">Email</p>

              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="email"
                name="email"
                className="input w-full flex-grow border-2 rounded-md border-gray-300 w-full  
                bg-transparent focus:ring-0    focus:outline-none"
              />
              <p className="text-red-600 text-[10px]">{PhoneError}</p>
            </div>
            {/* password */}
            <div className="w-full flex flex-col items-start space-y-1">
              <div className="flex items-center justify-between w-full">
                <p className="text-[13px] font-medium text-[#216fed]">
                  Password
                </p>
              </div>
              <div className="flex items-center     border-2 rounded-md border-gray-300 w-full">
                <input
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  type={showPassword ? "text" : "password"}
                  placeholder="password"
                  name="phoneNo"
                  className="w-full flex-grow  bg-transparent border-none focus:border-none focus:ring-0  
        focus:outline-none"
                  onKeyDown={handleSubmit}
                />
                <button
                  onClick={handlShowPasword}
                  className="h-full flex flex-grow text-center 
        px-2 items-center justify-center "
                >
                  {showPassword ? (
                    <AiFillEye size={23} className="text-[#216fed]" />
                  ) : (
                    <AiFillEyeInvisible size={23} className="text-[#216fed]" />
                  )}
                </button>
              </div>
            </div>
            <button
              disabled={loginMutation.isLoading}
              onClick={LoginHandler}
              className="w-full p-2 rounded-md flex items-center justify-center text-white font-medium
              bg-gradient-to-r from-[#216fed] to-[#3a7fee] capitalize"
            >
              {loginMutation.isLoading ? (
                <ThreeDots
                  height="25"
                  width="50"
                  radius="9"
                  color="#fff"
                  ariaLabel="three-dots-loading"
                  wrapperStyle={{}}
                  wrapperClassName=""
                  visible={true}
                />
              ) : (
                "Sign in"
              )}
            </button>
          </div>
        </div>
      </div>
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        transition={Slide}
      />
    </>
  );
};

export default Login;
