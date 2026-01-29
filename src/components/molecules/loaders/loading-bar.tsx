import { useEffect, useRef } from 'react'
import TopLoadingBar from 'react-top-loading-bar'
import type { LoadingBarRef } from 'react-top-loading-bar'
import { useIsLoading } from '@/hooks/useIsLoading'

/**
 * Loading bar component for representing a progress.
 * This loading bar is used to mark the progress of the HTTP requests (via interceptors) made by the
 * api global object of api.tsx, which is an instance of an axios.
 *
 * @component
 * @returns {JSX.Element} The rendered loading bar component.
 */
const LoadingBar = () => {
  const { isFetching } = useIsLoading()
  const ref = useRef<LoadingBarRef>(null)

  useEffect(() => {
    if (isFetching) {
      ref.current?.continuousStart()
    } else {
      ref.current?.complete()
    }
  }, [isFetching])

  return <TopLoadingBar color="#d09d0c" ref={ref} />
}

export default LoadingBar
