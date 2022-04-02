import React, { useState, useRef, useEffect, useContext } from 'react';
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import styled from 'styled-components';
import { TALESLOCATIONS, TALESLOCATIONS2, COLORS, EXAMPLESTORY } from '../../data';
import { AiOutlinePlus, AiOutlineMinus, AiOutlineBook } from "react-icons/ai";

const TalesMap = ({ movePage }) => {
    const [result, setResult] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const center = { lat: 35.7354629, lng: 127.6818031 };
    const zoom = 7;

    useEffect(() => {
        setResult(TALESLOCATIONS2)
    }, [])


    const render = (status) => {
        if (status === Status.LOADING) return <h3>{status} ..</h3>;
        if (status === Status.FAILURE) return <h3>{status} ...</h3>;
        return null;
    };
    const MyMapComponent = ({ center, zoom }) => {
        const [map, setMap] = useState(null);
        const [indexPopup, setIndexPopup] = useState(false);
        const [markers, setMarkers] = useState([]);
        const ref = useRef();
        // let historicalOverlay;

        useEffect(() => {
            if(map){
                makeMarkers(result)
            }else{
                let googleMap = new window.google.maps.Map(ref.current, {
                    center,
                    zoom,
                    disableDefaultUI: true,
                });
                setMap(googleMap)
            }
        }, [map])

        const clearMarkers = () => {
            markers.forEach(item => {
                item.setMap(null)
            });
        }
        const closeUp = () => {
            map.setZoom(map.getZoom()+1)
        }
        const closeDown = () => {
            map.setZoom(map.getZoom()-1)
            
        }
        const toggleIndex = () => {
            setIndexPopup(!indexPopup)
        }

        const makeMarkers = (dataList) => {
            // 예제 이야기
            let story = EXAMPLESTORY[0]

            const image = {
                url: "/images/map/point.png",
                size: new window.google.maps.Size(32, 32),
                origin: new window.google.maps.Point(0, 0),
                anchor: new window.google.maps.Point(12, 12),
            };
            let tempMarkers = []
            clearMarkers()

            if(dataList.length > 0){
                dataList.forEach(item => {
                    const marker = new window.google.maps.Marker({
                        position: item.position,
                        map: map,
                        icon: image
                    });
                    const infowindow = new window.google.maps.InfoWindow({
                        content: `
                            <div class='customInfo'>
                                <div class='title'>설화 명:<span>${story.title}</span></div>
                                <div class='title'>채록 장소:<span>${story.getLocation}</span></div>
                                <div class='info'>
                                    <div>구연자:<span>${story.name}</span></div>
                                    <div>나이:<span>${story.gender}</span></div>
                                    <div>성별:<span>${story.age}</span></div>
                                </div>
                                <div class='title'>채록 시기:<span>${story.date}</span></div>
                                <div class='title'>상세 내용</div>
                                <div class='contents'>
                                    <pre>${story.contents}</pre>
                                </div>
                                <div>출처:<span>${story.source}</span></div>
                            </div>
                        `,
                    });
                    marker.index = item.index
                    
                    marker.addListener("click", () => {
                        infowindow.open({
                          anchor: marker,
                          map,
                          shouldFocus: false,
                        });
                    });

                    tempMarkers.push(marker)
                });
                setMarkers(tempMarkers)
            }
        }

        return (
            <>
                <FloatingButton>
                    <div onClick={closeUp}>확대</div>
                    <div onClick={closeDown}>축소</div>
                    <div onClick={toggleIndex}>
                        인덱스{indexPopup && <div><img alt='img' src='images/talesImages/line/sawe_map_black.png' /></div>}
                    </div>
                </FloatingButton>
                <GoogleMap ref={ref} id="map" />
            </>
        );
    }

    const onSearch = (e) => {
        setSearchValue(e.target.value)
    }

    return (
        <GoogleMapWrapper>
            <Wrapper apiKey={"AIzaSyBzmQC_yVrMSnh85NQN36RlzH1Kb6UuZW4"} render={render}>
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
                            <button>검색</button>
                            <button onClick={e => movePage(2)}>권역 지도</button>
                        </div>
                    </SearchItem>
                </SideMenu>
                <MyMapComponent center={center} zoom={zoom} />
            </Wrapper>
        </GoogleMapWrapper>
    )
};

export default TalesMap;

const GoogleMapWrapper = styled.div`
    width: 100%;
    height: 100%;
`;

const GoogleMap = styled.div`
    width: calc(100% - 300px);
    height: 100%;
    float:left;
`;
const SideMenu = styled.div`
    width: 300px;
    height: 100%;
    float:left;
`;
const SearchItem = styled.div`
    padding: 10px 10px 0px;
    >div{
        cursor: pointer;
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
