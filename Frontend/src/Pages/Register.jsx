import {
  Card,
  Input,
  Typography,
  Select,
  Option,
  Button,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate(); 
  const [exists,setExists] = useState("");
  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
    watch,
    unregister,
  } = useForm({
    mode: "onTouched",
  });

  const domain = watch("domain");

  // * Remove from FORM
  useEffect(() => {
    if (domain !== "others") {
      unregister("otherdomainname");
    }
  }, [domain, unregister]);

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("http://localhost:5001/register", data);
      navigate("/login");
    } catch (error) {
      setExists(error.response.data.message);
      console.error("Error during POST request:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card color="transparent" shadow={true} className="p-7 bg-white ">
        <Typography variant="h4" color="blue-gray">
          Sign Up
        </Typography>
        <Typography color="gray" className="mt-1 font-normal">
          Enter your details to register.
        </Typography>
        {exists && (<span className="text-red-500">User already exists</span>)}
        <br />
        
        <form
          className="mb-4 sm:grid sm:grid-cols-2 gap-6 md:w-full flex flex-col"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <Controller
              name="name"
              rules={{
                required: "Name is Required",
                minLength: {
                  value: 3,
                  message: "Minimum 3 characters required",
                },
              }}
              control={control}
              render={({ field }) => (
                <Input
                  size="lg"
                  {...field}
                  label="Name"
                  error={Boolean(errors?.name?.message)}
                />
              )}
            />
            {errors?.name?.message && (
              <span className="error-text">{errors?.name?.message}</span>
            )}
          </div>
          <div>
            <Controller
              name="age"
              rules={{
                required: "Age is Required",
                pattern: {
                  value: /^(1[89]|[2-5]\d|65)$/,
                  message: "Age must be between 18 and 65",
                },
              }}
              control={control}
              render={({ field }) => (
                <Input
                  size="lg"
                  {...field}
                  label="Age"
                  error={Boolean(errors?.age?.message)}
                />
              )}
            />
            {errors?.age?.message && (
              <span className="error-text">{errors?.age?.message}</span>
            )}
          </div>
          <div>
            <Controller
              name="phone"
              control={control}
              rules={{
                required: "Phone Number is Required",
                pattern: {
                  value: /^\d{10}$/,
                  message: "Phone Number is invaild",
                },
              }}
              render={({ field }) => (
                <Input
                  size="lg"
                  {...field}
                  label="Phone Number"
                  error={Boolean(errors?.phone?.message)}
                />
              )}
            />
            {errors?.phone?.message && (
              <span className="error-text">{errors?.phone?.message}</span>
            )}
          </div>
          <div>
            <Controller
              name="batch"
              control={control}
              rules={{
                required: "Choose a batch timing",
              }}
              render={({ field }) => (
                <Select
                  label="Select batch"
                  {...field}
                  error={Boolean(errors?.batch?.message)}
                >
                  <Option value="6-7AM">6-7AM</Option>
                  <Option value="7-8AM">7-8AM</Option>
                  <Option value="8-9AM">8-9AM</Option>
                  <Option value="5-6PM">5-6PM</Option>
                </Select>
              )}
            />
            {errors?.batch?.message && (
              <span className="error-text">{errors?.batch?.message}</span>
            )}
          </div>
          {domain === "others" && (
            <div>
              <Controller
                name="otherdomainname"
                control={control}
                rules={{
                  required: "Domain Name is Required",
                }}
                render={({ field }) => (
                  <Input
                    {...field}
                    size="lg"
                    label="Type Here"
                    error={Boolean(errors?.otherdomainname?.message)}
                  />
                )}
              />
              {errors?.otherdomainname?.message && (
                <span className="error-text">
                  {errors?.otherdomainname?.message}
                </span>
              )}
            </div>
          )}
          <div>
            <Controller
              name="password"
              control={control}
              rules={{
                required: "Password is Required",
                pattern: {
                  value:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/,
                  message: "Password not strong enough",
                },
              }}
              render={({ field }) => (
                <Input
                  type="password"
                  {...field}
                  size="lg"
                  label="Password"
                  error={Boolean(errors?.password?.message)}
                />
              )}
            />
            {errors?.password?.message && (
              <span className="error-text">{errors?.password?.message}</span>
            )}
          </div>
          <div>
            <Controller
              name="confirmpassword"
              control={control}
              rules={{
                required: "Confirm Password is Required",
                validate: (value) =>
                  getValues("password") === value || "Passwords do not match",
              }}
              render={({ field }) => (
                <Input
                  type="password"
                  {...field}
                  size="lg"
                  label="Confirm Password"
                  error={Boolean(errors?.confirmpassword?.message)}
                />
              )}
            />
            {errors?.confirmpassword?.message && (
              <span className="error-text">
                {errors?.confirmpassword?.message}
              </span>
            )}
          </div>
          <div className="col-span-2 grid grid-cols-1 items-center">
            <Button type="submit">Create Account</Button>
          </div>
          <Typography color="gray" className="mt-4 text-center font-normal">
            Already have an account?{" "}
            <a href="/login" className="font-medium text-gray-900">
              Login
            </a>
          </Typography>
        </form>
      </Card>
    </div>
  );
};

export default Register;
