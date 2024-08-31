import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import GroupForm from './pages/GroupForm';
import GroupDetail from './pages/GroupDetail';
import Layout from './components/Layout';
import ErrorPage from './pages/ErrorPage';
import PrivateGroup from './pages/PrivateGroup';
import MemoryForm from './pages/MemoryForm';
import PrivateMemory from './pages/PrivateMemory';
import MemoryDetail from './pages/MemoryDetail';
import HomePageTest from './pages/HomePageTest';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/homepagetest" element={<HomePageTest />} />
        <Route 
          path="/GroupForm" 
          element={
            <Layout>
              <GroupForm />
            </Layout>
          }
        />
        <Route 
          path="/GroupDetail"
          element={
            <Layout>
              <GroupDetail />
            </Layout>
          }
        />
        <Route 
          path="/ErrorPage"
          element={
            <Layout>
              <ErrorPage />
            </Layout>
          }
        />
        <Route
          path="/PrivateGroup"
          element={
            <Layout>
              <PrivateGroup />
            </Layout>
          }
        />
        <Route
          path="/MemoryForm"
          element={
            <Layout>
              <MemoryForm />
            </Layout>
          }
        />
        <Route
          path="/PrivateMemory"
          element={
            <Layout>
              <PrivateMemory />
            </Layout>
          }
        />
        <Route
          path="/MemoryDetail"
          element={
            <Layout>
              <MemoryDetail />
            </Layout>
          }
        />
        
      </Routes>
    </Router>
  );
}

export default App;
