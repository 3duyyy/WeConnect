import Header from "@components/Header";
import { saveUserInfo } from "@redux/slices/authSlice";
import { useGetAuthUserQuery } from "@services/rootApi";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedLayout = () => {
  const dispatch = useDispatch();

  const response = useGetAuthUserQuery();
  console.log({ response });

  useEffect(() => {
    if (response.isSuccess) {
      dispatch(saveUserInfo(response.data));
    }
  }, [response.isSuccess, response.data, dispatch]);

  if (response.isLoading) {
    return <p>Loading...</p>;
  }

  if (!response?.data?._id) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};

export default ProtectedLayout;
