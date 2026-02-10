import type { Route, RouteParams } from "@/components/atoms";
import type { LayoutOption } from "../models/pageLayoutOption";
import { AccentPillBtn, AddIcon, EditIcon } from "@/components/atoms";

type GetPageLayoutOptionsArgument = {
    createPath?: Route;
    editPath?: Route;
    deletePath?: Route;
    params?: RouteParams;
}

export const getPageLayoutOptions = ({ createPath, editPath, params }: GetPageLayoutOptionsArgument): Array<LayoutOption> => {
    const options: Array<LayoutOption> = [];

    if (createPath) {
        options.push({ title: "Añadir", to: createPath, icon: AddIcon, component: AccentPillBtn, })
    }

    if (editPath) {
        options.push({ title: "Editar", to: editPath, params, icon: EditIcon, component: AccentPillBtn })
    }

    return options;
}