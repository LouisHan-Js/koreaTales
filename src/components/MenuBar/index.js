import React from 'react';
import styled from 'styled-components';

const MenuBar = ({list, onClickMenu, itemHeight}) => {
    return (
        <MenuWrap itemHeight={itemHeight}>
            {
                list.map((item, index) => {
                    return <MenuItem key={index} itemHeight={itemHeight} onClick={e => onClickMenu(item.key)}>
                        {item.title}
                    </MenuItem>
                })
            }
        </MenuWrap>
    )
}

export default MenuBar;

const MenuWrap = styled.div`
    border-top: 1px solid black;
    border-bottom: 1px solid black;
    height: ${props => props.itemHeight-2}px;
    line-height: ${props => props.itemHeight-2}px;
    overflow-y: scroll;
`;
const MenuItem = styled.div`
    float:left;
    width: 200px;
    height: 100%;
    text-align: center;
    cursor: pointer;
`;