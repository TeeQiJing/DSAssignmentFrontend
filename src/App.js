import logo from './logo.svg';
import './App.css';
import Appbar from './components/Appbar';
import SignUpCheckBox from './components/SignUpCheckBox';
import RegisterPage from './components/RegisterPage';

function App() {
  return (
    <div className="App">
      <Appbar/>
      <RegisterPage/>
      <div className='SignUpCheckBox'><SignUpCheckBox></SignUpCheckBox></div>
    </div>
  );
}

export default App;
