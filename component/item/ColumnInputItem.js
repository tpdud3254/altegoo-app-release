import React from "react";
import styled from "styled-components/native";
import PropTypes from "prop-types";
import SubTitleText from "../text/SubTitleText";
import BorderBox from "../box/BorderBox";

const Container = styled.View`
    /* width: ${(props) => (props.width ? props.width : "unset")}; */
    margin: 8px 0px 8px 0px;
`;

function ColumnInputItem({ title, children, width }) {
    return (
        <Container width={width}>
            <SubTitleText style={{ paddingBottom: 5 }}>{title}</SubTitleText>
            <BorderBox>{children}</BorderBox>
        </Container>
    );
}

ColumnInputItem.propTypes = {
    title: PropTypes.string.isRequired,
    width: PropTypes.string,
};
export default ColumnInputItem;
