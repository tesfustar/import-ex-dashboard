import React, { useState,useEffect } from "react";
import { useHomeContext } from "../../context/HomeContext";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";
import { ToastContainer, toast, Zoom, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";
const CreateCategory = () => {
  const { editServiceCategoryId, setEditServiceCategoryId } = useHomeContext();
  const navigate = useNavigate();
  const { token } = useAuth();
  const headers = {
    "Content-Type": "multipart/form-data",
    Accept: "multipart/form-data",
    Authorization: `Bearer ${token}`,
  };
  const singleCategoryData = useQuery(
    ["singleCategoryDataApi",editServiceCategoryId],
    async () =>
      await axios.get(`${process.env.REACT_APP_BACKEND_URL}service-categories/${editServiceCategoryId}`, {
        headers,
      }),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      retry: false,
      enabled: !!token,
      onSuccess: (res) => {},
    }
  );
  console.log(singleCategoryData?.data?.data)
  const [title, setTitle] = useState(editServiceCategoryId ?  singleCategoryData?.data?.data?.title  :"");
  const [body, setBody] =  useState(editServiceCategoryId ?  singleCategoryData?.data?.data?.body  :"");
  const [file, setFile] = useState(null);
  const [selected, setSelected] = useState(1);

  useEffect(() => {
    if(editServiceCategoryId){
     setTitle(singleCategoryData?.data?.data?.title)
     setBody(singleCategoryData?.data?.data?.body)
    }
   }, [editServiceCategoryId,singleCategoryData.isFetched])
  const handleClick = () => {
    if (editServiceCategoryId) {
      if (title === "" || body === "" || !file || !selected) {
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
        return;
      }
      editServiceHandler(file);
      return;
    }
    if (title === "" || body === "" || !file || !selected) {
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
      return;
    }
    createServiceHandler(file);
  };
  const serviceMutation = useMutation(
    async (newData) =>
      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}service-categories`,
        newData,
        {
          headers,
        }
      ),
    {
      retry: false,
    }
  );

  const editServiceMutation = useMutation(
    async (newData) =>
      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}service-categories/${editServiceCategoryId}`,
        newData,
        {
          headers,
        }
      ),
    {
      retry: false,
    }
  );

 

  const createServiceHandler = async (values) => {
    console.log(values);
    try {
      let formData = new FormData();
      formData.append("title", title);
      formData.append("body", body);
      formData.append("service_category_photo", values);
      formData.append("type", selected);
      serviceMutation.mutate(formData, {
        onSuccess: (responseData) => {
          toast.info(
            "service category created successfully",
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
            navigate("/category");
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

  const editServiceHandler = async (values) => {
    try {
      let formData = new FormData();
      formData.append("_method", "PATCH");
      formData.append("title", title);
      formData.append("body", body);
      formData.append("service_category_photo", values);
      formData.append("type", selected);
      editServiceMutation.mutate(formData, {
        onSuccess: (responseData) => {
          toast.info(
            "service category edited successfully",
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
            navigate("/category");
            setEditServiceCategoryId(null);
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
            {editServiceCategoryId ? "Edit Service Category" : "Create Service Category"}
          </h1>
        </div>
        {/* form */}
        {singleCategoryData.isFetched ? <div className="pt-3 flex flex-col items-start space-y-2 w-full">
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
            <p className="font-medium text-dark-gray">Type</p>
            <select
              name=""
              id=""
              onChange={(e) => setSelected(e.target.value)}
              className="p-2 w-full border-2 border-dark-gray text-dark-color focus:outline-none"
            >
              <option value={1}>Import</option>
              <option value={2}>Export</option>
            </select>
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
              serviceMutation.isLoading || editServiceMutation.isLoading
            }
            onClick={handleClick}
            className="bg-blue-bg font-medium text-white p-2 px-10
           rounded-md"
          >
            {editServiceCategoryId
              ? editServiceMutation.isLoading
                ? "Loading.."
                : "Edit"
              : serviceMutation.isLoading
              ? "Loading..."
              : "Create"}
          </button>
        </div> :   <div className="flex items-center justify-center">
         <ThreeDots
           height="80"
           width="80"
           radius="9"
           color="#216fed"
           ariaLabel="three-dots-loading"
           wrapperStyle={{}}
           wrapperClassName=""
           visible={true}
         />
       </div>}
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

export default CreateCategory;
