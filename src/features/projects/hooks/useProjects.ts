import { useQuery } from "@tanstack/react-query";
import { getProjects } from "../services/projectService";
import { useMemo, useState } from "react";
import { getUrlParams } from "../../../utils/utils";
import { ProjectsQuery } from "../models/projectsQuery";
import { PagedResponse } from "../../../models/pagedResponse";
import { Project } from "../models/project";
import { createDefaultPagedResponse } from "../../../utils/constants";
import { projectsQueryKey } from "../lib/constants";

interface UseProjectsProps {
  query?: ProjectsQuery;
}

const useProjects = ({ query = {} }: UseProjectsProps) => {
  const [page, setPage] = useState(1);
  const urlParams = useMemo(() => getUrlParams(query), [query]);

  const { data, isLoading, isError } = useQuery<PagedResponse<Project>>({
    queryKey: [projectsQueryKey, page, urlParams],
    queryFn: () => getProjects(page, query),
  });

  const fetchPage = (page: number) => setPage(page);

  return {
    projects: data || createDefaultPagedResponse<Project>(),
    isLoading,
    page,
    isError,
    fetchPage,
  };
};

export default useProjects;
