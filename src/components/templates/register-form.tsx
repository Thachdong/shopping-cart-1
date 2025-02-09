"use client";

import { createFormInput } from "@/libs/hocs/with-react-hook-form";
import { loginSchema } from "@/validators/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "../atoms/button";
import { EButtonType } from "@/constants";

const FormInput = createFormInput<TResterForm>();

export const RegisterForm: React.FC = () => {
  const { control } = useForm<TResterForm>({
    resolver: zodResolver(loginSchema),
  });

  return (
    <form className="flex flex-col gap-4">
      <FormInput control={control} name="email" label="Email" />

      <FormInput control={control} name="phone" label="Phone" />

      <FormInput
        control={control}
        name="password"
        label="Password"
        type="password"
      />

      <Button className="max-w-fit mx-auto" variant={EButtonType.primary}>
        Register
      </Button>
    </form>
  );
};
