import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ServiceSection.css";

import populationImg from "/assets/images/population.png";
import forecastImg from "/assets/images/forecast.png";
import dataImg from "/assets/images/data.png";

const services = [
  {
    image: populationImg,
    title: "지도로 보는 유동인구",
    description:
      "시간대, 연령대, 성별에 따라\n지역별 유동인구를 파악할 수 있어요.",
    link: "/map",
  },
  {
    image: forecastImg,
    title: "업종별 창업 추천",
    description:
      "지역에 따라 어떤 업종이 잘 되는지 알려드려요.\n창업 전에 미리 검토해보세요.",
    link: "/select",
  },
  {
    image: dataImg,
    title: "언제쯤 수익이 날까요?",
    description:
      "월 예상 매출과 고정비용, 임대료를 분석해\n손익분기점을 정확히 계산해드려요.",
    link: "/profit",
  },
];

const ServiceSection = () => {
  const navigate = useNavigate();
  const cardRefs = useRef([]);
  const [visible, setVisible] = useState([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = cardRefs.current.findIndex(
            (ref) => ref === entry.target
          );
          if (entry.isIntersecting && !visible[index]) {
            setVisible((prev) => {
              const updated = [...prev];
              updated[index] = true;
              return updated;
            });
          }
        });
      },
      { threshold: 0.3 }
    );

    cardRefs.current.forEach((ref) => {
      if (ref) {
        observer.observe(ref);
        if (ref.getBoundingClientRect().top < window.innerHeight) {
          const index = cardRefs.current.findIndex((r) => r === ref);
          setVisible((prev) => {
            const updated = [...prev];
            updated[index] = true;
            return updated;
          });
        }
      }
    });

    return () => {
      cardRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [visible]);

  return (
    <section className="service-section">
      <div className="service-header">
        <h2 className="service-title">주요 서비스</h2>
        <div className="service-line" />
      </div>

      <div className="service-cards">
        {services.map((service, index) => (
          <div
            ref={(el) => (cardRefs.current[index] = el)}
            className={`service-card ${index === 1 ? "reverse" : ""} ${
              visible[index] ? "show" : ""
            }`}
            key={index}
          >
            {service.image && (
              <img
                src={service.image}
                alt={service.title}
                className="service-card__image"
                onClick={() => navigate(service.link)}
                style={{ cursor: "pointer" }}
              />
            )}
            <div className="service-card__text">
              <h3 className="service-card__title">{service.title}</h3>
              <p className="service-card__description">
                {service.description.split("\n").map((line, i) => (
                  <span key={i}>
                    {line}
                    <br />
                  </span>
                ))}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServiceSection;
