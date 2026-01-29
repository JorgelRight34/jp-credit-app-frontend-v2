export interface ModulePermission {
  name: string;
  formName: string;
  claims: Array<{
    name: string;
    label: string;
  }>;
}
