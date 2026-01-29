export type UseEntityModuleFormProps<TEntity, FormValues> = {
    edit?: TEntity;
    defaultValues?: Partial<FormValues>;
    onDirtyChange?: (isDirty: boolean) => void;
}