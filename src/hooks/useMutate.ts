import { useMutation } from "@tanstack/react-query";
import type { MutationFunction, UseMutationOptions } from "@tanstack/react-query";
import type { CacheKey } from "@/models";

export interface UseDataMutationProps<TData, TVariables>
    extends Omit<
        UseMutationOptions<TData, unknown, TVariables, unknown>,
        "mutationFn" | "mutationKey"
    > {
    key?: CacheKey;
    mutationFn: MutationFunction<TData, TVariables>;
}

export const useDataMutation = <TData, TVariables = void>({
    key,
    mutationFn,
    ...options
}: UseDataMutationProps<TData, TVariables>) => {
    return useMutation<TData, unknown, TVariables>({
        mutationKey: key,
        mutationFn,
        ...options,
    });
};
