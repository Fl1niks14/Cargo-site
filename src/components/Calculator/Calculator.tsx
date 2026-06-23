import React, { useState, useMemo, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  MapPin,
  Loader2,
  Clock,
  User,
} from "lucide-react";
import toast from "react-hot-toast";
import "./Calculator.css";

interface OrderData {
  from: string;
  to: string;
  weight: number;
  vehicleType: "small" | "medium" | "large";
  comment: string;
}

interface UserType {
  name: string;
  email: string;
}

const Calculator: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const calcRef = useRef<HTMLDivElement>(null);

  const [showAuthModal, setShowAuthModal] = useState(false);
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [user, setUser] = useState<UserType | null>(null);

  // Состояние для хранения ошибок валидации
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState<OrderData>({
    from: "",
    to: "",
    weight: 0,
    vehicleType: "small",
    comment: "",
  });

  useEffect(() => {
    setStep(1);
    setIsSuccess(false);
    const savedUser = localStorage.getItem("currentUser");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    } else {
      const timer = setTimeout(() => setShowAuthModal(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    if (location.state?.selectedVehicle) {
      setFormData((prev) => ({
        ...prev,
        vehicleType: location.state.selectedVehicle,
      }));
    }

    if (location.state?.scrollTo) {
      const timer = setTimeout(() => {
        calcRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [location.state]);

  const totalPrice = useMemo(() => {
    if (!formData.from || !formData.to) return 0;
    const mult = { small: 1, medium: 1.5, large: 2.5 };
    return Math.round(
      (4500 + formData.weight * 15) * mult[formData.vehicleType],
    );
  }, [formData]);

  // Нативная функция профессиональной валидации
  const validateStep = (currentStep: number): boolean => {
    const newErrors: Record<string, string> = {};

    // Регулярное выражение: только буквы (рус/лат), дефисы и пробелы
    const cityRegex = /^[a-zA-Zа-яА-ЯёЁ\s-]+$/;

    if (currentStep === 1) {
      const fromTrimmed = formData.from.trim();
      const toTrimmed = formData.to.trim();

      if (!fromTrimmed) {
        newErrors.from = "Укажите город отправления";
      } else if (fromTrimmed.length < 2) {
        newErrors.from = "Название города должно быть не менее 2 символов";
      } else if (!cityRegex.test(fromTrimmed)) {
        newErrors.from = "Название должно содержать только буквы";
      }

      if (!toTrimmed) {
        newErrors.to = "Укажите город доставки";
      } else if (toTrimmed.length < 2) {
        newErrors.to = "Название города должно быть не менее 2 символов";
      } else if (!cityRegex.test(toTrimmed)) {
        newErrors.to = "Название должно содержать только буквы";
      }

      if (
        fromTrimmed &&
        toTrimmed &&
        fromTrimmed.toLowerCase() === toTrimmed.toLowerCase()
      ) {
        newErrors.to =
          "Город доставки не должен совпадать с городом отправления";
      }
    }

    if (currentStep === 2) {
      if (
        formData.weight === undefined ||
        formData.weight === null ||
        isNaN(formData.weight)
      ) {
        newErrors.weight = "Введите числовое значение";
      } else if (formData.weight <= 0) {
        newErrors.weight = "Вес груза должен быть больше 0 кг";
      } else if (formData.weight > 25000) {
        newErrors.weight = "Максимальный вес груза — 25 000 кг (25 тонн)";
      }

      if (formData.comment && formData.comment.length > 500) {
        newErrors.comment = "Комментарий не должен превышать 500 символов";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleBooking = async () => {
    if (!user || !user.email) {
      toast.error("Для бронирования необходимо войти в аккаунт");
      localStorage.setItem("pending_order", JSON.stringify(formData));
      navigate("/login");
      return;
    }

    setIsSubmitting(true);

    try {
      await new Promise((r) => setTimeout(r, 2000));

      const now = new Date();
      const delivery = new Date();
      delivery.setDate(now.getDate() + 3);

      const order = {
        id: `RC-${Math.floor(1000 + Math.random() * 9000)}`,
        userEmail: user.email,
        ...formData,
        price: totalPrice,
        deliveryDays: deliveryDays,
        createdAt: Date.now(),
        orderDate: now.toLocaleDateString(),
        orderTime: now.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        deliveryDate: delivery.toLocaleDateString(),
        status: "Оформляется",
        pickupPoint: "ПВЗ-Северный (ул. Ленина, 10)",
      };

      const existing = JSON.parse(
        localStorage.getItem("ruscargo_orders") || "[]",
      );
      localStorage.setItem(
        "ruscargo_orders",
        JSON.stringify([...existing, order]),
      );

      localStorage.removeItem("pending_order");
      setIsSuccess(true);
      toast.success("Заказ оформлен!");
    } catch (error) {
      toast.error("Ошибка при сохранении заказа");
    } finally {
      setIsSubmitting(false);
    }
  };
  // Нативный динамический расчет дней доставки на основе маршрута
  const deliveryDays = useMemo(() => {
    const fromLen = formData.from.trim().length;
    const toLen = formData.to.trim().length;
    if (fromLen < 2 || toLen < 2) return 3; // Дефолт, если поля не заполнены

    // Генерируем псевдослучайное, но фиксированное число на основе букв городов
    const combinedScore =
      fromLen +
      toLen +
      formData.from.charCodeAt(0) +
      formData.to.charCodeAt(toLen - 1);

    // Распределяем сроки от 1 до 7 дней в зависимости от score
    const days = (combinedScore % 7) + 1;

    return days;
  }, [formData.from, formData.to]);

  return (
    <section className="calc-page" ref={calcRef}>
      {showAuthModal && (
        <motion.div
          className="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="modal-card"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <div className="modal-icon-circle">
              <User size={28} strokeWidth={1.5} color="#C6A266" />
            </div>
            <h2 className="step-title">
              Личный кабинет<span>.</span>
            </h2>
            <p className="modal-description">
              Чтобы отслеживать статус своих заказов в реальном времени и видеть
              историю, нужно авторизоваться.
            </p>
            <div className="modal-footer">
              <button
                className="btn-black-pill"
                onClick={() => navigate("/login")}
              >
                ВОЙТИ / РЕГИСТРАЦИЯ
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}

      <div className="bg-grid-lines"></div>
      <div className="container">
        <AnimatePresence mode="wait">
          {!isSuccess ? (
            <motion.div
              key="card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="calc-card"
            >
              <div className="stepper-header">
                {[1, 2, 3].map((s) => (
                  <div
                    key={s}
                    className={`step-dot ${step >= s ? "active" : ""}`}
                  />
                ))}
              </div>

              {/* ШАГ 1: МАРШРУТ */}
              {step === 1 && (
                <div className="step-content">
                  <span className="step-label">01 / Route</span>
                  <h2 className="step-title">
                    Маршрут<span>.</span>
                  </h2>

                  <div className={`field ${errors.from ? "field--error" : ""}`}>
                    <label>Откуда</label>
                    <input
                      type="text"
                      placeholder="Город отправления"
                      value={formData.from}
                      onChange={(e) => {
                        setFormData({ ...formData, from: e.target.value });
                        if (errors.from) setErrors({ ...errors, from: "" });
                      }}
                    />
                    {errors.from && (
                      <span className="error-text">{errors.from}</span>
                    )}
                  </div>

                  <div className={`field ${errors.to ? "field--error" : ""}`}>
                    <label>Куда</label>
                    <input
                      type="text"
                      placeholder="Город доставки"
                      value={formData.to}
                      onChange={(e) => {
                        setFormData({ ...formData, to: e.target.value });
                        if (errors.to) setErrors({ ...errors, to: "" });
                      }}
                    />
                    {errors.to && (
                      <span className="error-text">{errors.to}</span>
                    )}
                  </div>

                  <button
                    type="button"
                    className="btn-black-pill"
                    onClick={() => {
                      if (validateStep(1)) setStep(2);
                    }}
                  >
                    Далее <ArrowRight size={18} />
                  </button>
                </div>
              )}

              {/* ШАГ 2: ПАРАМЕТРЫ ГРУЗА */}
              {step === 2 && (
                <div className="step-content">
                  <button
                    type="button"
                    className="btn-back-link"
                    onClick={() => {
                      setErrors({});
                      setStep(1);
                    }}
                  >
                    <ArrowLeft size={14} /> Назад
                  </button>
                  <span className="step-label">02 / Cargo</span>
                  <h2 className="step-title">
                    Параметры<span>.</span>
                  </h2>

                  <div
                    className={`field ${errors.weight ? "field--error" : ""}`}
                  >
                    <label>Вес груза (кг)</label>
                    <input
                      type="number"
                      placeholder="0"
                      value={formData.weight || ""}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          weight: Number(e.target.value),
                        });
                        if (errors.weight) setErrors({ ...errors, weight: "" });
                      }}
                    />
                    {errors.weight && (
                      <span className="error-text">{errors.weight}</span>
                    )}
                  </div>

                  <div className="field">
                    <label>Транспорт</label>
                    <select
                      value={formData.vehicleType}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          vehicleType: e.target.value as any,
                        })
                      }
                    >
                      <option value="small">Standard (1.5т)</option>
                      <option value="medium">Business (10т)</option>
                      <option value="large">Enterprise (20т)</option>
                    </select>
                  </div>

                  <div
                    className={`field ${errors.comment ? "field--error" : ""}`}
                  >
                    <label>Комментарий</label>
                    <textarea
                      placeholder="Особые пожелания..."
                      value={formData.comment}
                      onChange={(e) => {
                        setFormData({ ...formData, comment: e.target.value });
                        if (errors.comment)
                          setErrors({ ...errors, comment: "" });
                      }}
                    />
                    {errors.comment && (
                      <span className="error-text">{errors.comment}</span>
                    )}
                  </div>

                  <button
                    type="button"
                    className="btn-black-pill"
                    onClick={() => {
                      if (validateStep(2)) setStep(3);
                    }}
                  >
                    Рассчитать
                  </button>
                </div>
              )}

              {/* ШАГ 3: ИТОГ СТОИМОСТИ */}
              {step === 3 && (
                <div className="step-content result-center">
                  <button
                    type="button"
                    className="btn-back-link"
                    onClick={() => setStep(2)}
                  >
                    <ArrowLeft size={14} /> Назад
                  </button>
                  <div className="price-display">
                    <span className="p-tag">Итоговая стоимость</span>
                    <h1 className="p-value">{totalPrice.toLocaleString()} ₽</h1>
                  </div>
                  <div className="summary-card">
                    <p>
                      <MapPin size={14} /> {formData.from} — {formData.to}
                    </p>

                    <p>
                      <Clock size={14} /> Доставка: ~{deliveryDays}{" "}
                      {deliveryDays === 1
                        ? "день"
                        : deliveryDays < 5
                          ? "дня"
                          : "дней"}
                    </p>
                  </div>
                  <button
                    type="button"
                    className="btn-black-pill"
                    onClick={handleBooking}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <Loader2 className="spin" size={18} />
                    ) : (
                      "ЗАБРОНИРОВАТЬ"
                    )}
                  </button>
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="calc-card success-view"
            >
              <CheckCircle2 size={64} strokeWidth={1} color="#C6A266" />
              <h2>
                Заявка принята<span>.</span>
              </h2>
              <p>Ваш груз успешно зафиксирован в системе.</p>
              <div className="success-btns">
                <button
                  className="btn-black-pill"
                  onClick={() => navigate("/")}
                >
                  На главную
                </button>
                <button
                  className="btn-outline-pill"
                  onClick={() => navigate("/admin")}
                >
                  В кабинет
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Calculator;
