import clsx from 'clsx'
import { LoadingIndicator } from './loading-indicator'
import { useIsLoading } from '@/hooks/useIsLoading'

const LoadingScreen = () => {
  const { isMutating } = useIsLoading()

  return (
    <div
      className={clsx(`modal-overlay`, { '!hidden': !isMutating })}
      style={{ zIndex: 1000 }}
    >
      <LoadingIndicator show={true} />
    </div>
  )
}

export default LoadingScreen
