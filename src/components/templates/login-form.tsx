"use client";

import { createFormInput } from "@/libs/hocs/with-react-hook-form";
import { loginSchema } from "@/validators/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "../atoms/button";
import { EButtonType } from "@/constants";
import { FormPassword } from "../molecules/form-tags/form-password";
import { useCallback, useState } from "react";
import { signIn } from "next-auth/react";
import { useError } from "@/libs/hooks/useError";
import { ErrorMessage } from "../atoms/error-message";

const FormInput = createFormInput<TLoginForm>();

export const LoginForm: React.FC = () => {
  const [type, setType] = useState<"text" | "password">("password");

  const { addError, getError } = useError();

  const { control, handleSubmit } = useForm<TLoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const togglePassword = useCallback(() => {
    setType((prev) => (prev === "password" ? "text" : "password"));
  }, []);

  const onSubmit = useCallback(
    async (data: TLoginForm) => {
      const result = await signIn("credentials", {
        ...data,
        redirect: true,
        callbackUrl: "/profile",
      });

      if (result?.error) {
        addError({ key: "submit", message: "Invalid credentials" });
      }
    },
    [addError],
  );

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4"
      method="POST"
    >
      <FormInput
        control={control}
        name="username"
        label="Username"
        placeholder="username"
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

      <ErrorMessage message={getError("submit")} />

      <Button
        type="submit"
        className="max-w-fit mx-auto"
        variant={EButtonType.primary}
      >
        Login
      </Button>
    </form>
  );
};
