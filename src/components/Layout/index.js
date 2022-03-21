import React, {useState, useEffect} from 'react';
import MenuBar from '../MenuBar'
import Screen from '../Screen'

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
      <div style={{height: '100px'}}>상단 영역</div>
      <MenuBar itemHeight={50} list={pages} onClickMenu={setScreenKey} />
      <Screen css={{ height: 'calc(100% - 50px - 100px)'}} page={page} />
    </div>
  )
}

export default Layout;