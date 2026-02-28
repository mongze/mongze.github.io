import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Keyboard } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "./ImageModal.scss";

interface ImageModalProps {
  images: { url: string; alt: string }[];
  initialIndex: number;
  onClose: () => void;
}

export const ImageModal = ({ images, initialIndex, onClose }: ImageModalProps) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="image-modal" onClick={handleBackdropClick}>
      <button
        className="image-modal__close"
        onClick={onClose}
        aria-label="Close modal"
      >
        <X size={24} />
      </button>

      <div className="image-modal__content">
        <Swiper
          modules={[Keyboard]}
          initialSlide={initialIndex}
          spaceBetween={20}
          slidesPerView={1}
          keyboard={{
            enabled: true,
            onlyInViewport: false,
          }}
          loop={images.length > 1}
          className="image-modal__swiper"
          onSlideChange={(swiper: SwiperType) => {
            setCurrentIndex(swiper.realIndex);
          }}
          onClick={(_, e) => {
            e.stopPropagation();
          }}
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <div className="image-modal__slide">
                <img src={image.url} alt={image.alt} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {images.length > 1 && (
          <div className="image-modal__pagination">
            {currentIndex + 1} / {images.length}
          </div>
        )}
      </div>
    </div>
  );
};
