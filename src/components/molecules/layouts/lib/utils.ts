import type { Route } from "@/components/atoms";
import type { LayoutOption } from "../models/entityLayoutOption";
import { AccentBtn, AddIcon } from "@/components/atoms";

type GetEntityLayoutOptionsArgument = {
    createPath?: Route; deletePath?: Route;
}

export const getEntityLayoutOptions = ({ createPath }: GetEntityLayoutOptionsArgument): Array<LayoutOption> => {
    const options: Array<LayoutOption> = [];

    if (createPath) {
        options.push({ title: "Crear", to: createPath, icon: AddIcon, component: AccentBtn, })
    }

    return options;
}