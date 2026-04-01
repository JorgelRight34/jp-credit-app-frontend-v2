import { useSuspenseData } from '@/hooks/useData'
import { projectsQueryKey } from '../lib/constants'
import { getProjects } from '../services/projectClient'
import { useMemo } from 'react'
import { InputProps, TransferList } from '@/components'

const ProjectUserTransferList = ({ value = [], ...props }: InputProps) => {
  const { data: projects } = useSuspenseData({
    key: [projectsQueryKey],
    loader: () => getProjects(),
  })

  const projectTransferItems = useMemo(
    () =>
      projects.items.map(({ id, name: label }) => ({
        id,
        label,
      })),
    [projects],
  )

  return (
    <TransferList
      items={projectTransferItems}
      value={value as Array<number>}
      leftTitle="Disponibles"
      rightTitle="Seleccionados"
      rightSubtitle='Elija los proyectos seleccionándolos y luego seleccione el botón de flecha "Elegir".'
      leftSubtitle='Elimine los proyectos seleccionándolos y luego seleccione el botón de flecha "Eliminar".'
      {...props}
    />
  )
}

export default ProjectUserTransferList
