import React, { useState, useRef, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { TALESDATASOURCE, COLORS, DEFAULTMAP } from '../../../data';
import { AiOutlineCloseCircle } from "react-icons/ai";

const ImageModal = ({ open, close }) => {
    const [selectItem1, setSelectItem1] = useState(null);
    const [selectItem2, setSelectItem2] = useState(null);

    
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
        open && (
            <Mask>
                <ImageWrapper>
                    <div>
                        <ImageCanvas>
                            <ImageCanvasSelectItem>
                                <div>
                                    선택된 지도
                                </div>
                                <div>
                                    {!selectItem1 && !selectItem2 && '선택 없음'}
                                    {selectItem1 && <div onClick={e => selectCancel(1)}>{selectItem1[0].title} <AiOutlineCloseCircle /></div>}
                                    {selectItem2 && <div onClick={e => selectCancel(2)}>{selectItem2[0].title} <AiOutlineCloseCircle /></div>}
                                </div>
                            </ImageCanvasSelectItem>
                            <ImageCanvasContents>
                                {imageViewer()}
                            </ImageCanvasContents>
                        </ImageCanvas>
                        <SideMenu>
                            <TitleBar data={open} close={close} />
                            <TalesContents data={open} />
                            <ImageResult data={open} onCheck={onCheckItem} />
                        </SideMenu>
                    </div>
                </ImageWrapper>
            </Mask>
        )
    )
};

export default ImageModal;

const TitleBar = ({data, close}) => {
    return (
        <SideMenuWrap>
            <div>{data.title}</div>
            <div onClick={close}><AiOutlineCloseCircle /></div>
        </SideMenuWrap>
    )
}
const TalesContents = ({data}) => {
    return (
        <ContentsWrap>
            <div>
                <div>내용</div>
                <textarea disabled>{data.contents}</textarea>
            </div>
        </ContentsWrap>
    )
}
const ImageResult = ({data, onCheck}) => {
    return (
        <SearchResultWrap>
            <div>
                <div>이미지</div>
                <div>
                    {
                        data.data.length > 0 ? (
                            data.data.map((item, index) => {
                                return (
                                    <SearchResultInnerItem key={index} onClick={e => onCheck(item)}>
                                        {'- ' + item[0].title}
                                    </SearchResultInnerItem>
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
const Mask = styled.div`
    background-color: rgba(0,0,0,.5);
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
`;

const ImageWrapper = styled.div`
    width: calc(100% - 120px);
    height: 100%;
    padding: 60px;
    >div{
        width: 100%;
        height: calc(100% - 120px);
        background-color: white;
    }
`;

const ImageCanvas = styled.div`
    width: calc(100% - 400px);
    height: 100%;
    float:left;
`;
const ImageCanvasContents = styled.div`
    height: calc(100% - 60px - 50px);
`;
const ImageView = styled.div`
    height: 90%;
    min-width: 650px;
    // text-align: center;
    position: relative;
    >img{
        height: 100%;
        // height: calc(90% - 200px);
        position: absolute;
        left: 15%;
    }
`;
const ImageCanvasSelectItem = styled.div`
    height: 60px;
    >div{
        float:left;
        height:100%;
    }
    >div:first-child{
        width: 150px;
        line-height: 60px;
        font-size: 20px;
        font-weight: bold;
        text-align: center;
    }
    >div:last-child{
        width: calc(100% - 150px);
        font-size: 20px;
        line-height: 60px;
        >div{
            margin-top: 10px;
            margin-right: 10px;
            font-size:18px;
            line-height: 20px;
            float:left;
            background-color: ${COLORS.buttonColor || 'white'};
            padding: 10px 15px;
        }
    }
`;
const SideMenu = styled.div`
    width: 400px;
    height: 100%;
    float:left;
`;
const SideMenuWrap = styled.div`
    height: 60px;
    >div{
        float:left;
        width: calc(100% - 60px);
        line-height: 60px;
        font-size: 20px;
        overflow-y:scroll;
    }
    >div:last-child{
        width: 60px;
        font-size: 30px;
    }
`;
const ContentsWrap = styled.div`
    height: 400px;
    >div{
        height: 100%;
        >div{
            width: 30px;
        }
        textarea{
            width: 90%;
            height: calc(100% - 30px - 20px);
            resize: none;
            background-color: white;
            padding: 10px;
            font-size: 20px;
        }
    }
`;
const SearchResultWrap = styled.div`
    height: calc(100% - 60px - 50px - 400px - 50px);
    >div{
        height: 90%;
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