import { createContext, ReactNode, useContext, useState } from 'react'
import { setProjectId } from '../lib/utils'

type ProjectIdContextValue = [number | null, (id: number | null) => void]

const ProjectIdContext = createContext<ProjectIdContextValue | undefined>(
  undefined,
)

type ProjectIdProviderProps = {
  initialProjectId: number | null
  children: ReactNode
}

export const ProjectIdProvider = ({
  initialProjectId,
  children,
}: ProjectIdProviderProps) => {
  const [projectId, setProjectIdState] = useState<number | null>(
    initialProjectId,
  )

  const handleSetProjectId = (value: number | null) => {
    setProjectIdState(value)
    setProjectId(value)
  }

  return (
    <ProjectIdContext.Provider value={[projectId, handleSetProjectId]}>
      {children}
    </ProjectIdContext.Provider>
  )
}

export const useProjectId = () => {
  const context = useContext(ProjectIdContext)
  if (!context) {
    throw new Error('useProjectId must be used inside ProjectIdProvider')
  }
  return context
}
