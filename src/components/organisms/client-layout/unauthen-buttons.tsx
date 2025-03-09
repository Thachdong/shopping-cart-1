import { LinkAsButton } from "@/components/molecules/link-as-button";

export const UnAuthenButtons: React.FC = () => {
  return (
    <>
      <LinkAsButton
        id="login-button"
        buttonProps={{ className: "!p-0" }}
        href={"/auth/login#login-button"}
      >
        Login
      </LinkAsButton>
      <span>/</span>
      <LinkAsButton
        id="register-button"
        buttonProps={{ className: "!p-0" }}
        href={"/auth/register#register-button"}
      >
        Register
      </LinkAsButton>
    </>
  );
};
