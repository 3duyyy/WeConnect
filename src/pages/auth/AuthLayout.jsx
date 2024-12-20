import Loading from "@components/Loading";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="flex h-screen items-center justify-center bg-dark-200">
      <div className="h-fit w-[450px] bg-white px-8 py-10">
        <img src="/weconnectlogo.png" className="mx-auto mb-5" />
        <Suspense fallback={<Loading />}>
          <Outlet />
        </Suspense>
      </div>
    </div>
  );
};

export default AuthLayout;
