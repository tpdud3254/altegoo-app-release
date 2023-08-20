import styled from "styled-components/native";

export const Row = styled.View`
    flex-direction: row;
    align-items: center;
`;

export const RowBetween = styled(Row)`
    justify-content: space-between;
`;

export const RowAround = styled(Row)`
    justify-content: space-around;
`;

export const RowEvenly = styled(Row)`
    justify-content: space-evenly;
`;
