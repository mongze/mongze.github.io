import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { TrainFront, Bus, Car, Copy, Info } from "lucide-react";
import { Section, Button, Toast } from "../../common";
import type { LocationInfo } from "../../../types";
import "./Location.scss";

interface LocationProps {
  location: LocationInfo;
}

export const Location = ({ location }: LocationProps) => {
  const [showToast, setShowToast] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initMap = () => {
      if (mapRef.current && window.kakao && window.kakao.maps) {
        const { latitude, longitude } = location;

        const mapOptions = {
          center: new window.kakao.maps.LatLng(latitude, longitude),
          level: 3,
        };

        const map = new window.kakao.maps.Map(mapRef.current, mapOptions);

        const markerPosition = new window.kakao.maps.LatLng(
          latitude,
          longitude
        );
        new window.kakao.maps.Marker({
          position: markerPosition,
          map: map,
        });
      }
    };

    if (window.kakao && window.kakao.maps) {
      window.kakao.maps.load(initMap);
    }
  }, [location]);

  const openMap = (type: "kakao" | "naver") => {
    const { latitude, longitude, name } = location;

    const urls = {
      kakao: `https://map.kakao.com/link/map/${name},${latitude},${longitude}`,
      naver: `https://map.naver.com/v5/search/${encodeURIComponent(name)}`,
    };

    window.open(urls[type], "_blank", "noopener,noreferrer");
  };

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(location.address);
      setShowToast(true);
    } catch (err) {
      alert("주소 복사에 실패했습니다.");
    }
  };

  return (
    <Section className="location" backgroundColor="#212121">
      <motion.div
        className="location__content"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="location__title">Location</h2>

        <div className="location__venue">
          <div className="location__venue-header">
            <h3>{location.name}</h3>
            {location.addressDetail && <p>{location.addressDetail}</p>}
          </div>
          <div className="location__address-container">
            <p className="location__address">{location.address}</p>
            <button
              className="location__copy-button"
              onClick={copyAddress}
              aria-label="주소 복사"
            >
              <Copy size={16} />
            </button>
          </div>
        </div>

        <div className="location__map-container">
          <div ref={mapRef} className="location__map" />
        </div>

        <div className="location__map-buttons">
          <Button
            variant="outline"
            size="small"
            onClick={() => openMap("kakao")}
          >
            카카오맵
          </Button>
          <Button
            variant="outline"
            size="small"
            onClick={() => openMap("naver")}
          >
            네이버지도
          </Button>
        </div>

        <div className="location__info">
          {location.subway && location.subway.length > 0 && (
            <div className="location__transport subway">
              <div className="location__transport-header">
                <TrainFront size={20} />
                <h4>지하철</h4>
              </div>
              {location.subway.map((subway, index) => (
                <p key={index} className="location__transport-item">
                  {subway.line && (
                    <span className="location__transport-line">
                      {subway.line}
                    </span>
                  )}
                  {subway.station} {subway.description}
                </p>
              ))}
            </div>
          )}

          {location.bus && location.bus.length > 0 && (
            <div className="location__transport">
              <div className="location__transport-header">
                <Bus size={20} />
                <h4>버스</h4>
              </div>
              {location.bus.map((bus, index) => (
                <p key={index} className="location__transport-item">
                  {bus.numbers && bus.numbers.join(", ")} {bus.description}
                </p>
              ))}
            </div>
          )}

          {location.parking && (
            <div className="location__transport">
              <div className="location__transport-header">
                <Car size={20} />
                <h4>자차</h4>
              </div>
              {location.parking.description.map((desc, index) => (
                <p key={index} className="location__transport-item">
                  {desc}
                </p>
              ))}
            </div>
          )}

          {location.info && (
            <div className="location__transport">
              <div className="location__transport-header">
                <Info size={20} />
                <h4>안내</h4>
              </div>
              {location.info.map((info, index) => (
                <p key={index} className="location__transport-item">
                  {info.description}
                </p>
              ))}
            </div>
          )}
        </div>
      </motion.div>

      <Toast
        message="주소가 복사되었습니다"
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />
    </Section>
  );
};
