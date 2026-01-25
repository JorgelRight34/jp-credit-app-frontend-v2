import dayjs from "dayjs"
import { useEffect, useState } from "react";
import { RangeKeyDict } from "react-date-range";
import { DateOption } from "../models/dateInput";

const options: DateOption[] =
    [
        {
            label: "Esta Semana",
            selection: {
                startDate: dayjs().startOf("week").toDate(),
                endDate: dayjs().endOf("week").toDate(),
            },
        },
        {
            label: "Última Semana",
            selection: {
                startDate: dayjs().subtract(1, "week").startOf("week").toDate(),
                endDate: dayjs().subtract(1, "week").endOf("week").toDate(),
            },
        },
        {
            label: "Últimos 7 Días",
            selection: {
                startDate: dayjs().subtract(6, "day").toDate(),
                endDate: dayjs().toDate(),
            },
        },
        {
            label: "Este Mes",
            selection: {
                startDate: dayjs().startOf("month").toDate(),
                endDate: dayjs().endOf("month").toDate(),
            },
        },
        {
            label: "Último Mes",
            selection: {
                startDate: dayjs().subtract(1, "month").startOf("month").toDate(),
                endDate: dayjs().subtract(1, "month").endOf("month").toDate(),
            },
        },
        {
            label: "Resetear",
            selection: { startDate: new Date(), endDate: new Date() },
        },
    ];

interface UseDateRangeOptionsProps {
    setDateRange: (item: DateOption | RangeKeyDict) => void
}

export const useDateRangeOptions = ({ setDateRange }: UseDateRangeOptionsProps) => {
    const [month, setMonth] = useState<number>();
    const [year, setYear] = useState(new Date().getFullYear());

    useEffect(() => {
        if (month === undefined || year === undefined) return;

        const startDate = dayjs().year(year).month(month).startOf("month").toDate();
        const endDate = dayjs().year(year).month(month).endOf("month").toDate();

        setDateRange({ selection: { startDate, endDate } });
    }, [month, year, setDateRange]);

    return { options, year, month, setMonth, setYear };
};
