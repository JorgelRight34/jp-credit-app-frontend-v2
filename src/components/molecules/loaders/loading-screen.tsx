import { GridLoader } from 'react-spinners'
import clsx from 'clsx'
import { useIsLoading } from '@/hooks/useIsLoading'

const LoadingScreen = () => {
  const { isMutating } = useIsLoading()

  return (
    <div
      className={clsx(`modal-overlay`, { '!hidden': !isMutating })}
      style={{ zIndex: 1000 }}
    >
      <GridLoader color="#ffff" size={20} margin={2} speedMultiplier={1} />
    </div>
  )
}

export default LoadingScreen
