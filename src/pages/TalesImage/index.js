import React, { useState, useRef, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { TALESDATASOURCE, COLORS, DEFAULTMAP } from '../../data';
import { AiOutlineCloseCircle } from "react-icons/ai";

const TalesImage = ({ }) => {
    const [result, setResult] = useState([]);
    const [selectItem1, setSelectItem1] = useState(null);
    const [selectItem2, setSelectItem2] = useState(null);

    useEffect(() => {
        setResult(TALESDATASOURCE)
    }, [])
    
    const onCheckItem = (data) => {
        if(data === selectItem1){
            setSelectItem1(null);
            return;
        }
        if(data === selectItem2){
            setSelectItem2(null);
            return;
        }
        if(!selectItem1){
            setSelectItem1(data);
            return;
        }
        if(!selectItem2){
            setSelectItem2(data);
            return;
        }
    }

    const selectCancel = (index) => {
        if(index === 1){
            setSelectItem1(null);
        }else{
            setSelectItem2(null);
        }
    }

    const onSelectInputItem = (data) => {
        let target = TALESDATASOURCE.filter(item => item.title.includes(data.target.value))
        if(target){
            setResult(target)
        }
    }
    const imageViewer = () => {
        if(selectItem1 && selectItem2){
            return (
                <ImageView>
                    <img alt={selectItem1[0].title} src={selectItem1[0].src}/>
                    <img alt={selectItem2[1].title} src={selectItem2[1].src}/>
                </ImageView>
            )
        }else if(selectItem1){
            return (
                <ImageView>
                    <img alt={selectItem1[0].title} src={selectItem1[0].src}/>
                </ImageView>
            )
        }else if(selectItem2){
            return (
                <ImageView>
                    <img alt={selectItem2[0].title} src={selectItem2[0].src}/>
                </ImageView>
            )
        }else{
            return (
                <ImageView>
                    <img alt={DEFAULTMAP[0].title} src={DEFAULTMAP[0].src}/>
                </ImageView>
            )
        }
    }


    return (
        <ImageWrapper>
            <ImageCanvas>
                <ImageCanvasSelectItem>
                    {selectItem1 && <div onClick={e => selectCancel(1)}>{selectItem1[0].title} <AiOutlineCloseCircle /></div>}
                    {selectItem2 && <div onClick={e => selectCancel(2)}>{selectItem2[0].title} <AiOutlineCloseCircle /></div>}
                </ImageCanvasSelectItem>
                <ImageCanvasContents>
                    {imageViewer()}
                </ImageCanvasContents>
            </ImageCanvas>
            <SideMenu>
                <SearchBar onSelect={onSelectInputItem} />
                <SearchResult data={result} onCheck={onCheckItem} />
            </SideMenu>
        </ImageWrapper>
    )
};

export default TalesImage;

const SearchBar = ({onSelect}) => {
    return (
        <SideMenuWrap>
            <div>
                <div>이야기 검색</div>
                <div><input type={'text'} list={'talesList'} onChange={onSelect}/></div>
            </div>
        </SideMenuWrap>
    )
}
const SearchResult = ({data, onCheck}) => {
    return (
        <SearchResultWrap>
            <div>
                <div>검색 결과</div>
                <div>
                    {
                        (data.length > 0) ? (
                            data.map((item, index) => {
                                return (
                                    <SearchResultItem key={index}>
                                        <div>{item.title}</div>
                                            {
                                                item.data.map((innerItem, innerIndex) => {
                                                    return (
                                                        <SearchResultInnerItem key={innerIndex} onClick={e => onCheck(innerItem)}>
                                                            {'- ' + innerItem[0].title}
                                                        </SearchResultInnerItem>
                                                    )
                                                })
                                            }
                                    </SearchResultItem>
                                )
                            })
                        ) : (
                            <EmptyList>검색 결과가 없습니다.</EmptyList>
                        )
                    }
                </div>
            </div>
        </SearchResultWrap>
    )
}


const ImageWrapper = styled.div`
    width: 100%;
    height: 100%;
`;

const ImageCanvas = styled.div`
    width: calc(100% - 300px);
    height: 100%;
    float:left;
`;
const ImageCanvasContents = styled.div`
    height: calc(100% - 60px);
    padding: 0px 50px;
`;
const ImageView = styled.div`
    height: 90%;
    min-width: 650px;
    // text-align: center;
    background-color: white;
    position: relative;
    >img{
        height: 100%;
        // height: calc(90% - 200px);
        position: absolute;
        left: 10%;
    }
`;
const ImageCanvasSelectItem = styled.div`
    height: 60px;
    >div:first-child{
        margin-left: 50px;
    }
    >div{
        margin-top: 10px;
        margin-left: 10px;
        float:left;
        border: 1px solid ${COLORS.borderColor || 'black'};
        border-radius: 10px;
        background-color: ${COLORS.buttonColor || 'white'};
        padding: 10px 15px;
    }
`;
const SideMenu = styled.div`
    width: 300px;
    height: 100%;
    float:left;
`;
const SideMenuWrap = styled.div`
    padding: 10px 10px 0px;
    // height: 90px;
    >div{
        background-color: white;
        border-radius: 5px;
        border: 1px solid ${COLORS.borderColor || 'black'};
        padding: 10px;
        >div:first-child{
            height: 30px;
        }
        input{
            text-indent: 10px;
        }
        input,
        select{
            padding: 0px;
            margin: 0px;
            height: 30px;
            width: 100%;
        }
        select{
            width: 100%;
        }
    }
`;
const SearchResultWrap = styled.div`
    padding: 10px 10px 0px;
    height: calc(100% - 150px);
    // height: calc(100% - 90px - 90px - 60px);
    >div{
        height: 100%;
        background-color: white;
        border-radius: 5px;
        border: 1px solid ${COLORS.borderColor || 'black'};
        padding: 10px;
        >div:first-child{
            height: 30px;
        }
        >div:last-child{
            height: calc(100% - 30px);
            overflow-y: scroll;
        }
    }
`;
const SearchResultItem = styled.div`
    border: 1px solid ${COLORS.borderColor || 'black'};
    padding: 5px;
    border-radius: 5px;
    margin-bottom: 10px;
    cursor: pointer;
    >div:first-child{
        height: 30px;
        line-height: 30px;
        font-weight: bold;
    }
`;

const SearchResultInnerItem = styled.div`
    padding-left: 5px;
    height: 40px;
    line-height: 40px;
`;
const EmptyList = styled.div`
    height: 40px;
    line-height: 40px;
    font-weight: bold;
`;