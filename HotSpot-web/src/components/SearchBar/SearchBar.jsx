import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./SearchBar.css";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [recentSearches, setRecentSearches] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  const keywordPool = [
    "한식",
    "중식",
    "카페",
    "제과",
    "헬스",
    "피트니스",
    "횟집",
    "편의점",
    "스터디카페",
  ];

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("recentSearches")) || [];
    setRecentSearches(saved);
  }, []);

  useEffect(() => {
    if (query.length > 0) {
      setSuggestions(keywordPool.filter((k) => k.includes(query)));
    } else {
      setSuggestions([]);
    }
  }, [query]);

  const saveRecentSearch = (q) => {
    const updated = [q, ...recentSearches.filter((item) => item !== q)].slice(
      0,
      5
    );
    setRecentSearches(updated);
    localStorage.setItem("recentSearches", JSON.stringify(updated));
  };

  const handleSearch = () => {
    if (query.trim()) {
      saveRecentSearch(query);
      navigate(`/search?query=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div className="search-bar">
      <div className="search-input-wrapper">
        <input
          type="text"
          className="search-input-box"
          placeholder="원하는 지역과 상권을 입력해보세요. (지역, 건물 주소, 한식, 중식 등)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearch();
          }}
        />
        <button className="search-circle-button" onClick={handleSearch}>
          ↑
        </button>
      </div>

      {suggestions.length > 0 && (
        <ul className="autocomplete-list">
          {suggestions.map((item, idx) => (
            <li key={idx} onClick={() => setQuery(item)}>
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
