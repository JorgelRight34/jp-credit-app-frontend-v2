export type Variation = {
    list?: string;
    tab?: string;
};

export const variations = {
    default: {
        list: "!px-0 flex sticky-top bg-white border-b flex-shrink-0 mb-3 w-full !z-20 overflow-x-auto !overflow-y-hidden whitespace-nowrap",
        tab: "w-fit py-2 px-3"
    },
    minimal: {
        list: "flex justify-end",
        tab: "bg-white border p-2 shadow-sm rounded-pill ml-3 px-3 cursor-pointer",
    },
} as const satisfies Record<string, Variation>;

export type Variations = typeof variations;
export type VariationKey = keyof Variations;
