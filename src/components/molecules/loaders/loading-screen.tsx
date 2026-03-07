import { LoadingIndicator } from './loading-indicator'
import { useIsLoading } from '@/hooks/useIsLoading'

const LoadingScreen = () => {
  const { isMutating } = useIsLoading()

  if (isMutating) {
    return (
      <div className="bg-black/50" style={{ zIndex: 1000 }}>
        <LoadingIndicator show={true} />
      </div>
    )
  }

  return null
}

export default LoadingScreen
