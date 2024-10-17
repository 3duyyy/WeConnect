import FormField from "@components/FormField";
import TextInput from "@components/FormInputs/TextInput";
import { Alert, Button } from "@mui/material";
import { openSnackbar } from "@redux/slices/snackbarSlice";
import { useRegisterMutation } from "@services/rootApi";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const { control, handleSubmit } = useForm();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [register, { data, isLoading, isSuccess, error, isError }] = useRegisterMutation();

  function onSubmit(formData) {
    console.log({ formData });
    register(formData);
  }

  useEffect(() => {
    if (isSuccess) {
      dispatch(openSnackbar({ message: data.message }));
      navigate("/login");
      return;
    }
  }, [isSuccess, data.message, navigate, dispatch]);

  return (
    <div>
      <p className="mb-5 text-center text-2xl font-bold text-dark-100">Register</p>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <FormField name="fullName" label="Full Name" control={control} Component={TextInput} />
        <FormField name="email" label="Email" control={control} Component={TextInput} />
        <FormField
          name="password"
          label="Password"
          control={control}
          Component={TextInput}
          type="password"
        />
        <Button variant="contained" type="submit">
          Sign up
        </Button>
        {isError && <Alert severity="error">{error.data.message}</Alert>}
      </form>
      <p className="text-md mt-4 text-center text-dark-100">
        Already have an account?
        <Link to="/login" className="ml-1 text-[#246AA3]">
          Sign in instead
        </Link>
      </p>
    </div>
  );
};

export default RegisterPage;
