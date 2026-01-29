import {
  EntityQuerySearch,
  QuerySearchInput,
  QuerySearchProps,
} from '@/components'
import {
  ProfileRole,
  profileRolesSpanishTranslations,
} from '@/features/profiles'
import { useMemo } from 'react'
import { FollowUpQuery } from '../models/followUpQuery'
import { toTitleCase } from '@/lib/utils/utils'

type FollowUpQuerySearchProps = QuerySearchProps<FollowUpQuery> & {
  profileAs?: ProfileRole
}

const FollowUpQuerySearch = ({
  onSubmit,
  defaultValues,
  ...props
}: FollowUpQuerySearchProps) => {
  const fields = useMemo<QuerySearchInput<FollowUpQuery>[]>(
    () => [
      {
        name: 'id',
        id: 'id',
        label: 'Id',
      },
      {
        name: 'profileId',
        id: 'profileId',
        label:
          toTitleCase(
            profileRolesSpanishTranslations[
              defaultValues?.profileAs ?? 'profile'
            ],
          ) ?? '',
        type: 'profile',
      },
      {
        name: 'loanId',
        id: 'loanId',
        label: 'Préstamo',
        type: 'loan',
        searchOnChange: true,
      },
      {
        name: 'body',
        id: 'body',
        label: 'Texto',
      },
    ],
    [defaultValues],
  )

  return <EntityQuerySearch onSubmit={onSubmit} fields={fields} {...props} />
}

export default FollowUpQuerySearch
