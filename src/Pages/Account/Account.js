import React,{useState} from 'react'
import { Link, useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import { ThreeDots } from "react-loader-spinner";
import { ToastContainer, toast, Zoom, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useHomeContext } from "../../context/HomeContext";
import { useAuth } from "../../context/auth";
const Account = () => {
  const [password, setPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const {token}  =useAuth()
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
  };
//   const changePasswordMutation = useMutation(
//     async (id) =>
//       await axios.post(
//         `${process.env.REACT_APP_BACKEND_URL}change-password`,{headers}
//       ),
//     {
//       retry: false,
//     }
//   );

  const changePasswordMutation = useMutation(
    async (newData) =>
      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}change-password`,
        newData,
        {
          headers,
        }
      ),
    {
      retry: false,
    }
  );

  const handleChange=()=>{
    if(!password) {
        toast.info(
            "please enter your old password",
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
        return
    }
    if(!newPassword) {
        toast.info(
            "please enter your new password",
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
        return
    }
    if(!confirmPassword) {
        toast.info(
            "please  confirm your password",
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
        return
    }
    changePasswordMutationHandler()
  }
  const changePasswordMutationHandler = async (id) => {
    try {
        let formData = new FormData();
        // formData.append("_method", "PATCH");
        formData.append("current_password", password);
        formData.append("new_password", newPassword);
        formData.append("new_confirm_password", confirmPassword);
        changePasswordMutation.mutate(formData, {
        onSuccess: (responseData) => {

          toast.info(
            "password changed successfully",
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
          setPassword("")
          setConfirmPassword("")
          setNewPassword("")
        },

        onError: (err) => {
            console.log( err?.response?.data)
          toast.error(
            "error",
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
    <div className='p-2 md:p-10'>
        <div className="bg-white p-3 flex flex-col items-start space-y-3">
        <h1 className="text-dark-color dark:text-white font-bold text-2xl">
          Change Password
        </h1>
           <div className='max-w-xl w-full flex flex-col items-start space-y-2'>
                  <input type="text" 
                  value={password}
                  onChange={(e)=>setPassword(e.target.value)}
                  placeholder='old password'
                  className="p-2 w-full border-2 border-dark-gray text-dark-color focus:outline-none"
                  />
                    <input type="text" 
                  placeholder='new password'
                  value={newPassword}
                  onChange={(e)=>setNewPassword(e.target.value)}
                  className="p-2 w-full border-2 border-dark-gray text-dark-color focus:outline-none"
                  />
                      <input type="text" 
                          value={confirmPassword}
                          onChange={(e)=>setConfirmPassword(e.target.value)}
                  placeholder='confirm password'
                  className="p-2 w-full border-2 border-dark-gray text-dark-color focus:outline-none"
                  />
                      <button onClick={handleChange} disabled={changePasswordMutation.isLoading}
        className="bg-blue-bg font-medium text-white p-2 px-5 rounded-md">
           {changePasswordMutation.isLoading ?   'Loading...' :' Change Password'}
            </button>
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
    </div>
  )
}

export default Account