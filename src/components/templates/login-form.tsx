"use client";

import { createFormInput } from "@/libs/hocs/with-react-hook-form";
import { registerSchema } from "@/validators/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "../atoms/button";
import { EButtonType } from "@/constants";
import { FormPassword } from "../molecules/form-tags/form-password";
import { useCallback, useState } from "react";

const FormInput = createFormInput<TLoginForm>();

export const LoginForm: React.FC = () => {
  const [type, setType] = useState<"text" | "password">("password");

  const { control } = useForm<TLoginForm>({
    resolver: zodResolver(registerSchema),
  });

  const togglePassword = useCallback(() => {
    setType((prev) => (prev === "password" ? "text" : "password"));
  }, []);

  return (
    <form className="flex flex-col gap-4">
      <FormInput
        control={control}
        name="emailOrPhone"
        label="Email or phone number"
        placeholder="Enter email or phone number"
      />

      <FormPassword
        inputTag={
          <FormInput
            control={control}
            name="password"
            label="Password"
            placeholder="Enter password"
            type={type}
          />
        }
        type={type}
        setType={togglePassword}
      />

      <Button className="max-w-fit mx-auto" variant={EButtonType.primary}>
        Login
      </Button>
    </form>
  );
};
