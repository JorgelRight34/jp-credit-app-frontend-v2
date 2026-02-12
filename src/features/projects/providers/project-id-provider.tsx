import {
  createContext,
  PropsWithChildren,
  useEffect,
  useState,
  useContext,
} from 'react'

const STORAGE_KEY = 'projectId'

interface ProjectIdContextValue {
  projectId: number | null
  setProjectId: (id: number | null) => void
}

const ProjectIdContext = createContext<ProjectIdContextValue | undefined>(
  undefined,
)

export const ProjectIdProvider = ({ children }: PropsWithChildren) => {
  const [projectId, setProjectIdState] = useState<number | null>(null)

  // Read from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      setProjectIdState(Number(stored))
    }
  }, [])

  const setProjectId = (id: number | null) => {
    if (id === null) {
      localStorage.removeItem(STORAGE_KEY)
    } else {
      localStorage.setItem(STORAGE_KEY, id.toString())
    }
    setProjectIdState(id)
  }

  return (
    <ProjectIdContext.Provider value={{ projectId, setProjectId }}>
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
