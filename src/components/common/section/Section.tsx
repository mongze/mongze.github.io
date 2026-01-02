import { ReactNode } from 'react';
import './Section.scss';

interface SectionProps {
  id?: string;
  className?: string;
  backgroundColor?: string;
  children: ReactNode;
}

export const Section = ({ id, className = '', backgroundColor, children }: SectionProps) => {
  return (
    <section
      id={id}
      className={`section ${className}`}
      style={backgroundColor ? { backgroundColor } : undefined}
    >
      <div className="section__container">
        {children}
      </div>
    </section>
  );
};
