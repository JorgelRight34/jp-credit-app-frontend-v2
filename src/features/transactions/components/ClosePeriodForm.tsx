import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPersonBiking } from "@fortawesome/free-solid-svg-icons";
import DateRangePicker from "../../../components/DateRangePicker/DateRangePicker";
import AccentBtn from "../../../components/ui/AccentBtn";
import usePermissions from "../../Auth/hooks/usePermissions";
import { transactionPermissionsProvider } from "../services/transactionsClient";
import useClosePeriodForm from "../hooks/useClosePeriodForm";
import Unauthorized from "@/pages/Unathorized";

const ClosePeriodForm = () => {
  const { startDateLabel, endDateLabel, maxDate, handleOnSubmit, setData } =
    useClosePeriodForm();

  const { permissions } = usePermissions({
    getPermissions: transactionPermissionsProvider.getPermissions,
    cacheKey: transactionPermissionsProvider.cacheKey,
  });

  if (!permissions?.canCreate) return <Unauthorized />;

  return (
    <>
      <div className="p-3">
        {startDateLabel && endDateLabel && (
          <>
            Desde {startDateLabel} hasta {endDateLabel}
          </>
        )}
      </div>
      <div className="border-top border-bottom">
        <DateRangePicker minDate={maxDate} onChange={(r) => setData(r[0])} />
      </div>
      <div className="py-3">
        <AccentBtn className="w-full" onClick={handleOnSubmit}>
          <FontAwesomeIcon icon={faPersonBiking} className="me-2" />
          Cerrar Período
        </AccentBtn>
      </div>
    </>
  );
};

export default ClosePeriodForm;
