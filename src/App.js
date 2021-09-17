import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

import "./assets/scss/customBootstrap.scss";
import "bootstrap-icons/font/bootstrap-icons.css";

import "./assets/scss/App.scss";

import { BrowserRouter as Router} from "react-router-dom";
import { LandingPage } from "./pages/LandingPage/LandingPage";

function App() {
  return (
    <Router>
      <LandingPage />
    </Router>
  );
}

export default App;
