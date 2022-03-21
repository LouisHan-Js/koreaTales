import React, { useState, useCallback, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { SEARCH_VALUES, NOTICE } from '../../data';

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
                <SearchResult>

                </SearchResult>
            </HomeContents>
            <HomeSide>
                <HomeSideItem>
                    <div>
                        <div>공지사항</div>
                        <div>
                            {
                                NOTICE.map((item, index) => {
                                    <div key={index}>{item.index} {item.title}</div>
                                })
                            }
                        </div>
                    </div>
                </HomeSideItem>
            </HomeSide>
        </HomePageWrap>
    )
};

export default HomePage;
const HomePageWrap = styled.div`
    width: 100%;
    height: 100%;
    >div{
        float: left;
        height: 100%;
    }
    overflow: scroll;
`;

const HomeContents = styled.div`
    width: calc(100% - 300px);
    min-width: 600px;
`;
const HomeSide = styled.div`
    width: 300px;
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
    padding: 50px;
    >div{
        height: 50px;
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
        margin-right: 10px;
        padding: 3px 15px;
        border-radius: 10px;
        background-color: rgba(100,100,100,.2);
        cursor: pointer;
    }
`;

const SearchResult = styled.div`
    padding: 50px;
`;

