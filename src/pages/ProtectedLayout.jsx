import Header from "@components/Header";
import Loading from "@components/Loading";
import { saveUserInfo } from "@redux/slices/authSlice";
import { useGetAuthUserQuery } from "@services/rootApi";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";

const ProtectedLayout = () => {
  const dispatch = useDispatch();

  const response = useGetAuthUserQuery();
  console.log("getAuthUserQuery", { response });

  useEffect(() => {
    if (response.isSuccess) {
      dispatch(saveUserInfo(response.data));
    }
  }, [response.isSuccess, response.data, dispatch]);

  if (response.isLoading) {
    return <Loading />;
  }

  // if (!response?.data?._id) {
  //   return <Navigate to="/login" />;
  // }

  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};

export default ProtectedLayout;
