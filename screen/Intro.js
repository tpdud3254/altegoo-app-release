import React, { useRef, useState } from "react";
import styled from "styled-components/native";
import { FlatList, useWindowDimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { color } from "../styles";
import Button from "../component/button/Button";

const imagePath = [
  require(`../assets/images/intro/img_01.png`),
  require(`../assets/images/intro/img_02.png`),
  require(`../assets/images/intro/img_03.png`),
];

const Container = styled.View`
  flex: 1;
  width: 100%;
  background-color: white;
`;

const Wrapper = styled.View`
  flex: 10;
  align-items: center;
  margin-top: 120px;
`;

const Bottom = styled.View`
  flex: 1.5;
`;

const IntroImage = styled.Image`
  width: ${(props) => props.size + "px"};
  height: ${(props) => props.size + "px"};
`;

const Indicators = styled.View`
  flex-direction: row;
  justify-content: center;
  margin-bottom: 35px;
`;

const Indicator = styled.TouchableOpacity`
  width: ${(props) => (props.cur ? "35px" : "13px")};
  height: 13px;
  background-color: ${(props) => props.color || color.main};
  justify-content: center;
  align-items: center;
  border-radius: 100px;
  margin: 0px 5px 0px 5px;
`;

const Buttons = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
`;

function Intro() {
  const { width: imageSize } = useWindowDimensions();
  const navigation = useNavigation();
  const flatListRef = useRef();
  const [imageIndex, setImageIndex] = useState(0);

  const renderIntro = ({ item: path }) => (
    <IntroImage size={imageSize} source={path} />
  );

  const scrollToIntroImage = (index) => {
    flatListRef.current.scrollToIndex({ index });
    setImageIndex(index);
  };

  const goToSignIn = () => {
    navigation.navigate("SignInNavigator");
  };

  const goToSignUp = () => {
    navigation.navigate("SignUpNavigator");
  };
  return (
    <Container>
      <Wrapper>
        <FlatList
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          data={imagePath}
          renderItem={renderIntro}
          ref={flatListRef}
          onMomentumScrollEnd={(event) => {
            const index = Math.floor(
              Math.floor(event.nativeEvent.contentOffset.x) /
                Math.floor(event.nativeEvent.layoutMeasurement.width)
            );
            setImageIndex(index);
          }}
        />
        <Indicators>
          {imagePath.map((__, index) => (
            <Indicator
              key={index}
              onPress={() => scrollToIntroImage(index)}
              color={imageIndex === index ? color.btnAccent : color.btnDisable}
              cur={imageIndex === index}
            />
          ))}
        </Indicators>
      </Wrapper>
      <Bottom>
        <Buttons>
          <Button
            onPress={goToSignIn}
            type="accent"
            style={{ width: 185 }}
            text="로그인"
          />
          <Button onPress={goToSignUp} style={{ width: 185 }} text="회원가입" />
        </Buttons>
      </Bottom>
    </Container>
  );
}

export default Intro;
