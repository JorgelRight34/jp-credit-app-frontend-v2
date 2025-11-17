/* eslint-disable @typescript-eslint/no-unused-vars */
export type UseEntityModuleFormProps<TEntity, _FormValues> = {
    edit?: TEntity;
    onDirtyChange?: (isDirty: boolean) => void;
}