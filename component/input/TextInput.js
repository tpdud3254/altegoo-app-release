import styled from "styled-components/native";

export const TextInput = styled.TextInput`
    width: ${(props) => (props.width ? props.width : "100%")};
    font-size: 20px;
    padding: 10px;
    font-weight: 300;
    height: 55px;
`;
