import { NavLink } from "react-router";
import InfoTable from "../../../components/DataTable/components/InfoTable";
import PhoneLink from "../../../components/ui/PhoneLink";
import { MaritalStatus } from "../models/maritalStatus";
import { ProfileStats } from "../models/profileStats";
import { maritalStatusSpanishTranslations } from "../lib/constants";
import DateLabel from "../../../components/ui/DateLabel";
import { Profile } from "../models/profile";
import { getDNIFromString, toFormattedDate, toTitleCase } from "@/utils/utils";
import { ND } from "@/utils/constants";

interface ProfileInfoTableProps {
  profile: Profile;
  stats?: ProfileStats;
}

const ProfileInfoTable = ({ profile, stats }: ProfileInfoTableProps) => {
  return (
    <InfoTable
      data={[
        [
          "Cédula",
          getDNIFromString(profile.dni),
          "Teléfono Oficina",
          <PhoneLink phoneNumber={profile.officePhone} />,
        ],
        ["Nombres", profile.firstName, "Apellidos", profile.lastName],
        ["Profesión", profile.profession ?? ND],
        ["Nacionalidad", profile.lastName],
        [
          "Nacimiento",
          toFormattedDate(new Date(profile.dateOfBirth)),
          "Género",
          profile.gender,
        ],
        [
          "Estado Civil",
          toTitleCase(
            maritalStatusSpanishTranslations[
              profile.maritalStatus.toLowerCase() as MaritalStatus
            ] || ""
          ),
          "Teléfono Casa",
          <PhoneLink phoneNumber={profile.landline || ""} />,
        ],
        ["Teléfono", <PhoneLink phoneNumber={profile.phoneNumber || ""} />],
        [
          "Préstamo Actual",
          <NavLink
            to={stats?.lastLoan?.id ? `/loans/${stats?.lastLoan?.id}` : ""}
          >
            Préstamo No.{stats?.lastLoan?.id?.toString() || "---"}
          </NavLink>,
          "Último Pago",
          <DateLabel date={stats?.lastTransaction?.date || "---"} />,
        ],
        stats
          ? ["Préstamos", stats.loanCount, "Garantías", stats.collateralCount]
          : [],
      ]}
    />
  );
};

export default ProfileInfoTable;
