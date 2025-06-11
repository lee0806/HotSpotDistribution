import React, { useEffect } from "react";
import "../../../styles/components/RecommendPage/IndustryPage/IndustryPage.css";

function IndustryPage() {
  const BangHack_3 = [
    {
      industry: "개인 카페",
      population: 10928,
      average_sales: 20394718,
      store_count: 5,
    },
    {
      industry: "프랜차이즈 패스트푸드점",
      population: 10928,
      average_sales: 37484928,
      store_count: 12,
    },
    {
      industry: "도시락 전문점",
      population: 10928,
      average_sales: 19284738,
      store_count: 5,
    },
    {
      industry: "편의점",
      population: 10928,
      average_sales: 9482748,
      store_count: 5,
    },
    {
      industry: "개인빵집",
      population: 10928,
      average_sales: 49482719,
      store_count: 8,
    },
  ];

  const BangHack_1 = [
    {
      industry: "삼겹살 전문점",
      population: 8918,
      average_sales: 59483710,
      store_count: 5,
    },
    {
      industry: "회전초밥 전문점",
      population: 8918,
      average_sales: 64758274,
      store_count: 12,
    },
    {
      industry: "프랜차이즈 커피전문점",
      population: 8918,
      average_sales: 37484928,
      store_count: 5,
    },
    {
      industry: "볼링장",
      population: 8918,
      average_sales: 12922348,
      store_count: 5,
    },
    {
      industry: "키즈카페",
      population: 8918,
      average_sales: 32293847,
      store_count: 8,
    },
  ];

  const Chang_5 = [
    {
      industry: "원데이 클래스",
      population: 8192,
      average_sales: 8948392,
      store_count: 5,
    },
    {
      industry: "북카페",
      population: 98123,
      average_sales: 7182958,
      store_count: 12,
    },
    {
      industry: "레스토랑",
      population: 91010,
      average_sales: 58748385,
      store_count: 5,
    },
    {
      industry: "소품샵",
      population: 91010,
      average_sales: 7124375,
      store_count: 5,
    },
    {
      industry: "포토 스튜디오",
      population: 91010,
      average_sales: 8485934,
      store_count: 8,
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 1,
      }
    );

    const cards = document.querySelectorAll(".card");
    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div className="recommend-container">
        <div className="recommend-title">
          무슨 업종이 인기가 많은지 알려줄게요.
        </div>
        <div className="recommend-additional-title">
          선택한 지역에서 무슨 업종이 좋을지 찾아봤어요.
        </div>

        <div className="select-wrapper">
          <div className="select-city">
            서울특별시
            <img src="/src/assets/icons/arrow.svg" alt="arrow" />
          </div>
          <div className="select-dong">
            도봉구
            <img src="/src/assets/icons/arrow.svg" alt="arrow" />
          </div>
        </div>

        <div className="recommend-main-container">
          <div className="recommend-first-container">
            <div className="main-highlight">방학 3동</div>
            <div className="main-description">, 유동인구가 가장 많아요.</div>
            <div className="main-additional-title">
              잘 되는 업종, 우리가 먼저 찾아봤어요.
            </div>

            <div className="card-container">
              <div className="card-row">
                {BangHack_3.slice(0, 5).map((item, index) => (
                  <div key={index} className={`card card-${index + 1}`}>
                    <div className="card-number">
                      {index === 0 && (
                        <img
                          src="src/assets/icons/industryPageIcon/coffee.svg"
                          alt="coffee"
                          className="card-icon"
                        />
                      )}
                      {index === 1 && (
                        <img
                          src="src/assets/icons/industryPageIcon/hamburger.svg"
                          alt="hamburger"
                          className="card-icon"
                        />
                      )}
                      {index === 2 && (
                        <img
                          src="src/assets/icons/industryPageIcon/rice-bowl.svg"
                          alt="rice_bowl"
                          className="card-icon"
                        />
                      )}
                      {index === 3 && (
                        <img
                          src="src/assets/icons/industryPageIcon/store.svg"
                          alt="store"
                          className="card-icon"
                        />
                      )}
                      {index === 4 && (
                        <img
                          src="src/assets/icons/industryPageIcon/bread-slice.svg"
                          alt="bread-slice"
                          className="card-icon"
                        />
                      )}
                      {index + 1}
                    </div>
                    <div className="card-title">{item.industry}</div>
                    <div className="card-info">
                      <div className="card-info-row">
                        <span className="info-label">일 평균 유동인구: </span>
                        <span className="info-value">
                          {item.population.toLocaleString()}
                        </span>
                      </div>
                      <div className="card-info-row">
                        <span className="info-label">
                          {`${
                            item.industry
                          } 평균 매출(인권비 포함) : ${item.average_sales.toLocaleString()}`}
                        </span>
                      </div>
                      <div className="info-row">
                        <span className="info-label">
                          {`${item.industry} 매장 수: `}
                        </span>
                        <span className="info-value">{item.store_count}</span>
                      </div>

                      <div className="card-tags">
                        {item.industry === "개인 카페" && (
                          <>
                            <span className="tag">#차별화된 맛</span>
                            <span className="tag">#카페</span>
                          </>
                        )}
                        {item.industry === "프랜차이즈 패스트푸드점" && (
                          <>
                            <span className="tag">#보장된 맛</span>
                            <span className="tag">#햄버거</span>
                          </>
                        )}
                        {item.industry === "도시락 전문점" && (
                          <>
                            <span className="tag">#다양한 맛</span>
                            <span className="tag">#간편식</span>
                          </>
                        )}
                        {item.industry === "편의점" && (
                          <>
                            <span className="tag">#어디든, 언제나</span>
                            <span className="tag">#편의점</span>
                          </>
                        )}
                        {item.industry === "개인빵집" && (
                          <>
                            <span className="tag">#맛으로 승부</span>
                            <span className="tag">#따끈따끈 베이커리</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="recommend-second-container">
            <div className="main-highlight">방학 1동</div>
            <div className="main-description">, 세대수가 가장 많아요.</div>
            <div className="main-additional-title">
              가족과 함께하는 업종은 어떠세요?
            </div>

            <div className="card-container">
              <div className="card-row">
                {BangHack_1.slice(0, 5).map((item, index) => (
                  <div key={index} className={`card card-second-${index + 1}`}>
                    <div className="card-number">
                      {index === 0 && (
                        <img
                          src="src/assets/icons/industryPageIcon/pig_line.svg"
                          alt="pig_liner"
                          className="card-icon"
                        />
                      )}
                      {index === 1 && (
                        <img
                          src="src/assets/icons/industryPageIcon/sushi-roll.svg"
                          alt="sushi-roll"
                          className="card-icon"
                        />
                      )}
                      {index === 2 && (
                        <img
                          src="src/assets/icons/industryPageIcon/coffee.svg"
                          alt="coffee"
                          className="card-icon"
                        />
                      )}
                      {index === 3 && (
                        <img
                          src="src/assets/icons/industryPageIcon/bowling-ball.svg"
                          alt="bowling-ball"
                          className="card-icon"
                        />
                      )}
                      {index === 4 && (
                        <img
                          src="src/assets/icons/industryPageIcon/mood-heart.svg"
                          alt="mood-heart"
                          className="card-icon"
                        />
                      )}
                      {index + 1}
                    </div>
                    <div className="card-title">{item.industry}</div>
                    <div className="card-info">
                      <div className="card-info-row">
                        <span className="info-label">일 평균 유동인구: </span>
                        <span className="info-value">
                          {item.population.toLocaleString()}
                        </span>
                      </div>
                      <div className="card-info-row">
                        <span className="info-label">
                          {`${
                            item.industry
                          } 평균 매출(인권비 포함) : ${item.average_sales.toLocaleString()}`}
                        </span>
                      </div>
                      <div className="info-row">
                        <span className="info-label">
                          {`${item.industry} 매장 수: `}
                        </span>
                        <span className="info-value">{item.store_count}</span>
                      </div>

                      <div className="card-tags">
                        {item.industry === "삼겹살 전문점" && (
                          <>
                            <span className="tag">#가족과 함께</span>
                            <span className="tag">#삼겹살</span>
                          </>
                        )}
                        {item.industry === "회전초밥 전문점" && (
                          <>
                            <span className="tag">#특별한 날엔</span>
                            <span className="tag">#회전초밥</span>
                          </>
                        )}
                        {item.industry === "프랜차이즈 커피전문점" && (
                          <>
                            <span className="tag">#익숙한 맛, 가족끼리</span>
                            <span className="tag">#커피, 음료</span>
                          </>
                        )}
                        {item.industry === "볼링장" && (
                          <>
                            <span className="tag">#가족끼리 스포츠</span>
                            <span className="tag">#볼링</span>
                          </>
                        )}
                        {item.industry === "키즈카페" && (
                          <>
                            <span className="tag">
                              #자녀와 부모가 서로 만족하는
                            </span>
                            <span className="tag">#키즈카페</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="recommend-third-container">
            <div className="main-highlight">창 5동</div>
            <div className="main-description">, 문화시설이 많아요.</div>
            <div className="main-additional-title">
              예술적인 공간과 함께하는 업종은 어떠세요?
            </div>

            <div className="card-container">
              <div className="card-row">
                {Chang_5.slice(0, 5).map((item, index) => (
                  <div key={index} className={`card card-third-${index + 1}`}>
                    <div className="card-number">
                      {index === 0 && (
                        <img
                          src="src/assets/icons/industryPageIcon/pencil-01.svg"
                          alt="pencil-01"
                          className="card-icon"
                        />
                      )}
                      {index === 1 && (
                        <img
                          src="src/assets/icons/industryPageIcon/books.svg"
                          alt="books"
                          className="card-icon"
                        />
                      )}
                      {index === 2 && (
                        <img
                          src="src/assets/icons/industryPageIcon/dish_cover_line.svg"
                          alt="dish_cover_line"
                          className="card-icon"
                        />
                      )}
                      {index === 3 && (
                        <img
                          src="src/assets/icons/industryPageIcon/bear-smile-line.svg"
                          alt="bear-smile-line"
                          className="card-icon"
                        />
                      )}
                      {index === 4 && (
                        <img
                          src="src/assets/icons/industryPageIcon/camera-01.svg"
                          alt="camera-01"
                          className="card-icon"
                        />
                      )}
                      {index + 1}
                    </div>
                    <div className="card-title">{item.industry}</div>
                    <div className="card-info">
                      <div className="card-info-row">
                        <span className="info-label">일 평균 유동인구: </span>
                        <span className="info-value">
                          {item.population.toLocaleString()}
                        </span>
                      </div>
                      <div className="card-info-row">
                        <span className="info-label">
                          {`${
                            item.industry
                          } 평균 매출(인권비 포함) : ${item.average_sales.toLocaleString()}`}
                        </span>
                      </div>
                      <div className="info-row">
                        <span className="info-label">
                          {`${item.industry} 매장 수: `}
                        </span>
                        <span className="info-value">{item.store_count}</span>
                      </div>

                      <div className="card-tags">
                        {item.industry === "원데이 클래스" && (
                          <>
                            <span className="tag">#연인과 함께하는</span>
                            <span className="tag">#원데이 클래스</span>
                          </>
                        )}
                        {item.industry === "북카페" && (
                          <>
                            <span className="tag">#분위기 맛집</span>
                            <span className="tag">#북카페</span>
                          </>
                        )}
                        {item.industry === "레스토랑" && (
                          <>
                            <span className="tag">#가족과 함께</span>
                            <span className="tag">#레스토랑</span>
                          </>
                        )}
                        {item.industry === "소품샵" && (
                          <>
                            <span className="tag">#의미 있는 선물</span>
                            <span className="tag">#소품샵</span>
                          </>
                        )}
                        {item.industry === "포토 스튜디오" && (
                          <>
                            <span className="tag">#MZ</span>
                            <span className="tag">#인생네컷</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default IndustryPage;
