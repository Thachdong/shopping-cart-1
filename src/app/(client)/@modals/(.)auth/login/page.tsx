"use client";
import { Header } from "@/components/atoms/header";
import { Modal } from "@/components/molecules/modal";
import { LoginForm } from "@/components/templates/login-form";
import { useRouter } from "next/navigation";

export default function LoginModal() {
  const router = useRouter();
  return (
    <Modal
      open={true}
      onClose={router.back}
      header={
        <Header className="w-full text-center" level={2}>
          Login
        </Header>
      }
    >
      <LoginForm />
    </Modal>
  );
}
