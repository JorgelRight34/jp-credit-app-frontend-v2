import clsx from "clsx";
import { getFullDateString } from "../../../utils/utils";
import { FollowUp } from "../models/followUp";
import { Icon } from "@/components";
import { LinkToLoan } from "@/features/loans";

interface FollowUpInfoProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
  followUp: FollowUp;
}

const FollowUpInfo = ({ followUp, className, ...props }: FollowUpInfoProps) => {
  return (
    <div
      className={clsx("mx-auto flex flex-col rounded-lg", className)}
      {...props}
    >
      {/* Subtítulo dinámico */}
      <div className="flex flex-shrink-0 flex-col">
        <div className="mb-2 flex items-center justify-between">
          <Icon icon="calendar_month" className="text-gray-500">
            {getFullDateString(followUp.date)}
          </Icon>
          <LinkToLoan id={followUp.loanId} className="!no-underline">
            <div className="flex items-center justify-end !no-underline">
              <Icon
                icon="arrow_right_alt"
                orientation="right"
                className="mr-2 mb-0"
              >
                Préstamo #{followUp.loanId}
              </Icon>
            </div>
          </LinkToLoan>
        </div>
        <div className="mb-3 flex flex-col justify-center">
          <h4>{followUp.clientFullName}</h4>
        </div>
      </div>
      {/* Cuerpo del texto */}
      <div className="flex-1 rounded border p-3 shadow-sm">
        <p className="border-left-accent mb-0 h-full pl-2">{followUp.body}</p>
      </div>
    </div>
  );
};

export default FollowUpInfo;
