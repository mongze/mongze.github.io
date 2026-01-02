import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { Section } from "../../common";
import type { WeddingData } from "../../../types";
import "./Calendar.scss";

interface CalendarProps {
  weddingData: WeddingData;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
}

export const Calendar = ({ weddingData }: CalendarProps) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
  });

  const weddingDate = new Date(weddingData.wedding.date);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = weddingDate.getTime() - now.getTime();

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);

        setTimeLeft({ days, hours, minutes });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [weddingDate]);

  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const dayOfWeek = ["일", "월", "화", "수", "목", "금", "토"][date.getDay()];

    return {
      year,
      month,
      day,
      dayOfWeek,
    };
  };

  const { year, month, day, dayOfWeek } = formatDate(weddingDate);

  // 2026년 5월 달력 데이터 생성
  const generateCalendar = () => {
    const year = 2026;
    const month = 5; // 5월 (0-based이므로 4)
    const firstDay = new Date(year, month - 1, 1).getDay(); // 5월 1일의 요일 (금요일 = 5)
    const daysInMonth = 31; // 5월은 31일
    const weddingDay = 30; // 결혼식 날짜

    const calendar: Array<number | null> = [];

    // 5월 1일 이전의 빈 칸 추가
    for (let i = 0; i < firstDay; i++) {
      calendar.push(null);
    }

    // 1일부터 31일까지 추가
    for (let day = 1; day <= daysInMonth; day++) {
      calendar.push(day);
    }

    return { calendar, weddingDay };
  };

  const { calendar: calendarDays, weddingDay } = generateCalendar();

  return (
    <Section className="calendar" backgroundColor="#0a0909">
      <motion.div
        className="calendar__content"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <motion.h2
          className="calendar__title"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Wedding Day
        </motion.h2>

        <motion.div
          className="calendar__date-info"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="calendar__date">
            <div className="calendar__date-text">
              {year}년 {month}월 {day}일 {dayOfWeek}요일{" "}
              {weddingData.wedding.time}
            </div>
          </div>

          <div className="calendar__venue">
            <MapPin size={14} />
            {weddingData.location.name} {weddingData.location.addressDetail}
            <br />
            <span className="calendar__venue-address">{weddingData.location.address}</span>
          </div>
        </motion.div>

        <motion.div
          className="calendar__grid-container"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="calendar__grid">
            <div className="calendar__weekday calendar__weekday--sunday">
              일
            </div>
            <div className="calendar__weekday">월</div>
            <div className="calendar__weekday">화</div>
            <div className="calendar__weekday">수</div>
            <div className="calendar__weekday">목</div>
            <div className="calendar__weekday">금</div>
            <div className="calendar__weekday calendar__weekday--saturday">
              토
            </div>

            {calendarDays.map((day, index) => {
              if (day === null) {
                return (
                  <div
                    key={`empty-${index}`}
                    className="calendar__day calendar__day--empty"
                  ></div>
                );
              }

              const dayOfWeek = index % 7;
              const isSunday = dayOfWeek === 0;
              const isSaturday = dayOfWeek === 6;
              const isWeddingDay = day === weddingDay;

              return (
                <motion.div
                  key={day}
                  className={`calendar__day ${
                    isSunday ? "calendar__day--sunday" : ""
                  } ${isSaturday ? "calendar__day--saturday" : ""} ${
                    isWeddingDay ? "calendar__day--wedding" : ""
                  }`}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.02 }}
                >
                  {isWeddingDay ? (
                    <div className="calendar__day-wedding">{day}</div>
                  ) : (
                    day
                  )}
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          className="calendar__dday"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="calendar__dday-label">
            결혼식까지 {timeLeft.days}일{" "}
            {String(timeLeft.hours).padStart(2, "0")}시간{" "}
            {String(timeLeft.minutes).padStart(2, "0")}분 남았습니다.
          </div>
        </motion.div>
      </motion.div>
    </Section>
  );
};
