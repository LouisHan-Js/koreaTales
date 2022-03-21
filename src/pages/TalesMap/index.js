import React, { useState, useRef, useEffect, useContext } from 'react';
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import styled from 'styled-components';
// AIzaSyBzmQC_yVrMSnh85NQN36RlzH1Kb6UuZW4
const TalesMap = ({ }) => {
    const ref = useRef(null);
    const [map, setMap] = useState();

    useEffect(() => {
        if (ref.current && !map) {
            setMap(new window.google.maps.Map(ref.current, {}));
        }
    }, [ref, map]);
    const render = (status) => {
        if (status === Status.LOADING) return <h3>{status} ..</h3>;
        if (status === Status.FAILURE) return <h3>{status} ...</h3>;
        return null;
    };
    const MyMapComponent = ({ center, zoom,}) => {
        const ref = useRef();
      
        useEffect(() => {
          new window.google.maps.Map(ref.current, {
            center,
            zoom,
          });
        });
      
        return <GoogleMap ref={ref} id="map" />;
    }

    const center = { lat: -34.397, lng: 150.644 };
    const zoom = 4;
    return (
        <GoogleMapWrapper>
            <Wrapper apiKey={"AIzaSyBzmQC_yVrMSnh85NQN36RlzH1Kb6UuZW4"} render={render}>
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
    width: 100%;
    height: 100%;
`;