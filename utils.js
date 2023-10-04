import AsyncStorage from "@react-native-async-storage/async-storage";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { DRIVER, SERVER, TOKEN, UID, VALID } from "./constant";
import * as Speech from "expo-speech";
import axios from "axios";
import * as Linking from "expo-linking";

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
    let result = [];

    Object.keys(data).map((value) => {
        if (typeof data[value] === "number")
            result.push(data[value] > 0 ? true : false);
        else result.push(data[value] && data[value].length > 0 ? true : false);
    });

    for (let i = 0; i < result.length; i++)
        if (result[i] === false) return false;

    return true;
};

export const checkPassword = (password) => {
    const regExp = /^.*(?=^.{8,}$)(?=.*\d)(?=.*[a-zA-Z]).*$/;

    if (!password.match(regExp)) {
        return false;
    } else {
        return true;
    }
};

export const GetAsyncStorageUid = () => {
    return AsyncStorage.getItem(UID);
};

export const SetAsyncStorageUid = async (id) => {
    await AsyncStorage.setItem(UID, id);
};

export const getAsyncStorageToken = () => {
    return AsyncStorage.getItem(TOKEN);
};

export const setAsyncStorageToken = async (token) => {
    await AsyncStorage.setItem(TOKEN, token);
};

export const numberWithComma = (cost) => {
    if (!cost && cost !== 0) return null;
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
    else if (mode === "long")
        return `${workDateTime.getFullYear()}년 ${
            workDateTime.getMonth() + 1
        }월 ${workDateTime.getDate()}일`;
};

export const GetDayOfWeek = (dateTime) => {
    const workDateTime = new Date(dateTime);
    const dayOfWeek = workDateTime.getDay();
    let str = "";
    switch (dayOfWeek) {
        case 0:
            str = "일";
            break;
        case 1:
            str = "월";
            break;
        case 2:
            str = "화";
            break;
        case 3:
            str = "수";
            break;
        case 4:
            str = "목";
            break;
        case 5:
            str = "금";
            break;
        case 6:
            str = "토";
            break;
    }
    return str;
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
    else if (mode === "long")
        return `${GetAmpm(workDateTime.getHours())} ${numberWithZero(
            hours
        )}시 ${numberWithZero(workDateTime.getMinutes())}분`;
    else if (mode === "24")
        return `${numberWithZero(workDateTime.getHours())}:${numberWithZero(
            workDateTime.getMinutes()
        )}`;
};

