import ProfileSearchInput, {
  ProfileRoleSearchInputProps,
} from './profile-search-input'

const GuarantorSearchInput = ({
  datatable,
  ...props
}: ProfileRoleSearchInputProps) => {
  return <ProfileSearchInput title="Garantes" role="guarantor" {...props} />
}

export default GuarantorSearchInput
