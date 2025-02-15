import { Header } from "@/components/atoms/header";
import { RegisterForm } from "@/components/templates/register-form";

export default async function RegisterPage() {
  return (
    <div className="mx-auto p-4 w-full max-w-md">
      <Header className="text-center" level={1}>
        Register
      </Header>

      <RegisterForm />
    </div>
  );
}
