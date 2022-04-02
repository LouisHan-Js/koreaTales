import React, { useState, useRef, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { TALESDATASOURCE, COLORS, DEFAULTMAP, SAWE_DEFAULT } from '../../data';
import { AiOutlineCloseCircle } from "react-icons/ai";

const TalesImage = ({ }) => {
    const imageSize = [200,400, 600,800,1200];
    const [imgSizeIndex, setImgSizeIndex] = useState(2);
    const [imgWidth, setImgWidth] = useState(600);
    const [searchFlag, setSearchFlag] = useState(false);
    const [result, setResult] = useState([]);
    const [selectItem1, setSelectItem1] = useState(null);
    const [selectItem2, setSelectItem2] = useState(null);
    const [selectItem3, setSelectItem3] = useState(null);
    const [indexPopup, setIndexPopup] = useState(false);

    useEffect(() => {
    }, [])
    const onSearch = () => {
        setSearchFlag(true)
        setResult(TALESDATASOURCE)
    }
    const clearOptions = () => {
        setSearchFlag(false)
        setResult([])
    }
    
    const onCheckItem = (data) => {
        if(data === selectItem1){
            setSelectItem1(null);
            return;
        }
        if(data === selectItem2){
            setSelectItem2(null);
            return;
        }
        if(data === selectItem3){
            setSelectItem3(null);
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
        if(!selectItem3){
            setSelectItem3(data);
            return;
        }
    }

    const changeImgSizeUp = (type) => {
        let temp = 0;
        if(type){
            if(imgSizeIndex < imageSize.length){
                temp = imgSizeIndex + 1
                setImgSizeIndex(temp)
                setImgWidth(imageSize[temp])
            }
        }else{
            if(imgSizeIndex > 0){
                temp = imgSizeIndex - 1
                setImgSizeIndex(temp)
                setImgWidth(imageSize[temp])
            }
        }

    }

    const selectCancel = (index) => {
        switch (index) {
            case 1:
                setSelectItem1(null);
                break;
            case 2:
                setSelectItem2(null);
                break;
            case 3:
                setSelectItem3(null);
                break;
            default:
                break;
        }
    }
    const toggleIndex = () => {
        setIndexPopup(!indexPopup)
    }

    const imageViewer = () => {
        return (
            <ImageView imgWidth={imgWidth}>
                <img alt='default' src={SAWE_DEFAULT[0].src} />
                {selectItem1 && <img alt={selectItem1[0].title} src={selectItem1[0].src}/>}
                {selectItem2 && <img alt={selectItem2[1].title} src={selectItem2[1].src}/>}
                {selectItem3 && <img alt={selectItem3[2].title} src={selectItem3[2].src}/>}
            </ImageView>
        )
    }


    return (
        <ImageWrapper>
            <SideMenu height={'100px'}>
                <SearchItem>
                    <div>
                        <div className="searchItemTitle">유형 검색</div>
                        <label>상위유형
                            <select>
                                <option>전체</option>
                            </select>
                        </label>
                        <label>하위유형
                            <select>
                                <option>전체</option>
                            </select>
                        </label>
                        <label>서사명
                            <select>
                                <option>전체</option>
                            </select>
                        </label>
                    </div>
                </SearchItem>
                <SearchItem>
                    <div>
                        <div className="searchItemTitle">공간 검색</div>
                        <label>전승현황
                            <select>
                                <option>전체</option>
                            </select>
                        </label>
                        <label>전승유형
                            <select>
                                <option>전체</option>
                            </select>
                        </label>
                        <label>모티프결합
                            <select>
                                <option>전체</option>
                            </select>
                        </label>
                    </div>
                </SearchItem>
                <SearchItem>
                    <div>
                        <button onClick={onSearch}>검색</button>
                        <button onClick={clearOptions}>초기화</button>
                    </div>
                </SearchItem>

                {
                    searchFlag && (
                        <SearchItem>
                            <div>
                                <div className="searchItemTitle">검색 결과</div>
                                <SearchResult>
                                    {
                                        result.length > 0 ? (
                                            result.map((item, index)=>{
                                                return <div key={index}>
                                                    <div>{(index+1)+'.'} {item.title}</div>
                                                    {
                                                        item.data.map((itm, idx) => {
                                                            return <div key={idx} onClick={e => onCheckItem(itm)}> - {itm[0].title}</div>
                                                        })
                                                    }
                                                </div>
                                            })
                                        ) : (
                                            <EmptyResult>검색 결과가 없습니다.</EmptyResult>
                                        )
                                    }
                                </SearchResult>
                            </div>
                        </SearchItem>
                    )
                }
            </SideMenu>

            <FloatingButton>
                <div onClick={e => changeImgSizeUp(true)}>확대</div>
                <div onClick={e => changeImgSizeUp(false)}>축소</div>
                <div onClick={toggleIndex}>
                    인덱스{indexPopup && <div><img alt='img' src='images/talesImages/line/sawe_map_black.png' /></div>}
                </div>
            </FloatingButton>
            <ImageCanvas>
                <div>
                    <ImageCanvasSelectItem>
                        {selectItem1 && <div onClick={e => selectCancel(1)}>{selectItem1[0].title} <AiOutlineCloseCircle /></div>}
                        {selectItem2 && <div onClick={e => selectCancel(2)}>{selectItem2[0].title} <AiOutlineCloseCircle /></div>}
                        {selectItem3 && <div onClick={e => selectCancel(3)}>{selectItem3[0].title} <AiOutlineCloseCircle /></div>}
                    </ImageCanvasSelectItem>
                    <ImageCanvasContents>
                        {imageViewer()}
                    </ImageCanvasContents>
                </div>
            </ImageCanvas>
        </ImageWrapper>
    )
};

export default TalesImage;


const ImageWrapper = styled.div`
    width: 100%;
    height: 100%;
    >div{
        float:left;
    }
`;

const ImageCanvas = styled.div`
    width: calc(100% - 300px - 20px);
    height: calc(100% - 20px);
    padding: 10px;
    >div{
        background-color: white;
        height: 100%;

    }
`;
const ImageCanvasContents = styled.div`
    height: calc(100% - 60px);
    padding: 0px 30px;
`;
const ImageView = styled.div`
    height: 90%;
    min-width: 650px;
    // text-align: center;
    position: relative;
    padding-left: 20%;
    >img{
        // height: 100%;
        width: ${props => props.imgWidth}px;
        // height: calc(90% - 200px);
        position: absolute;
        // left: 10%;
        // margin: 0 auto;

        display:inline-block;
        margin-left:auto;
        margin-right:auto;
    }
`;
const ImageCanvasSelectItem = styled.div`
    height: 60px;
    margin-left: 30px;
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
    overflow-y:scroll;
`;
const SearchItem = styled.div`
    padding: 10px 10px 0px;
    >div{
        padding: 12px;
        background-color: white;
        border-radius: 5px;
        border: 1px solid ${COLORS.borderColor || 'black'};
        .searchItemTitle{
            line-height: 45px;
            font-weight: bold;
            font-size: 19px;
        }
        >label{
            height: 35px;
            display: block;
            width: 100%;
            input,
            select{
                width: 60%;
                float:right;
                height: 25px;
            }
        }
        >button{
            width: 50%;
            height: 40px;
            font-size: 18px;
            background-color: #8D6E63;
            border: 1px solid ${COLORS.borderColor || 'black'};
            color: white;
            font-weight: bold;
        }
    }
`;

const EmptyList = styled.div`
    height: 40px;
    line-height: 40px;
    font-weight: bold;
`;
const SearchResult = styled.div`
    height: 300px;
    overflow-y: scroll;
    >div{
        width: 100%;
        display: inline-block;
        cursor: pointer;
        // height: 40px;
        line-height: 40px;
        text-indent: 15px;
        margin-bottom: 10px;
    }
`;
const EmptyResult = styled.div`
    height: 40px;
    font-size: 22px;
    text-align: center;
    font-weight: bold;
`;

const FloatingButton = styled.div`
    position: absolute;
    left: 320px;
    top: 140px;
    z-index: 99;
    >div{
        font-size: 16px;
        line-height: 50px;
        background-color: white;
        width: 50px;
        height: 50px;
        text-align: center;
        border: 1px solid #B0BEC5;
        >div{
            width: 140px;
            height: 180px;
            margin-top: -50px;
            margin-left: 55px;
            background-color: white;
            border: 1px solid #B0BEC5;
            padding-top: 5px;
            img{
                width: 100%;
            }
        }
    }
`;