export type Variation = {
    list?: string;
    tab?: string;
    container: string;
};

export const variations = {
    default: {
        list: "!px-0 flex sticky-top border-b flex-shrink-0 w-full !z-20 overflow-x-auto !overflow-y-hidden whitespace-nowrap",
        container: "px-6 px-lg-3",
        tab: "w-fit py-2 px-3"
    },
    minimal: {
        list: "flex justify-end",
        container: "",
        tab: "border rounded-full px-4 mb-3 p-2 shadow-sm rounded-pill ml-3 cursor-pointer",
    },
} as const satisfies Record<string, Variation>;

export type Variations = typeof variations;
export type VariationKey = keyof Variations;
