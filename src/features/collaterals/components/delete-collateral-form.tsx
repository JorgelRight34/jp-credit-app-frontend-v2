import { ConfirmationForm } from '@/components'
import { PropsWithCollateral } from '../models/collateral'
import { deleteCollateral } from '../services/collateralClient'

const DeleteCollateralForm = ({ collateral }: PropsWithCollateral) => (
  <ConfirmationForm
    confirmationMessage="Deseo borrar esta garantía"
    onConfirm={() => deleteCollateral(collateral.id)}
  />
)

export default DeleteCollateralForm
