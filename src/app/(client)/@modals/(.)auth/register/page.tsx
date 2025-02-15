"use client";
import { Header } from "@/components/atoms/header";
import { Modal } from "@/components/molecules/modal";
import { RegisterForm } from "@/components/templates/register-form";
import { useRouter } from "next/navigation";

export default function RegisterModal() {
  const router = useRouter();
  return (
    <Modal
      open={true}
      onClose={router.back}
      header={
        <Header className="w-full text-center" level={2}>
          Register
        </Header>
      }
    >
      <RegisterForm />
    </Modal>
  );
}
