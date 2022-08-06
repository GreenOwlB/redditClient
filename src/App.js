import { BrowserRouter, Routes, Route } from 'react-router-dom';


import Header from './modules/Header';
import Footer from './modules/Footer';
import Home from './pages/Home';
import Subreddit from './pages/Subreddit';
import Post from './pages/Post';

import './css/App.css';

function App() {
  return (
    <div className="App">
      <Header />
        <Routes>
          <Route path = "/" element={<Home />}/>
          <Route path = "/:subreddit" element={<Subreddit />}/>
          <Route path = "/:subreddit/:post" element={<Post />}/>
        </Routes>
      <Footer />
    </div>
  );
}

export default App;
