import './App.css';
import slides from './data/Slides';
import AuthSlider from './components/AuthSlider';
import Login from './pages/login';

function App() {
  return (
    <>
      <div className="SignUp">
        <div className="image">
          <AuthSlider slides={slides} />
        </div>
        <div className="form">
          {/* Form content */}
          <Login />
        </div>
      </div>
    </>
  );
}

export default App;
