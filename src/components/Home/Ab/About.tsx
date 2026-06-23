import React from "react";
import { ShieldCheck, Globe, Clock } from "lucide-react";
import "./About.css";

const About: React.FC = () => {
  return (
    <section id="about" className="about">
      <div className="container about__container">
        {/* Левая колонка */}
        <div className="about__content">
          <span className="about__subtitle">О компании</span>
          <h2 className="about__title">
            Надежный мост между <br />
            <span>бизнесом и логистикой</span>
          </h2>
          <div className="about__text-block">
            <p className="about__description">
              RUSCARGO — это современный логистический оператор,
              специализирующийся на безопасной доставке крупногабаритных и
              генеральных грузов по всей территории России.
            </p>
            <p className="about__description">
              Мы объединили передовые технологии отслеживания, собственный
              усовершенствованный автопарк и команду экспертов, чтобы стереть
              любые границы и задержки для вашего бизнеса. Каждый километр пути
              застрахован и находится под полным контролем.
            </p>
          </div>
        </div>

        {/* Правая колонка */}
        <div className="about__advantages">
          <div className="advantage-card">
            <div className="advantage-card__icon-wrapper">
              <ShieldCheck size={24} className="advantage-card__icon" />
            </div>
            <h3 className="advantage-card__number">100%</h3>
            <p className="advantage-card__text">
              Безопасность и полное страхование груза
            </p>
          </div>

          <div className="advantage-card">
            <div className="advantage-card__icon-wrapper">
              <Globe size={24} className="advantage-card__icon" />
            </div>
            <h3 className="advantage-card__number">50+</h3>
            <p className="advantage-card__text">
              Регулярных маршрутов по России и Европе
            </p>
          </div>

          <div className="advantage-card">
            <div className="advantage-card__icon-wrapper">
              <Clock size={24} className="advantage-card__icon" />
            </div>
            <h3 className="advantage-card__number">24/7</h3>
            <p className="advantage-card__text">
              Онлайн-мониторинг и поддержка клиентов
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