export const GetAmpm = (hours) => {
    return hours === 0 ? "오전" : hours >= 12 ? "오후" : "오전";
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
            props:
                error?.response?.data?.msg ||
                "서버와의 통신이 원활하지 않습니다. 다시 시도하여 주십시오. (2)",
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

export const speech = async (msg, exceptionUserId, orderId) => {
    const uid = await GetAsyncStorageUid();

    const speak = async () => {
        const thingToSay = msg;
        Speech.speak(thingToSay);
        await AsyncStorage.setItem("TTS", orderId);
    };

    if (!uid) return;
    if (uid === exceptionUserId) return;

    const beforeTTS = (await AsyncStorage.getItem("TTS")) || 0;

    if (Number(beforeTTS) === Number(orderId)) return;
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
                    const compareDate = new Date(order.dateTime);
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

export const GetPhoneNumberWithDash = (phone) => {
    if (!phone) {
        return "";
    }
    return `${phone.substring(0, 3)}-${phone.substring(3, 7)}-${phone.substring(
        7,
        phone.length
    )}`;
};

export const GetOrderOption = (registInfo) => {
    const data = [];

    Object.keys(registInfo).map((value, index) => {
        data.push(registInfo[value]);
        if (value === "price")
            data[index] =
                data[index] === 0
                    ? "예상 운임 협의"
                    : "예상 운임 " + numberWithComma(data[index]) + "AP";
        if (value === "dateTime")
            data[index] = GetDate(new Date(data[index]), "long");
    });

    return data;
};

export const GetLadderPrice = (floor, volume, quantity, time) => {
    let calc = 0;

    if (floor >= 2 && floor <= 5) {
        if (volume === 1) {
            //물량
            if (quantity === 1) calc = calc + 12;
            else if (quantity === 2) calc = calc + 15;
            else if (quantity === 3) calc = calc + 18;
            else if (quantity === 4) calc = calc + 21;
            else if (quantity === 5) calc = calc + 24;
        } else if (volume === 2) {
            //시간
            if (time === 1) calc = calc + 8;
            else if (time === 2) calc = calc + 12;
            else if (time === 3) calc = calc + 8 + 12;
            else if (time === 4) calc = calc + 8 * 2 + 12;
            else if (time === 5) calc = calc + 35;
            else if (time === 6) calc = calc + 50;
        }
    } else if (floor >= 6 && floor <= 7) {
        if (volume === 1) {
            //물량
            if (quantity === 1) calc = calc + 13;
            else if (quantity === 2) calc = calc + 16;
            else if (quantity === 3) calc = calc + 19;
            else if (quantity === 4) calc = calc + 22;
            else if (quantity === 5) calc = calc + 25;
        } else if (volume === 2) {
            //시간
            if (time === 1) calc = calc + 9;
            else if (time === 2) calc = calc + 13;
            else if (time === 3) calc = calc + 8 + 13;
            else if (time === 4) calc = calc + 8 * 2 + 13;
            else if (time === 5) calc = calc + 35;
            else if (time === 6) calc = calc + 55;
        }
    } else if (floor >= 8 && floor <= 9) {
        if (volume === 1) {
            //물량
            if (quantity === 1) calc = calc + 14;
            else if (quantity === 2) calc = calc + 17;
            else if (quantity === 3) calc = calc + 20;
            else if (quantity === 4) calc = calc + 23;
            else if (quantity === 5) calc = calc + 26;
        } else if (volume === 2) {
            //시간
            if (time === 1) calc = calc + 10;
            else if (time === 2) calc = calc + 14;
            else if (time === 3) calc = calc + 9 + 14;
            else if (time === 4) calc = calc + 9 * 2 + 14;
            else if (time === 5) calc = calc + 35;
            else if (time === 6) calc = calc + 55;
        }
    } else if (floor >= 10 && floor <= 11) {
        if (volume === 1) {
            //물량
            if (quantity === 1) calc = calc + 15;
            else if (quantity === 2) calc = calc + 18;
            else if (quantity === 3) calc = calc + 21;
            else if (quantity === 4) calc = calc + 24;
            else if (quantity === 5) calc = calc + 27;
        } else if (volume === 2) {
            //시간
            if (time === 1) calc = calc + 11;
            else if (time === 2) calc = calc + 15;
            else if (time === 3) calc = calc + 10 + 15;
            else if (time === 4) calc = calc + 10 * 2 + 15;
            else if (time === 5) calc = calc + 40;
            else if (time === 6) calc = calc + 55;
        }
    } else if (floor >= 12 && floor <= 13) {
        if (volume === 1) {
            //물량
            if (quantity === 1) calc = calc + 16;
            else if (quantity === 2) calc = calc + 19;
            else if (quantity === 3) calc = calc + 22;
            else if (quantity === 4) calc = calc + 25;
            else if (quantity === 5) calc = calc + 28;
        } else if (volume === 2) {
            //시간
            if (time === 1) calc = calc + 12;
            else if (time === 2) calc = calc + 16;
            else if (time === 3) calc = calc + 10 + 16;
            else if (time === 4) calc = calc + 10 * 2 + 16;
            else if (time === 5) calc = calc + 40;
            else if (time === 6) calc = calc + 55;
        }
    } else if (floor === 14) {
        if (volume === 1) {
            //물량
            if (quantity === 1) calc = calc + 17;
            else if (quantity === 2) calc = calc + 20;
            else if (quantity === 3) calc = calc + 23;
            else if (quantity === 4) calc = calc + 26;
            else if (quantity === 5) calc = calc + 29;
        } else if (volume === 2) {
            //시간
            if (time === 1) calc = calc + 13;
            else if (time === 2) calc = calc + 17;
            else if (time === 3) calc = calc + 10 + 17;
            else if (time === 4) calc = calc + 10 * 2 + 17;
            else if (time === 5) calc = calc + 45;
            else if (time === 6) calc = calc + 65;
        }
    } else if (floor === 15) {
        if (volume === 1) {
            //물량
            if (quantity === 1) calc = calc + 18;
            else if (quantity === 2) calc = calc + 21;
            else if (quantity === 3) calc = calc + 24;
            else if (quantity === 4) calc = calc + 27;
            else if (quantity === 5) calc = calc + 30;
        } else if (volume === 2) {
            //시간
            if (time === 1) calc = calc + 14;
            else if (time === 2) calc = calc + 18;
            else if (time === 3) calc = calc + 11 + 18;
            else if (time === 4) calc = calc + 11 * 2 + 18;
            else if (time === 5) calc = calc + 45;
            else if (time === 6) calc = calc + 65;
        }
    } else if (floor === 16) {
        if (volume === 1) {
            //물량
            if (quantity === 1) calc = calc + 19;
            else if (quantity === 2) calc = calc + 22;
            else if (quantity === 3) calc = calc + 25;
            else if (quantity === 4) calc = calc + 28;
            else if (quantity === 5) calc = calc + 31;
        } else if (volume === 2) {
            //시간
            if (time === 1) calc = calc + 19;
            else if (time === 2) calc = calc + 19;
            else if (time === 3) calc = calc + 11 + 19;
            else if (time === 4) calc = calc + 11 * 2 + 19;
            else if (time === 5) calc = calc + 45;
            else if (time === 6) calc = calc + 70;
        }
    } else if (floor === 17) {
        if (volume === 1) {
            //물량
            if (quantity === 1) calc = calc + 20;
            else if (quantity === 2) calc = calc + 23;
            else if (quantity === 3) calc = calc + 26;
            else if (quantity === 4) calc = calc + 29;
            else if (quantity === 5) calc = calc + 32;
        } else if (volume === 2) {
            //시간
            if (time === 1) calc = calc + 20;
            else if (time === 2) calc = calc + 20;
            else if (time === 3) calc = calc + 11 + 20;
            else if (time === 4) calc = calc + 11 * 2 + 20;
            else if (time === 5) calc = calc + 45;
            else if (time === 6) calc = calc + 70;
        }
    } else if (floor === 18) {
        if (volume === 1) {
            //물량
            if (quantity === 1) calc = calc + 22;
            else if (quantity === 2) calc = calc + 25;
            else if (quantity === 3) calc = calc + 28;
            else if (quantity === 4) calc = calc + 31;
            else if (quantity === 5) calc = calc + 34;
        } else if (volume === 2) {
            //시간
            if (time === 1) calc = calc + 21;
            else if (time === 2) calc = calc + 21;
            else if (time === 3) calc = calc + 12 + 21;
            else if (time === 4) calc = calc + 12 * 2 + 21;
            else if (time === 5) calc = calc + 55;
            else if (time === 6) calc = calc + 75;
        }
    } else if (floor === 19) {
        if (volume === 1) {
            //물량
            if (quantity === 1) calc = calc + 23;
            else if (quantity === 2) calc = calc + 26;
            else if (quantity === 3) calc = calc + 29;
            else if (quantity === 4) calc = calc + 32;
            else if (quantity === 5) calc = calc + 35;
        } else if (volume === 2) {
            //시간
            if (time === 1) calc = calc + 23;
            else if (time === 2) calc = calc + 23;
            else if (time === 3) calc = calc + 12 + 23;
            else if (time === 4) calc = calc + 12 * 2 + 23;
            else if (time === 5) calc = calc + 55;
            else if (time === 6) calc = calc + 75;
        }
    } else if (floor === 20) {
        if (volume === 1) {
            //물량
            if (quantity === 1) calc = calc + 25;
            else if (quantity === 2) calc = calc + 28;
            else if (quantity === 3) calc = calc + 31;
            else if (quantity === 4) calc = calc + 34;
            else if (quantity === 5) calc = calc + 37;
        } else if (volume === 2) {
            //시간
            if (time === 1) calc = calc + 25;
            else if (time === 2) calc = calc + 25;
            else if (time === 3) calc = calc + 12 + 25;
            else if (time === 4) calc = calc + 12 * 2 + 25;
            else if (time === 5) calc = calc + 60;
            else if (time === 6) calc = calc + 80;
        }
    } else if (floor === 21) {
        if (volume === 1) {
            //물량
            if (quantity === 1) calc = calc + 28;
            else if (quantity === 2) calc = calc + 31;
            else if (quantity === 3) calc = calc + 33;
            else if (quantity === 4) calc = calc + 36;
            else if (quantity === 5) calc = calc + 39;
        } else if (volume === 2) {
            //시간
            if (time === 1) calc = calc + 28;
            else if (time === 2) calc = calc + 28;
            else if (time === 3) calc = calc + 12 + 28;
            else if (time === 4) calc = calc + 12 * 2 + 28;
            else if (time === 5) calc = calc + 65;
            else if (time === 6) calc = calc + 80;
        }
    } else if (floor === 22) {
        if (volume === 1) {
            //물량
            if (quantity === 1) calc = calc + 31;
            else if (quantity === 2) calc = calc + 34;
            else if (quantity === 3) calc = calc + 36;
            else if (quantity === 4) calc = calc + 39;
            else if (quantity === 5) calc = calc + 42;
        } else if (volume === 2) {
            //시간
            if (time === 1) calc = calc + 31;
            else if (time === 2) calc = calc + 31;
            else if (time === 3) calc = calc + 12 + 31;
            else if (time === 4) calc = calc + 12 * 2 + 31;
            else if (time === 5) calc = calc + 65;
            else if (time === 6) calc = calc + 90;
        }
    } else if (floor === 23) {
        if (volume === 1) {
            //물량
            if (quantity === 1) calc = calc + 34;
            else if (quantity === 2) calc = calc + 37;
            else if (quantity === 3) calc = calc + 39;
            else if (quantity === 4) calc = calc + 42;
            else if (quantity === 5) calc = calc + 45;
        } else if (volume === 2) {
            //시간
            if (time === 1) calc = calc + 34;
            else if (time === 2) calc = calc + 34;
            else if (time === 3) calc = calc + 12 + 34;
            else if (time === 4) calc = calc + 12 * 2 + 34;
            else if (time === 5) calc = calc + 70;
            else if (time === 6) calc = calc + 95;
        }
    } else if (floor === 24) {
        calc = calc + 31;
        if (volume === 1) {
            //물량
            if (quantity === 1) calc = calc + 37;
            else if (quantity === 2) calc = calc + 40;
            else if (quantity === 3) calc = calc + 42;
            else if (quantity === 4) calc = calc + 45;
            else if (quantity === 5) calc = calc + 49;
        } else if (volume === 2) {
            //시간
            if (time === 1) calc = calc + 38;
            else if (time === 2) calc = calc + 38;
            else if (time === 3) calc = calc + 12 + 38;
            else if (time === 4) calc = calc + 12 * 2 + 38;
            else if (time === 5) calc = calc + 75;
            else if (time === 6) calc = calc + 100;
        }
    } else if (floor === 25) {
        calc = calc + 36;
        if (volume === 1) {
            //물량
            return "consultation";
        } else if (volume === 2) {
            //시간
            if (time === 1) calc = calc + 43;
            else if (time === 2) calc = calc + 43;
            else if (time === 3) calc = calc + 12 + 43;
            else if (time === 4) calc = calc + 12 * 2 + 43;
            else if (time === 5) calc = calc + 80;
            else if (time === 6) calc = calc + 110;
        }
    } else if (floor === 26) return "consultation";

    return calc * 10000;
};

export const GetSkyPrice = (option, time) => {
    let calc = 0;

    if (option === 1) {
        if (time === 1) calc = calc + 30;
        else if (time === 2) calc = calc + 15 + 30;
        else if (time === 3) calc = calc + 15 * 2 + 30;
        else if (time === 4) calc = calc + 40;
        else if (time === 5) calc = calc + 60;
        else if (time === 6) calc = calc + 1200;
    } else if (option === 2) {
        if (time === 1) calc = calc + 30;
        else if (time === 2) calc = calc + 15 + 30;
        else if (time === 3) calc = calc + 15 * 2 + 30;
        else if (time === 4) calc = calc + 40;
        else if (time === 5) calc = calc + 60;
        else if (time === 6) calc = calc + 1200;
    } else if (option === 3) {
        if (time === 1) calc = calc + 30;
        else if (time === 2) calc = calc + 15 + 30;
        else if (time === 3) calc = calc + 15 * 2 + 30;
        else if (time === 4) calc = calc + 40;
        else if (time === 5) calc = calc + 60;
        else if (time === 6) calc = calc + 1200;
    } else if (option === 4) {
        if (time === 1) calc = calc + 40;
        else if (time === 2) calc = calc + 20 + 40;
        else if (time === 3) calc = calc + 20 * 2 + 40;
        else if (time === 4) calc = calc + 50;
        else if (time === 5) calc = calc + 70;
        else if (time === 6) calc = calc + 1400;
    } else if (option === 5) {
        if (time === 1) calc = calc + 50;
        else if (time === 2) calc = calc + 25 + 50;
        else if (time === 3) calc = calc + 25 * 2 + 50;
        else if (time === 4) calc = calc + 70;
        else if (time === 5) calc = calc + 90;
        else if (time === 6) calc = calc + 1600;
    } else if (option === 6) {
        if (time === 4) calc = calc + 90;
        else if (time === 5) calc = calc + 120;
        else if (time === 6) calc = calc + 2000;
    } else if (option === 7) {
        if (time === 4) calc = calc + 130;
        else if (time === 5) calc = calc + 180;
        else if (time === 6) calc = calc + 2800;
    } else if (option === 8) {
        if (time === 4) calc = calc + 60;
        else if (time === 5) calc = calc + 80;
        else if (time === 6) return "consultation";
    } else if (option === 9) {
        if (time === 4) calc = calc + 80;
        else if (time === 5) calc = calc + 100;
        else if (time === 6) return "consultation";
    }

    return calc * 10000;
};

export const GetEmergencyPrice = (price) => price * 0.25;
export const GetSavePoint = (price) => price * 0.2;
export const GetTax = (price) => price * 0.1;

export const CheckLoading = (data) => {
    let result = [];

    Object.keys(data).map((value) => {
        if (typeof data[value] === "number")
            result.push(data[value] > -1 ? true : false);
    });

    for (let i = 0; i < result.length; i++)
        if (result[i] === false) return false;

    return true;
};

export const Filter = ({ data, period, orderBy }) => {
    console.log("기간 : ", period);

    if (period === "전체 기간") {
        return data;
    }
    const today = new Date();
    const ago = new Date();

    if (period === "1주일") {
        ago.setDate(today.getDate() - 7);
    } else if (period === "1개월") {
        ago.setMonth(today.getMonth() - 1);
    } else if (period === "3개월") {
        ago.setMonth(today.getMonth() - 3);
    } else if (period === "6개월") {
        ago.setMonth(today.getMonth() - 6);
    } else if (period === "12개월") {
        ago.setMonth(today.getMonth() - 12);
    }

    const result = [];
    if (orderBy === "createdAt")
        data.map((value) => {
            const dateTime = new Date(value.createdAt);

            if (dateTime >= ago) {
                result.push(value);
            }
        });
    else if (orderBy === "dateTime")
        data.map((value) => {
            const dateTime = new Date(value.dateTime);

            if (dateTime >= ago) {
                result.push(value);
            }
        });
    else if (orderBy === "date")
        data.map((value) => {
            const dateTime = new Date(value.date);

            if (dateTime >= ago) {
                result.push(value);
            }
        });

    return result;
};

export const GoToOrderPage = (info, order) => {
    if (info.userType === DRIVER) {
        //기사일 경우
        if (order.registUser.id === info.id) {
            //내가 올린 작업인 경우
            if (order.orderStatusId === 6) {
                //완료된 작업인 경우
                return "OrderDetails";
            } else {
                //완료된 작업이 아닌 경우
                return "OrderProgress";
            }
        } else {
            //내가 올린 작업이 아닌 경우
            if (order.orderStatusId === 1) {
                //작업 요청 상태일 경우
                return "OrderDetails";
            } else {
                //나머지 상태일 경우
                if (order.acceptUser === info.id) {
                    //작업자가 나인 경우
                    return "DriverOrderProgress";
                } else {
                    //작업자가 내가 아닌 경우
                    return "OrderDetails";
                }
            }
        }
    } else {
        //일반, 기업일 경우
        if (order.orderStatusId === 6) {
            //완료된 작업인 경우
            return "OrderDetails";
        } else {
            //완료된 작업이 아닌 경우
            return "OrderProgress";
        }
    }
};

export const GoToKakaoNavi = async (address) => {
    console.log(address);

    let latitude = null;
    let longitude = null;
    try {
        const res = await axios.get(
            `https://dapi.kakao.com/v2/local/search/address.json?query=${address}`,
            {
                headers: {
                    Authorization: "KakaoAK 86e0df46fbae745bb4c658276b280088",
                },
            }
        );

        const {
            data: { documents },
        } = res;

        console.log(documents);

        latitude = documents[0].y;
        longitude = documents[0].x;
    } catch (error) {
        console.log(error);
        showErrorMessage("카카오 네비를 실행할 수 없습니다.");
        return;
    }
    Linking.openURL(
        `https://master.d1p7wg3e032x9j.amplifyapp.com/navi?name=${address}&x=${longitude}&y=${latitude}`
    );
};
