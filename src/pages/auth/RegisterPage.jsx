import FormField from "@components/FormField";
import TextInput from "@components/FormInputs/TextInput";
import { Button, CircularProgress } from "@mui/material";
import { openSnackbar } from "@redux/slices/snackbarSlice";
import { useRegisterMutation } from "@services/rootApi";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const RegisterPage = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [register, { data = {}, isLoading, isSuccess, error, isError }] = useRegisterMutation();

  const formSchema = yup.object().shape({
    fullName: yup.string().required(),
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
  } = useForm({
    resolver: yupResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
  });

  function onSubmit(formData) {
    register(formData);
  }

  useEffect(() => {
    if (isError) {
      dispatch(openSnackbar({ type: "error", message: error?.data.message }));
    }

    if (isSuccess) {
      dispatch(openSnackbar({ message: data.message }));
      navigate("/login");
    }
  }, [isSuccess, isError, error, data.message, navigate, dispatch]);

  return (
    <div>
      <p className="mb-5 text-center text-2xl font-bold text-dark-100">Register</p>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <FormField
          name="fullName"
          label="Full Name"
          control={control}
          Component={TextInput}
          error={errors["fullName"]}
        />
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
          Component={TextInput}
          type="password"
          error={errors["password"]}
        />
        <Button variant="contained" type="submit">
          {isLoading ? <CircularProgress size="24px" /> : "Sign up"}
        </Button>
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
