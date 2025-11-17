import { userClient } from "@/features/auth";
import { AppPageProps } from "@/models/appPageProps";
import { getFullName } from "@/utils/utils";
import { Metadata } from "next";

export async function generateMetada({
  params,
}: AppPageProps<{ id: number }>): Promise<Metadata> {
  const user = await userClient.getUser(params.id);
  const title = `${getFullName(user)} (${user.username})`;

  return {
    title: {
      default: title,
      template: `${title} - %s`,
    },
  };
}

export const Layout = ({ children }: AppPageProps) => children;
