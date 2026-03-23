import ProfileSearchInput, {
  ProfileRoleSearchInputProps,
} from './profile-search-input'

const ClientSearchInput = ({ ...props }: ProfileRoleSearchInputProps) => {
  return <ProfileSearchInput title="Clientes" role="client" {...props} />
}

export default ClientSearchInput
