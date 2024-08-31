import React from 'react';
import { Routes, Route } from 'react-router-dom';
import GroupForm from '../components/GroupForm';
import HomePage from '../components/HomePage';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/GroupForm" element={<GroupForm />} />
      <Route path="/GroupDetail" element={<GroupDetail />} />
      {/* 다른 라우트를 여기 추가할 수 있습니다 */}
    </Routes>
  );
}

export default AppRoutes;
