import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import HomePage from '@/components/pages/HomePage';
import NotFoundPage from '@/components/pages/NotFoundPage';
import { routes, routeArray } from './config/routes';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Routes>
<Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          className="z-[9999]"
          toastClassName="bg-white text-gray-800 rounded-lg shadow-lg"
          progressClassName="bg-gradient-to-r from-primary to-secondary"
        />
      </div>
    </BrowserRouter>
  );
}

export default App;