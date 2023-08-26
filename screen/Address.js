import React from "react";
import { View } from "react-native";
import Postcode from "@actbase/react-daum-postcode";
import { REGIST_NAV } from "../constant";

function Address({ navigation, route }) {
    console.log("Address Start: ", route.params.addressIndex);

    const onSelected = (data) => {
        console.log("onSelected : ", data);
        const address = data.address;
        const sido = data.sido;
        const sigungu = data.sigungu;

        if (route?.params?.addressIndex || route?.params?.addressIndex >= 0) {
            if (route?.params?.addressIndex === 0) {
                navigation.navigate(REGIST_NAV[2], {
                    ...route?.params,
                    selectAddress1: { address, sido, sigungu },
                });
            } else
                navigation.navigate(REGIST_NAV[2], {
                    ...route?.params,
                    selectAddress2: { address, sido, sigungu },
                });
        } //TODO:각 상세주소로 포커스 이동하게 하기
        // Toast.show({
        //   type: "errorToast", //TODO: normal toast로 변경
        //   props: "상세 주소를 입력해주세요.",
        // });
    };
    const YourView = () => (
        <Postcode
            style={{ width: "100%", height: "100%", paddingTop: 50 }}
            jsOptions={{ animation: true }}
            onSelected={(data) => onSelected(data)}
        />
    );

    return (
        <View style={{ backgroundColor: "white" }}>
            <YourView />
        </View>
    );
}

export default Address;
