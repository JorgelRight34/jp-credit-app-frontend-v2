import { useIsMutating } from '@/hooks'
import { LoadingIndicator } from './loading-indicator'

const LoadingScreen = () => {
  const isMutating = useIsMutating()

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
