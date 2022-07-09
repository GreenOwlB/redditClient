import Header from './components/Header';
import Footer from './components/Footer';
import Main from './components/Main';
import Side from './components/Side';

import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <div className='mainContainer'>
        <Main />
        <Side />
      </div>
      <Footer />

    </div>
  );
}

export default App;
