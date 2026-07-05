import type { Metadata } from "next";
import AuthLayout from "@/components/auth/AuthLayout";
import JoinForm from "@/components/auth/JoinForm";

export const metadata: Metadata = {
  title: "Join Actorly",
  description: "Create your Actorly account as an actor or casting professional. Free to join.",
};

export default function Join() {
  return (
    <AuthLayout
      title="Step into the light."
      sub="Create your account — actors and casting professionals welcome. Free to join, minutes to set up."
      quote="The role was always yours. We just turned on the light."
      quoteBy="Actorly"
    >
      <JoinForm />
    </AuthLayout>
  );
}
