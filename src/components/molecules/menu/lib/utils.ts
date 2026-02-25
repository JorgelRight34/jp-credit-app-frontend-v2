import { ConfirmationModalProps, ConfirmationModalTrigger } from "@/components/organisms";
import { ElementType, PropsWithChildren } from "react";

export interface BuildConfirmationModalTriggerProps extends ConfirmationModalProps {
    wrapper?: ElementType
}

export const buildConfirmationModalTrigger = (confModalProps: BuildConfirmationModalTriggerProps): ElementType => {
    return (props: PropsWithChildren) => ConfirmationModalTrigger({ ...confModalProps, ...props })
}