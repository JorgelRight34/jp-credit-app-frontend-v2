import type { Route } from "@/components/atoms";
import type { LayoutOption } from "../models/pageLayoutOption";
import { AccentPillBtn, AddIcon } from "@/components/atoms";

type GetPageLayoutOptionsArgument = {
    createPath?: Route; deletePath?: Route;
}

export const getPageLayoutOptions = ({ createPath }: GetPageLayoutOptionsArgument): Array<LayoutOption> => {
    const options: Array<LayoutOption> = [];

    if (createPath) {
        options.push({ title: "Añadir", to: createPath, icon: AddIcon, component: AccentPillBtn, })
    }

    return options;
}