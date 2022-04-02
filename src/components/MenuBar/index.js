import React from 'react';
import styled from 'styled-components';
import { COLORS } from '../../data';

const MenuBar = ({list, onClickMenu, itemHeight}) => {
    return (
        <MenuWrap itemHeight={itemHeight} borderColor={COLORS.borderColor} menuColor={COLORS.menuColor} listCount={list.length}>
            <div>

                {
                    list.map((item, index) => {
                        return <MenuItem key={index}itemHeight={itemHeight} hoverColor={COLORS.menuHover} onClick={e => onClickMenu(item.key)}>
                            {item.title}
                        </MenuItem>
                    })
                }
            </div>
        </MenuWrap>
    )
}

export default MenuBar;

const MenuWrap = styled.div`
    -webkit-box-shadow: 0px 2px 4px 4px rgba(0,0,0,0.74); 
    box-shadow: 0px 2px 4px 4px rgba(0,0,0,0.74);
    // border-top: 1px solid ${props => props.borderColor || 'black'};
    // border-bottom: 1px solid ${props => props.borderColor ||' black'};
    height: ${props => props.itemHeight-2}px;
    line-height: ${props => props.itemHeight-2}px;
    overflow-y: scroll;
    text-align: center;
    // background-color: ${props => props.menuColor};
    background: rgb(157,84,20);
    background: linear-gradient(180deg, rgba(157,84,20,1) 0%, rgba(143,92,23,0.5508797268907564) 50%, rgba(173,125,7,1) 100%);
    >div{
        float:right;
        width: calc(95px * ${props => props.listCount});
    }
`;
const MenuItem = styled.div`
    float:left;
    width: 90px;
    height: 100%;
    cursor: pointer;
    font-weight: 400;
    font-size: 16px;
    &:hover{
        font-size: 18px;
        // background-color: ${props => props.hoverColor};
        font-weight: 600;
    }
`;