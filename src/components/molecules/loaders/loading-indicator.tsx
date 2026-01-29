import clsx from 'clsx'

export const LoadingIndicator = ({ show }: { show: boolean }) => {
  return (
    <div
      className={clsx(
        `modal-overlay flex h-full w-full items-center justify-center`,
        { '!hidden': !show },
      )}
      style={{ zIndex: 1000 }}
    >
      <div className="grid-loader">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <style>{`
        .grid-loader {
          display: grid;
          grid-template-columns: repeat(3, 20px);
          grid-gap: 2px;
        }

        .grid-loader div {
          width: 20px;
          height: 20px;
          background-color: #fff;
          animation: grid-loader 1.2s infinite ease-in-out;
        }

        .grid-loader div:nth-child(1) {
          animation-delay: 0s;
        }
        .grid-loader div:nth-child(2) {
          animation-delay: 0.1s;
        }
        .grid-loader div:nth-child(3) {
          animation-delay: 0.2s;
        }
        .grid-loader div:nth-child(4) {
          animation-delay: 0.1s;
        }
        .grid-loader div:nth-child(5) {
          animation-delay: 0.2s;
        }
        .grid-loader div:nth-child(6) {
          animation-delay: 0.3s;
        }
        .grid-loader div:nth-child(7) {
          animation-delay: 0.2s;
        }
        .grid-loader div:nth-child(8) {
          animation-delay: 0.3s;
        }
        .grid-loader div:nth-child(9) {
          animation-delay: 0.4s;
        }

        @keyframes grid-loader {
          0%,
          70%,
          100% {
            transform: scale3D(1, 1, 1);
          }
          35% {
            transform: scale3D(0, 0, 1);
          }
        }
      `}</style>
    </div>
  )
}

export default LoadingIndicator
