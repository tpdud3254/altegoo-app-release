import AsyncStorage from "@react-native-async-storage/async-storage";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { SERVER, TOKEN, VALID } from "./constant";
import * as Speech from "expo-speech";
import axios from "axios";

export const reset = (setValue, value) => {
    setValue(value, "");
};
export const checkValidation = (data) => {
    let valid = true;
    Object.keys(data).map((value) => {
        if (!data[value]) {
            valid = false;
        }
    });

    return valid;
};

export const CheckValidation = (data) => {
    let result = true;

    Object.keys(data).map((value) => {
        result = data[value] && data[value].length > 0 ? true : false;
    });

    return result;
};

export const checkPassword = (password) => {
    const regExp = /^.*(?=^.{8,}$)(?=.*\d)(?=.*[a-zA-Z]).*$/;

    if (!password.match(regExp)) {
        return false;
    } else {
        return true;
    }
};

export const getAsyncStorageToken = () => {
    return AsyncStorage.getItem(TOKEN);
};

export const setAsyncStorageToken = async (token) => {
    await AsyncStorage.setItem(TOKEN, token);
};

export const numberWithComma = (cost) => {
    return cost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const numberWithZero = (num) => {
    return num < 10 ? "0" + num : num;
};

export const GetDate = (dateTime, mode = "short") => {
    const workDateTime = new Date(dateTime);

    if (mode === "short")
        return `${workDateTime
            .getFullYear()
            .toString()
            .substring(2, 4)}.${numberWithZero(
            workDateTime.getMonth() + 1
        )}.${numberWithZero(workDateTime.getDate())}`;
};

export const GetTime = (dateTime, mode = "short") => {
    const workDateTime = new Date(dateTime);

    const hours =
        workDateTime.getHours() === 0
            ? 12
            : workDateTime.getHours() > 12
            ? workDateTime.getHours() - 12
            : workDateTime.getHours();

    if (mode === "short")
        return `${GetAmpm(workDateTime.getHours())} ${numberWithZero(
            hours
        )}:${numberWithZero(workDateTime.getMinutes())}`;
};

export const GetAmpm = (hours) => {
    return hours === 0 ? "오전" : hours > 12 ? "오후" : "오전";
};

export const getWorkTime = (dateTime, mode) => {
    const getDay = (index) => {
        switch (index) {
            case 0:
                return "일";
            case 1:
                return "월";
            case 2:
                return "화";
            case 3:
                return "수";
            case 4:
                return "목";
            case 5:
                return "금";
            case 6:
                return "토";

            default:
                break;
        }
    };
    const workDateTime = new Date(dateTime);

    if (mode === "short")
        return `${workDateTime.getFullYear()}.${
            workDateTime.getMonth() + 1 < 10
                ? "0" + (workDateTime.getMonth() + 1)
                : workDateTime.getMonth() + 1
        }.${
            workDateTime.getDate() < 10
                ? "0" + workDateTime.getDate()
                : workDateTime.getDate()
        } ${
            workDateTime.getHours() < 10
                ? "0" + workDateTime.getHours()
                : workDateTime.getHours()
        }:${
            workDateTime.getMinutes() < 10
                ? "0" + workDateTime.getMinutes()
                : workDateTime.getMinutes()
        }`;
    else
        return `${workDateTime.getFullYear()}년 ${
            workDateTime.getMonth() + 1 < 10
                ? "0" + (workDateTime.getMonth() + 1)
                : workDateTime.getMonth() + 1
        }월 ${
            workDateTime.getDate() < 10
                ? "0" + workDateTime.getDate()
                : workDateTime.getDate()
        }일 (${getDay(workDateTime.getDay())}) ${
            workDateTime.getHours() < 10
                ? "0" + workDateTime.getHours()
                : workDateTime.getHours()
        }:${
            workDateTime.getMinutes() < 10
                ? "0" + workDateTime.getMinutes()
                : workDateTime.getMinutes()
        }`;
};

export const showError = (error) => {
    console.log(error.response);
    if (!error?.response?.data?.msg || error?.response?.data?.msg?.length < 1) {
        console.log("msg.len : ", error.response.data.msg.length);
        Toast.show({
            type: "errorToast",
            props: "서버와의 통신이 원활하지 않습니다. 다시 시도하여 주십시오.",
        });
    } else {
        console.log("Error Message : ", error?.response?.data?.msg);
        Toast.show({
            type: "errorToast",
            props: error?.response?.data?.msg || "error",
        });
    }

    // console.log("error: ", error.response.status);
    // console.log("error: ", error.response.data.msg);
    // console.log("error: ", error.response.data.result);
};

export const showErrorMessage = (msg) => {
    Toast.show({
        type: "errorToast",
        props: msg,
    });
};

export const showMessage = (msg) => {
    Toast.show({
        type: "normalToast",
        props: msg,
    });
};

export const speech = (msg, exceptionUserId) => {
    // const { info } = useContext(UserContext);

    const speak = () => {
        const thingToSay = msg;
        Speech.speak(thingToSay);
    };

    // if (info.id === exceptionUserId) return;

    speak();
};

export const onNext = (nextOne) => {
    nextOne?.current?.focus();
};

export const getDistance = (lat1, lng1, lat2, lng2) => {
    if (lat1 == lat2 && lng1 == lng2) return 0;

    var radLat1 = (Math.PI * lat1) / 180;
    var radLat2 = (Math.PI * lat2) / 180;
    var theta = lng1 - lng2;
    var radTheta = (Math.PI * theta) / 180;
    var dist =
        Math.sin(radLat1) * Math.sin(radLat2) +
        Math.cos(radLat1) * Math.cos(radLat2) * Math.cos(radTheta);
    if (dist > 1) dist = 1;

    dist = Math.acos(dist);
    dist = (dist * 180) / Math.PI;
    dist = dist * 60 * 1.1515 * 1.609344 * 1000;
    if (dist < 100) dist = Math.round(dist / 10) * 10;
    else dist = Math.round(dist / 100) * 100;

    return dist; //dist가 2,000 --> 2km를 의미
};

export const checkPosition = async (location) => {
    const auth = await getAsyncStorageToken();

    if (!auth) {
        return;
    }

    try {
        const response = await axios.get(SERVER + "/works/mylist/accept", {
            headers: {
                auth,
            },
        });

        const {
            data: { result },
        } = response;

        if (result === VALID) {
            const {
                data: {
                    data: { list },
                },
            } = response;

            let order1 = null; //1시간 미만 남은 예약 중 작업 (orderStatusId === 2)
            let order2 = null; //출발한 작업 (orderStatusId === 3)

            if (list.length > 0) {
                list.map((order) => {
                    const now = new Date();
                    const compareDate = new Date(order.workDateTime);
                    if (now > compareDate) {
                        return;
                    }

                    if (!order1) {
                        compareDate.setHours(compareDate.getHours() - 1); //작업시간이 한 시간 이하로 남았을 경우

                        if (order.orderStatusId === 2 && now > compareDate) {
                            order1 = order;
                        }
                    }

                    if (!order2) {
                        if (order.orderStatusId === 3) {
                            order2 = order;
                        }
                    }
                });
            }

            console.log("check location position / order1 : ", order1);
            console.log("check location position / order2 : ", order2);

            if (order1) {
                try {
                    const res = await axios.get(
                        `https://dapi.kakao.com/v2/local/search/address.json?query=${order1.address1}`,
                        {
                            headers: {
                                Authorization:
                                    "KakaoAK 86e0df46fbae745bb4c658276b280088",
                            },
                        }
                    );

                    const {
                        data: { documents },
                    } = res;

                    const current = {
                        latitude: location.latitude,
                        longitude: location.longitude,
                    };

                    const destination = {
                        latitude: documents[0].y,
                        longitude: documents[0].x,
                    };

                    const distance = getDistance(
                        current.latitude,
                        current.longitude,
                        destination.latitude,
                        destination.longitude
                    );

                    if (distance < 2000) {
                        try {
                            const res = await axios.patch(
                                SERVER + "/works/order/move",
                                { id: order1.id },
                                {
                                    headers: {
                                        auth: await getAsyncStorageToken(),
                                    },
                                }
                            );

                            console.log(res);
                        } catch (error) {
                            console.log(error);
                        }
                    }
                } catch (error) {
                    console.log(error);
                }
            }

            if (order2) {
                try {
                    const res = await axios.get(
                        `https://dapi.kakao.com/v2/local/search/address.json?query=${order2.address1}`,
                        {
                            headers: {
                                Authorization:
                                    "KakaoAK 86e0df46fbae745bb4c658276b280088",
                            },
                        }
                    );

                    const {
                        data: { documents },
                    } = res;

                    const current = {
                        latitude: location.latitude,
                        longitude: location.longitude,
                    };

                    const destination = {
                        latitude: documents[0].y,
                        longitude: documents[0].x,
                    };

                    const distance = getDistance(
                        current.latitude,
                        current.longitude,
                        destination.latitude,
                        destination.longitude
                    );

                    if (distance < 500) {
                        try {
                            const res = await axios.patch(
                                SERVER + "/works/order/move",
                                { id: order2.id },
                                {
                                    headers: {
                                        auth,
                                    },
                                }
                            );

                            console.log(res);
                        } catch (error) {
                            console.log(error);
                        }
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        }
    } catch (error) {
        console.log(error);
    }
};
