import { collateralsQueryKey } from '../lib/constants'
import { DataPickerInputProps, Icon, PickerInputPanel } from '@/components'
import { DataTableContainer, LoanIcon, PickerInput } from '@/components'
import { Collateral } from '../models/collateral'
import { CollateralQuery } from '../models/collateralQuery'
import { DASHES } from '@/lib/utils'
import { collateralSearchConfig } from '../lib/config/collaterals-search-config'
import { buildCollateralSearchInputDataTableConfig } from '../lib/config/collateral-datatable-config'
import { getCollateral } from '../services/collateralClient'

const CollateralSearchInput = ({
  config,
  ...props
}: DataPickerInputProps<Collateral, CollateralQuery>) => {
  return (
    <PickerInput<Collateral, number>
      modalProps={{
        title: <Icon icon={LoanIcon}>Garantías</Icon>,
      }}
      cacheKey={[collateralsQueryKey]}
      accesorFn={(l) => l?.id}
      visibleValueFn={(c) => c?.title ?? DASHES}
      render={(setValue) => (
        <PickerInputPanel reset={() => setValue(null)}>
          <DataTableContainer
            searchConfig={collateralSearchConfig}
            datatableConfig={buildCollateralSearchInputDataTableConfig(
              setValue,
            )}
            cacheKey={[collateralsQueryKey]}
            {...config}
          />
        </PickerInputPanel>
      )}
      loader={getCollateral}
      {...props}
    />
  )
}

export default CollateralSearchInput
