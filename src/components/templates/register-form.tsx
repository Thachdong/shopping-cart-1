"use client";

import {
  createFormDatePicker,
  createFormInput,
} from "@/libs/hocs/with-react-hook-form";
import { registerSchema } from "@/validators/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "../atoms/button";
import { EButtonType, EToastType } from "@/constants";
import { FormPassword } from "../molecules/form-tags/form-password";
import { useCallback, useState } from "react";
import { useToast } from "@/libs/contexts/toast-context";
import { useError } from "@/libs/hooks/useError";
import { useRouter } from "next/navigation";
import { createUserAction } from "@/server-actions/user-actions";
import { ErrorMessage } from "../atoms/error-message";

const FormInput = createFormInput<TRegister>();
const FormDatePicker = createFormDatePicker<TRegister>();

export const RegisterForm: React.FC = () => {
  const [type, setType] = useState<"text" | "password">("password");
  const { addToast } = useToast();
  const { addError, getError } = useError();
  const router = useRouter();

  const { control, handleSubmit } = useForm<TRegister>({
    resolver: zodResolver(registerSchema),
  });

  const togglePassword = useCallback(() => {
    setType((prev) => (prev === "password" ? "text" : "password"));
  }, []);

  const onSubmit = useCallback(
    async (data: TRegister) => {
      const { success, data: responseData } = await createUserAction(data);

      if (success) {
        addToast({ type: EToastType.success, message: "Register success" });

        router.push("/auth/login");
      } else {
        addError({ key: "submit", message: responseData as string });
      }
    },
    [addError, addToast, router],
  );

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 pb-4"
      method="POST"
    >
      <FormInput control={control} name="username" label="Username" />

      <FormInput control={control} name="phoneNumber" label="Phone" />

      <FormInput control={control} name="email" label="Email" type="email" />

      <FormDatePicker
        id="birthday"
        control={control}
        name="birthday"
        label="Birthday"
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
        Register
      </Button>
    </form>
  );
};
