import React from "react";
import {
  Card,
  Select,
  Option,
  Button,
  Typography,
} from "@material-tailwind/react";
import { useForm, Controller } from "react-hook-form";

const BatchChange = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
  });

  const onSubmit = (data) => console.log(data);

  return (
    <div className="flex place-items-center bg-gray-50">
      <Card color="transparent" shadow={true} className="p-7 bg-white">
        <Typography variant="h4" color="blue-gray">
          Change your batch
        </Typography>
        <br />
        <form
          className="mb-4 md:w-[500px] grid grid-cols-1 gap-6"
          onSubmit={handleSubmit(onSubmit)}
        >
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
          <div className="col-span-2 grid grid-cols-1 items-center">
            <Button type="submit">Change Batch</Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default BatchChange;
