import styled from "styled-components/native";

const RadioRow = styled.View`
    flex-wrap: wrap;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

export const RadioContainer = ({ children }) => {
    return <RadioRow>{children}</RadioRow>;
};
