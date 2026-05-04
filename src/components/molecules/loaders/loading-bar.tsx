import { useEffect, useRef } from 'react'
import TopLoadingBar from 'react-top-loading-bar'
import type { LoadingBarRef } from 'react-top-loading-bar'
import { useIsFetching } from '@/hooks'
import { useRouterState } from '@tanstack/react-router'

/**
 * Loading bar component for representing a progress.
 * This loading bar is used to mark the progress of the HTTP requests (via interceptors) made by the
 * api global object of api.tsx, which is an instance of an axios.
 *
 * @component
 * @returns {JSX.Element} The rendered loading bar component.
 */
const LoadingBar = () => {
  const isLoading = useRouterState({ select: (s) => s.isLoading })
  const isFetching = useIsFetching()
  const ref = useRef<LoadingBarRef>(null)

  useEffect(() => {
    if (isFetching || isLoading) {
      ref.current?.continuousStart()
    } else {
      ref.current?.complete()
    }

    return () => ref.current?.complete()
  }, [isFetching, isLoading])

  return <TopLoadingBar color="var(--primary-color)" ref={ref} />
}

export default LoadingBar
