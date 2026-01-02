import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Section } from "../../common";
import "./Hero.scss";

interface HeroProps {
  groomName: string;
  brideName: string;
  date: string;
  time: string;
  venue: string;
  floor: string;
  hall: string;
}

export const Hero = ({
  groomName,
  brideName,
  date,
  time,
  venue,
  floor,
  hall,
}: HeroProps) => {
  const [scrollY, setScrollY] = useState(0);
  const { scrollYProgress } = useScroll();

  // 스크롤에 따른 parallax 효과
  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Section className="hero" backgroundColor="#0a0909">
      {/* Parallax 배경 이미지 */}
      <motion.div
        className="hero__background"
        style={{
          y,
          opacity,
        }}
        aria-hidden="true"
      />

      <motion.div
        className="hero__content"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        style={{
          transform: `translateY(${scrollY * 0.5}px)`,
        }}
      >
        <motion.h1
          className="hero__title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
        >
          Save the Date
        </motion.h1>

        <motion.div
          className="hero__names"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <span className="hero__name">
            <span className="hero__name-title">신부</span>
            <span className="hero__name-text">{brideName}</span>
          </span>
          <span className="hero__name">
            <span className="hero__name-title">신랑</span>
            <span className="hero__name-text">{groomName}</span>
          </span>
        </motion.div>

        <motion.div
          className="hero__details"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 1 }}
        >
          <p className="hero__date">
            <span>{date}</span>
            <span>{time}</span>
          </p>
          <p className="hero__venue">
            {venue} {floor} {hall}
          </p>
        </motion.div>
      </motion.div>
    </Section>
  );
};
