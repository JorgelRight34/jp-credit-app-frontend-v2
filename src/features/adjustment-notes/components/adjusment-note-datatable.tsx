import { DataTableContainer, DataTableContainerOverrides } from '@/components'
import { adjusmentNoteSearchConfig } from '../lib/config/adjustment-note-search-config'
import { adjustmentNoteDatatableConfig } from '../lib/config/adjustment-note-datatable-config'
import { adjustmentNoteQueryKey } from '../lib/query-keys'
import { AdjustmentNote } from '../models/adjustmentNote'
import { AdjustmentNoteQuery } from '../models/adjustmentNoteQuery'

const AdjustmentNoteDataTable = (
  props: DataTableContainerOverrides<AdjustmentNote, AdjustmentNoteQuery>,
) => {
  return (
    <DataTableContainer
      searchConfig={adjusmentNoteSearchConfig}
      datatableConfig={adjustmentNoteDatatableConfig}
      cacheKey={[adjustmentNoteQueryKey]}
      {...props}
    />
  )
}

export default AdjustmentNoteDataTable
