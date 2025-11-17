export interface ModulePermission {
  name: string;
  formName: string;
  claims: {
    name: string;
    label: string;
  }[];
}
