import { X } from "lucide-react";
import "./ImageModal.scss";

interface ImageModalProps {
  imageUrl: string;
  alt?: string;
  onClose: () => void;
}

export const ImageModal = ({ imageUrl, alt = "", onClose }: ImageModalProps) => {
  return (
    <div className="image-modal" onClick={onClose}>
      <button
        className="image-modal__close"
        onClick={onClose}
        aria-label="Close modal"
      >
        <X size={24} />
      </button>
      <div className="image-modal__content">
        <img src={imageUrl} alt={alt} />
      </div>
    </div>
  );
};
