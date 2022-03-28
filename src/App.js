import './App.css';

import Layout from './components/Layout'
import HomePage from './pages/HomePage';
import TalesMap from './pages/TalesMap';
import TalesImage from './pages/TalesImage';
import TalesImage2 from './pages/TalesImage2';

function App() {
  const pages = [
    {title: '메인', key: 0, page: <HomePage /> },
    {title: '지역별 분포 ', key: 1, page: <TalesMap /> },
    {title: '주제별 검색 ', key: 2, page: <TalesImage /> },
    {title: '주제별 검색2 ', key: 3, page: <TalesImage2 /> },
  ]

  return (
    <Layout pages={pages} />
  );
}

export default App;
