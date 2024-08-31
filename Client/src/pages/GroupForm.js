import React, { useState } from "react";
import "./GroupForm.css";
import GroupModal from "./GroupModal"; // GroupModal 컴포넌트 임포트

function GroupForm() {
  const [groupName, setGroupName] = useState("");
  const [groupImage, setGroupImage] = useState(null);
  const [groupDescription, setGroupDescription] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [password, setPassword] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState({ title: "", message: "" });
  const [fileName, setFileName] = useState(""); // 파일 이름을 저장할 상태

  const handleGroupNameChange = (e) => {
    const name = e.target.value;
    setGroupName(name);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setGroupImage(file);
      setFileName(file.name); // 파일 이름 상태 업데이트
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requestBody = {
      name: groupName,
      password: password,
      imageUrl: groupImage ? URL.createObjectURL(groupImage) : "",
      isPublic: isPublic,
      introduction: groupDescription,
    };

    try {
      const response = await fetch("http://localhost:3000/api/groups", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (response.status === 201) {
        setModalContent({
          title: "그룹 만들기 성공",
          message: "그룹이 성공적으로 등록되었습니다.",
        });
        setModalVisible(true);
        setGroupName(""); // 폼 초기화
      } else {
        setModalContent({
          title: "그룹 만들기 실패",
          message: "그룹 등록에 실패했습니다.",
        });
        setModalVisible(true);
      }
    } catch (error) {
      setModalContent({
        title: "서버 오류",
        message: "서버와의 통신 중 오류가 발생했습니다.",
      });
      setModalVisible(true);
    }
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="group-form">
        <h2 className="form-title">그룹 만들기</h2>

        <label className="form-label">그룹명</label>
        <input
          type="text"
          value={groupName}
          onChange={handleGroupNameChange}
          placeholder="그룹명을 입력하세요"
          className="form-input"
        />

        <label className="form-label">대표 이미지</label>
        <div className="form-input-file">
          <input
            type="text"
            placeholder="파일을 선택해 주세요"
            className="file-input-text"
            value={fileName} // 파일 이름을 표시
            readOnly
          />
          <label className="file-button">
            파일 선택
            <input
              type="file"
              onChange={handleFileChange} // 파일 변경 핸들러 연결
              style={{ display: "none" }}
            />
          </label>
        </div>

        <label className="form-label">그룹 소개</label>
        <textarea
          value={groupDescription}
          onChange={(e) => setGroupDescription(e.target.value)}
          placeholder="그룹을 소개해 주세요"
          className="form-textarea"
        />

        <label className="form-label">그룹 공개 선택</label>
        <div className="form-public-toggle">
          <label className="toggle-label">공개</label>
          <label className="switch">
            <input
              type="checkbox"
              checked={isPublic}
              onChange={(e) => setIsPublic(e.target.checked)}
            />
            <span className="slider round"></span>
          </label>
        </div>

        <label className="form-label">비밀번호 생성</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="그룹 비밀번호를 생성해 주세요"
          className="form-input"
        />

        <button type="submit" className="form-button">
          만들기
        </button>
      </form>

      {modalVisible && (
        <GroupModal
          title={modalContent.title}
          message={modalContent.message}
          onClose={closeModal}
        />
      )}
    </div>
  );
}

export default GroupForm;
