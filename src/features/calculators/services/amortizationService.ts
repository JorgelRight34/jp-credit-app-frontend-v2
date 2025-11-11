import { fetchBlobWithQueryParams } from "@/utils/utils";
import api from "../../../services/api";
import { ReportOptions } from "@/models";
import { Amortization } from "../models/amortization";
import { AmortizationCalculatorInput } from "../models/amortizationCalculatorInput";

const baseUrl = "amortizations";

export const downloadAmortizationBlobAs = async (body: ReportOptions) => {
  return await fetchBlobWithQueryParams(`${baseUrl}/export/${body.format}/?${body}`)
};

export const downloadLoanAmortizationAs = async (
  fileFormat: string,
  id: string | number
) => {
  const response = await api.get(`${baseUrl}/loans/${id}/${fileFormat}`, {
    responseType: "blob",
  });
  return response.data;
};

export const getAmortization = async (query: AmortizationCalculatorInput) => {
  const response = await api.get(`${baseUrl}${query.loanId ? `/loans/${query.loanId}` : ""}`, { params: query });
  return response.data
}

export const getLoanAmortization = async (id: number): Promise<Amortization> => {
  const response = await api.get(`${baseUrl}/loans/${id}`);
  return response.data
}