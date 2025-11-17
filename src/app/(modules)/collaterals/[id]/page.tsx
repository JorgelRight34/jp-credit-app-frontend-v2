import { collateralClient } from "@/features/collaterals";
import { AppPageProps } from "@/models/appPageProps";
import CollateralPageClient from "./components/CollateralPageClient";
import { Metadata } from "next";
import { toAllTitleCase } from "@/utils/utils";

export async function generateMetadata({
  params,
}: AppPageProps): Promise<Metadata> {
  const collateral = await collateralClient.getCollateral(params.id);
  const title = toAllTitleCase(collateral.title);

  return {
    title: {
      default: title,
      template: `${title} - %s`,
    },
  };
}

const Page = async ({ params }: AppPageProps) => {
  const collateral = await collateralClient.getCollateral(params.id);

  return <CollateralPageClient collateral={collateral} />;
};

export default Page;
