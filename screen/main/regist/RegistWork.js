import RowInputItem from "../../../component/item/InputItem";
import { TextInput } from "../../../component/input/TextInput";
import FormLayout from "../../../component/layout/FormLayout";
import DefaultLayout from "../../../component/layout/DefaultLayout";
import React, { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components/native";
import PropTypes from "prop-types";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import Checkbox from "expo-checkbox";
import Toast from "react-native-toast-message";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker, {
  DateTimePickerAndroid,
} from "@react-native-community/datetimepicker";
import { useForm } from "react-hook-form";
import { theme } from "../../../styles";
import UserContext from "../../../context/UserContext";
import InputItem from "../../../component/item/InputItem";
import PlainText from "../../../component/text/PlainText";
import SubTitleText from "../../../component/text/SubTitleText";
import SubmitButton from "../../../component/button/SubmitButton";
import axios from "axios";
import { SERVER } from "../../../server";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { VALID } from "../../../constant";
import { getAsyncStorageToken } from "../../../utils";

const Container = styled.View`
  margin-top: 10px;
  flex: 1;
`;

const Wrapper = styled.View`
  width: 100%;
`;
const Row = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: ${(props) =>
    props.marginBottom ? props.marginBottom : "10px"};
`;

const Content = styled.View`
  flex: 3;
  flex-direction: row;
  align-items: center;
  justify-content: ${(props) =>
    props.spaceBetween ? "space-between" : "flex-start"};
`;
const Input = styled(TextInput)`
  width: ${(props) => (props.width ? props.width : "75px")};
  margin-right: 5px;
`;

const LargeInput = styled(TextInput)`
  width: 76%;
`;

const TestInput = styled(TextInput)`
  width: 100%;
`;

const Box = styled.TouchableOpacity``;

const BoxText = styled.Text`
  font-size: 20px;
`;

const CheckWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  margin-right: 12px;
`;

const CheckText = styled.Text`
  font-size: 20px;
  padding-left: 3px;
`;

const CalendarButton = styled.TouchableOpacity``;

const SelectPicker = styled(Picker)`
  border: 1px solid ${theme.textBoxColor};
  width: 76%;
  height: 52px;
  justify-content: center;
  padding: 10px;
`;

const quantity = ["물량1", "물량2", "물량3"];
const upDown = ["올림", "내림", "양사"];
const floor = [
  "1층",
  "2층",
  "3층",
  "4층",
  "5층",
  "6층",
  "7층",
  "8층",
  "9층",
  "10층",
  "11층",
  "12층 이상",
];

function RegistWork({ route, navigation }) {
  const [initDate, setInitDate] = useState({});
  const [selectedDate, setSelectedDate] = useState({});
  const [time, setTime] = useState({});
  const [checkArr, setCheckArr] = useState([false, false, false]);
  const [selectedQuantity, setSelectedQuantity] = useState();
  const [selectedFloor, setSelectedFloor] = useState();
  const [cost, setCost] = useState(10000);
  const [commission, setCommission] = useState(10000); //TODO:수수료 받아오기
  const [directPayment, setDirectPayment] = useState(false);
  const [workType, setWorkType] = useState(null);
  const [workHeight, setWorkHeight] = useState(null);
  const { info, setInfo } = useContext(UserContext);
  const { register, handleSubmit, setValue, getValues, watch } = useForm();

  useEffect(() => {
    register("phone");
    register("detailAddress");
    register("sendDetailAddress");
    register("cost");
    register("memo");
  }, [register]);

  useEffect(() => {
    setWorkType(route?.params?.type || "");
    setWorkHeight(route?.params?.range || "");
    setValue("phone", info.phone);
    setValue("cost", cost);

    const now = new Date();

    const today = {
      year: now.getFullYear() + "",
      month:
        now.getMonth() < 10
          ? "0" + (now.getMonth() + 1) + ""
          : now.getMonth() + 1 + "",
      date: now.getDate() < 10 ? "0" + now.getDate() + "" : now.getDate() + "",
    };

    const time = {
      hours: now.getHours() < 10 ? "0" + now.getHours() : now.getHours() + "",
      min:
        now.getMinutes() < 10 ? "0" + now.getMinutes() : now.getMinutes() + "",
    };

    setInitDate({ ...today });
    setTime({ ...time });

    setSelectedFloor(
      route?.params?.range === "high"
        ? 11
        : route?.params?.range === "middle"
        ? 8
        : 2
    );
  }, []);

  const floorPickerRef = useRef();
  const QuantityPickerRef = useRef();

  const onValid = async (data) => {
    let upDownValue = "";

    checkArr.map((value, index) => {
      if (value) {
        upDownValue = upDown[index];
      }
    });
    const dataObj = {
      // TODO:이전 날짜 선택 안되게 하기
      workDate: selectedDate.year
        ? `${selectedDate.year}-${selectedDate.month}-${selectedDate.date}`
        : `${initDate.year}-${initDate.month}-${initDate.date}`,
      // TODO:지난 시간 선택 안되게 하기
      workTime: `${time.hours}:${time.min}`,
      workType,
      workHeight,
      workFloor: floor[selectedFloor],
      upDown: upDownValue,
      phone: info.phone,
      workQuantity: selectedQuantity || "",
      address: `${
        route?.params?.addressArr ? route?.params?.addressArr[0] : ""
      }${data.detailAddress ? " " + data.detailAddress : ""}`,
      sendAddress: `${
        route?.params?.addressArr ? route?.params?.addressArr[1] : ""
      }${data.sendDetailAddress ? " " + data.sendDetailAddress : ""}`,
      cost: data.cost,
      commission,
      onSitePayment: directPayment,
      memo: data.memo ? data.memo : null,
    };

    axios
      .post(
        SERVER + "/works/upload",
        {
          ...dataObj,
        },
        {
          headers: {
            auth: await getAsyncStorageToken(),
          },
        }
      )
      .then(({ data }) => {
        if (data.result === VALID) {
          navigation.navigate("RegistDone", { registWorkKey: route.key });
        } else {
          //TODO:에러처리
        }
      })
      .catch((error) => {
        console.log(error);
        //TODO:에러처리
      })
      .finally(() => {});
  };

  const onChange = (event, selectedDate) => {
    const selected = {
      year: selectedDate.getFullYear() + "",
      month:
        selectedDate.getMonth() < 10
          ? "0" + (selectedDate.getMonth() + 1) + ""
          : selectedDate.getMonth() + 1 + "",
      date:
        selectedDate.getDate() < 10
          ? "0" + selectedDate.getDate() + ""
          : selectedDate.getDate() + "",
    };

    setSelectedDate({ ...selected });
  };
  const showMode = (currentMode) => {
    DateTimePickerAndroid.open({
      value: new Date(),
      onChange,
      mode: currentMode,
      is24Hour: true,
      display: currentMode === "time" ? "spinner" : "default",
    });
  };
  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };

  const searchAddress = (index) => {
    navigation.navigate("SearchAddress", {
      data: index,
      addressArr: route?.params?.addressArr || ["", ""],
    });
  };

  const onCheck = (index) => {
    const newArr = [];

    checkArr.map((value, i) => {
      if (i === index) {
        newArr.push(true);
      } else {
        newArr.push(false);
      }
    });

    setCheckArr([...newArr]);
  };

  const costWithComma = (cost) => {
    return cost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const Title = ({ text }) => (
    <SubTitleText
      style={{
        fontSize: 18,
        textAlign: "center",
        flex: 1,
      }}
    >
      {text}
    </SubTitleText>
  );

  const InputValue = ({ text }) => (
    <PlainText
      style={{
        width: "100%",
        padding: 10,
      }}
    >
      {text}
    </PlainText>
  );

  return (
    <FormLayout>
      <Container>
        <ScrollView>
          <TouchableWithoutFeedback>
            <>
              <Row>
                <Title text="작업일자" />
                <Content spaceBetween>
                  <InputItem>
                    <InputValue
                      text={
                        selectedDate.year
                          ? selectedDate.year + ""
                          : initDate.year + ""
                      }
                    />
                  </InputItem>
                  <InputItem>
                    <InputValue
                      text={
                        selectedDate.month
                          ? selectedDate.month + ""
                          : initDate.month + ""
                      }
                    />
                  </InputItem>
                  <InputItem>
                    <InputValue
                      text={
                        selectedDate.date
                          ? selectedDate.date + ""
                          : initDate.date + ""
                      }
                    />
                  </InputItem>
                  <CalendarButton onPress={showDatepicker}>
                    <Ionicons
                      name={"calendar-outline"}
                      size={35}
                      color={"black"}
                    />
                  </CalendarButton>
                </Content>
              </Row>
              <Row>
                <Title text="작업시간" />
                <Content spaceBetween>
                  <InputItem>
                    <InputValue text={time.hours} />
                  </InputItem>
                  <InputItem>
                    <InputValue text={time.min} />
                  </InputItem>
                  <TouchableOpacity onPress={showTimepicker}>
                    <Ionicons name={"time-outline"} size={35} color={"black"} />
                  </TouchableOpacity>
                </Content>
              </Row>
              <Row>
                <Title text="작업종류" />
                <Content>
                  <InputItem>
                    <InputValue
                      text={
                        route?.params.type === "ladder" ? "사다리" : "스카이"
                      }
                    />
                  </InputItem>
                </Content>
              </Row>
              <Row>
                <Title text="작업높이" />
                <Content>
                  <InputItem>
                    <InputValue
                      text={
                        route?.params?.range === "high"
                          ? "고층"
                          : route?.params?.range === "row"
                          ? "저층"
                          : "중층"
                      }
                    />
                  </InputItem>
                </Content>
              </Row>
              <Row>
                <Title text="휴대전화" />
                <Content>
                  <InputItem>
                    <TextInput
                      placeholder="휴대폰번호"
                      returnKeyType="done"
                      onChangeText={(text) => setValue("phone", text)}
                    >
                      {info.phone}
                    </TextInput>
                  </InputItem>
                </Content>
              </Row>
              <Row>
                <Title text="작업 물량" />
                <Content>
                  <Picker //TODO: Picker style
                    ref={QuantityPickerRef}
                    selectedValue={selectedQuantity}
                    onValueChange={(itemValue, itemIndex) =>
                      setSelectedQuantity(itemValue)
                    }
                    style={{ width: "100%" }}
                  >
                    {quantity.map((value, index) => (
                      <Picker.Item
                        key={index}
                        label={value}
                        value={value}
                        style={{ fontSize: 20 }}
                      />
                    ))}
                  </Picker>
                </Content>
              </Row>
              <Row marginBottom="3px">
                <Title text="작업주소" />
                <Content>
                  <InputItem>
                    <Box onPress={() => searchAddress(0)}>
                      <InputValue
                        text={
                          route?.params?.addressArr
                            ? route?.params?.addressArr[0]
                            : ""
                        }
                      />
                    </Box>
                  </InputItem>
                </Content>
              </Row>
              <Row>
                <Title />
                <Content>
                  <InputItem>
                    <TextInput
                      placeholder="상세주소 입력"
                      returnKeyType="done"
                      onChangeText={(text) => setValue("detailAddress", text)}
                    />
                  </InputItem>
                </Content>
              </Row>
              <Row>
                <Title text="올림/내림" />
                <Content>
                  {upDown.map((value, index) => (
                    <CheckWrapper key={index}>
                      <Checkbox
                        style={{
                          width: 30,
                          height: 30,
                          marginRight: 5,
                        }}
                        value={checkArr[index]}
                        onValueChange={() => onCheck(index)}
                        color={checkArr[index] ? theme.btnPointColor : null}
                      />
                      <PlainText>{value}</PlainText>
                    </CheckWrapper>
                  ))}
                </Content>
              </Row>
              {checkArr[2] ? (
                <>
                  <Row marginBottom="3px">
                    <Title text="작업주소" />
                    <Content>
                      <InputItem>
                        <Box onPress={() => searchAddress(1)}>
                          <InputValue
                            text={
                              route?.params?.addressArr
                                ? route?.params?.addressArr[1]
                                : ""
                            }
                          />
                        </Box>
                      </InputItem>
                    </Content>
                  </Row>
                  <Row>
                    <Title />
                    <Content>
                      <InputItem>
                        <TextInput
                          placeholder="상세주소 입력"
                          returnKeyType="done"
                          onChangeText={(text) =>
                            setValue("sendDetailAddress", text)
                          }
                        />
                      </InputItem>
                    </Content>
                  </Row>
                </>
              ) : null}
              <Row>
                <Title text="작업 층" />
                <Content>
                  <Picker //TODO: Picker style
                    ref={floorPickerRef}
                    selectedValue={floor[selectedFloor]}
                    onValueChange={(itemValue, itemIndex) =>
                      setSelectedFloor(itemIndex)
                    }
                    style={{ width: "100%" }}
                  >
                    {floor.map((value, index) => (
                      <Picker.Item
                        key={index}
                        label={value}
                        value={value}
                        style={{ fontSize: 20 }}
                      />
                    ))}
                  </Picker>
                </Content>
              </Row>
              <Row>
                <Title text="오더비용" />
                <Content>
                  <InputItem>
                    <TextInput
                      placeholder="비용을 입력해주세요"
                      returnKeyType="done"
                      keyboardType="number-pad"
                      onChangeText={(text) => {
                        setValue("cost", text);
                      }}
                    >
                      {costWithComma(cost)}
                      {/* TODO: 원추가 */}
                    </TextInput>
                  </InputItem>
                </Content>
              </Row>
              <Row>
                <Title />
                <Content>
                  <TouchableOpacity
                    onPress={() => {
                      cost - 10000 < 0 ? setCost(0) : setCost(cost - 10000);
                    }}
                  >
                    <PlainText>-10000</PlainText>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      cost - 1000 < 0 ? setCost(0) : setCost(cost - 1000);
                    }}
                  >
                    <PlainText>-1000</PlainText>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setCost(cost + 10000);
                    }}
                  >
                    <PlainText>+10000</PlainText>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setCost(cost + 1000);
                    }}
                  >
                    <PlainText>+1000</PlainText>
                  </TouchableOpacity>
                </Content>
              </Row>
              <Row>
                <Title text="수수료" />
                <Content>
                  <InputItem>
                    <Box>
                      <InputValue text={costWithComma(commission) + " P"} />
                    </Box>
                  </InputItem>
                </Content>
              </Row>
              <Row>
                <Title text="현장결제" />
                <Content>
                  <Checkbox
                    style={{ width: 30, height: 30 }}
                    value={directPayment}
                    onValueChange={() => setDirectPayment(!directPayment)}
                    color={directPayment ? theme.btnPointColor : null}
                  />
                </Content>
              </Row>
              <Row>
                <Title text="특이사항" />
                <Content>
                  <InputItem>
                    <TextInput
                      returnKeyType="done"
                      onChangeText={(text) => {
                        setValue("memo", text);
                      }}
                    />
                  </InputItem>
                </Content>
              </Row>
              <View style={{ marginTop: 10 }}>
                <SubmitButton text="작업등록" onPress={handleSubmit(onValid)} />
              </View>
            </>
          </TouchableWithoutFeedback>
        </ScrollView>
      </Container>
    </FormLayout>
  );
}

RegistWork.propTypes = {};
export default RegistWork;
