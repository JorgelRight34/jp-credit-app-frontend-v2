import { Input, NumericInput, SearchFormConfig } from '@/components'
import { ProjectQuery } from '../../models/projectQuery'

export const projectSearchConfig: SearchFormConfig<ProjectQuery> = {
  options: [
    { name: 'id', width: 2, label: 'Id', type: (p) => NumericInput(p) },
    { name: 'name', width: 10, label: 'Nombre', type: (p) => Input(p) },
  ],
  advanced: [],
}
