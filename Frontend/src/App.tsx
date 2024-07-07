import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import './index.css';

const App = () => {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
};

export default App;
