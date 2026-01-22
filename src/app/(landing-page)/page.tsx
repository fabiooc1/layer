import { Header } from "@/components/header";
import { getUserAction } from "../actions/get-user-action";

export default async function LandingPage() {
  return (
    <div className="space-y-6">
      <Header />
    </div>
  );
}
