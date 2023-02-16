import React, { useEffect, useState } from "react";
import { useHomeContext } from "../../context/HomeContext";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";
import { ToastContainer, toast, Zoom, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";
import ReactQuill from "react-quill";
const CreateService = () => {
  const { editServiceId, setEditServiceId } = useHomeContext();
  const { token } = useAuth();
  const headers = {
    "Content-Type": "multipart/form-data",
    Accept: "multipart/form-data",
    Authorization: `Bearer ${token}`,
  };
  const singleServicesData = useQuery(
    ["singleServicesDataApis",editServiceId],
    async () =>
      await axios.get(`${process.env.REACT_APP_BACKEND_URL}services/${editServiceId}`, {
        headers,
      }),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      retry: false,
      // enabled: !!token,
      onSuccess: (res) => {},
    }
  );
  const [title, setTitle] = useState(editServiceId ? singleServicesData?.data?.data?.title :"");
  const [body, setBody] = useState( editServiceId ? singleServicesData?.data?.data?.body : "");
  const [file, setFile] = useState(null);
  const [selected, setSelected] = useState(1);
  const navigate = useNavigate();

useEffect(() => {
 if(editServiceId){
  setTitle(singleServicesData?.data?.data?.title)
  setBody(singleServicesData?.data?.data?.body)
 }
}, [editServiceId,singleServicesData.isFetched])

  
  const handleClick = () => {
    if (editServiceId) {
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
        `${process.env.REACT_APP_BACKEND_URL}services`,
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
        `${process.env.REACT_APP_BACKEND_URL}services/${editServiceId}`,
        newData,
        {
          headers,
        }
      ),
    {
      retry: false,
    }
  );

    const servicesData = useQuery(
      ["servicesCategoryDataApi"],
      async () =>
        await axios.get(`${process.env.REACT_APP_BACKEND_URL}service-categories`, {
          headers,
        }),
      {
        keepPreviousData: true,
        refetchOnWindowFocus: false,
        retry: false,
        enabled: !!token,
        onSuccess: (res) => {

        },
      }
    );

  const createServiceHandler = async (values) => {
    console.log(values);
    try {
      let formData = new FormData();
      formData.append("title", title);
      formData.append("body", body);
      formData.append("service_photo", values);
      formData.append("service_category_id", selected);
      serviceMutation.mutate(formData, {
        onSuccess: (responseData) => {
          toast.info(
            "service created successfully",
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
            navigate("/services");
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
      formData.append("service_photo", values);
      formData.append("service_category_id", selected);
      editServiceMutation.mutate(formData, {
        onSuccess: (responseData) => {
          toast.info(
            "service edited successfully",
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
            navigate("/services");
            setEditServiceId(null);
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
 
  console.log(singleServicesData?.data?.data)
  return (
    <div className="p-3 md:p-5 ">
      <div className="bg-white p-2 md:p-5 rounded-lg">
        <div className="flex items-center justify-between py-4 ">
          <h1 className="text-dark-color dark:text-white font-bold text-2xl">
            {editServiceId ? "Edit Services" : "Create Services"}
          </h1>
        </div>
        {/* form */}
        {singleServicesData.isFetched ? <div className="pt-3 flex flex-col items-start space-y-2 w-full">
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
            {/* <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              cols="30"
              rows="5"
              placeholder="description"
              className="p-2 w-full border-2 border-dark-gray text-dark-color focus:outline-none"
            ></textarea> */}
            <ReactQuill
                theme="snow"
                value={body}
                onChange={setBody}
                className=" w-full  text-dark-color focus:outline-none "
              />
          </div>
          <div className="flex flex-col items-start space-y-2 w-full">
            <p className="font-medium text-dark-gray">Type</p>
            <select
              name=""
              id=""
              onChange={(e) => setSelected(e.target.value)}
              className="p-2 w-full border-2 border-dark-gray text-dark-color focus:outline-none"
            >
              <option >select category</option>
              {servicesData?.data?.data?.map((item)=>(

                <option value={item.id}>{item.title}</option>
              ))}
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
            {editServiceId
              ? editServiceMutation.isLoading
                ? "Loading.."
                : "Edit"
              : serviceMutation.isLoading
              ? "Loading..."
              : "Create"}
          </button>
        </div> :
         <div className="flex items-center justify-center">
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
       </div>
        }
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

export default CreateService;
