import React, { useState } from "react";
import { useHomeContext } from "../../context/HomeContext";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";
import { ToastContainer, toast, Zoom, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";
const CreateBanner = () => {
  const { editBannerId, setEditBannerId ,} = useHomeContext();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [file, setFile] = useState(null);
  const navigate = useNavigate();
  const {token}  =useAuth()
  const headers = {
    "Content-Type": "multipart/form-data",
    Accept: "multipart/form-data",
    Authorization: `Bearer ${token}`,
  };

  const handleClick = () => {
    if (editBannerId) {
      if(title === "" || body === "" || !file){
        toast.info(
          "please fill the fields and upload image",
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
      editBannerHandler(file);
      return;
    }
    if(title === "" || body === "" || !file){
      toast.info(
        "please fill the fields and upload image",
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
    createBannerHandler(file);
  };
  const bannerMutation = useMutation(
    async (newData) =>
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}coursols`, newData, {
        headers,
      }),
    {
      retry: false,
    }
  );

  const editBannerMutation = useMutation(
    async (newData) =>
      await axios.patch(
        `${process.env.REACT_APP_BACKEND_URL}coursols/${editBannerId}`,
        newData,
        {
          headers,
        }
      ),
    {
      retry: false,
    }
  );

  //   const servicesData = useQuery(
  //     ["servicesDataApi",editServiceId],
  //     async () =>
  //       await axios.get(`http://simple.hulum.et/api/services/${editServiceId}`, {
  //         headers,
  //       }),
  //     {
  //       keepPreviousData: true,
  //       refetchOnWindowFocus: false,
  //       retry: false,
  //       enabled: !!editServiceId,
  //       onSuccess: (res) => {},
  //     }
  //   );

  const createBannerHandler = async (values) => {
    try {
      let formData = new FormData();
      formData.append("title", title);
      formData.append("body", body);
      formData.append("coursol_photo", values);
      bannerMutation.mutate(formData, {
        onSuccess: (responseData) => {
          toast.info(
            "banner created successfully",
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
          setTimeout(() => {
            navigate("/banner");
          }, 1000);
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

  //   edit
  const editBannerHandler = async (values) => {
    try {
      let formData = new FormData();
      formData.append("title", title);
      formData.append("body", body);
      formData.append("coursol_photo", values);
      editBannerMutation.mutate(formData, {
        onSuccess: (responseData) => {
          toast.info(
            "banner edited successfully",
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
          setTimeout(() => {
            navigate("/banner");
            setEditBannerId(null);
          }, 1000);
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
    <div className="p-3 md:p-5 ">
      <div className="bg-white p-2 md:p-5 rounded-lg">
        <div className="flex items-center justify-between py-4 ">
          <h1 className="text-dark-color dark:text-white font-bold text-2xl">
            {editBannerId ? "Edit Banner" : "Create Banner"}
          </h1>
        </div>
        {/* form */}
        <div className="pt-3 flex flex-col items-start space-y-2 w-full">
          <div className="flex flex-col items-start space-y-2 w-full">
            <p className="font-medium text-dark-gray">Title</p>
            <input
              type="text"
              name=""
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              id=""
              placeholder="title"
              className="p-2 w-full border-2 border-dark-gray text-dark-color focus:outline-none"
            />
          </div>
          <div className="flex flex-col items-start space-y-2 w-full">
            <p className="font-medium text-dark-gray">Body</p>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              cols="30"
              rows="5"
              placeholder="description"
              className="p-2 w-full border-2 border-dark-gray text-dark-color focus:outline-none"
            ></textarea>
          </div>

          <div className="flex flex-col items-start space-y-2 w-full">
            <p className="font-medium text-dark-gray">Image</p>
            <input
              type="file"
              name=""
              id=""
              onChange={(e) => setFile(e.target.files[0])}
              className="p-2 w-full border-2  border-dark-gray text-dark-color focus:outline-none"
            />
          </div>
          <button
            disabled={
                bannerMutation.isLoading || editBannerMutation.isLoading
            }
            onClick={handleClick}
            className="bg-blue-bg font-medium text-white p-2 px-10
           rounded-md"
          >
            {editBannerId
              ? editBannerMutation.isLoading
                ? "Loading.."
                : "Edit"
              : bannerMutation.isLoading
              ? "Loading..."
              : "Create"}
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
  );
};

export default CreateBanner;
