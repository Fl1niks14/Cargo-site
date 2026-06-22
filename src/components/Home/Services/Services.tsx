import React from "react";
import { ArrowUpRight } from "lucide-react";
import "./Services.css";
import { useNavigate } from "react-router-dom";

const Services: React.FC = () => {
  const navigate = useNavigate();
  const services = [
    {
      id: "01",
      title: "Тент / Генеральные грузы",
      desc: "Перевозка стандартных грузов до 22 тонн. Полная растентовка, коники, ремни для крепления.",
      tag: "82 - 92 М³",
    },
    {
      id: "02",
      title: "Рефрижераторные перевозки",
      desc: "Доставка скоропорта с температурным режимом от -20°C до +20°C. Наличие термописцев.",
      tag: "33 ПАЛЛЕТА",
    },
    {
      id: "03",
      title: "Негабаритные грузы",
      desc: "Перевозка спецтехники и оборудования на низкорамных тралах. Разрешения и сопровождение.",
      tag: "ДО 60 ТОНН",
    },
    {
      id: "04",
      title: "Сборные грузы (LTL)",
      desc: "Доставка небольших партий от 1 паллета. Оптимизация бюджета за счет консолидации.",
      tag: "ОТ 100 КГ",
    },
  ];

  return (
    <section className="services-light">
      <div className="services__header">
        <div className="container">
          <h2 className="services__title">
            Логистические <br />
            <span>решения</span>
          </h2>
        </div>
      </div>

      <div className="services__table">
        <div className="container">
          {services.map((item) => (
            <div className="service-row" key={item.id}>
              <div className="service-id">{item.id}</div>
              <div className="service-info">
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
              <div className="service-tag">
                <span>{item.tag}</span>
              </div>
              <div className="service-action">
                <button
                  className="btn-order"
                  onClick={() => navigate("/calc")} // 3. Добавляем переход
                >
                  Заказать <ArrowUpRight size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
