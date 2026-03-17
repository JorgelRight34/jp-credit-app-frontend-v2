import './modal.css'
import React, { ReactNode, useRef } from 'react'
import clsx from 'clsx'
import { createPortal } from 'react-dom'
import { BigTitle, CloseIcon, Icon, IconName } from '@/components/atoms'

export interface ModalProps extends React.PropsWithChildren {
  className?: string
  title?: ReactNode
  show: boolean
  showCloseBtn?: boolean
  modalClassName?: string
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
  modalClassName,
  modalOverlay = 'bg-black/50',
  showCloseBtn = true,
  icon,
  onHide,
}: ModalProps & React.PropsWithChildren) => {
  const hasMountedOnce = useRef(show)

  if (show) hasMountedOnce.current = true
  if (!hasMountedOnce.current && !show) return null

  return createPortal(
    <div
      className={clsx('modal-overlay', modalOverlay, {
        'pointer-events-auto opacity-100': show,
        'pointer-events-none opacity-0': !show,
      })}
      onClick={onHide}
    >
      <div
        className={clsx(
          'bg-surface flex flex-col rounded-xl p-3',
          modalClassName,
        )}
        style={{ height, width, maxHeight: '95dvh' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-shrink-0 items-center border-b pb-3">
          <Icon wrapperClassName="mb-0 mr-auto" icon={icon}>
            <BigTitle>{title}</BigTitle>
          </Icon>
          {showCloseBtn && (
            <Icon
              onClick={onHide}
              className="text-accent-secondary ml-auto !cursor-pointer"
              icon={CloseIcon}
            >
              Cerrar
            </Icon>
          )}
        </div>
        <div
          className={clsx(
            'flex-1 overflow-x-auto overflow-y-auto py-3',
            className,
          )}
        >
          {children}
        </div>
      </div>
    </div>,
    modalRoot!,
  )
}

export default Modal
