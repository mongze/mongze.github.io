import { motion } from 'framer-motion';
import { Section } from '../../common';
import type { Person } from '../../../types';
import './Intro.scss';

interface IntroProps {
  groom: Person;
  bride: Person;
  message?: string;
}

export const Intro = ({ groom, bride, message }: IntroProps) => {
  return (
    <Section className="intro" backgroundColor="#ecb3be">
      <motion.div
        className="intro__content"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        {message && (
          <div className="intro__message">
            <p>{message}</p>
          </div>
        )}

        <div className="intro__people">
          <motion.div
            className="intro__person"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <h3 className="intro__label">신랑</h3>
            <p className="intro__name">{groom.name}</p>
            {groom.englishName && <p className="intro__english-name">{groom.englishName}</p>}
            {(groom.father || groom.mother) && (
              <div className="intro__parents">
                {groom.father && <span>{groom.father}</span>}
                {groom.father && groom.mother && <span> · </span>}
                {groom.mother && <span>{groom.mother}</span>}
                {groom.order && <span> 의 {groom.order}</span>}
              </div>
            )}
          </motion.div>

          <motion.div
            className="intro__person"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <h3 className="intro__label">신부</h3>
            <p className="intro__name">{bride.name}</p>
            {bride.englishName && <p className="intro__english-name">{bride.englishName}</p>}
            {(bride.father || bride.mother) && (
              <div className="intro__parents">
                {bride.father && <span>{bride.father}</span>}
                {bride.father && bride.mother && <span> · </span>}
                {bride.mother && <span>{bride.mother}</span>}
                {bride.order && <span> 의 {bride.order}</span>}
              </div>
            )}
          </motion.div>
        </div>
      </motion.div>
    </Section>
  );
};
