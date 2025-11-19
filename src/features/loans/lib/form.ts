import { z } from "zod";
import { UseFormSetValue } from "react-hook-form";
import { paymentFrequencyToMonths } from "@/features/transactions";
import { FormProvider } from "@/components";


const changeStartDateWhenPaymentFrequencyChanges = (
    form: LoanFormValues,
    setValue: UseFormSetValue<LoanFormValues>
) => {
    const frequency = form.paymentFrequency;
    if (!frequency) return;

    const monthsToAdd = paymentFrequencyToMonths[frequency] ?? 1;

    const newDate = new Date();
    newDate.setMonth(newDate.getMonth() + monthsToAdd);

    setValue("startDate", newDate.toISOString().split("T")[0]);
};

const loanFormSchema = z
    .object({
        approvedAmount: z.preprocess(
            (val) => Number(val),
            z.number().positive("Debe ser positivo.")
        ),
        disbursedAmount: z.preprocess(
            (val) => Number(val),
            z.number().positive("Debe ser positivo.")
        ),
        description: z.string(),
        interestRate: z.union([
            z.string().transform((val) => Number(val)),
            z.number(),
        ]),
        numberOfPayments: z.union([
            z
                .string()
                .transform((val) => Number(val))
                .refine((val) => val > 0, { message: "Debe ser mayor que 0" })
                .refine((val) => val < 1000, { message: "Demasiadas cuotas" }),
            z.number(),
        ]),
        paymentFrequency: z.union([
            z
                .string()
                .transform((val) => Number(val))
                .refine((val) => val > 0, { message: "Debe ser mayor que 0" }),
            z.number(),
        ]),
        startDate: z.string().default(new Date().toISOString()),
        deliveryDate: z.string(),
        loanOfficerId: z.number().optional(),
        guarantorId: z.number().optional(),
        projectId: z.number(),
        clientId: z.union([
            z
                .object({
                    value: z.number(),
                    label: z.string(),
                })
                .transform((val) => val.value),
            z.number(),
        ]),
        status: z.string(),
        annualInterestRate: z.number().optional(),
    })
    .refine((data) => data.approvedAmount >= data.disbursedAmount, {
        message: `El monto desembolsado no puede ser mayor al aprobado.`,
        path: ["disbursedAmount"],
    });


export const loanFormProvider: FormProvider<LoanFormValues> = {
    fields: [
        {
            name: "approvedAmount",
            id: "approvedAmount",
            label: "Monto Aprobado",
            disabledOnEdit: false,
            type: "currency",
        },
        {
            name: "disbursedAmount",
            label: "Desembolsado",
            id: "disbursedAmount",
            type: "currency",
            disabledOnEdit: false,
            watchedValues: ["approvedAmount"],
            changeWhen: (form, setValue) => {
                if (!form.approvedAmount) return;
                setValue("disbursedAmount", form.approvedAmount);
            },
        },
        {
            name: "interestRate",
            id: "interestRate",
            label: "Tasa Interés Anual (1-100)%",
            type: "percentage",
            min: 0,
            step: 0.001,
        },
        {
            name: "startDate",
            id: "startDate",
            label: "Fecha de Inicio",
            type: "date",
            watchedValues: ["paymentFrequency"],
            changeWhen: changeStartDateWhenPaymentFrequencyChanges,
        },
        {
            name: "paymentFrequency",
            id: "paymentFrequency",
            label: "Frecuencia de Pago",
            type: "select",
            options: [
                [12, "Mensual"],
                [1, "Anual"],
                [4, "Trimestral"],
                [2, "Semestral"],
            ],
        },
        {
            name: "numberOfPayments",
            label: "Número de Cuotas",
            id: "numberOfPayments",
            type: "number",
            min: 0,
            step: 0.001,
        },
        {
            name: "deliveryDate",
            id: "deliveryDate",
            label: "Fecha de Entrega",
            type: "date",
        },
        {
            name: "clientId",
            id: "clientId",
            label: "Cliente",
            type: "profile",
        },
        {
            name: "loanOfficerId",
            id: "loanOfficerId",
            type: "profile",
            label: "Agente",
        },
        {
            name: "guarantorId",
            id: "guarantorId",
            type: "profile",
            label: "Garante",
        },
        {
            name: "status",
            id: "status",
            label: "Estado",
            type: "select",
            options: [
                ["active", "Activo"],
                ["inactive", "Inactivo"],
                ["notified", "Notificado"],
                ["punished", "Castigado"],
                ["legal", "legal"],
                ["judicial", "Judicial"],
                ["agreement", "Acuerdo"],
                ["overdue", "Atrasado"]
            ],
        },
        {
            name: "description",
            id: "description",
            label: "Descripción",
            rows: 3,
            type: "textarea",
        },
        {
            name: "projectId",
            id: "projectId",
            label: "Proyecto",
            type: "text",
        },
    ],
    schema: loanFormSchema
}

export type LoanFormValues = z.infer<typeof loanFormSchema>;
