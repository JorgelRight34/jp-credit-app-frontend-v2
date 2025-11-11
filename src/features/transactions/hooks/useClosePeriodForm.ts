import { useMemo, useState } from "react";
import { dateToIsoString, getFullDateString } from "../../../utils/utils";
import { eachDayOfInterval } from "date-fns";
import dayjs from "dayjs";
import useClosedPeriods from "./useClosedPeriods";
import useClosePeriod from "./useClosePeriod";
import { ClosePeriodRequest } from "../models/closePeriodRequest";

const useClosePeriodForm = () => {
  const [data, setData] = useState<ClosePeriodRequest>({});
  const { closePeriod } = useClosePeriod();
  const { closedPeriods } = useClosedPeriods({
    query: {
      startDate: dateToIsoString(dayjs().subtract(1, "year").toDate()),
      endDate: dateToIsoString(new Date()),
    },
  });

  const minDate = useMemo<Date | undefined>(() => {
    if (closedPeriods.length === 0) return undefined;

    return new Date(
      closedPeriods.reduce(
        (acc, curr) => (curr.startDate < acc ? curr.startDate : acc),
        closedPeriods[0].startDate
      )
    );
  }, [closedPeriods]);

  const maxDate = useMemo<Date | undefined>(() => {
    if (closedPeriods.length === 0) return undefined;

    return new Date(
      closedPeriods.reduce(
        (acc, curr) => (curr.endDate > acc ? curr.endDate : acc),
        closedPeriods[0].endDate
      )
    );
  }, [closedPeriods]);

  const blockedRange = useMemo(() => {
    if (closedPeriods.length === 0) return [];

    return eachDayOfInterval({
      start: new Date(
        closedPeriods.reduce(
          (acc, curr) => (curr.startDate < acc ? curr.startDate : acc),
          closedPeriods[0].startDate
        )
      ),
      end: new Date(
        closedPeriods.reduce(
          (acc, curr) => (curr.endDate > acc ? curr.endDate : acc),
          closedPeriods[0].endDate
        )
      ),
    });
  }, [closedPeriods]);

  const startDateLabel = useMemo(
    () => (data.startDate ? getFullDateString(data.startDate) : ""),
    [data]
  );

  const endDateLabel = useMemo(
    () => (data.endDate ? getFullDateString(data.endDate) : ""),
    [data]
  );

  const handleOnSubmit = async () => {
    if (data.startDate && data.endDate) {
      await closePeriod(data);
    }
  };

  return {
    data,
    setData,
    handleOnSubmit,
    closePeriod,
    blockedRange,
    minDate,
    maxDate,
    startDateLabel,
    endDateLabel,
  };
};

export default useClosePeriodForm;
