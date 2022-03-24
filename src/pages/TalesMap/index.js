import React, { useState, useRef, useEffect, useContext } from 'react';
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import styled from 'styled-components';
// AIzaSyBzmQC_yVrMSnh85NQN36RlzH1Kb6UuZW4
const TalesMap = ({ }) => {
    // const ref = useRef(null);
    // const [map, setMap] = useState();

    // useEffect(() => {
    //     if (ref.current && !map) {
    //         setMap(new window.google.maps.Map(ref.current, {}));
    //     }
    // }, [ref, map]);
    const render = (status) => {
        if (status === Status.LOADING) return <h3>{status} ..</h3>;
        if (status === Status.FAILURE) return <h3>{status} ...</h3>;
        return null;
    };
    const MyMapComponent = ({ center, zoom,}) => {
        const ref = useRef();
        const [map, setMap] = useState(null);
        // let historicalOverlay;

        useEffect(() => {
          let googleMap = new window.google.maps.Map(ref.current, {
            center,
            zoom,
          });
          setMap(googleMap)
        }, []);
        
        // useEffect(() => {
        //     if(map){
        //         const imageBounds = {
        //             north: 38.649147,
        //             south: 34.035352,
        //             west: 125.6818031,
        //             east: 129.946012
        //         };
                
        //         historicalOverlay = new window.google.maps.GroundOverlay(
        //         "images/testMap.png",
        //         imageBounds
        //         );
        //         historicalOverlay.setMap(map);
        //     }
        // }, [map])

        return <GoogleMap ref={ref} id="map" />;
    }

    const center = { lat: 35.7354629, lng: 127.6818031 };
    const zoom = 7;
    return (
        <GoogleMapWrapper>
            <Wrapper apiKey={"AIzaSyBzmQC_yVrMSnh85NQN36RlzH1Kb6UuZW4"} render={render}>
                <MyMapComponent center={center} zoom={zoom} />
                <SideMenu>
                    <SearchBar />
                    <SelectMenu />
                    <SelectMenu />
                </SideMenu>
            </Wrapper>
        </GoogleMapWrapper>
    )
};

export default TalesMap;

const SearchBar = () => {
    return (
        <SideMenuWrap>
            <div>
                <div>검색</div>
                <div><input /></div>
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
const SideMenuWrap = styled.div`
    padding: 10px;
    >div{
        border-radius: 5px;
        border: 1px solid black;
        padding: 10px;
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