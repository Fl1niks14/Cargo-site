import React, { useState, useEffect } from "react";
import { Search, Printer, Clock, Truck, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import "./Tracking.css";
import qr from "./image.png";

interface Order {
  id: string;
  from: string;
  to: string;
  weight: number;
  vehicleType: "small" | "medium" | "large";
  comment: string;
  price: number;
  userEmail: string;
  createdAt: number;
  orderDate: string;
  orderTime: string;
  deliveryDate: string;
  pickupPoint: string;
}

const Tracking: React.FC = () => {
  const [trackId, setTrackId] = useState("");
  const [order, setOrder] = useState<Order | null>(null);
  const [error, setError] = useState(false);
  const [now, setNow] = useState<number>(Date.now());

  // Секундный интервал для точного расчета оставшегося времени в реальном времени
  useEffect(() => {
    const interval = setInterval(() => {
      setNow(Date.now());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleTrack = () => {
    const allOrders: Order[] = JSON.parse(
      localStorage.getItem("ruscargo_orders") || "[]",
    );

    // Очищаем ввод: убираем #, пробелы и приводим к нижнему регистру
    const cleanInput = trackId.replace("#", "").trim().toLowerCase();

    if (!cleanInput) {
      setError(true);
      setOrder(null);
      return;
    }

    // Поиск заказа по подстроке ID
    const found = allOrders.find((o) => {
      const cleanOrderId = o.id.toLowerCase().replace("rc-", "");
      return (
        cleanOrderId.includes(cleanInput) ||
        o.id.toLowerCase().includes(cleanInput)
      );
    });

    if (found) {
      setOrder(found);
      setError(false);
    } else {
      setOrder(null);
      setError(true);
    }
  };

  // Функция форматирования времени HH:MM:SS
  const formatTimeLeft = (ms: number): string => {
    if (ms <= 0) return "00:00:00";
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return [
      hours.toString().padStart(2, "0"),
      minutes.toString().padStart(2, "0"),
      seconds.toString().padStart(2, "0"),
    ].join(":");
  };

  // Синхронный расчет статуса (1 в 1 как в AdminPanel)
  const getOrderStatusInfo = (createdAt: number) => {
    const timePassed = now - createdAt;
    const ONE_DAY = 24 * 60 * 60 * 1000;
    const THREE_DAYS = 3 * 24 * 60 * 60 * 1000;

    if (timePassed < ONE_DAY) {
      return {
        text: "Ожидает отправки",
        class: "processing",
        icon: <Clock size={20} className="spin-slow" color="#ffc107" />,
        subText: `Сдать в ПВЗ до истечения: ${formatTimeLeft(ONE_DAY - timePassed)}`,
      };
    } else if (timePassed < THREE_DAYS) {
      return {
        text: "Груз в пути",
        class: "transit",
        icon: <Truck size={20} color="#3498db" />,
        subText: `Ориентировочная доставка через ${Math.ceil((THREE_DAYS - timePassed) / ONE_DAY)} дн.`,
      };
    } else {
      return {
        text: "Доставлено",
        class: "delivered",
        icon: <CheckCircle size={20} color="#C6A266" />,
        subText: "Груз успешно выдан получателю",
      };
    }
  };

  return (
    <section className="tracking-section">
      <div className="container">
        <div className="tracking-card">
          <span className="step-label">Tracking System</span>
          <h2 className="step-title">
            Отследить груз<span>.</span>
          </h2>

          {/* Группа ввода поискового ID */}
          <div className="tracking-input-group">
            <div className="input-wrapper">
              <Search size={18} className="search-icon" />
              <input
                type="text"
                placeholder="Введите номер заказа (например: 5007)"
                value={trackId}
                onChange={(e) => setTrackId(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleTrack()}
              />
            </div>
            <button onClick={handleTrack} className="btn-track-submit">
              НАЙТИ
            </button>
          </div>

          <AnimatePresence mode="wait">
            {order
              ? (() => {
                  const statusInfo = getOrderStatusInfo(order.createdAt || 0);
                  return (
                    <motion.div
                      key="result"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="track-content"
                    >
                      {/* Синхронизированный статус-бар */}
                      <div className="track-status-bar">
                        <div className="status-info">
                          {statusInfo.icon}
                          <div>
                            <div className="status-label">Текущий статус</div>
                            <div className={`status-value ${statusInfo.class}`}>
                              {statusInfo.text}
                            </div>
                            <div className="status-subtext-live">
                              {statusInfo.subText}
                            </div>
                          </div>
                        </div>
                        <div className="track-id-badge">
                          #{order.id.slice(-4)}
                        </div>
                      </div>

                      {/* Квитанция */}
                      <div className="order-receipt">
                        <div className="receipt-decor"></div>
                        <div className="receipt-body">
                          <div className="receipt-header">
                            <div className="receipt-brand">
                              RUSCARGO<span>.</span>
                            </div>
                            <div className="receipt-type">
                              ЭЛЕКТРОННАЯ КВИТАНЦИЯ
                            </div>
                          </div>

                          <div className="receipt-details">
                            <div className="receipt-row">
                              <span className="label">ДАТА</span>
                              <span className="value">
                                {order.orderDate} в {order.orderTime}
                              </span>
                            </div>
                            <div className="receipt-row">
                              <span className="label">МАРШРУТ</span>
                              <span className="value">
                                {order.from} → {order.to}
                              </span>
                            </div>
                            <div className="receipt-row">
                              <span className="label">ПАРАМЕТРЫ</span>
                              <span className="value">
                                {order.weight} КГ /{" "}
                                {order.vehicleType.toUpperCase()}
                              </span>
                            </div>
                          </div>

                          <div className="receipt-divider"></div>

                          <div className="receipt-footer">
                            <div className="price-block">
                              <span className="total-label">ИТОГО</span>
                              <span className="total-price">
                                {order.price.toLocaleString()} ₽
                              </span>
                            </div>

                            <div className="receipt-qr">
                              <img src={qr} alt="QR" />
                              <span>VERIFY</span>
                            </div>

                            <button
                              className="btn-print"
                              onClick={() => window.print()}
                            >
                              <Printer size={14} /> ПЕЧАТЬ
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })()
              : error && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="track-error"
                  >
                    Заказ не найден. Проверьте номер.
                  </motion.div>
                )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Tracking;
