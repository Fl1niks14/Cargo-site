import React, { useState, useEffect } from "react";
import {
  ArrowRight,
  LogOut,
  Package,
  User,
  Clock,
  Truck,
  CheckCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./AdminPanel.css";

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

interface UserInfo {
  name: string;
  email: string;
}

const AdminPanel: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [user, setUser] = useState<UserInfo | null>(null);
  const [now, setNow] = useState<number>(Date.now());
  const navigate = useNavigate();

  // Загрузка сессии и заказов
  useEffect(() => {
    const savedUser = localStorage.getItem("currentUser");
    if (!savedUser) {
      navigate("/auth");
      return;
    }

    const parsedUser: UserInfo = JSON.parse(savedUser);
    setUser(parsedUser);

    const allOrders: Order[] = JSON.parse(
      localStorage.getItem("ruscargo_orders") || "[]",
    );
    setOrders(allOrders.filter((o) => o.userEmail === parsedUser.email));
  }, [navigate]);

  // Живой секундный таймер для обновления интерфейса
  useEffect(() => {
    const interval = setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    window.dispatchEvent(new Event("storage"));
    navigate("/");
  };

  // Профессиональное форматирование оставшегося времени в HH:MM:SS
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

  return (
    <section className="admin-panel">
      <div className="container">
        {/* ШАПКА КАБИНЕТА */}
        <header className="admin-header">
          <div className="header-top">
            <h1 className="admin-title">
              Личный кабинет <span>/ {user?.name || "Клиент"}</span>
            </h1>
            <button className="btn-logout" onClick={handleLogout}>
              <LogOut size={18} /> Выйти
            </button>
          </div>
          <p className="admin-subtitle">
            История ваших отправлений и текущий статус грузов
          </p>
        </header>

        {/* СТАТИСТИКА */}
        <div className="admin-stats">
          <div className="stat-card">
            <Package size={24} />
            <div className="stat-info">
              <span className="stat-label">Всего заказов</span>
              <span className="stat-value">{orders.length}</span>
            </div>
          </div>
          <div className="stat-card">
            <User size={24} />
            <div className="stat-info">
              <span className="stat-label">Аккаунт</span>
              <span className="stat-value">
                {user?.email ? user.email.split("@")[0] : "..."}
              </span>
            </div>
          </div>
        </div>

        {/* ТАБЛИЦА */}
        <div className="orders-table">
          <div className="table-head">
            <div>ID Заказа</div>
            <div>Маршрут</div>
            <div>Дата / Время</div>
            <div>Статус рейса</div>
            <div className="text-right">Стоимость</div>
          </div>

          <div className="orders-list">
            {orders.length > 0 ? (
              orders.map((order) => {
                const timePassed = now - (order.createdAt || 0);

                // Настоящие тайминги в миллисекундах:
                const ONE_DAY = 24 * 60 * 60 * 1000; // 24 часа на сдачу посылки
                const THREE_DAYS = 3 * 24 * 60 * 60 * 1000; // 3 дня на общую доставку

                let statusText = "Доставлено";
                let statusClass = "delivered";
                let statusIcon = <CheckCircle size={12} />;
                let timeLeftText = "";

                if (timePassed < ONE_DAY) {
                  // ЭТАП 1: Накладная создана, посылка еще не в ПВЗ (первые 24 часа)
                  statusText = "Ожидает отправки";
                  statusClass = "processing";
                  statusIcon = <Clock size={12} className="spin-slow" />;
                  timeLeftText = `Сдать в ПВЗ до истечения: ${formatTimeLeft(ONE_DAY - timePassed)}`;
                } else if (timePassed < THREE_DAYS) {
                  // ЭТАП 2: Посылку приняли, машина везет ее (от 1 до 3 дней)
                  statusText = "Груз в пути";
                  statusClass = "transit";
                  statusIcon = <Truck size={12} className="move-truck" />;
                  timeLeftText = `Ориентировочная доставка через ${Math.ceil((THREE_DAYS - timePassed) / (24 * 60 * 60 * 1000))} дн.`;
                }

                return (
                  <div key={order.id} className="order-row">
                    <div className="col-id">
                      #
                      {order.id.startsWith("RC-")
                        ? order.id.split("-")[1]
                        : order.id.slice(-4)}
                    </div>

                    <div className="col-route">
                      <span className="city">{order.from}</span>
                      <ArrowRight size={14} color="#C6A266" />
                      <span className="city">{order.to}</span>
                    </div>

                    <div className="col-date">
                      <div className="date-main">{order.orderDate}</div>
                      <div className="date-sub">{order.orderTime}</div>
                    </div>

                    <div className="col-status">
                      <span className={`status-badge ${statusClass}`}>
                        {statusIcon} {statusText}
                      </span>
                      {timeLeftText && (
                        <div className="time-left">{timeLeftText}</div>
                      )}
                    </div>

                    <div className="col-price">
                      {Number(order.price).toLocaleString()} ₽
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="empty-state">У вас пока нет активных заказов</div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminPanel;
