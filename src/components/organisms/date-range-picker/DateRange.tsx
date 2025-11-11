import { DateRange as D, DateRangeProps } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

export const DateRange = (props: DateRangeProps) => <D {...props} />;

export default DateRange;
