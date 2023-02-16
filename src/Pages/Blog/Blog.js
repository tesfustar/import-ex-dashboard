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
import parse from "html-react-parser";
const Blog = () => {
    const {editBlogId,setEditBlogId,} = useHomeContext()
    const {token}  =useAuth()
    const navigate = useNavigate()
    const [blogs, setBlogs] = useState([]);
    const [blogId, setBlogId] = useState(null);
    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    };
    const blogData = useQuery(
        ["blogDataApi",blogId,editBlogId],
        async () =>
          await axios.get(`${process.env.REACT_APP_BACKEND_URL}blogs`, {
            headers,
          }),
        {
          keepPreviousData: true,
          refetchOnWindowFocus: false,
          retry: false,
          // enabled: !!token,
          onSuccess: (res) => {
            setBlogs(
              res?.data?.map((data, index) => ({ ...data, index: index + 1 }))
            );
          },
        }
      );

      const handleDelete = (id) => {
        if (window.confirm("Are You Sure, You want delete?")) {
          deleteBlogMutationHandler(id);
        }
      };     
      const serviceDeleteMutation = useMutation(
        async (id) =>
          await axios.delete(
            `${process.env.REACT_APP_BACKEND_URL}blogs/${id}`,{headers}
          ),
        {
          retry: false,
        }
      );
      const deleteBlogMutationHandler = async (id) => {
        try {
          serviceDeleteMutation.mutate(id, {
            onSuccess: (responseData) => {
              toast.info(
                "blog deleted successfully",
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
              setBlogId(null);
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
      const columns = [
        { field: "index", headerName: "ID", width: 90, headerAlign: "left" },
        {
          field: "image",
          headerName: "Image",
          width: 100,
          renderCell: (params) => {
            return (
              <img
                src={params?.row?.blog_photo}
                alt=""
                className="h-12  w-full object-cover rounded-md"
              />
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
          width: 500,
          renderCell: (params) => {
            return(
              <p>{parse(params.row.body)}</p>
            )
          }
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
                    setBlogId(params.row.id);
                  }}
                  className="bg-red-500 rounded-sm 
                        text-center px-3 p-1 font-medium text-sm text-white"
                >
                  Delete
                </button>
                <Link to={"/blog/create/"}>
                  <button onClick={()=>setEditBlogId(params.row.id)}
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
  return (
    <div className="p-3 md:p-5 ">
    <div className="bg-white p-2 md:p-5 rounded-lg">
      <div className="flex items-center justify-between py-4 ">
        <h1 className="text-dark-color dark:text-white font-bold text-2xl">
          Blogs
        </h1>
        <button onClick={()=>navigate('/blog/create')} 
        className="bg-blue-bg font-medium text-white p-2 px-5 rounded-md">Create</button>
      </div>
    {blogData.isFetched ? (
        blogData?.data?.data?.length > 0 ? (
          blogs?.length > 0 ? (
            <div style={{ height: 520 }} className="">
              <DataGrid
                rows={blogs}
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
              You have no Blog
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
  )
}

export default Blog