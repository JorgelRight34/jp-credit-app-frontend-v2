/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import parsePhoneNumberFromString from 'libphonenumber-js'
import type { CountryCode } from 'libphonenumber-js'
import { ND, TEST } from '@/lib/utils/constants'

interface PhoneLink {
  phoneNumber?: string
  nationality?: CountryCode
}

const PhoneLink = ({ phoneNumber, nationality = 'DO' }: PhoneLink) => {
  if (!phoneNumber) return ND

  return (
    <a href={`https://wa.me/${phoneNumber}`} target="_blank">
      {TEST
        ? '+1 809 000 0000'
        : parsePhoneNumberFromString(
            phoneNumber,
            nationality,
          )?.formatInternational() || '---'}
    </a>
  )
}

export default PhoneLink
