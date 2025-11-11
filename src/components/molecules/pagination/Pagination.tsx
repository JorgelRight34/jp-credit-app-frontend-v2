import {
  PaginationProps as MPaginationProps,
  Pagination as MPagination,
} from "@mui/material";

type PaginationProps = MPaginationProps;

const Pagination = (props: PaginationProps) => {
  return <MPagination variant="outlined" color="primary" {...props} />;
};

export default Pagination;
