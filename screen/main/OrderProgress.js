import React, { useEffect, useState } from "react";
import { TouchableOpacity, View, Alert } from "react-native";
import LadderIcon from "../../component/icon/LadderIcon";
import SkyIcon from "../../component/icon/SkyIcon";
import PlainText from "../../component/text/PlainText";
import {
  MaterialCommunityIcons,
  Ionicons,
  FontAwesome5,
  Octicons,
  AntDesign,
} from "@expo/vector-icons";
import styled from "styled-components/native";
import { color } from "../../styles";
import {
  getAsyncStorageToken,
  getWorkTime,
  numberWithComma,
} from "../../utils";
import MainLayout from "../../component/layout/MainLayout";
import PlainButton from "../../component/button/PlainButton";
import HorizontalDivider from "../../component/divider/HorizontalDivider";
import SubTitleText from "../../component/text/SubTitleText";
import SubmitButton from "../../component/button/SubmitButton";
import KakaoButton, {
  ButtonContainer,
} from "../../component/button/KakaoButton";
import axios from "axios";
import { SERVER } from "../../constant";
import { VALID } from "../../constant";

const Order = styled.TouchableOpacity`
  background-color: white;
  border-radius: 10px;
  margin-bottom: 14px;
  opacity: ${(props) => (props.done ? 0.5 : 1)};
`;

const OrderWrapper = styled.View`
  padding: 10px;
`;

const OrderContent = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 3px;
`;

const Container = styled.View`
  margin-top: 10px;
  flex: 1;
  justify-content: space-between;
`;

const Noti = styled.View`
  flex: 1;
  background-color: white;
  align-items: center;
  margin: 15px 0px;
  justify-content: center;
`;

const NotiIcon = styled.View`
  margin-bottom: 15px;
`;
const NotiText = styled.View``;

const InProgress = styled.View`
  align-items: center;
  padding: 10px 0px;
