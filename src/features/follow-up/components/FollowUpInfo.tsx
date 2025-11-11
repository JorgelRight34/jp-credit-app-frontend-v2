import { getFullDateString } from "../../../utils/utils";
import LinkToLoan from "../../Loans/components/LinkToLoan";
import { FollowUp } from "../models/followUp";
import clsx from "clsx";
import { Icon } from "@/components/ui";

interface FollowUpInfoProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
  followUp: FollowUp;
}

const FollowUpInfo = ({ followUp, className, ...props }: FollowUpInfoProps) => {
  return (
    <div
      className={clsx("flex flex-col rounded-lg mx-auto", className)}
      {...props}
    >
      {/* Subtítulo dinámico */}
      <div className="flex flex-shrink-0 flex-col">
        <div className="flex items-center justify-between mb-2">
          <Icon icon="calendar_month" className="text-gray-500">
            {getFullDateString(followUp.date)}
          </Icon>
          <LinkToLoan id={followUp.loanId} className="!no-underline">
            <div className="flex items-center justify-end !no-underline">
              <Icon
                icon="arrow_right_alt"
                orientation="right"
                className="mb-0 mr-2"
              >
                Préstamo #{followUp.loanId}
              </Icon>
            </div>
          </LinkToLoan>
        </div>
        <div className="flex flex-col justify-center mb-3">
          <h4>{followUp.clientFullName}</h4>
        </div>
      </div>

      {/* Cuerpo del texto */}
      <div className="border p-3 shadow-sm rounded flex-1">
        <p className="border-left-accent pl-2 mb-0 h-full">{followUp.body}</p>
      </div>
    </div>
  );
};

export default FollowUpInfo;
