import './modal.css'
import React, { ReactNode, useEffect, useState } from 'react'
import clsx from 'clsx'
import { createPortal } from 'react-dom'
import { CloseIcon, Icon, IconName } from '@/components/atoms'

export interface ModalProps extends React.PropsWithChildren {
  className?: string
  title?: ReactNode
  show: boolean
  showCloseBtn?: boolean
  width?: string
  height?: string
  modalOverlay?: string
  icon?: IconName
  onHide: () => void
}

const modalRoot =
  typeof window !== 'undefined' ? document.getElementById('modal-root') : null

const Modal = ({
  children,
  title,
  show,
  width,
  height,
  className,
  modalOverlay = 'bg-black/50',
  showCloseBtn = true,
  icon,
  onHide,
}: ModalProps & React.PropsWithChildren) => {
  const [hasMountedOnce, setHasMountedOnce] = useState(show)

  useEffect(() => {
    if (show)
      setTimeout(() => {
        setHasMountedOnce(true)
      }, 0)
  }, [show])

  if (!hasMountedOnce && !show) return null

  return createPortal(
    <div
      className={clsx('modal-overlay', modalOverlay, {
        'pointer-events-auto opacity-100': show,
        'pointer-events-none opacity-0': !show,
      })}
      onClick={onHide}
    >
      <div
        className="my-modal bg-surface rounded-xl flex flex-col p-3"
        style={{ height, width, maxHeight: '95dvh' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="border-b flex flex-shrink-0 items-center pb-3">
          <Icon
            labelClassName="!text-2xl"
            wrapperClassName="mb-0 mr-auto"
            icon={icon}
            label={title}
          />
          {showCloseBtn && (
            <Icon
              onClick={onHide}
              className="!cursor-pointer text-accent-secondary ml-auto"
              icon={CloseIcon}
            >
              Cerrar
            </Icon>
          )}
        </div>
        <div
          className={clsx(
            'flex-1 overflow-y-auto overflow-x-auto p-3',
            className,
          )}
        >
          {children} {/* DELAY THIS */}
        </div>
      </div>
    </div>,
    modalRoot!,
  )
}

export default Modal
