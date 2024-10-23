import FormField from "@components/FormField";
import TextInput from "@components/FormInputs/TextInput";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, CircularProgress } from "@mui/material";
import { openSnackbar } from "@redux/slices/snackbarSlice";
import { useLoginMutation } from "@services/rootApi";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";

const LoginPage = () => {
  const [login, { data = {}, isLoading, error, isError, isSuccess }] = useLoginMutation();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const formSchema = yup.object().shape({
    email: yup
      .string()
      .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Email is not valid")
      .required(),
    password: yup.string().required(),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  function onSubmit(formData) {
    login(formData);
  }

  useEffect(() => {
    if (isError) {
      dispatch(openSnackbar({ type: "error", message: error?.data?.message }));
    }

    if (isSuccess) {
      dispatch(openSnackbar({ message: data.message }));
      navigate("/verify-otp", {
        state: getValues("email"),
      });
    }
  }, [isError, error, data, isSuccess, navigate, dispatch, getValues]);

  return (
    <div>
      <p className="mb-5 text-center text-2xl font-bold text-dark-100">Login</p>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <FormField
          name="email"
          label="Email"
          control={control}
          Component={TextInput}
          error={errors["email"]}
        />
        <FormField
          name="password"
          label="Password"
          control={control}
          type="password"
          Component={TextInput}
          error={errors["password"]}
        />
        <Button variant="contained" type="submit">
          {isLoading ? <CircularProgress size="24px" /> : "Sign in"}
        </Button>
      </form>
      <p className="text-md mt-4 text-center text-dark-100">
        New on our platform?
        <Link to="/register" className="ml-1 text-[#246AA3]">
          Create an account
        </Link>
      </p>
    </div>
  );
};

export default LoginPage;
