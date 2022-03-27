import React, { useState, useRef, useEffect, useContext } from 'react';
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import styled from 'styled-components';
import { TALESLOCATIONS, COLORS } from '../../data';
// AIzaSyBzmQC_yVrMSnh85NQN36RlzH1Kb6UuZW4
const TalesMap = ({ }) => {
    const [result, setResult] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const center = { lat: 35.7354629, lng: 127.6818031 };
    const zoom = 7;

    useEffect(() => {
        setResult(TALESLOCATIONS)
    }, [])


    const render = (status) => {
        if (status === Status.LOADING) return <h3>{status} ..</h3>;
        if (status === Status.FAILURE) return <h3>{status} ...</h3>;
        return null;
    };
    const MyMapComponent = ({ center, zoom }) => {
        const [map, setMap] = useState(null);
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
                });
                setMap(googleMap)
            }
        }, [map])

        const clearMarkers = () => {
            markers.forEach(item => {
                item.setMap(null)
            });
        }

        const makeMarkers = (dataList) => {
            let tempMarkers = []
            clearMarkers()

            if(dataList.length > 0){
                dataList.forEach(item => {
                    const marker = new window.google.maps.Marker({
                        position: item.position,
                        map: map,
                    });
                    marker.index = item.index

                    tempMarkers.push(marker)
                });
                setMarkers(tempMarkers)
            }
        }

        return <GoogleMap ref={ref} id="map" />;
    }

    const onSearch = (e) => {
        setSearchValue(e.target.value)
        if(e.target.value){
            setResult(TALESLOCATIONS.filter(item => item.name.includes(e.target.value) || item.address.includes(e.target.value)))
        }else{
            setResult(TALESLOCATIONS)
        }
    }

    return (
        <GoogleMapWrapper>
            <Wrapper apiKey={"AIzaSyBzmQC_yVrMSnh85NQN36RlzH1Kb6UuZW4"} render={render}>
                <MyMapComponent center={center} zoom={zoom} />
                <SideMenu height={'100px'}>
                    <SearchBar onSearch={onSearch} />
                    {/* <SelectMenu />
                    <SelectMenu /> */}
                </SideMenu>
                <SideMenu height={'calc(100% - 100px)'}>
                    <SearchResult list={result} />
                </SideMenu>
            </Wrapper>
        </GoogleMapWrapper>
    )
};

export default TalesMap;

const SearchBar = ({onSearch}) => {
    return (
        <SideMenuWrap>
            <div>
                <div>주소 검색</div>
                <div><input onChange={onSearch} /></div>
            </div>
        </SideMenuWrap>
    )
}
const SelectMenu = () => {
    return (
        <SideMenuWrap>
            <div>
                <div>선택</div>
                <div>
                    <select>
                        <option>test</option>
                    </select>
                </div>
            </div>
        </SideMenuWrap>
    )
}
const SearchResult = ({list}) => {
    return (
        <SearchResultWrap>
            <div>
                <div>검색 결과</div>
                <div>
                    {
                        list.map((item, index) => {
                            return (
                                <SearchResultItem key={index}>
                                    <div><strong>{item.title}({item.name})</strong></div>
                                    <div>{item.contents}</div>
                                    <div>{item.address}</div>
                                </SearchResultItem>
                            )
                        })
                    }
                </div>
            </div>
        </SearchResultWrap>
    )
}


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
    height: ${props => props.height};
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
    height: 90%;
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
    >div{
        overflow:hidden;
    }
`;