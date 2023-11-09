import reactLogo from './react-logo.svg';
import './App.css';

function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <div className='logo-container'>
          <img src={reactLogo} alt='logo' width={300} />
          <img
            src='https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/pwa-icon.png'
            alt='react-logo'
            width={300}
          />
        </div>
        <h2>Welcome to React + PWA Application</h2>
      </header>
    </div>
  );
}

export default App;
