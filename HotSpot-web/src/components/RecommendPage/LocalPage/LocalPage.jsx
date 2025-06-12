import React, { useEffect } from "react";
import "../../../styles/components/RecommendPage/LocalPage/LocalPage.css";

function LocalPage() {
  const coffee = [
    {
      city: "도봉구 쌍문 1동",
      population: 79485,
      work_population: 54223,
      franchise_coffee: 10,
    },
    {
      city: "도봉구 쌍문 2동",
      population: 248647,
      work_population: 188239,
      private_coffee: 24,
    },
    {
      city: "도봉구 쌍문 3동",
      population: 432942,
      work_population: 205843,
      dessert_coffee: 10,
    },
    {
      city: "도봉구 쌍문 4동",
      population: 134829,
      work_population: 88573,
      dessert_coffee: 4,
    },
    {
      city: "도봉구 방학 1동",
      population: 449314,
      work_population: 253847,
      takeout_coffee: 14,
    },
  ];

  const drink = [
    {
      city: "도봉구 쌍문 1동",
      population: 79485,
      work_population: 69223,
      beer_bar: 8,
    },
    {
      city: "도봉구 쌍문 2동",
      population: 248647,
      thirties_population: 194857,
      emotional_bar: 3,
    },
    {
      city: "도봉구 쌍문 3동",
      population: 432942,
      thirties_population: 302948,
      twenties_bar: 5,
    },
    {
      city: "도봉구 쌍문 4동",
      population: 134829,
      family_population: 20111,
      terrace_bar: 4,
    },
    {
      city: "도봉구 방학 1동",
      population: 449314,
      female_population: 292810,
      wine_bar: 1,
    },
  ];

  const study = [
    {
      city: "도봉구 쌍문 1동",
      population: 100000,
      worker_student_population: 20111,
      office_supplies_store: 4,
    },
    {
      city: "도봉구 쌍문 2동",
      population: 91010,
      teenage_population: 20111,
      study_cafe: 4,
    },
    {
      city: "도봉구 쌍문 3동",
      population: 91010,
      teenage_population: 20111,
      book_store: 4,
    },
    {
      city: "도봉구 쌍문 4동",
      population: 91010,
      student_population: 20111,
      lunch_store: 4,
    },
    {
      city: "도봉구 방학 1동",
      population: 91010,
      twenties_population: 20111,
      fast_food_store: 4,
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
        <div className="recommend-title">어디가 인기가 많은지 알려줄게요.</div>
        <div className="recommend-additional-title">
          사람들이 가장 많이 찾아보는 주제들로 가져왔어요.
        </div>

        <div className="recommend-main-container">
          <div className="recommend-first-container">
            <div className="main-description">오전 9시,</div>
            <div className="main-highlight">출근</div>
            <div className="main-description">하는 사람들이 많은 동네</div>
            <div className="main-additional-title">
              커피 없이는 살 수 없는 직장인, 바쁜 와중에도 커피는 마셔야지...
            </div>

            <div className="card-container">
              <div className="card-row">
                {coffee.slice(0, 5).map((item, index) => (
                  <div key={index} className={`card card-${index + 1}`}>
                    <div className="card-number">
                      <img
                        src="/assets/icons/coffee.svg"
                        alt="coffee"
                        className="card-icon"
                      />
                      {index + 1}
                    </div>
                    <div className="card-title">{item.city}</div>
                    <div className="card-info">
                      <div className="card-info-row">
                        <span className="info-label">일 평균 유동인구: </span>
                        <span className="info-value">
                          {item.population.toLocaleString()}
                        </span>
                      </div>
                      <div className="card-info-row">
                        <span className="info-label">
                          일 평균 직장인 유동인구:
                        </span>
                        <span className="info-value">
                          {item.work_population.toLocaleString()}
                        </span>
                      </div>
                      {item.franchise_coffee && (
                        <div className="info-row">
                          <span className="info-label">
                            프랜차이즈 카페 매장 수:
                          </span>
                          <span className="info-value">
                            {item.franchise_coffee}
                          </span>
                        </div>
                      )}
                      {item.private_coffee && (
                        <div className="info-row">
                          <span className="info-label">개인카페 업체 수: </span>
                          <span className="info-value">
                            {item.private_coffee}
                          </span>
                        </div>
                      )}
                      {item.dessert_coffee && (
                        <div className="info-row">
                          <span className="info-label">
                            디저트 카페 업체 수:
                          </span>
                          <span className="info-value">
                            {item.dessert_coffee}
                          </span>
                        </div>
                      )}
                      {item.takeout_coffee && (
                        <div className="info-row">
                          <span className="info-label">
                            테이크아웃 전용 커피 업체 수:
                          </span>
                          <span className="info-value">
                            {item.takeout_coffee}
                          </span>
                        </div>
                      )}
                      <div className="card-tags">
                        {item.franchise_coffee && (
                          <span className="tag">#보장된 맛</span>
                        )}
                        {item.private_coffee && (
                          <span className="tag">#인생사진</span>
                        )}
                        {item.dessert_coffee && (
                          <span className="tag">#당보충</span>
                        )}
                        {item.takeout_coffee && (
                          <span className="tag">#테이크아웃</span>
                        )}
                        <span className="tag"> #카페</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="recommend-second-container">
            <div className="main-highlight">한잔</div>
            <div className="main-description">하기 딱 좋은, 그런 동네</div>
            <div className="main-additional-title">
              회식, 친구들과의 술, 연인과 함께 하기 좋은 곳 찾고 있나요?
            </div>
            <div className="card-container">
              <div className="card-row">
                {drink.slice(0, 5).map((item, index) => (
                  <div key={index} className={`card card-second-${index + 1}`}>
                    <div className="card-number">
                      <img
                        src="/assets/icons/beer.svg"
                        alt="beer"
                        className="card-icon"
                      />
                      {index + 1}
                    </div>
                    <div className="card-title">{item.city}</div>
                    <div className="card-info">
                      <div className="card-info-row">
                        <span className="info-label">일 평균 유동인구: </span>
                        <span className="info-value">
                          {item.population.toLocaleString()}
                        </span>
                      </div>
                      <div className="card-info-row">
                        {item.work_population && (
                          <div className="info-row">
                            <span className="info-label">
                              일 평균 직장인 유동인구:
                            </span>
                            <span className="info-value">
                              {item.work_population.toLocaleString()}
                            </span>
                          </div>
                        )}
                        {item.thirties_population && (
                          <div className="info-row">
                            <span className="info-label">30대 유동인구:</span>
                            <span className="info-value">
                              {item.thirties_population.toLocaleString()}
                            </span>
                          </div>
                        )}
                        {item.family_population && (
                          <div className="info-row">
                            <span className="info-label">
                              가족단위 유동인구:
                            </span>
                            <span className="info-value">
                              {item.family_population.toLocaleString()}
                            </span>
                          </div>
                        )}
                        {item.female_population && (
                          <div className="info-row">
                            <span className="info-label">
                              일 평균 여성 유동인구:
                            </span>
                            <span className="info-value">
                              {item.female_population}
                            </span>
                          </div>
                        )}
                      </div>
                      {item.beer_bar && (
                        <div className="info-row">
                          <span className="info-label">호프집 매장 수:</span>
                          <span className="info-value">{item.beer_bar}</span>
                        </div>
                      )}
                      {item.emotional_bar && (
                        <div className="info-row">
                          <span className="info-label">
                            감성 주점 매장 수:{" "}
                          </span>
                          <span className="info-value">
                            {item.emotional_bar}
                          </span>
                        </div>
                      )}
                      {item.twenties_bar && (
                        <div className="info-row">
                          <span className="info-label">
                            20대가 많이 이용하는 술집 매장 수:
                          </span>
                          <span className="info-value">
                            {item.twenties_bar}
                          </span>
                        </div>
                      )}
                      {item.terrace_bar && (
                        <div className="info-row">
                          <span className="info-label">
                            야외 테라스 매장 수:
                          </span>
                          <span className="info-value">{item.terrace_bar}</span>
                        </div>
                      )}
                      {item.wine_bar && (
                        <div className="info-row">
                          <span className="info-label">와인 바 매장 수:</span>
                          <span className="info-value">{item.wine_bar}</span>
                        </div>
                      )}
                      <div className="card-tags">
                        {item.beer_bar && (
                          <span className="tag">#퇴근 후 맥주 한잔</span>
                        )}
                        {item.beer_bar && <span className="tag">#맥주</span>}
                        {item.emotional_bar && (
                          <span className="tag">#감성주점</span>
                        )}
                        {item.emotional_bar && (
                          <span className="tag">#연인끼리</span>
                        )}
                        {item.twenties_bar && (
                          <span className="tag">#힙한술집</span>
                        )}
                        {item.twenties_bar && <span className="tag">#MZ</span>}
                        {item.terrace_bar && (
                          <span className="tag">#불금은 여기</span>
                        )}
                        {item.terrace_bar && <span className="tag">#야외</span>}
                        {item.wine_bar && (
                          <span className="tag">#혼술성지</span>
                        )}
                        {item.wine_bar && <span className="tag">#와인</span>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="recommend-third-container">
            <div className="main-highlight">수업</div>
            <div className="main-description">끝나면 모이기 좋은 동네</div>
            <div className="main-additional-title">
              학생들에게 도움을 주고 싶은 사장님, 여기 어때요?
            </div>
            <div className="card-container">
              <div className="card-row">
                {study.slice(0, 5).map((item, index) => (
                  <div key={index} className={`card card-third-${index + 1}`}>
                    <div className="card-number">
                      <img
                        src="/assets/icons/pencil.svg"
                        alt="pencil"
                        className="card-icon"
                      />
                      {index + 1}
                    </div>
                    <div className="card-title">{item.city}</div>
                    <div className="card-info">
                      <div className="card-info-row">
                        <span className="info-label">일 평균 유동인구: </span>
                        <span className="info-value">
                          {item.population.toLocaleString()}
                        </span>
                      </div>
                      <div className="card-info-row">
                        {item.worker_student_population && (
                          <div className="info-row">
                            <span className="info-label">
                              일평균 직장인, 학생 유동인구:
                            </span>
                            <span className="info-value">
                              {item.worker_student_population.toLocaleString()}
                            </span>
                          </div>
                        )}
                        {item.teenage_population && (
                          <div className="info-row">
                            <span className="info-label">
                              일 평균 10대 유동인구:{" "}
                            </span>
                            <span className="info-value">
                              {item.teenage_population.toLocaleString()}
                            </span>
                          </div>
                        )}
                        {item.student_population && (
                          <div className="info-row">
                            <span className="info-label">
                              일 평균 학생 유동인구:
                            </span>
                            <span className="info-value">
                              {item.student_population.toLocaleString()}
                            </span>
                          </div>
                        )}
                        {item.twenties_population && (
                          <div className="info-row">
                            <span className="info-label">
                              일 평균 20대 유동인구:
                            </span>
                            <span className="info-value">
                              {item.twenties_population}
                            </span>
                          </div>
                        )}
                      </div>
                      {item.office_supplies_store && (
                        <div className="info-row">
                          <span className="info-label">
                            사무용품점 매장 수:
                          </span>
                          <span className="info-value">
                            {item.office_supplies_store}
                          </span>
                        </div>
                      )}
                      {item.study_cafe && (
                        <div className="info-row">
                          <span className="info-label">
                            스터디카페 매장 수:
                          </span>
                          <span className="info-value">{item.study_cafe}</span>
                        </div>
                      )}
                      {item.book_store && (
                        <div className="info-row">
                          <span className="info-label">서점 매장 수:</span>
                          <span className="info-value">{item.book_store}</span>
                        </div>
                      )}
                      {item.lunch_store && (
                        <div className="info-row">
                          <span className="info-label">
                            도시락 전문점 매장 수:
                          </span>
                          <span className="info-value">{item.lunch_store}</span>
                        </div>
                      )}
                      {item.fast_food_store && (
                        <div className="info-row">
                          <span className="info-label">
                            패스트푸드 매장 수:
                          </span>
                          <span className="info-value">
                            {item.fast_food_store}
                          </span>
                        </div>
                      )}
                      <div className="card-tags">
                        {item.office_supplies_store && (
                          <span className="tag">#문구점 추천</span>
                        )}
                        {item.office_supplies_store && (
                          <span className="tag">#사무용품</span>
                        )}
                        {item.study_cafe && (
                          <span className="tag">#스터디카페</span>
                        )}
                        {item.study_cafe && (
                          <span className="tag">#공부맛집</span>
                        )}
                        {item.book_store && (
                          <span className="tag">#분위기맛집</span>
                        )}
                        {item.book_store && <span className="tag">#서점</span>}
                        {item.lunch_store && (
                          <span className="tag">#간편식</span>
                        )}
                        {item.lunch_store && (
                          <span className="tag">#빠른 식사</span>
                        )}
                        {item.fast_food_store && (
                          <span className="tag">#햄버거</span>
                        )}
                        {item.fast_food_store && (
                          <span className="tag">#배고파</span>
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

export default LocalPage;
