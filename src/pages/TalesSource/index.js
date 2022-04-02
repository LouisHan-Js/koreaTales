import React, { useState, useRef, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { AiOutlineEdit } from "react-icons/ai";

const TalesSource = ({ }) => {
    const [editFlag, setEditFlag] = useState(false);
    const [title, setTitle] = useState('임시 타이틀');
    const [define, setDefine] = useState('임시 정의');
    const [history, setHistory] = useState('임시 역사');
    const [contents, setContents] = useState('임시 줄거리');
    const [analyze, setAnalyze] = useState('임시 분석');
    const [character, setCharacter] = useState('임시 특징');
    const [source, setSource] = useState('임시 출처');

    useEffect(() => {
    }, [])
    
    return (
        <SourcesWrapper>
            <SourcesTitle>
                <div>
                    {editFlag ? <div><input value={title} onChange={e => setTitle(e.target.value)} /></div> : <div>{title}</div>}
                </div>
                <div><span onClick={e => setEditFlag(!editFlag)}><AiOutlineEdit /></span></div>
            </SourcesTitle>
            <SourcesContents>
                <div>정의</div>
                <div>
                    {editFlag ? <div><textarea value={define} onChange={e => setDefine(e.target.value)} /></div> : <pre>{define}</pre>}
                </div>
            </SourcesContents>
            <SourcesContents>
                <div>역사</div>
                <div>
                    {editFlag ? <div><textarea value={history} onChange={e => setHistory(e.target.value)} /></div> : <pre>{history}</pre>}
                </div>
            </SourcesContents>
            <SourcesContents>
                <div>줄거리</div>
                <div>
                    {editFlag ? <div><textarea value={contents} onChange={e => setContents(e.target.value)} /></div> : <pre>{contents}</pre>}
                </div>
            </SourcesContents>
            <SourcesContents>
                <div>분석</div>
                <div>
                    {editFlag ? <div><textarea value={analyze} onChange={e => setAnalyze(e.target.value)} /></div> : <pre>{analyze}</pre>}
                </div>
            </SourcesContents>
            <SourcesContents>
                <div>특징</div>
                <div>
                    {editFlag ? <div><textarea value={character} onChange={e => setCharacter(e.target.value)} /></div> : <pre>{character}</pre>}
                </div>
            </SourcesContents>
            <SourcesContents>
                <div>출처</div>
                <div>
                    {editFlag ? <div><textarea value={source} onChange={e => setSource(e.target.value)} /></div> : <pre>{source}</pre>}
                </div>
            </SourcesContents>
        </SourcesWrapper>
    )
};

export default TalesSource;


const SourcesWrapper = styled.div`
    padding: 50px 15%;
    height: 100%;
    overflow-y:scroll;
    
    input{
        height: 20px;
    }
`;

const SourcesTitle = styled.div`
    border-bottom: 2px solid black;
    >div:first-child{
        font-size: 30px;
        font-weight: bold;
    }
    >div:last-child{
        text-align: right;
        span{
            padding: 5px;
            font-size: 20px;
        }
    }
`;
const SourcesContents = styled.div`
    margin-bottom: 10px;
    >div:first-child{
        font-size: 24px;
        font-weight: bold;
        border-bottom: 1px solid black;
        padding: 20px;
    }
    >div:last-child{
        padding: 20px;
        font-size: 18px;
        // background-color: white;
        textarea{
            width: 100%;
            height: 100px;
        }
    }
`;