import { Suspense } from "react";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="bg-dark-200 flex h-screen items-center justify-center">
      <div className="h-fit w-[450px] bg-white px-8 py-10">
        <img src="/weconnectlogo.png" className="mx-auto mb-5" />
        <Suspense fallback={<p>Loading...</p>}>
          <Outlet />
        </Suspense>
      </div>
    </div>
  );
};

export default AuthLayout;
