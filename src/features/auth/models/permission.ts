export interface Permission {
  name: string;
  formName: string;
  claims: {
    name: string;
    label: string;
  }[];
}
