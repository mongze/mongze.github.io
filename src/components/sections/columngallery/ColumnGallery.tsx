import { useState } from "react";
import { motion } from "framer-motion";
import { Section, ImageModal } from "../../common";
import "./ColumnGallery.scss";

interface ColumnGalleryProps {
  images: string[];
  subtitle?: string;
  description?: string;
}

export const ColumnGallery = ({
  images,
  subtitle = "( WEDDING )",
  description = "HAND IN HAND, HEART TO HEART, FOREVER AND ALWAYS. TOGETHER IN LOVE, TOGETHER IN LIFE.",
}: ColumnGalleryProps) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <Section className="columngallery">
      <motion.div
        className="columngallery__content"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="columngallery__subtitle">{subtitle}</div>

        <div className="columngallery__gallery">
          {images.map((image, index) => (
            <motion.div
              key={index}
              className="columngallery__image-wrapper"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              onClick={() => setSelectedImage(image)}
            >
              <img src={image} alt="" className="columngallery__image" />
            </motion.div>
          ))}
        </div>

        <motion.p
          className="columngallery__description"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          {description}
        </motion.p>
      </motion.div>

      {selectedImage && (
        <ImageModal
          imageUrl={selectedImage}
          alt=""
          onClose={() => setSelectedImage(null)}
        />
      )}
    </Section>
  );
};
