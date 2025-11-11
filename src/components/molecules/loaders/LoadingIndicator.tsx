import { GridLoader } from "react-spinners";

const LoadingIndicator = () => {
  return (
    <div className={`modal-overlay`} style={{ zIndex: 1000 }}>
      <GridLoader color="#ffff" size={20} margin={2} speedMultiplier={1} />
    </div>
  );
};

export default LoadingIndicator;
