import React, { useContext, useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { UserContextProvider, UserContext } from './context/userContext';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';

import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import About from './pages/About';
import Documents from './pages/Documents';
import Account from './pages/Account';

import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import OnboardingModal from './components/OnboardingModel';
import Chat from './components/Chat';

const ProtectedRoute = ({ children }) => {
  const { user, ready } = useContext(UserContext);
  if (!ready) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  return user ? children : <Navigate to="/login" />;
};

const AppContent = () => {
  const { user, ready } = useContext(UserContext);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);  
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false); // Chat State
  const location = useLocation();

  useEffect(() => {
    if (ready && user && user.onboarded === false) {
      const timer = setTimeout(() => {
        setShowOnboarding(true);
      }, 100); 
      return () => clearTimeout(timer);
    }
  }, [user, ready]);
  
  const fullScreenRoutes = ['/login', '/register'];
  const isFullScreenPage = fullScreenRoutes.includes(location.pathname);
  const shouldShowSidebar = !!user && !isFullScreenPage;

  if (!ready) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F2F2F7]">
        <div className="w-12 h-12 border-4 border-red-500/20 border-t-red-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Onboarding Modal */}
      <OnboardingModal
        isOpen={showOnboarding} 
        onClose={() => setShowOnboarding(false)} 
      />

      {/* Floating Chat Component */}
      <AnimatePresence>
        {isChatOpen && (
          <Chat isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      {shouldShowSidebar && (
        <Sidebar 
          isOpen={isSidebarOpen} 
          isExpanded={isExpanded} 
          setIsExpanded={setIsExpanded} 
          closeSidebar={() => setIsSidebarOpen(false)} 
          onChatOpen={() => setIsChatOpen(true)} // Passing the function
        />
      )}

      <div className="relative flex flex-col min-h-screen">
        <Navbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

        <main className={`grow transition-all duration-300
          ${shouldShowSidebar 
            ? (isExpanded ? 'lg:ml-64' : 'lg:ml-20') 
            : 'ml-0'
          }`}>

          <Toaster position='bottom-right' />
          
          <div className="min-h-[calc(100vh-200px)]">
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <Routes location={location}>
                  <Route path='/' element={<Home />} />
                  <Route path='/register' element={<Register />} />
                  <Route path='/login' element={<Login />} />
                  <Route path='/about' element={<About />} />
                  <Route path='/dashboard' element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                  <Route path='/documents' element={<ProtectedRoute><Documents /></ProtectedRoute>} />
                  <Route path='/account' element={<ProtectedRoute><Account /></ProtectedRoute>} />
                </Routes>
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
        <Footer/>
      </div>
    </div>
  );
};

const App = () => (
  <UserContextProvider>
    <AppContent />
  </UserContextProvider>
);

export default App;