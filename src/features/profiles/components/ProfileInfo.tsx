import "../profiles.css";
import ProfileInfoTable from "./ProfileInfoTable";
import ProfileCard from "./ProfileCard";
import { Icon } from "@/components";
import { loanClient, LoanInfo } from "@/features/loans";
import { profilesClient } from "../services/profilesClient";

interface ProfileInfoProps {
  id: number;
}

const ProfileInfo = async ({ id }: ProfileInfoProps) => {
  const profile = await profilesClient.getProfile(id);
  const stats = await profilesClient.fetchProfileStats(id);
  const lastLoan = await loanClient.getLoan(stats.lastLoan.id);

  return (
    <>
      <div className="flex flex-col md:flex-row">
        <div className="mb-md-0 mb-3 flex w-full items-center justify-center md:w-4/12">
          <ProfileCard className="w-full" profile={profile} />
        </div>
        <div className="flex w-full items-center md:w-8/12">
          <ProfileInfoTable stats={stats} profile={profile} />
        </div>
      </div>
      {lastLoan && (
        <div className="mt-5">
          <h4>
            <Icon
              icon="arrow_right_alt"
              iconClassName="!text-3xl text-accent cursor-pointer"
              label={"Último Préstamo"}
              orientation="right"
            />
          </h4>
          <LoanInfo loan={lastLoan} />
        </div>
      )}
    </>
  );
};

export default ProfileInfo;
