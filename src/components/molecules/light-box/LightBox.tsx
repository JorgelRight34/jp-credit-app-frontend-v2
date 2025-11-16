import { Icon, Image } from "@/components/atoms";
import { FileModel } from "@/models/fileModel";
import Carousel from "../carousel/Carousel";

interface LightBoxInterface {
  files: FileModel[];
  show: boolean;
  onHide: () => void;
}

const LightBox = ({ files, onHide, show }: LightBoxInterface) => {
  const handleOnHide = (event: React.MouseEvent) => {
    event.stopPropagation();
    onHide();
  };

  if (!show) return null;

  return (
    <div className="modal-overlay" onClick={handleOnHide}>
      {/* Close button */}
      <button
        onClick={handleOnHide}
        className="absolute top-4 right-4 z-50 text-white transition-colors hover:text-gray-300"
        aria-label="Close lightbox"
      >
        <Icon icon="close" className="text-white" />
      </button>
      <Carousel
        indicators={files.length > 1}
        onClick={(e) => e.stopPropagation()}
      >
        {files.map((file, key) => (
          <div
            key={key}
            className="p-lg-5"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              key={key}
              className="h-[400px]"
              src={file.url}
              alt={file.url}
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default LightBox;
