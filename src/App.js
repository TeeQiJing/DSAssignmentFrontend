import logo from './logo.svg';
import './App.css';
import Appbar from './components/Appbar';
import SignUpCheckBox from './components/SignUpCheckBox';

function App() {
  return (
    <div className="App">
      <Appbar></Appbar>
      <div className='SignUpCheckBox'><SignUpCheckBox></SignUpCheckBox></div>
    </div>
  );
}

export default App;
