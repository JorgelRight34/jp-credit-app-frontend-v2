import { CloseIcon } from '@/components/atoms'
import { ToastContainer } from 'react-toastify'

const SnackbarContainer = () => {
  return (
    <ToastContainer
      autoClose={5000}
      hideProgressBar
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      icon={false}
      closeButton={() => <CloseIcon className="text-primary" />}
      toastClassName="!bg-transparent p-0 shadow-none"
    />
  )
}

export default SnackbarContainer
