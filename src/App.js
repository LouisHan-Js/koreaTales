import './App.css';

import Layout from './components/Layout'
import HomePage from './pages/HomePage';
import TalesMap from './pages/TalesMap';
import TalesDetailMap from './pages/TalesDetailMap';

function App() {
  const pages = [
    {title: '홈', key: 0, page: <HomePage /> },
    {title: '지도1 ', key: 1, page: <TalesMap /> },
    {title: '지도2 ', key: 2, page: <TalesDetailMap /> },
  ]

  return (
    <Layout pages={pages} />
  );
}

export default App;