`;

function OrderProgress({ route, navigation }) {
  const [order, setOrder] = useState({});

  console.log(route?.params.orderData);

  useEffect(() => {
    setOrder(route?.params?.orderData);
    navigation.setOptions({
      title: order.orderStatusId === 2 ? "작업 시작" : "작업 진행",
    });
  }, []);

  console.log(route?.params);

  useEffect(() => {
    if (route?.params?.back) {
      navigation.setOptions({
        headerRight: null,
      });
    } else {
      navigation.setOptions({
        headerLeft: null,
        headerRight: () => (
          <TouchableOpacity style={{ marginRight: 10 }} onPress={onClose}>
            <AntDesign name="closecircleo" size={30} color="black" />
          </TouchableOpacity>
        ),
      });
    }
  }, []);

  const onClose = () => {
    navigation.replace("TabsNavigator");
  };

  const goToPage = (page, data) => {
    navigation.navigate(page, data);
  };

  const onStartMoving = async (orderId) => {
    axios
      .patch(
        SERVER + "/works/order/move",
        {
          id: orderId,
        },
        {
          headers: {
            auth: await getAsyncStorageToken(),
          },
        }
      )
      .then(({ data }) => {
        const {
          result,
          data: { list },
        } = data;
        console.log("list: ", list);
        //TODO: 결과 적용
      })
      .catch((error) => {
        showError(error);
      })
      .finally(() => {});
  };

  const onStartOrder = () => {
    Alert.alert("작업이 시작되었습니다!", "안전한 작업 부탁드립니다 ^^", [
      {
        text: "확인",
        onPress: async () => {
          axios
            .patch(
              SERVER + "/works/order/start",
              {
                id: order.id,
              },
              {
                headers: {
                  auth: await getAsyncStorageToken(),
                },
              }
            )
            .then(({ data }) => {
              const {
                result,
                data: { list },
              } = data;
              console.log("list: ", list);

              //TODO: 나중에 효율적으로 바꾸기
              list.map((resultOrder, index) => {
                if (resultOrder.id === order.id) {
                  setOrder(resultOrder);
                }
              });
            })
            .catch((error) => {
              showError(error);
            })
            .finally(() => {});
        },
      },
    ]);
  };

  const onOrderDone = () => {
    Alert.alert("작업이 완료 되었습니다!", "이번에도 고생 많으셨습니다. ^^", [
      {
        text: "확인",
        onPress: async () => {
          axios
            .patch(
              SERVER + "/works/order/done",
              {
                id: order.id,
              },
              {
                headers: {
                  auth: await getAsyncStorageToken(),
                },
              }
            )
            .then(({ data }) => {
              const {
                result,
                data: { list },
              } = data;
              console.log("list: ", list);
              //TODO: 나중에 효율적으로 바꾸기
              list.map((resultOrder, index) => {
                if (resultOrder.id === order.id) {
                  setOrder(resultOrder);
                }
              });
            })
            .catch((error) => {
              showError(error);
            })
            .finally(() => {
              onClose();
            });
        },
      },
    ]);
  };

  return (
    <MainLayout>
      <Order
        onPress={() =>
          goToPage("OrderDetail", {
            orderData: order,
          })
        }
      >
        <OrderWrapper>
          <OrderContent>
            {order.vehicleType === "사다리" ? <LadderIcon /> : <SkyIcon />}
            <PlainText
              style={{
                marginLeft: 5,
                fontSize: 19,
              }}
              numberOfLines={1}
            >
              {order.vehicleType} / {order.type}({order.floor}
              층) / {order.volumeType === "time" ? order.time : order.quantity}
            </PlainText>
          </OrderContent>
          <OrderContent>
            <Ionicons name="location" color="#777" size={24} />
            <PlainText
              style={{
                marginLeft: 5,
                fontSize: 19,
              }}
              numberOfLines={1}
            >
              {order.address1} {order.detailAddress1}
            </PlainText>
          </OrderContent>
          {order.type === "양사" ? (
            <OrderContent>
              <Ionicons name="location" color="#777" size={24} />
              <PlainText
                style={{
                  marginLeft: 5,
                  fontSize: 19,
                }}
                numberOfLines={1}
              >
                {order.address2 + " " + order.detailAddress2}
              </PlainText>
            </OrderContent>
          ) : null}
          <OrderContent>
            <Ionicons name="time" color="#777" size={24} />
            <PlainText
              style={{
                marginLeft: 5,
                fontSize: 19,
              }}
              numberOfLines={1}
            >
              {getWorkTime(order.workDateTime)}
            </PlainText>
          </OrderContent>
          <OrderContent>
            <FontAwesome5 name="coins" color={color.main} size={24} />
            <PlainText
              style={{
                marginLeft: 5,
                fontSize: 19,
                fontWeight: "400",
              }}
              numberOfLines={1}
            >
              {numberWithComma(order.price || 0)}
              AP / 수수료 : {numberWithComma(order.point || 0)}
              AP
            </PlainText>
          </OrderContent>
        </OrderWrapper>
      </Order>
      <HorizontalDivider />
      <Container>
        {order.orderStatusId === 2 ? (
          <PlainButton
            text="출발하기"
            onPress={() => onStartMoving(order.id)}
          />
        ) : (
          <InProgress>
            <MaterialCommunityIcons
              name="progress-wrench"
              size={35}
              color="black"
            />
            <PlainText
              style={{
                fontSize: 22,
                color: color.textDark,
                textAlign: "center",
                fontWeight: "400",
              }}
            >
              현재 작업이 진행 중 입니다.
            </PlainText>
          </InProgress>
        )}

        <Noti>
          <NotiIcon>
            <Octicons name="megaphone" size={40} color={color.sub.blue} />
          </NotiIcon>
          {order.orderStatusId === 2 ? (
            <NotiText>
              <SubTitleText
                style={{
                  fontSize: 21,
                  lineHeight: 28,
                  textAlign: "center",
                  color: color.textDark,
                }}
              >
                작업이 시작될 시간입니다.{"\n"}현장에 도착하셨나요?
                {"\n"}
              </SubTitleText>
              <SubTitleText
                style={{
                  fontSize: 21,
                  lineHeight: 28,
                  textAlign: "center",
                  color: color.main,
                }}
              >
                작업 시작 버튼을 누르지 않으면{"\n"}비용이 지급되지 않으니{"\n"}
                작업을 진행하기 전에 꼭!!!
                {"\n"}
                작업 시작 버튼을 눌러주세요!
              </SubTitleText>
            </NotiText>
          ) : (
            <NotiText>
              <SubTitleText
                style={{
                  fontSize: 21,
                  lineHeight: 28,
                  textAlign: "center",

                  color: color.main,
                }}
              >
                작업을 완료하셨으면{"\n"}꼭!! 작업 완료 버튼을 눌러주세요!
                {"\n"}
              </SubTitleText>
              <SubTitleText
                style={{
                  fontSize: 21,
                  lineHeight: 28,
                  textAlign: "center",
                  color: color.textDark,
                }}
              >
                작업 등록자 확인 후 비용이{"\n"}지급될 예정입니다.
              </SubTitleText>
            </NotiText>
          )}
        </Noti>
        <SubmitButton
          text={order.orderStatusId === 2 ? "작업 시작" : "작업 완료"}
          onPress={order.orderStatusId === 2 ? onStartOrder : onOrderDone}
        />
      </Container>
    </MainLayout>
  );
}

export default OrderProgress;
