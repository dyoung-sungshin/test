import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import GNB from "../components/GNB";
import "./HomePage.css";
import noGroupsImage from "../assets/icon=empty.svg";
import searchIcon from "../assets/icon=search.svg"; // 검색 아이콘 이미지 임포트
import flowerIcon from "../assets/size=64_64.png"; // 꽃 아이콘 이미지 임포트
import groupData from "../data/GroupData.json"; // GroupData.json 파일 임포트

const HomePage = () => {
  const [isPublic, setIsPublic] = useState(true);
  const [sortOption, setSortOption] = useState("likes"); // 기본값을 '공감순'으로 설정
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    // GroupData.json에서 데이터를 로드하여 상태에 저장
    setGroups(groupData.data); // groupData의 data 배열을 사용하도록 수정
  }, []);

  const getDaysSinceCreation = (createdAt) => {
    const createdDate = new Date(createdAt);
    const currentDate = new Date();
    const differenceInTime = currentDate.getTime() - createdDate.getTime();
    return Math.floor(differenceInTime / (1000 * 3600 * 24)); // 일수 계산
  };

  const formatLikeCount = (likeCount) => {
    if (likeCount >= 1000000) {
      return `${Math.floor(likeCount / 1000000)}M`;
    } else if (likeCount >= 1000) {
      return `${Math.floor(likeCount / 1000)}K`;
    }
    return likeCount.toString();
  };

  // 선택된 공개/비공개 옵션에 따라 그룹 필터링
  const filteredGroups = groups.filter((group) => group.isPublic === isPublic);

  return (
    <div className="home-page">
      <GNB />
      <div className="group-section">
        <div className="group-toggle">
          <button
            className={`toggle-button ${isPublic ? "active" : ""}`}
            onClick={() => setIsPublic(true)}
          >
            공개
          </button>
          <button
            className={`toggle-button ${!isPublic ? "active" : ""}`}
            onClick={() => setIsPublic(false)}
          >
            비공개
          </button>
          <div className="group-search-container">
            <img src={searchIcon} alt="검색 아이콘" className="search-icon" />
            <input
              type="text"
              placeholder="그룹명을 검색해 주세요"
              className="group-search"
            />
          </div>
          <select
            className="group-sort"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="likes">공감순</option>
            <option value="recent">최신순</option>
            <option value="posts">게시글 많은순</option>
            <option value="badges">획득 배지순</option>
          </select>
        </div>
        <div className="group-content">
          {filteredGroups.length === 0 ? (
            <div className="no-group">
              <img src={noGroupsImage} alt="No Groups" />
              <p>등록된 공개 그룹이 없습니다.</p>
              <p>가장 먼저 그룹을 만들어보세요!</p>
            </div>
          ) : (
            <div className="group-list">
              {filteredGroups.map((group) => (
                <div key={group.id} className="group-item">
                  {group.imageUrl && (
                    <img
                      src={group.imageUrl}
                      alt={group.name}
                      className="group-item-image"
                    />
                  )}
                  <div className="group-item-info">
                    <div className="group-item-header">
                      <span className="group-days">D+{getDaysSinceCreation(group.createdAt)}</span>
                      <span className="separator"> | </span>
                      <span className="group-visibility">{group.isPublic ? "공개" : "비공개"}</span>
                    </div>
                    <h3 className="group-item-title">{group.name}</h3>
                    <p className="group-item-description">
                      {group.introduction}
                    </p>
                    <div className="group-item-meta">
                      <div className="meta-item">
                        <span className="group-meta-label">획득 배지</span>
                        <span className="group-meta-value">{group.badgeCount}</span>
                      </div>
                      <div className="meta-item">
                        <span className="group-meta-label">추억</span>
                        <span className="group-meta-value">{group.postCount}</span>
                      </div>
                      <div className="meta-item">
                        <span className="group-meta-label">그룹 공감</span>
                        <span className="group-meta-value">
                          <img
                            src={flowerIcon}
                            alt="flower icon"
                            className="flower-icon"
                          />{" "}
                          {formatLikeCount(group.likeCount)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          <Link to="/GroupForm">
            <button className="create-group-button">그룹 만들기</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
