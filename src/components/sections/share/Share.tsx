import { useState } from "react";
import { motion } from "framer-motion";
import { Share as ShareIcon, Copy, MessageCircle } from "lucide-react";
import { Section, Button, Toast } from "../../common";
import MainImage from "../../../assets/intro.jpg";
import "./Share.scss";

export const Share = () => {
  const [showToast, setShowToast] = useState(false);

  const shareToKakao = () => {
    // 카카오톡 공유하기 API 연동 필요
    if (window.Kakao) {
      window.Kakao.Link.sendDefault({
        objectType: "feed",
        content: {
          title: "결혼합니다",
          description: "저희 두 사람의 결혼식에 초대합니다.",
          imageUrl: MainImage, // 대표 이미지 URL
          link: {
            mobileWebUrl: window.location.href,
            webUrl: window.location.href,
          },
        },
      });
    } else {
      alert("카카오톡 공유 기능을 사용할 수 없습니다.");
    }
  };

  const shareToLine = () => {
    // 라인 공유하기
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent("저희 두 사람의 결혼식에 초대합니다.");
    const lineUrl = `https://social-plugins.line.me/lineit/share?url=${url}&text=${text}`;

    window.open(lineUrl, "_blank", "width=600,height=400");
  };

  const shareToLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setShowToast(true);
    } catch (err) {
      alert("링크 복사에 실패했습니다.");
    }
  };

  const shareNative = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "결혼합니다",
          text: "저희 두 사람의 결혼식에 초대합니다.",
          url: window.location.href,
        });
      } catch (err) {
        console.error("공유 실패:", err);
      }
    } else {
      shareToLink();
    }
  };

  return (
    <Section className="share" backgroundColor="#0a0909">
      <motion.div
        className="share__content"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="share__title">Share</h2>

        <div className="share__buttons">
          <Button
            onClick={shareToLine}
            className="share__button share__line-button"
          >
            라인으로 청첩장 전하기
            <MessageCircle size={20} />
          </Button>
          <Button
            onClick={shareToKakao}
            className="share__button share__kakao-button"
          >
            카카오톡으로 청첩장 전하기
            <MessageCircle size={20} />
          </Button>
          <Button
            onClick={shareToLink}
            className="share__button share__link-button"
          >
            청첩장 주소 복사하기
            <Copy size={20} />
          </Button>
          <Button
            onClick={shareNative}
            className="share__button share__native-button"
          >
            청첩장 공유하기
            <ShareIcon size={20} />
          </Button>
        </div>
      </motion.div>

      <Toast
        message="링크가 복사되었습니다"
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />
    </Section>
  );
};

// Kakao SDK 타입 확장
declare global {
  interface Window {
    Kakao: any;
  }
}
