import "./App.css";
import { Dashboard, LoginPage, RegisterPage } from "./pages";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { PATH } from "./consts";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={PATH.INTERFACE} element={<Navigate to={PATH.LOGIN} />} />
          <Route path={PATH.LOGIN} element={<LoginPage />} />
          <Route path={PATH.REGISTER} element={<RegisterPage />} />
          <Route path={PATH.DASHBOARD} element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
}

export default App;
