import React, { useState, useCallback, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { SEARCH_VALUES, COLORS,  } from '../../data';

const HomePage = ({ movePage }) => {

    return (
        <HomePageWrap>
            <div>
                <div>
                    <button onClick={e => movePage(1)}>지도 분포도</button>
                </div>
                <div>
                    <button onClick={e => movePage(2)}>권역 이미지</button>
                </div>
            </div>
        </HomePageWrap>
    )
};

export default HomePage;
const HomePageWrap = styled.div`
    width: 100%;
    height: 100%;
    >div{
        padding: 50px;
        button{
            margin-bottom: 20px;
            width: 200px;
            height: 50px;
            font-size: 20px;
        }
    }
`;
