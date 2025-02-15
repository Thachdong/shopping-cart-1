"use client";
import { Button } from "@/components/atoms/button";
import { EButtonType } from "@/constants";
import {
  createFormInput,
  createFormUploadAvatar,
} from "@/libs/hocs/with-react-hook-form";
import { createUserSchema } from "@/validators/user.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";

const FormInput = createFormInput<TCreateUser>();
const UploadAvatar = createFormUploadAvatar<TCreateUser>();

export const CreateUserForm: React.FC = () => {
  const { control } = useForm<TCreateUser>({
    resolver: zodResolver(createUserSchema),
  });
  return (
    <form>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <FormInput control={control} name="username" label="Username" />
        <FormInput control={control} name="phoneNumber" label="Phone Number" />
        <FormInput control={control} name="email" label="email" type="email" />
        <FormInput control={control} name="birthday" label="birthday" />
        <FormInput control={control} name="homeNumber" label="Home Number" />
        <FormInput control={control} name="ward" label="Address Ward" />
        <FormInput control={control} name="city" label="Address City" />
      </div>

      <div>
        <p className="mb-2">Avatar</p>
        <UploadAvatar control={control} name="avatarId" />
      </div>

      <div className="text-center mt-4">
        <Button className="px-8" variant={EButtonType.primary}>
          Create
        </Button>
      </div>
    </form>
  );
};
