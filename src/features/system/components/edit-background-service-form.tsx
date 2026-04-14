import {
  AccentBtn,
  ArrayFieldProps,
  CheckCircleIcon,
  Container,
  DataModuleFormProps,
  DateInput,
  DeleteIcon,
  Form,
  FormContainer,
  FormErrorsPanel,
  FormFieldArray,
  FormGroup,
  FormRow,
  Icon,
  Input,
  NumericInput,
  SaveAsIcon,
  SecondaryBtn,
  useForm,
  useFormState,
} from '@/components'
import { useBackgroundServiceForm } from '../hooks/useBackgroundServiceForm'
import { PropsWithBackgroundService } from '../models/backgroundService'
import {
  BackgroundServiceConfigurationFormValues,
  backgroundServiceConfigurationSchema,
  ConfigurationFormValues,
} from '../lib/schemas/backgroundServiceConfigurationSchema'
import { getTodayAsInputDate } from '@/lib/utils'

const EditBackgroundServiceForm = (
  props: PropsWithBackgroundService<
    DataModuleFormProps<void, BackgroundServiceConfigurationFormValues>
  >,
) => {
  const form = useBackgroundServiceForm(props)

  return (
    <FormContainer form={form}>
      <Form form={form}>
        <FormFieldArray
          control={form.control}
          name="configurations"
          appendDefaultValues={{
            dayDifference: 1,
            startTime: '00:00:00',
            startDate: getTodayAsInputDate(),
          }}
          render={ConfigurationForm}
        />
      </Form>
    </FormContainer>
  )
}

export default EditBackgroundServiceForm

const ConfigurationForm = ({
  update,
  remove,
  index,
  value,
}: ArrayFieldProps<BackgroundServiceConfigurationFormValues>) => {
  const form = useForm<void, ConfigurationFormValues>({
    schema: backgroundServiceConfigurationSchema,
    defaultValues: value,
    onSubmit: async (data) => update(index, data),
  })
  const { touchedFields } = useFormState({
    control: form.control,
  })

  return (
    <Container>
      <Form form={form}>
        <FormRow>
          <FormGroup
            label="Hora de inicio"
            type="time"
            name="startTime"
            input={Input}
          />
          <FormGroup
            label="Fecha de inicio"
            type="time"
            name="startDate"
            input={DateInput}
          />
        </FormRow>
        <FormRow>
          <FormGroup
            label="Intervalo (dias)"
            name="dayDifference"
            input={NumericInput}
          />
        </FormRow>
        <FormRow>
          <AccentBtn onClick={form.submit}>
            {Object.values(touchedFields).length > 0 ? (
              <Icon icon={SaveAsIcon}>Guardar</Icon>
            ) : (
              <Icon icon={CheckCircleIcon}>Guardado</Icon>
            )}
          </AccentBtn>
          <SecondaryBtn onClick={() => remove(index)}>
            <Icon icon={DeleteIcon}>Remover</Icon>
          </SecondaryBtn>
        </FormRow>
      </Form>
      <FormErrorsPanel control={form.control} />
    </Container>
  )
}
