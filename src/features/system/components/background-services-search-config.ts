import { Input, NumericInput, SearchFormConfig } from "@/components";
import { BackgroundService } from "../models/backgroundService";

export const backgroundServicesSearchConfig: SearchFormConfig<BackgroundService> = {
    options: [{
        name: "name", label: "Nombre", width: 12, type: p => Input(p)
    }],
    advanced: [
        { name: "id", label: "Id", width: 12, type: p => NumericInput(p) }
    ]
}