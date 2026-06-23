import React, { useEffect } from "react";
import TopHeader from "../components/Home/Header/Header";
import Hero from "../components/Home/Hero/Hero";
import Footer from "../components/Home/Footer/Footer";
import FleetSpecs from "../components/Home/Fleet/Fleet";
import Services from "../components/Home/Services/Services";
import About from "../components/Home/Ab/About";

const HomePage: React.FC = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting)
            entry.target.classList.add("reveal-visible");
        });
      },
      { threshold: 0.1 },
    );

    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="home-page">
      <TopHeader />

      <main>
        {/* Главный экран */}
        <Hero />

        {/* Секция Услуг */}
        <div id="services" className="reveal">
          <Services />
        </div>

        {/* Секция Автопарка */}
        <div id="fleet" className="reveal delay-1">
          <FleetSpecs />
        </div>

        {/* Секция О компании (id внутри самого компонента About.tsx) */}
        <div className="reveal delay-2">
          <About />
        </div>

        {/* Секция Манифеста (если она пустая, пока можно оставить так) */}
        <div id="manifest" className="reveal"></div>
      </main>

      <Footer />
    </div>
  );
};

export default HomePage;
