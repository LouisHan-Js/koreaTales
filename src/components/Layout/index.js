import React, {useState, useEffect} from 'react';
import MenuBar from '../MenuBar'
import Screen from '../Screen'
import styled from 'styled-components';
import { COLORS } from '../../data';

const Layout = ({pages}) =>  {
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
  return (
    <div className='layout' style={{height: '100%'}}>
      <Header bgColor={COLORS.bgColor1}>제목 들어갈 위치</Header>
      <MenuBar itemHeight={50} list={pages} onClickMenu={setScreenKey} />
      <Screen css={{ backgroundColor:COLORS.bgColor1,  height: 'calc(100% - 50px - 100px)'}} page={page} />
    </div>
  )
}

export default Layout;

const Header = styled.div`
  height: 100px;
  line-height: 100px;
  text-align: center;
  font-weight: bold;
  font-size: 30px;
  background-color: ${props => props.bgColor || 'white'}
`;