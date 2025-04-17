// App.js
import React, { useState, useEffect, createContext } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Posts from "./pages/Posts";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import AdminPanel from "./components/AdminPanel";
import AdminLogin from "./components/AdminLogin";
import PostCreator from "./components/PostCreator";
import ProjectCreator from "./components/ProjectCreator";
import Mailbox from "./components/Mailbox";
import Setup from "./components/Setup";
import "./styles/Global.css";
import { fetchData, updateData } from "./api";

export const AppContext = createContext();

const initialAppData = {
  posts: [],
  projects: [],
  messages: [],
  adminPassword: null,
  security: {}
};

function App() {
  const [darkMode, setDarkMode] = useState(() =>
    localStorage.getItem("darkMode") === "true"
  );
  const [isAdmin, setIsAdmin] = useState(() => 
    localStorage.getItem("isAdmin") === "true"
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [appData, setAppData] = useState(initialAppData);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchData();
        if (data) {
          setAppData({
            ...initialAppData,
            ...data,
            posts: data.posts || [],
            projects: data.projects || [],
            messages: data.messages || []
          });
        }
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to load data:", error);
        setError("Failed to load data. Please refresh the page.");
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  const syncData = async (newData) => {
    try {
      console.log('Starting syncData with newData:', JSON.stringify(newData, null, 2));
      const updatedData = await updateData(newData);
      console.log('API response from updateData:', JSON.stringify(updatedData, null, 2));
      if (updatedData) {
        console.log('Setting new app data:', JSON.stringify(updatedData, null, 2));
        setAppData(updatedData);
        return true;
      }
      console.log('No updated data received from API');
      return false;
    } catch (error) {
      console.error("Failed to sync data:", error);
      setError("Failed to save changes. Please try again.");
      return false;
    }
  };

  const handleAdminLogin = (password) => {
    if (password === appData.adminPassword) {
      setIsAdmin(true);
      localStorage.setItem("isAdmin", "true");
      return true;
    }
    return false;
  };

  const handleAdminLogout = () => {
    setIsAdmin(false);
    localStorage.removeItem("isAdmin");
  };

  const addPost = async (post) => {
    const newData = {
      ...appData,
      posts: [post, ...(appData.posts || [])]
    };
    const success = await syncData(newData);
    return success;
  };

  const deletePost = async (postId) => {
    const newData = {
      ...appData,
      posts: (appData.posts || []).filter((post) => post.id !== postId)
    };
    const success = await syncData(newData);
    return success;
  };

  const addProject = async (project) => {
    console.log('Starting addProject with project:', JSON.stringify(project, null, 2));
    console.log('Current appData:', JSON.stringify(appData, null, 2));
    const newData = {
      ...appData,
      projects: [project, ...(appData.projects || [])]
    };
    console.log('New app data to be synced:', JSON.stringify(newData, null, 2));
    const success = await syncData(newData);
    console.log('Project creation result:', success);
    return success;
  };

  const deleteProject = async (projectId) => {
    const newData = {
      ...appData,
      projects: (appData.projects || []).filter((project) => project.id !== projectId)
    };
    const success = await syncData(newData);
    return success;
  };

  const addMessage = async (message) => {
    const newData = {
      ...appData,
      messages: [message, ...(appData.messages || [])]
    };
    const success = await syncData(newData);
    return success;
  };

  const deleteMessage = async (messageId) => {
    const newData = {
      ...appData,
      messages: (appData.messages || []).filter((msg) => msg.id !== messageId)
    };
    const success = await syncData(newData);
    return success;
  };

  const setAdminCredentials = async (password, security) => {
    const newData = {
      ...appData,
      adminPassword: password,
      security
    };
    const success = await syncData(newData);
    return success;
  };

  const updatePost = async (updatedPost) => {
    const newData = {
      ...appData,
      posts: appData.posts.map(post => 
        post.id === updatedPost.id ? updatedPost : post
      )
    };
    const success = await syncData(newData);
    return success;
  };

  useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode);
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  if (isLoading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <AppContext.Provider
      value={{
        darkMode,
        setDarkMode,
        isAdmin,
        adminLogout: handleAdminLogout,
        posts: appData.posts || [],
        projects: appData.projects || [],
        messages: appData.messages || [],
        addPost,
        deletePost,
        updatePost,
        addProject,
        deleteProject,
        addMessage,
        deleteMessage,
        setAdminPassword: setAdminCredentials,
        security: appData.security,
        handleAdminLogin,
      }}
    >
      <Router>
        <div className={`app ${darkMode ? "dark-mode" : ""}`}>
          <Navbar />
          <div className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/posts" element={<Posts />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/contact" element={<Contact />} />

              {/* Protected Admin Routes */}
              <Route path="/admin" element={isAdmin ? <AdminPanel /> : <Navigate to="/admin/login" />} />
              <Route path="/admin/posts" element={isAdmin ? <PostCreator /> : <Navigate to="/admin/login" />} />
              <Route path="/admin/projects" element={isAdmin ? <ProjectCreator /> : <Navigate to="/admin/login" />} />
              <Route path="/admin/mailbox" element={isAdmin ? <Mailbox /> : <Navigate to="/admin/login" />} />

              {/* Authentication Routes */}
              <Route path="/admin/login" element={<AdminLogin onLogin={handleAdminLogin} />} />
              <Route path="/setup" element={!isAdmin ? <Setup /> : <Navigate to="/admin" />} />

              {/* 404 Redirect */}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </AppContext.Provider>
  );
}

export default App;
