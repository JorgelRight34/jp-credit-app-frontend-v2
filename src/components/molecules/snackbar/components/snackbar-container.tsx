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
    />
  )
}

export default SnackbarContainer
