import clsx from 'clsx'
import { LoadingIndicator } from './loading-indicator'
import { useIsLoading } from '@/hooks/useIsLoading'

const LoadingScreen = () => {
  const { isMutating } = useIsLoading()

  if (isMutating) {
    return (
      <div className={clsx(`modal-overlay`)} style={{ zIndex: 1000 }}>
        <LoadingIndicator show={true} />
      </div>
    )
  }

  return null
}

export default LoadingScreen
