import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Footer.css";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();
  const location = useLocation();

  // Отказоустойчивая функция плавного скролла к компоненту по его ID
  const scrollToComponent = (id: string) => {
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        const headerOffset = 90; // Высота вашей фиксированной шапки в пикселях
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition =
          elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    }, 120); // Задержка, чтобы React успел переключить роут и отрендерить DOM
  };

  // Умный обработчик для якорных ссылок (Услуги, О компании)
  const handleAnchorClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    anchorId: string,
  ) => {
    e.preventDefault();
    if (location.pathname === "/") {
      // Если мы уже на Главной — плавно скроллим к компоненту
      scrollToComponent(anchorId);
    } else {
      // Если мы на другой странице — сначала уходим на Главную, затем скроллим
      navigate("/");
      scrollToComponent(anchorId);
    }
  };

  return (
    <footer id="footer" className="footer">
      <div className="container footer__container">
        <div className="footer__main">
          {/* Брендинг и логотип */}
          <div className="footer__brand">
            <Link
              to="/"
              className="footer__logo"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              RUSCARGO<span className="logo__dot">.</span>
            </Link>
            <p className="footer__description">
              Переосмысление логистики. <br />
              Ваш груз в руках будущего.
            </p>
          </div>

          {/* Группы ссылок */}
          <div className="footer__groups">
            {/* Блок Навигации */}
            <div className="footer__group">
              <h4 className="footer__group-title">Навигация</h4>
              <nav className="footer__links">
                <a
                  href="#services"
                  onClick={(e) => handleAnchorClick(e, "services")}
                >
                  Услуги
                </a>
                <a href="#about" onClick={(e) => handleAnchorClick(e, "about")}>
                  О компании
                </a>
                <Link to="/calc">Калькулятор</Link>
              </nav>
            </div>

            {/* Блок Контактов */}
            <div className="footer__group">
              <h4 className="footer__group-title">Контакты</h4>
              <div className="footer__links">
                <a href="tel:+79626100042">8 (962) 610-00-42</a>
                <a
                  href="mailto:spherefl1niks1904@gmail.com"
                  className="footer__email"
                >
                  Email Us
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Нижняя юридическая панель подвала */}
        <div className="footer__bottom">
          <span className="footer__copyright">
            © {currentYear} RUSCARGO. ИП Блинов С.С.
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
