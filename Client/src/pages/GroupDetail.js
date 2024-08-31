import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./GroupDetail.css";
import groupImage from "../assets/GroupImage.png";
import flowerIcon from "../assets/size=16.png";
import GroupEditModal from "./GroupEditModal";
import GroupDeleteModal from "./GroupDeleteModal";
import noMemoriesImage from "../assets/icon=empty.svg";
import searchIcon from "../assets/icon=search.svg";

const GroupDetail = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [sortOption, setSortOption] = useState("공감순");

  const openEditModal = () => setIsEditModalOpen(true);
  const closeEditModal = () => setIsEditModalOpen(false);

  const openDeleteModal = () => setIsDeleteModalOpen(true);
  const closeDeleteModal = () => setIsDeleteModalOpen(false);

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  return (
    <div className="group-detail">
      <div className="group-header">
        <img src={groupImage} alt="그룹 이미지" className="group-image" />
        <div className="group-info">
          <div className="group-meta">
            <span className="group-id">D+265</span>
            <span className="group-visibility"> | 공개</span>
          </div>
          <div className="group-title-container">
            <h1 className="group-title">달봉이네 가족</h1>
            <div className="group-submeta">
              <span className="group-memories">추억 8</span>
              <span className="group-likes"> | 그룹 공감 1.5K</span>
            </div>
          </div>
          <p className="group-description">
            서로 한 마음으로 응원하고 아끼는 달봉이네 가족입니다.
          </p>
          <div className="group-badges-section">
            <span className="badges-title">획득 배지</span>
            <div className="group-badges">
              <span className="badge">🌸 7일 연속 게시글 등록</span>
              <span className="badge">🌟 그룹 공감 1만 개 이상 받기</span>
              <span className="badge">❤️ 추억 공감 1만 개 이상 받기</span>
              <button className="send-like">
                <img src={flowerIcon} alt="꽃 아이콘" className="flower-icon" />
                공감 보내기
              </button>
            </div>
          </div>
          <hr className="image-divider" />
        </div>
        <div className="group-actions">
          <button className="group-edit-button" onClick={openEditModal}>
            그룹 정보 수정하기
          </button>
          <button className="group-delete-button" onClick={openDeleteModal}>
            그룹 삭제하기
          </button>
        </div>
      </div>

      {/* 추억 목록 섹션 */}
      <div className="memory-section">
        <div className="memory-header">
          <h2 className="memory-title">추억 목록</h2>
          <Link to="/memoryform" className="upload-memory-button">
            추억 올리기
          </Link>
        </div>

        {/* 검색 바 */}
        <div className="memory-controls">
          <div className="memory-toggle">
            <button className="toggle-button active">공개</button>
            <button className="toggle-button">비공개</button>
          </div>
          <div className="memory-search-container">
            <input
              className="memory-search"
              type="text"
              placeholder="태그 혹은 제목을 입력해 주세요"
            />
            <img src={searchIcon} alt="검색 아이콘" className="search-icon" />
          </div>
          <select
            className="memory-sort"
            value={sortOption}
            onChange={handleSortChange}
          >
            <option value="공감순">공감순</option>
            <option value="최신순">최신순</option>
            <option value="오래된순">오래된순</option>
          </select>
        </div>

        {/* 추억이 없을 때 표시 */}
        <div className="no-memories">
          <img
            src={noMemoriesImage}
            alt="추억 없음"
            className="no-memories-image"
          />
          <p className="no-memories-text">
            게시된 추억이 없습니다.
            <br />첫 번째 추억을 올려보세요!
          </p>
        </div>

        {/* 하단에 '추억 올리기' 버튼 추가 */}
        <div className="memory-footer">
          <Link to="/memoryform" className="create-memory-button">
            추억 올리기
          </Link>
        </div>
      </div>

      {/* 그룹 정보 수정 모달 */}
      <GroupEditModal isOpen={isEditModalOpen} onClose={closeEditModal} />

      {/* 그룹 삭제 모달 */}
      <GroupDeleteModal isOpen={isDeleteModalOpen} onClose={closeDeleteModal} />
    </div>
  );
};

export default GroupDetail;
