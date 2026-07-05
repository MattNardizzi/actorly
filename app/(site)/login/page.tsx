import type { Metadata } from "next";
import AuthLayout from "@/components/auth/AuthLayout";
import LoginForm from "@/components/auth/LoginForm";

export const metadata: Metadata = {
  title: "Log in",
  description: "Log in to your Actorly account.",
};

export default function Login() {
  return (
    <AuthLayout
      title="Welcome back."
      sub="Log in to your profile, your jobs, and your workspace."
      quote="Every audition is a door. This one's already open."
      quoteBy="Actorly"
    >
      <LoginForm />
    </AuthLayout>
  );
}
