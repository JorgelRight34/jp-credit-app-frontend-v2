import usePermissions from "@/features/Auth/hooks/usePermissions";
import { PermissionsProvider } from "@/models/permissionsProvider";



interface UseFormPageProps {
    permissionsProvider?: PermissionsProvider;
    onDelete?: () => void;
}

export const useFormPage = ({ permissionsProvider, onDelete }: UseFormPageProps) => {

    const { permissions, isLoading, isError } = usePermissions({
        ...permissionsProvider,
    });

    return { permissions, isLoading, isError, onDelete, }
}