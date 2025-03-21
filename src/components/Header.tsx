import styled from "styled-components/native";
import { StatusBar } from "react-native";
import themes from "../styles/themes";
export const HeaderContainer = styled.View`
    background-color:${themes.colors.primary};
    padding-top: ${StatusBar.currentHeight}px;
    padding:${themes.spacing.medium}px;
    elevation: 4;
    shadow-color: #000;
    shadow-opacity: 0.3;
    shadow-radius: 4px;
    shadow-offset: 0px 2px;
`;

export const HeaderTitle = styled.Text`
    color: ${themes.colors.white};
    font-size:${themes.typography.title.fontSize}px;
    font-weight:${themes.typography.title.fontWeight}px;
`;

