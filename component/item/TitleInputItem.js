import React from "react";
import styled from "styled-components/native";
import PropTypes from "prop-types";
import SubTitleText from "../text/SubTitleText";
import BorderBox from "../box/BorderBox";

const Container = styled.View`
    margin: 8px 0px 8px 0px;
`;

function TitleInputItem({ title, children, width }) {
    return (
        <Container width={width}>
            {title ? (
                <SubTitleText style={{ paddingBottom: 5, fontSize: 21 }}>
                    {title}
                </SubTitleText>
            ) : null}

            <BorderBox>{children}</BorderBox>
        </Container>
    );
}

TitleInputItem.propTypes = {
    title: PropTypes.string,
    width: PropTypes.string,
};
export default TitleInputItem;
