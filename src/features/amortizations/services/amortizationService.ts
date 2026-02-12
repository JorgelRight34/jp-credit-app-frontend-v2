import api from "@/lib/services/api";
import { AmortizationCalculatorInput } from "../models/amortizationCalculatorInput";
import { Amortization } from "../models/amortization";
import { PagedResponse } from "@/models";
import { AmortizationPayment } from "../models/amortizationPayment";
import { validateAmortizationInput } from "../lib/utils";

const baseUrl = "amortizations"

export const getAmortization = async (params: AmortizationCalculatorInput): Promise<Amortization> => {
    const { data } = await api.get(baseUrl, { params });
    return data
}

export const getPagedAmortization = async (params: AmortizationCalculatorInput): Promise<PagedResponse<AmortizationPayment>> => {
    if (!validateAmortizationInput(params)) {
        return { items: [], page: 1, pageSize: 0, totalItems: 0, totalPages: 0 }
    }

    const amortization = await getAmortization(params);

    return {
        items: amortization.amortizations,
        page: 1,
        pageSize: amortization.amortizations.length,
        totalItems: amortization.amortizations.length,
        totalPages: 1
    }
}


export const getLoanAmortization = async (id: number): Promise<Amortization> => {
    const { data } = await api.get(`${baseUrl}/loans/${id}`);
    return data
}