import React, { useState, useCallback, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { SEARCH_VALUES, COLORS,  } from '../../data';

const HomePage = ({ }) => {
    const [searchValue, setSearchValue] = useState('')
    const setItemValue = (data) => {
        setSearchValue(data.value)
    }

    return (
        <HomePageWrap>
            <HomeContents>
                <SearchBar>
                    <div>
                        <select>
                            <option value={'title'}>주제</option>
                            <option value={'location'}>지역</option>
                        </select>
                        <input value={searchValue} onChange={e => setSearchValue(e.target.value)} placeholder='검색어를 입력해주세요.' />
                        <div className='button'>검색</div>
                    </div>
                    <div>
                        {
                            SEARCH_VALUES.map((item, index) => {
                                return <span key={index} onClick={e => setItemValue(item)}>{item.value}</span>
                            })
                        }
                    </div>
                </SearchBar>
            </HomeContents>
            <HomeFooter>
                <div>페이지 테스트 중 입니다.</div>
                <div>수정 사항 발견시 바로 연락 부탁드립니다.</div>
                <div></div>
            </HomeFooter>
        </HomePageWrap>
    )
};

export default HomePage;
const HomePageWrap = styled.div`
    width: 100%;
    height: 100%;
    >div{
        float: left;
    }
    overflow: scroll;
`;

const HomeContents = styled.div`
    padding-top: 20px;
    width: 100%;
    height: calc(100% - 100px - 20px);
`;
const HomeSide = styled.div`
    width: 300px;
    height: calc(100% - 100px);
`;
const HomeFooter = styled.div`
    padding: 20px 0px 0px;
    width: 100%;
    height: 60px;
    text-align: center;
`;
const HomeSideItem = styled.div`
    padding: 50px 50px 30px 10px;
    >div{
        border-radius: 10px;
        border: 1px solid black;
        >div{
            padding: 10px;
        }
        >div:first-child{
        }
        >div:last-child{
        }
    }
`;
const SearchBar = styled.div`
    padding: 20px 20px 10px;
    margin: 0 auto;
    width: 50%;
    min-width: 500px;
    background-color: white;
    border-radius: 10px;
    border: 1px solid ${COLORS.borderColor};
    >div{
        height: 50px;
    }
    select{
        float:left;
        height: 35px;
        width: 80px;
        font-size: 20px;
    }
    div.button{
        float: left;
        height: 30px;
        width: 60px;
        line-height: 30px;
        text-align: center;
        border: 1px solid black;
        padding: 2px;
        background-color: rgba(100,100,100,.2);
        cursor: pointer;
    }
    input{
        width: 60%;
        min-width: 200px;
        height: 30px;
        font-size: 20px;
        float:left;
        text-indent: 5px;
    }
    span{
        margin-top: 10px;
        margin-right: 10px;
        padding: 5px 15px;
        border-radius: 10px;
        background-color: rgba(100,100,100,.2);
        cursor: pointer;
    }
`;

const SearchResult = styled.div`
    padding: 50px;
`;

