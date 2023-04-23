import React from "react";
import PropTypes from "prop-types";
import PlainText from "./text/PlainText";
import { color } from "../styles";
import { AntDesign } from "@expo/vector-icons";
import styled from "styled-components";

const SRule = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: -5px;
`;

function Rule({ text }) {
  const ExclamationMark = () => (
    <AntDesign
      name="exclamationcircleo"
      size={20}
      color={color.main}
      style={{ marginTop: 2 }}
    />
  );

  return (
    <SRule>
      <ExclamationMark />
      <PlainText
        style={{
          fontSize: 20,
          color: color.darkGrey,
          marginLeft: 5,
        }}
      >
        {text}
      </PlainText>
    </SRule>
  );
}

Rule.propTypes = {
  text: PropTypes.string.isRequired,
};
export default Rule;
