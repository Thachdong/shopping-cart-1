import { Header } from "@/components/atoms/header";
import { LoginForm } from "@/components/templates/login-form";

export default async function LoginPage() {
  return (
    <div className="mx-auto p-4 w-full max-w-md">
      <Header className="text-center" level={1}>
        Login
      </Header>

      <LoginForm />
    </div>
  );
}
