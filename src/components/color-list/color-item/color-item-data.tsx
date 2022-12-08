import styled from "styled-components";
import React from "react";
import {ColorItemData} from "../../../core/color-game-utils";

const ColorItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  
  padding: 16px 8px;
  border-radius: 4px;
  cursor: pointer;
  
  &:hover {
    background-color: #404040;
  }
`;

const ColorSquare = styled.span`
  width: 20px;
  height: 20px;
  border-radius: 3px;
  margin-bottom: 6px;
  background-color: ${props => props.color};
`;

export function ColorItem({colorHex, colorName, onClick}: ColorItemProps) {
    return (
        <ColorItemWrapper onClick={onClick}>
            <ColorSquare color={colorHex}></ColorSquare>
            <span>{colorName}</span>
        </ColorItemWrapper>
    );
}

interface ColorItemProps extends ColorItemData {
    onClick?: () => void;
}
