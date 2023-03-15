import React from "react";
import { Text, View } from "react-native";
// import IMP from "iamport-react-native";
import LoadingLayout from "../../component/layout/LoadingLayout";

function Payment({ navigation, route }) {
  console.log(route.params);
  function callback(response) {
    navigation.replace(route.params.callBackPage, response);
  }

  // const data = {
  //     pg: "html5_inicis",
  //     pay_method: "card",
  //     name: "아임포트 결제데이터 분석",
  //     merchant_uid: `mid_${new Date().getTime()}`,
  //     amount: route.params.price + "",
  //     buyer_name: "홍길동",
  //     buyer_tel: "01012345678",
  //     buyer_email: "example@naver.com",
  //     buyer_addr: "서울시 강남구 신사동 661-16",
  //     buyer_postcode: "06018",
  //     app_scheme: "example",
  //     // [Deprecated v1.0.3]: m_redirect_url
  // };

  return (
    // <IMP.Payment
    //     userCode={"iamport"} // 가맹점 식별코드
    //     tierCode={"AAA"} // 티어 코드: agency 기능 사용자에 한함
    //     loading={<LoadingLayout />} // 로딩 컴포넌트
    //     data={data} // 결제 데이터
    //     callback={callback} // 결제 종료 후 콜백
    // />
    <View></View>
  );
}

export default Payment;
