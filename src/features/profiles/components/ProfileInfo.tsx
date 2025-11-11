import "../profiles.css";
import ProfileInfoTable from "./ProfileInfoTable";
import ProfileCard from "./ProfileCard";
import LoanInfo from "../../Loans/components/LoanInfo";
import useProfileStats from "../hooks/useProfileStats";
import { Profile } from "../models/profile";
import { Icon } from "@/components/ui";
import useLoan from "@/features/Loans/hooks/useLoan";
import useProfile from "../hooks/useProfile";

interface ProfileInfoProps {
  profile?: Profile;
  id?: number;
}

const ProfileInfo = ({ id }: ProfileInfoProps) => {
  const { profile } = useProfile({ id });

  const { stats } = useProfileStats(profile?.id);
  const { loan: lastLoan } = useLoan({ id: stats?.lastLoan?.id });

  if (!profile) return <></>;

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
