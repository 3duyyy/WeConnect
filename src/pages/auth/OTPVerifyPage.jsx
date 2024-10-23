import FormField from "@components/FormField";
import OTPInput from "@components/FormInputs/OTPInput";
import { Button, CircularProgress } from "@mui/material";
import { login } from "@redux/slices/authSlice";
import { openSnackbar } from "@redux/slices/snackbarSlice";
import { useVerifyOTPMutation } from "@services/rootApi";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";

const OTPVerifyPage = () => {
  const location = useLocation();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [verifyOTP, { data = {}, isLoading, error, isError, isSuccess }] = useVerifyOTPMutation();

  const { control, handleSubmit } = useForm();

  function onSubmit(formData) {
    verifyOTP({ otp: formData.otp, email: location?.state });
  }

  useEffect(() => {
    if (isError) {
      dispatch(openSnackbar({ type: "error", message: error?.data?.message }));
    }

    if (isSuccess) {
      dispatch(login(data));
      navigate("/");
    }
  }, [isError, isSuccess, error, data, dispatch, navigate]);

  return (
    <div>
      <p className="mb-5 text-center text-2xl font-bold text-dark-100">Two-Step Verification</p>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <FormField
          name="otp"
          label="Type your 6 digit security code"
          control={control}
          Component={OTPInput}
        />
        <Button variant="contained" type="submit">
          {isLoading ? <CircularProgress size="24px" /> : "Verify my account"}
        </Button>
      </form>
      <p className="text-md mt-4 text-center text-dark-100">
        Didn&apos;t get the code?
        <Link to="/login" className="ml-1 text-[#246AA3]">
          Resend
        </Link>
      </p>
    </div>
  );
};

export default OTPVerifyPage;
