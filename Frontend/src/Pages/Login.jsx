import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { useForm, Controller } from "react-hook-form";

export default function SimpleRegistrationForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
  });

  const onSubmit = (data) => console.log(data);

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
        <form
          className="mt-8 mb-2 w-full"
          onSubmit={handleSubmit(onSubmit)}
        >
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
          <Button className="mt-6" fullWidth>
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
