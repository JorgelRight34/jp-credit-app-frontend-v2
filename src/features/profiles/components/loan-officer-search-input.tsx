import ProfileSearchInput, {
  ProfileRoleSearchInputProps,
} from './profile-search-input'

const LoanOfficerSearchInput = ({
  datatable,
  ...props
}: ProfileRoleSearchInputProps) => {
  return <ProfileSearchInput title="Oficiales" role="loanOfficer" {...props} />
}

export default LoanOfficerSearchInput
