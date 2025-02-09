"use client";
import { Link } from "@/components/atoms/link";
import { EToastType } from "@/constants";
import { useToast } from "@/libs/contexts/toast-context";

export default function Home() {
  const { addToast } = useToast();

  return (
    <div>
      <Link href="/auth/login">Login</Link>
      <br />
      <button
        onClick={() =>
          addToast({ message: "success", type: EToastType.success })
        }
      >
        toast
      </button>
    </div>
  );
}
