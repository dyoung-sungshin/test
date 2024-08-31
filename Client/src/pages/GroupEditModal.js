import React, { useState } from "react";
import closeIcon from "../assets/icon=x.png";
import "./GroupEditModal.css";

const GroupEditModal = ({ isOpen, onClose }) => {
  const [selectedFileName, setSelectedFileName] = useState("");

  if (!isOpen) return null;

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFileName(file.name); // 선택한 파일의 이름을 상태로 설정
    } else {
      setSelectedFileName(""); // 파일이 선택되지 않았을 경우
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close-button" onClick={onClose}>
          <img src={closeIcon} alt="Close" />
        </button>
        <h2 className="modal-title">그룹 정보 수정</h2>
        <form className="modal-form">
          <label className="modal-label">그룹명</label>
          <input type="text" className="modal-input" placeholder="달봉이네 가족" />

          <label className="modal-label">대표 이미지</label>
          <div className="modal-input-file">
            <input 
              type="text" 
              className="file-input-text" 
              readOnly 
              value={selectedFileName} // 파일명을 텍스트 필드에 표시
            />
            <label className="file-button">
              파일 선택
              <input 
                type="file" 
                style={{ display: "none" }} 
                onChange={handleFileChange} // 파일 선택 이벤트 핸들러 연결
              />
            </label>
          </div>

          <label className="modal-label">그룹 소개</label>
          <textarea className="modal-textarea" placeholder="그룹을 소개해 주세요" />

          <label className="modal-label">그룹 공개 선택</label>
          <div className="modal-public-toggle">
            <label className="toggle-label">공개</label>
            <label className="switch">
              <input type="checkbox" defaultChecked />
              <span className="slider round"></span>
            </label>
          </div>

          <label className="modal-label">수정 권한 인증</label>
          <input type="password" className="modal-input" placeholder="비밀번호를 입력해 주세요" />

          <button type="submit" className="modal-submit-button">수정하기</button>
        </form>
      </div>
    </div>
  );
};

export default GroupEditModal;
