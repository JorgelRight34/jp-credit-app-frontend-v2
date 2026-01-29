/*
import { useFileForm } from '../hooks/useFileForm'
import { EntityForm } from '../../../../../bk/form-builder'
import type { UseEntityModuleFormProps } from '../../../../../bk/form-builder'
import type { UseFileFormProps } from '../hooks/useFileForm'
import type { FileFormFieldValues } from '../lib/form'
import type { FileModel } from '@/models/fileModel'

export type FileFormProps = UseEntityModuleFormProps<
  FileModel,
  FileFormFieldValues
> &
  UseFileFormProps

const FileForm = ({ onSubmit, ...props }: FileFormProps) => {
  const config = useFileForm({ onSubmit })

  return <EntityForm layout={[['name'], ['url']]} {...props} {...config} />
}

export default FileForm
*/

const Hola = () => 'div'

export default Hola
