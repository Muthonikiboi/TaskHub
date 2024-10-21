import '../css/auth.css';
import slides from '../data/Slides';
import AuthSlider from '../components/AuthSlider';
// import Login from './pages/login';
// import SignUp from './pages/signup';
// import ForgotPassword from './pages/ForgotPassword';
// import ResetPassword from './pages/resetPassword';


function App() {
  return (
    <>
      <div className="SignUp">
        <div className="image">
          <AuthSlider slides={slides} />
        </div>
        <div className="form">
          {/* Form content */}
          {/* <Login /> */}
          {/* <SignUp /> */}
          {/* <ForgotPassword /> */}
          {/* <ResetPassword /> */}
        </div>
      </div>
    </>
  );
}

export default App;
