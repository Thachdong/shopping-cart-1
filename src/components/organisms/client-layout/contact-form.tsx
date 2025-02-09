"use client";
import { Button } from "@/components/atoms/button";
import { EButtonType } from "@/constants";
import {
  createFormInput,
  createFormTextarea,
} from "@/libs/hocs/with-react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { object, string } from "zod";

type TContactForm = {
  email: string;
  content: string;
};

const schema = object({
  email: string().email(),
  content: string(),
});

const Input = createFormInput<TContactForm>();
const Textarea = createFormTextarea<TContactForm>();

export const ContactForm: React.FC = () => {
  const { control, handleSubmit } = useForm<TContactForm>({
    resolver: zodResolver(schema),
  });

  const onSubmit = useCallback((data: TContactForm) => {
    console.log(data);
  }, []);

  return (
    <form
      className="flex flex-col gap-y-4 items-start"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input
        control={control}
        name="email"
        placeholder="Please input your email address"
        className="w-full"
      />

      <Textarea
        control={control}
        name="content"
        placeholder="Please give us your message"
        className="w-full"
        rows={5}
      />

      <Button variant={EButtonType.primary} type="submit">
        Send
      </Button>
    </form>
  );
};
