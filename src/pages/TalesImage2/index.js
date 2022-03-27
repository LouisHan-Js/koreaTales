import React, { useState, useRef, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { TALESDATASOURCE, COLORS, DEFAULTMAP } from '../../data';
import ImageModal from './ImageModal';
import { AiOutlineCloseCircle } from "react-icons/ai";

const TalesImage2 = ({ }) => {
    const [result, setResult] = useState([]);
    const [modalData, setModalData] = useState(null);

    useEffect(() => {
        setResult(TALESDATASOURCE)
    }, [])
    
    const onSearchResult = (e) => {
        if(e.target?.value){
            setResult(TALESDATASOURCE.filter(item => item.title.includes(e.target.value)))
        }else{
            setResult(TALESDATASOURCE)
        }
    }
    const closeModal = () => {
        setModalData(null)
    }

    return (
        <ImageWrapper>
            <SearchMenu>
                <SearchBar onSearch={onSearchResult} />
                <SearchResult data={result} onSelectItem={setModalData}/>
            </SearchMenu>
            <ImageModal open={modalData} close={closeModal} />
        </ImageWrapper>
    )
};

export default TalesImage2;

const SearchBar = ({onSearch}) => {
    return (
        <SideMenuWrap>
            <div>
                <div>이야기 검색</div>
                <div><input type={'text'} list={'talesList'} onChange={onSearch} /></div>
            </div>
        </SideMenuWrap>
    )
}
const SearchResult = ({data, onSelectItem}) => {
    return (
        <SearchResultWrap>
            <div>
                <div>검색 결과</div>
                <div>
                    {
                        (data.length > 0) ? (
                            data.map((item, index) => {
                                return (
                                    <SearchResultItem key={index}  onClick={e => onSelectItem(item)}>
                                        <div>{item.title}</div>
                                        <div>
                                            <div>내용: {item.contents}</div>
                                            <div>관련 이미지: {item.data.length}장</div>
                                        </div>
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
    width: 800px;
    height: 100%;
    margin: 0 auto;
`;

const SearchMenu = styled.div`
    width: 100%;
    height: 100%;
    float:left;
`;
const SideMenuWrap = styled.div`
    padding: 10px 10px 0px;
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
        // height: 100%;
        background-color: white;
        border-radius: 5px;
        border: 1px solid ${COLORS.borderColor || 'black'};
        padding: 10px;
        >div:first-child{
            height: 30px;
        }
        >div:last-child{
            // height: calc(100% - 30px);
            max-height: calc(100% - 30px);
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
        font-size: 20px;
        line-height: 30px;
        font-weight: bold;
    }
    >div:last-child{
        height: 30px;
        line-height: 30px;
        >div{
            float:left;
        }
        >div:first-child{
            width: 60%;
        }
        >div:last-child{
            width: 40%;
        }
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