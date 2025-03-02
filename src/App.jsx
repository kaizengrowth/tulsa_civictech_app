import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Projects from './pages/projects';
import LetterWriter from './pages/projects/letter-writer/index.jsx';
import GetInvolved from './pages/projects/get-involved';
import Events from './pages/Events';
import Profile from './pages/Profile';
import LearningJourney from './pages/profile/learning-journey';
import theme from './styles/theme';

function App() {
  console.log('App is rendering');
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/letter-writer" element={<LetterWriter />} />
          <Route path="/projects/get-involved" element={<GetInvolved />} />
          <Route path="/events" element={<Events />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/learning-journey" element={<LearningJourney />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App; 