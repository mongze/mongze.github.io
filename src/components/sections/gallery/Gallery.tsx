import { useState } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { Section, ImageModal } from "../../common";
import type { GalleryImage } from "../../../types";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./Gallery.scss";

interface GalleryProps {
  images: GalleryImage[];
}

export const Gallery = ({ images }: GalleryProps) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  return (
    <Section className="gallery">
      <motion.div
        className="gallery__content"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="gallery__title sr-only">Gallery</h2>

        <div className="gallery__swiper-container">
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={0}
            slidesPerView={1}
            centeredSlides={true}
            loop={true}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            className="gallery__swiper"
          >
            {images.map((image, index) => (
              <SwiperSlide key={image.id}>
                <div
                  className="gallery__slide"
                  onClick={() => setSelectedImageIndex(index)}
                >
                  <img src={image.url} alt={image.alt} loading="lazy" />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </motion.div>

      {selectedImageIndex !== null && (
        <ImageModal
          images={images.map((img) => ({ url: img.url, alt: img.alt }))}
          initialIndex={selectedImageIndex}
          onClose={() => setSelectedImageIndex(null)}
        />
      )}
    </Section>
  );
};
