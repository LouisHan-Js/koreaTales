import React from 'react';
import styled from 'styled-components';
import { COLORS } from '../../data';

const MenuBar = ({list, onClickMenu, itemHeight}) => {
    return (
        <MenuWrap itemHeight={itemHeight} borderColor={COLORS.borderColor} listCount={list.length}>
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
    border-top: 1px solid ${props => props.borderColor || 'black'};
    border-bottom: 1px solid ${props => props.borderColor ||' black'};
    height: ${props => props.itemHeight-2}px;
    line-height: ${props => props.itemHeight-2}px;
    overflow-y: scroll;
    text-align: center;
    >div{
        width: calc(200px * ${props => props.listCount});
        margin: 0 auto;
    }
`;
const MenuItem = styled.div`
    float:left;
    width: 200px;
    height: 100%;
    cursor: pointer;
    font-weight: 400;
    font-size: 20px;
    &:hover{
        background-color: ${props => props.hoverColor};
        font-weight: 700;
    }
`;