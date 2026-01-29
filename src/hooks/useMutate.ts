import { CacheKey } from "@/models";
import { useMutation, UseMutationOptions, MutationFunction } from "@tanstack/react-query";

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
