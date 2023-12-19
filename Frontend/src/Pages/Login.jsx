import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { useForm, Controller } from "react-hook-form";
import UserContext from "../context/UserContext";
import { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

export default function SimpleRegistrationForm() {
  const navigate = useNavigate(); 
  const [exists, setExists] = useState("");
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
  });
  const { user,setUser } = useContext(UserContext);
  const onSubmit = async (data) => {
    try {
      const response = await axios.post("http://localhost:5001/login", data);
      setUser({phone:response.data.phone,isAuth:true});
      navigate("/dashboard");
    } catch (error) {
      setExists(error);
      console.error("Error during POST request:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card
        color="transparent"
        shadow={true}
        className="p-7 bg-white w-full md:w-[80%] lg:w-[60%] xl:w-[40%] 2xl:w-[30%]"
      >
        <Typography variant="h4" color="blue-gray">
          Login
        </Typography>
        {user.phone && (
          <span className="text-green-500">
            User is now registered, now you can login
          </span>
        )}
        {exists && <span className="text-red-500">Wrong Credentials</span>}
        <form className="mt-8 mb-2 w-full" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-8">
            <Controller
              name="phone"
              control={control}
              rules={{
                required: "Phone Number is Required",
              }}
              render={({ field }) => (
                <Input
                  size="lg"
                  {...field}
                  label="Registered Phone Number"
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
              name="password"
              control={control}
              rules={{
                required: "Password is Required",
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
          <Button type="submit" className="mt-6" fullWidth>
            Login
          </Button>
          <Typography color="gray" className="mt-4 text-center font-normal">
            Don't have an account?{" "}
            <a href="/" className="font-medium text-gray-900">
              Register
            </a>
          </Typography>
        </form>
      </Card>
    </div>
  );
}
