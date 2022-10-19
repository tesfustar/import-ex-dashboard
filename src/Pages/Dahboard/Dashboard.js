import { Link, useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import { ThreeDots } from "react-loader-spinner";
import { RiContactsFill } from "react-icons/ri";
import { MdDesignServices, MdMarkEmailRead } from "react-icons/md";
import axios from "axios";
import { useHomeContext } from "../../context/HomeContext";
import { useAuth } from "../../context/auth";
const Dashboard = () => {
  const {token}  =useAuth()
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
  };
  const dashboardData = useQuery(
    ["dashboardDataApi"],
    async () =>
      await axios.get(`${process.env.REACT_APP_BACKEND_URL}count`, {
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
  console.log(dashboardData?.data?.data);
  return (
    <div className="p-3 md:p-5 ">
      <div className="bg-white p-2 md:p-5 rounded-lg">
        <div className="flex items-center justify-between py-4 ">
          <h1 className="text-dark-color dark:text-white font-bold text-2xl">
            Dshboard
          </h1>
        </div>

        {/* div */}
        {dashboardData.isFetched ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            <div className="p-5 bg-white shadow-xl rounded-md flex items-center justify-between">
              <div>
                <h1 className="font-bold text-2xl text-gray-900">Number of Visits</h1>
                <h1 className="text-gray-900 font-bold text-xl">{dashboardData?.data?.data?.number_of_visits}</h1>
              </div>
              <RiContactsFill size={60} className="text-main-color" />
            </div>
            <div className="p-5 bg-white shadow-xl rounded-md flex items-center justify-between">
              <div>
                <h1 className="font-bold text-2xl text-gray-900">Number of Contact</h1>
                <h1 className="text-gray-900 font-bold text-xl">{dashboardData?.data?.data?.number_of_contact}</h1>
              </div>
              <RiContactsFill size={60} className="text-main-color" />
            </div>
            <div className="p-5 bg-white shadow-xl rounded-md flex items-center justify-between">
              <div>
                <h1 className="font-bold text-2xl text-gray-900">Number of Services</h1>
                <h1 className="text-gray-900 font-bold text-xl">{dashboardData?.data?.data?.number_of_services}</h1>
              </div>
              <RiContactsFill size={60} className="text-main-color" />
            </div>
          </div>
        ) : (
          <div>Loading</div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
