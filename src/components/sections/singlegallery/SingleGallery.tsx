import { useState } from "react";
import { motion } from "framer-motion";
import { Section, ImageModal } from "../../common";
import "./SingleGallery.scss";
import placeholderImage from "../../../assets/placeholder.svg";

interface SingleGalleryProps {
  image?: string;
  title?: string;
  description?: string;
  reversed?: boolean;
}

export const SingleGallery = ({
  image = placeholderImage,
  title = "Afterall, one day,",
  description = "these photos will be one of the most treasured things you own.",
  reversed = false,
}: SingleGalleryProps) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <Section className="singlegallery">
      <motion.div
        className={`singlegallery__content ${reversed ? "singlegallery__content--reversed" : ""}`}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className="singlegallery__image-wrapper"
          initial={{ opacity: 0, x: reversed ? 30 : -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
          onClick={() => setSelectedImage(image)}
        >
          <img src={image} alt="" className="singlegallery__image" />
        </motion.div>

        <motion.div
          className="singlegallery__text"
          initial={{ opacity: 0, x: reversed ? -30 : 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <h2 className="singlegallery__title">{title}</h2>
          <p className="singlegallery__description">{description}</p>
        </motion.div>
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
