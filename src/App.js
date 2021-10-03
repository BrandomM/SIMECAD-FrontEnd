import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

import "./assets/scss/customBootstrap.scss";
import "bootstrap-icons/font/bootstrap-icons.css";

import "./assets/scss/App.scss";

import { BrowserRouter as Router } from "react-router-dom";
import { LandingPage } from "./pages/LandingPage/LandingPage";
import { ToastProvider } from "./context/ToastContext";
import { ToastContainer } from "./components/Toast/ToastContainer/ToastContainer";
import { UserProvider } from "./context/UserContext";
import { ShoppingCartProvider } from "./context/ShoppingCartContext";

function App() {
  return (
    <UserProvider>
      <ShoppingCartProvider>
        <Router>
          <ToastProvider>
            <LandingPage />
            <ToastContainer />
          </ToastProvider>
        </Router>
      </ShoppingCartProvider>
    </UserProvider>
  );
}

export default App;
