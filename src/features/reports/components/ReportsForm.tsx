import {
  Container,
  EntityFormProps,
  FileFormButton,
  FileFormExplorer,
  FormBuilder,
  FormLayout,
  FormSubscriptionWrapper,
  SecondaryBtn,
  UploadFileForm,
  UploadFileFormRef,
  useEntityForm,
} from '@/components'
import { useReportsForm } from '../hooks/useReportsForm'
import { ReportFormFields } from '../lib/form'
import { useRef } from 'react'
import { useReportFileForm } from '../hooks/useReportFileForm'
import { FileModel } from '@/models/fileModel'
import ReportsFormHelp from './ReportsFormHelp'
import { ReportKey } from '../models/reportKey'
import { ND } from '@/lib/utils/constants'
import { Report } from '../models/report'

type ReportsFormProps = EntityFormProps<ReportFormFields, Report>

const ReportsForm = ({ edit }: ReportsFormProps) => {
  const config = useReportsForm({ edit })
  const { form, ref, onDirtyChange, ...methods } =
    useEntityForm<ReportFormFields>()
  const fileFormRef = useRef<UploadFileFormRef>(null)
  const fileFormConfig = useReportFileForm({ form, edit })

  return (
    <FormLayout {...methods} onSubmit={() => fileFormRef.current?.submit()}>
      <div className="flex items-stretch gap-4">
        <div className="w-8/12">
          <FormBuilder
            ref={ref}
            layout={[['title'], ['key'], ['description']]}
            edit={edit}
            onDirtyChange={onDirtyChange}
            {...config}
          />
          <Container className="space-y-3">
            <UploadFileForm
              {...fileFormConfig}
              ref={fileFormRef}
              onDirtyChange={onDirtyChange}
              render={FileFormExplorer}
            />
            <FileFormButton
              onSubmit={async (data) => {
                fileFormRef.current?.onChange((prev) => ({
                  ...prev,
                  created: [...prev.created, data],
                }))
                return { ...data, fileType: ND } as FileModel
              }}
              onDirtyChange={onDirtyChange}
            >
              <SecondaryBtn type="button" className="w-full" icon="link">
                Tengo un enlace
              </SecondaryBtn>
            </FileFormButton>
          </Container>
        </div>
        <div className="flex w-4/12 flex-1 flex-col py-6">
          <FormSubscriptionWrapper
            form={form}
            subscribedNames={['key']}
            render={({ key }) => (
              <ReportsFormHelp
                listClassName="!max-h-[65vh]"
                className="flex-1"
                reportKey={key as ReportKey}
              />
            )}
          />
        </div>
      </div>
    </FormLayout>
  )
}

export default ReportsForm
