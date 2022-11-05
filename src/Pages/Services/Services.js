import React, { useState } from "react";
import {
  DataGrid,
  gridClasses,
  gridPageCountSelector,
  gridPageSelector,
  useGridApiContext,
  useGridSelector,
} from "@mui/x-data-grid";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import { Link, useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import { ThreeDots } from "react-loader-spinner";
import { ToastContainer, toast, Zoom, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useHomeContext } from "../../context/HomeContext";
import { useAuth } from "../../context/auth";
const Services = () => {
  const {token}  =useAuth()
  const {editServiceId, setEditServiceId} = useHomeContext()
  const navigate = useNavigate()
  const [services, setServices] = useState([]);
  const [serviceId, setServiceId] = useState(null);
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
  };

  const handleDelete = (id) => {
    if (window.confirm("Are You Sure, You want delete?")) {
      deleteServiceMutationHandler(id);
    }
  };
  const serviceDeleteMutation = useMutation(
    async (id) =>
      await axios.delete(
        `${process.env.REACT_APP_BACKEND_URL}services/${id}`,{headers}
      ),
    {
      retry: false,
    }
  );
  const deleteServiceMutationHandler = async (id) => {
    try {
      serviceDeleteMutation.mutate(id, {
        onSuccess: (responseData) => {
          toast.info(
            "service deleted successfully",
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
          setServiceId(null);
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
  const servicesData = useQuery(
    ["servicesDataApi",serviceId,editServiceId],
    async () =>
      await axios.get(`${process.env.REACT_APP_BACKEND_URL}services`, {
        headers,
      }),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      retry: false,
      // enabled: !!token,
      onSuccess: (res) => {
        setServices(
          res?.data?.map((data, index) => ({ ...data, index: index + 1 }))
        );
      },
    }
  );
  console.log({ services });
  const columns = [
    { field: "index", headerName: "ID", width: 90, headerAlign: "left" },
    {
      field: "image",
      headerName: "Image",
      width: 100,
      renderCell: (params) => {
        console.log(params?.row)
        return (
          <img
            src={params?.row?.service_photo}
            alt=""
            className="h-12  w-full object-cover rounded-md"
          />
        );
      },
    },
    {
      field: "category",
      headerName: "category",
      width: 130,
      renderCell: (params) => {
        console.log(params?.row)
        return (
         <h1>{params?.row?.category?.title }</h1>
        );
      },
    },
    {
      field: "title",
      headerName: "title",
      width: 150,
      sortable: false,
      filterable: false,
      headerClassName: "super-app-theme--header",
      headerAlign: "left",
    },
    {
      field: "body",
      headerName: "body",
      width: 400,
      sortable: false,
      filterable: false,
      headerClassName: "super-app-theme--header",
      headerAlign: "left",
    },
    {
      field: "action",
      headerName: "action",
      width: 200,
      renderCell: (params) => {
        console.log({ params: params });
        return (
          <div className="flex items-center space-x-3">
            <button
              onClick={() => {
                handleDelete(params.row.id);
                setServiceId(params.row.id);
              }}
              className="bg-red-500 rounded-sm 
                    text-center px-3 p-1 font-medium text-sm text-white"
            >
              Delete
            </button>
            <Link to={"/services/create/"}>
              <button onClick={()=>setEditServiceId(params.row.id)}
                className="bg-blue-bg rounded-sm text-center
                     px-5 p-1 font-medium text-sm text-white capitalize"
              >
                  Edit
              </button>
            </Link>
          </div>
        );
      },
    },
  ];

  function CustomPagination() {
    const apiRef = useGridApiContext();
    const page = useGridSelector(apiRef, gridPageSelector);
    const pageCount = useGridSelector(apiRef, gridPageCountSelector);

    return (
      <Pagination
        shape="rounded"
        page={page + 1}
        count={pageCount}
        renderItem={(props2) => <PaginationItem {...props2} disableRipple />}
        onChange={(event, value) => apiRef.current.setPage(value - 1)}
      />
    );
  }
  console.log({servicesData})
  return (
    <div className="p-3 md:p-5 ">
      <div className="bg-white p-2 md:p-5 rounded-lg">
        <div className="flex items-center justify-between py-4 ">
          <h1 className="text-dark-color dark:text-white font-bold text-2xl">
            Services
          </h1>
          <button onClick={()=>navigate('/services/create')} 
          className="bg-blue-bg font-medium text-white p-2 px-5 rounded-md">Create</button>
        </div>
      {servicesData.isFetched ? (
          servicesData?.data?.data?.length > 0 ? (
            services?.length > 0 ? (
              <div style={{ height: 520 }} className="">
                <DataGrid
                  rows={services}
                  columns={columns}
                  pageSize={7}
                  rowsPerPageOptions={[5]}
                  disableSelectionOnClick
                  getRowId={(row) => row.id}
                  sx={{
                    "&::-webkit-scrollbar": {
                      display: "none",
                    },
                    "& .super-app-theme--header": {
                      borderColor: "#64748b",
                      border: "none",
                    },
                    color:  "#000",
                    border: 2,
                    borderColor:  "#64748b",
                    [`& .${gridClasses.cell}`]: {
                      borderColor: (theme) =>
                       "#64748b",
                    },
                    [`& .${gridClasses.row}`]: {
                      borderColor: (theme) =>
                        "#64748b",
                      textAlign: "center",
                    },
                    "& .MuiDataGrid-cellCenter": {
                      justifyContent: "center",
                    },
                    "&.MuiDataGrid-root .MuiDataGrid-cell": {
                      outline: "none",
                      textAlign: "left",
                      border: "none",
                    },
                    "& .MuiPaginationItem-root": {
                      color:  "#64748b",
                      // backgroundColor:'red'
                      border: "none",
                    },
                  }}
                  components={{
                    Pagination: CustomPagination,
                  }}
                />
              </div>
            ) : (
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
            )
          ) : (
            <div className="flex items-center justify-center w-full text-center">
              <h1 className="capitalize text-dark-gray text-2xl font-bold text-center">
                You have no Service
              </h1>
            </div>
          )
        ) : (
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
        )}
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

export default Services;
