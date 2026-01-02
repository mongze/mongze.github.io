import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronDown } from "lucide-react";
import { Section } from "../../common";
import type { GalleryImage } from "../../../types";
import "./Gallery.scss";

interface GalleryProps {
  images: GalleryImage[];
}

export const Gallery = ({ images }: GalleryProps) => {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [showAll, setShowAll] = useState(false);

  const INITIAL_DISPLAY_COUNT = 9;
  const hasMoreImages = images.length > INITIAL_DISPLAY_COUNT;
  const displayedImages = showAll
    ? images
    : images.slice(0, INITIAL_DISPLAY_COUNT);

  return (
    <Section className="gallery" backgroundColor="#181818">
      <motion.div
        className="gallery__content"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="gallery__title">Gallery</h2>

        <div className="gallery__grid">
          <AnimatePresence>
            {displayedImages.map((image, index) => {
              const animationIndex =
                showAll && index >= INITIAL_DISPLAY_COUNT
                  ? index - INITIAL_DISPLAY_COUNT
                  : index;

              return (
                <motion.div
                  key={image.id}
                  className="gallery__item"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: animationIndex * 0.1 }}
                  onClick={() => setSelectedImage(image)}
                >
                  <img src={image.url} alt={image.alt} loading="lazy" />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {hasMoreImages && !showAll && (
          <motion.button
            className="gallery__more-button"
            onClick={() => setShowAll(true)}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            더보기
            <ChevronDown size={20} />
          </motion.button>
        )}
      </motion.div>

      {selectedImage && (
        <div className="gallery__modal" onClick={() => setSelectedImage(null)}>
          <button
            className="gallery__modal-close"
            onClick={() => setSelectedImage(null)}
            aria-label="Close modal"
          >
            <X size={24} />
          </button>
          <div className="gallery__modal-content">
            <img src={selectedImage.url} alt={selectedImage.alt} />
          </div>
        </div>
      )}
    </Section>
  );
};
