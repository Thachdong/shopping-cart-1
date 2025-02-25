"use client";

import { createFormInput } from "@/libs/hocs/with-react-hook-form";
import { loginSchema } from "@/validators/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "../atoms/button";
import { EButtonType, EToastType } from "@/constants";
import { FormPassword } from "../molecules/form-tags/form-password";
import { useCallback, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useToast } from "@/libs/contexts/toast-context";
import { useError } from "@/libs/hooks/useError";
import { ErrorMessage } from "../atoms/error-message";

const FormInput = createFormInput<TLoginForm>();

export const LoginForm: React.FC = () => {
  const [type, setType] = useState<"text" | "password">("password");

  const router = useRouter();
  const { addToast } = useToast();
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
        redirect: false,
      });

      if (result?.error) {
        addError({ key: "submit", message: "Invalid credentials" });
      } else {
        addToast({ type: EToastType.success, message: "Sign-in Success!" });

        router.push("/profile");
      }
    },
    [addError, addToast, router],
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
