import { ProfileStats } from '../models/profileStats'
import { maritalStatusSpanishTranslations } from '../lib/constants'
import { Profile } from '../models/profile'
import {
  getDNIFromString,
  toFormattedDate,
  toTitleCase,
} from '@/lib/utils/utils'
import { ND } from '@/lib/utils/constants'
import { DateLabel, InfoTable, PhoneLink } from '@/components'
import { MaritalStatus } from '../models/maritalStatus'
import { LinkToLoan } from '@/features/loans'

interface ProfileInfoTableProps {
  profile: Profile
  stats?: ProfileStats
}

const ProfileInfoTable = ({ profile, stats }: ProfileInfoTableProps) => {
  return (
    <InfoTable
      data={[
        [
          'Cédula',
          getDNIFromString(profile.dni),
          'Teléfono Oficina',
          <PhoneLink key="office" phoneNumber={profile.officePhone} />,
        ],
        ['Nombres', profile.firstName, 'Apellidos', profile.lastName],
        ['Profesión', profile.profession ?? ND],
        ['Nacionalidad', profile.lastName],
        [
          'Nacimiento',
          toFormattedDate(new Date(profile.dateOfBirth)),
          'Género',
          profile.gender,
        ],
        [
          'Estado Civil',
          toTitleCase(
            maritalStatusSpanishTranslations[
              profile.maritalStatus.toLowerCase() as MaritalStatus
            ] || '',
          ),
          'Teléfono Casa',
          <PhoneLink key="landline" phoneNumber={profile.landline || ''} />,
        ],
        [
          'Teléfono',
          <PhoneLink key="phone" phoneNumber={profile.phoneNumber || ''} />,
        ],
        [
          'Préstamo Actual',
          <LinkToLoan key="loan" id={stats?.lastLoan.id}>
            Préstamo No.{stats?.lastLoan?.id?.toString() || '---'}
          </LinkToLoan>,
          'Último Pago',
          <DateLabel
            key="lastPayment"
            date={stats?.lastTransaction?.date || '---'}
          />,
        ],
        stats
          ? ['Préstamos', stats.loanCount, 'Garantías', stats.collateralCount]
          : [],
      ]}
    />
  )
}

export default ProfileInfoTable
