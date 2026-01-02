import { useState } from "react";
import { motion } from "framer-motion";
import { Share as ShareIcon, Copy } from "lucide-react";
import { Section, Button, Toast } from "../../common";
import "./Share.scss";

export const Share = () => {
  const [showToast, setShowToast] = useState(false);

  const shareToKakao = () => {
    if (!window.Kakao) {
      alert("카카오톡 공유 기능을 사용할 수 없습니다.");
      return;
    }

    if (!window.Kakao.isInitialized()) {
      alert("카카오 SDK가 초기화되지 않았습니다.");
      return;
    }

    try {
      // 현재 페이지의 절대 URL 생성
      const currentUrl = window.location.origin + window.location.pathname;
      const imageUrl = `${window.location.origin}/intro.jpg`;

      window.Kakao.Share.sendDefault({
        objectType: "feed",
        content: {
          title: "💒 결혼합니다",
          description: "저희 두 사람의 결혼식에 초대합니다.",
          imageUrl: imageUrl,
          link: {
            mobileWebUrl: currentUrl,
            webUrl: currentUrl,
          },
        },
        buttons: [
          {
            title: "청첩장 보기",
            link: {
              mobileWebUrl: currentUrl,
              webUrl: currentUrl,
            },
          },
        ],
      });
    } catch (error) {
      console.error("카카오톡 공유 실패:", error);
      alert("카카오톡 공유에 실패했습니다. 다시 시도해 주세요.");
    }
  };

  const shareToLine = () => {
    // 라인 공유하기
    const url = encodeURIComponent(window.location.href);
    const lineUrl = `https://social-plugins.line.me/lineit/share?url=${url}`;

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
            <svg width="20" height="20" viewBox="0 0 16 16" aria-hidden="true">
              <path
                d="M13.034 6.365c0 .08-.064.143-.143.143h-1.397v.541h1.397c.079 0 .143.064.143.143v.516a.143.143 0 01-.143.143h-1.397v.54h1.397c.079 0 .143.065.143.144v.515c0 .08-.064.143-.143.143h-2.055a.142.142 0 01-.099-.04l-.002-.002-.002-.002a.143.143 0 01-.04-.098V5.85c0-.039.016-.073.04-.099l.002-.003.002-.001a.14.14 0 01.099-.04h2.055c.079 0 .143.064.143.143v.515zm-2.84 2.686a.143.143 0 01-.143.142h-.515a.105.105 0 01-.036-.005h-.002c-.004 0-.007-.002-.01-.003l-.004-.002c-.003 0-.005-.002-.007-.003-.003 0-.005-.002-.007-.003l-.004-.002-.01-.006a.158.158 0 01-.037-.036L7.953 7.15v1.902a.143.143 0 01-.143.142h-.514a.143.143 0 01-.143-.142V5.849c0-.078.064-.142.143-.142h.526l.008.001.006.001.008.002.005.001.009.003.004.002c.003 0 .006.002.008.003l.005.002.008.005.004.002.007.005.004.003.008.007.002.002.009.009.012.015 1.464 1.981V5.85c0-.078.064-.142.143-.142h.515c.078 0 .142.064.142.142v3.202zm-3.541 0a.143.143 0 01-.143.142h-.515a.143.143 0 01-.142-.142V5.849c0-.078.064-.142.142-.142h.515c.079 0 .143.064.143.142v3.202zm-1.24 0a.143.143 0 01-.143.142H3.215a.14.14 0 01-.099-.04l-.002-.002-.002-.002a.143.143 0 01-.04-.098V5.85c0-.08.064-.143.143-.143h.515c.078 0 .142.064.142.143v2.542H5.27c.079 0 .143.064.143.143v.515zm9.92-1.756c0-3.287-3.29-5.962-7.333-5.962S.667 4.008.667 7.295c0 2.947 2.609 5.415 6.133 5.882.238.052.564.158.646.362.073.186.048.477.023.665l-.104.628c-.032.186-.148.727.635.397.783-.33 4.223-2.492 5.762-4.266 1.062-1.167 1.571-2.352 1.571-3.668z"
                fill="#fff"
                fill-rule="evenodd"
              ></path>
            </svg>
            {/* <MessageCircle size={20} /> */}
          </Button>
          <Button
            onClick={shareToKakao}
            className="share__button share__kakao-button"
          >
            카카오톡으로 청첩장 전하기
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 256 256"
            >
              <path d="M128 36C70.562 36 24 72.713 24 118c0 29.279 19.466 54.97 48.748 69.477-1.593 5.494-10.237 35.344-10.581 37.689 0 0-.207 1.762.934 2.434s2.483.15 2.483.15c3.272-.457 37.943-24.811 43.944-29.04 5.995.849 12.168 1.29 18.472 1.29 57.438 0 104-36.712 104-82 0-45.287-46.562-82-104-82z" />
              <path
                fill="#FFE812"
                d="M70.5 146.625c-3.309 0-6-2.57-6-5.73V105.25h-9.362c-3.247 0-5.888-2.636-5.888-5.875s2.642-5.875 5.888-5.875h30.724c3.247 0 5.888 2.636 5.888 5.875s-2.642 5.875-5.888 5.875H76.5v35.645c0 3.16-2.691 5.73-6 5.73zM123.112 146.547c-2.502 0-4.416-1.016-4.993-2.65l-2.971-7.778-18.296-.001-2.973 7.783c-.575 1.631-2.488 2.646-4.99 2.646a9.155 9.155 0 0 1-3.814-.828c-1.654-.763-3.244-2.861-1.422-8.52l14.352-37.776c1.011-2.873 4.082-5.833 7.99-5.922 3.919.088 6.99 3.049 8.003 5.928l14.346 37.759c1.826 5.672.236 7.771-1.418 8.532a9.176 9.176 0 0 1-3.814.827c-.001 0 0 0 0 0zm-11.119-21.056L106 108.466l-5.993 17.025h11.986zM138 145.75c-3.171 0-5.75-2.468-5.75-5.5V99.5c0-3.309 2.748-6 6.125-6s6.125 2.691 6.125 6v35.25h12.75c3.171 0 5.75 2.468 5.75 5.5s-2.579 5.5-5.75 5.5H138zM171.334 146.547c-3.309 0-6-2.691-6-6V99.5c0-3.309 2.691-6 6-6s6 2.691 6 6v12.896l16.74-16.74c.861-.861 2.044-1.335 3.328-1.335 1.498 0 3.002.646 4.129 1.772 1.051 1.05 1.678 2.401 1.764 3.804.087 1.415-.384 2.712-1.324 3.653l-13.673 13.671 14.769 19.566a5.951 5.951 0 0 1 1.152 4.445 5.956 5.956 0 0 1-2.328 3.957 5.94 5.94 0 0 1-3.609 1.211 5.953 5.953 0 0 1-4.793-2.385l-14.071-18.644-2.082 2.082v13.091a6.01 6.01 0 0 1-6.002 6.003z"
              />
            </svg>
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
