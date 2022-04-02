import React, {useState, useEffect} from 'react';
import MenuBar from '../MenuBar'
import Screen from '../Screen'
import styled from 'styled-components';
import { COLORS, MENUS } from '../../data';
import HomePage from '../../pages/HomePage';
import TalesMap from '../../pages/TalesMap';
import TalesImage from '../../pages/TalesImage';
import TalesSource from '../../pages/TalesSource';

const Layout = () =>  {
  const [page, setPage] = useState(null)

  useEffect(() => {
    setScreenKey(0)
  }, [])

  const setScreenKey = (key) => {
    let target = pages.find(item => item.key === key)
    if(target){
      setPage(target.page)
    }else{
      setPage(0)
    }
  }
  const pages = [
    {title: '메인', key: 0, page: <HomePage movePage={setScreenKey} /> },
    {title: '지역별 분포 ', key: 1, page: <TalesMap movePage={setScreenKey} /> },
    {title: '주제별 검색 ', key: 2, page: <TalesImage movePage={setScreenKey} /> },
    {title: '출전 ', key: 4, page: <TalesSource movePage={setScreenKey} /> },
  ]


  return (
    <div className='layout' style={{height: '100%'}}>
      <Header onClick={e => {setScreenKey(0)}} bgColor={COLORS.bgColor1}>한국 설화문학지도 시스템</Header>
      <MenuBar itemHeight={40} list={MENUS} onClickMenu={setScreenKey} />
      <Screen css={{ backgroundColor:COLORS.bgColor1, overflow:'scroll', height: 'calc(100% - 40px - 80px)'}} page={page} />
    </div>
  )
}

export default Layout;

const Header = styled.div`
  // background-image: url('/images/logo/horang.png');
  // background-position: center;
  // background-size: cover;
  // text-align: center;
  text-indent: 40px;
  background-size: 200px 100px;
  color: #5D4037;
  
  background-repeat: no-repeat;
  cursor:pointer;
  height: 80px;
  line-height: 80px;
  font-weight: bold;
  font-size: 28px;
  background-color: ${props => props.bgColor || 'white'}
`;