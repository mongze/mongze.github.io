import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Confetti from "react-confetti";
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
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [showConfetti, setShowConfetti] = useState(false);
  const [confettiOpacity, setConfettiOpacity] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (showConfetti) {
      // 투명도를 1로 리셋
      setConfettiOpacity(1);

      // 6초 후 페이드아웃 시작
      const fadeTimer = setTimeout(() => {
        setConfettiOpacity(0);
      }, 6000);

      // 6초 후 confetti 완전히 제거
      const removeTimer = setTimeout(() => {
        setShowConfetti(false);
      }, 6000);

      return () => {
        clearTimeout(fadeTimer);
        clearTimeout(removeTimer);
      };
    }
  }, [showConfetti]);

  const handleClick = () => {
    setShowConfetti(true);
  };

  return (
    <Section className="hero" backgroundColor="#0a0909">
      {/* Confetti Effect */}
      {showConfetti && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          numberOfPieces={200}
          recycle={false}
          colors={[
            "#ed7a8c", // primary color
            "#ecb3be", // secondary color
            "#f4a5b3", // lighter pink
            "#e0909e", // darker pink
            "#ffffff", // white
            "#ffd4db", // very light pink
          ]}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            zIndex: 100,
            pointerEvents: "none",
            opacity: confettiOpacity,
            transition: "opacity 1s ease-out",
          }}
        />
      )}

      <div className="hero__background" aria-hidden="true" />

      <motion.div
        className="hero__content"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        onClick={handleClick}
        style={{ cursor: "pointer" }}
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
