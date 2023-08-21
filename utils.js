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
            if (quantity === 1) calc = calc + 7;
            else if (quantity === 2) calc = calc + 10;
            else if (quantity === 3) calc = calc + 12;
            else if (quantity === 4) calc = calc + 15;
            else if (quantity === 5) calc = calc + 18;
            else if (quantity === 6) calc = calc + 21;
        } else if (volume === 2) {
            //시간
            if (time === 1) calc = calc + 10;
            else if (time === 2) calc = calc + 6 + 10;
            else if (time === 3) calc = calc + 6 * 2 + 10;
            else if (time === 4) calc = calc + 6 * 3 + 10;
            else if (time === 5) calc = calc + 30;
            else if (time === 6) calc = calc + 45;
        }
    } else if (floor >= 6 && floor <= 7) {
        if (volume === 1) {
            //물량
            if (quantity === 1) calc = calc + 8;
            else if (quantity === 2) calc = calc + 11;
            else if (quantity === 3) calc = calc + 13;
            else if (quantity === 4) calc = calc + 16;
            else if (quantity === 5) calc = calc + 19;
            else if (quantity === 6) calc = calc + 22;
        } else if (volume === 2) {
            //시간
            if (time === 1) calc = calc + 11;
            else if (time === 2) calc = calc + 6 + 11;
            else if (time === 3) calc = calc + 6 * 2 + 11;
            else if (time === 4) calc = calc + 6 * 3 + 11;
            else if (time === 5) calc = calc + 35;
            else if (time === 6) calc = calc + 50;
        }
    } else if (floor >= 8 && floor <= 9) {
        if (volume === 1) {
            //물량
            if (quantity === 1) calc = calc + 9;
            else if (quantity === 2) calc = calc + 12;
            else if (quantity === 3) calc = calc + 14;
            else if (quantity === 4) calc = calc + 17;
            else if (quantity === 5) calc = calc + 20;
            else if (quantity === 6) calc = calc + 23;
        } else if (volume === 2) {
            //시간
            if (time === 1) calc = calc + 12;
            else if (time === 2) calc = calc + 6 + 12;
            else if (time === 3) calc = calc + 6 * 2 + 12;
            else if (time === 4) calc = calc + 6 * 3 + 12;
            else if (time === 5) calc = calc + 35;
            else if (time === 6) calc = calc + 50;
        }
    } else if (floor >= 10 && floor <= 11) {
        if (volume === 1) {
            //물량
            if (quantity === 1) calc = calc + 10;
            else if (quantity === 2) calc = calc + 13;
            else if (quantity === 3) calc = calc + 15;
            else if (quantity === 4) calc = calc + 18;
            else if (quantity === 5) calc = calc + 21;
            else if (quantity === 6) calc = calc + 24;
        } else if (volume === 2) {
            //시간
            if (time === 1) calc = calc + 13;
            else if (time === 2) calc = calc + 6 + 13;
            else if (time === 3) calc = calc + 6 * 2 + 13;
            else if (time === 4) calc = calc + 6 * 3 + 13;
            else if (time === 5) calc = calc + 40;
            else if (time === 6) calc = calc + 55;
        }
    } else if (floor >= 12 && floor <= 13) {
        if (volume === 1) {
            //물량
            if (quantity === 1) calc = calc + 11;
            else if (quantity === 2) calc = calc + 14;
            else if (quantity === 3) calc = calc + 16;
            else if (quantity === 4) calc = calc + 19;
            else if (quantity === 5) calc = calc + 22;
            else if (quantity === 6) calc = calc + 25;
        } else if (volume === 2) {
            //시간
            if (time === 1) calc = calc + 14;
            else if (time === 2) calc = calc + 8 + 14;
            else if (time === 3) calc = calc + 8 * 2 + 14;
            else if (time === 4) calc = calc + 8 * 3 + 14;
            else if (time === 5) calc = calc + 40;
            else if (time === 6) calc = calc + 55;
        }
    } else if (floor === 14) {
        if (volume === 1) {
            //물량
            if (quantity === 1) calc = calc + 12;
            else if (quantity === 2) calc = calc + 15;
            else if (quantity === 3) calc = calc + 17;
            else if (quantity === 4) calc = calc + 21;
            else if (quantity === 5) calc = calc + 25;
            else if (quantity === 6) calc = calc + 29;
        } else if (volume === 2) {
            //시간
            if (time === 1) calc = calc + 15;
            else if (time === 2) calc = calc + 8 + 15;
            else if (time === 3) calc = calc + 8 * 2 + 15;
            else if (time === 4) calc = calc + 8 * 3 + 15;
            else if (time === 5) calc = calc + 45;
            else if (time === 6) calc = calc + 60;
        }
    } else if (floor === 15) {
        if (volume === 1) {
            //물량
            if (quantity === 1) calc = calc + 13;
            else if (quantity === 2) calc = calc + 16;
            else if (quantity === 3) calc = calc + 18;
            else if (quantity === 4) calc = calc + 22;
            else if (quantity === 5) calc = calc + 26;
            else if (quantity === 6) calc = calc + 30;
        } else if (volume === 2) {
            //시간
            if (time === 1) calc = calc + 16;
            else if (time === 2) calc = calc + 8 + 16;
            else if (time === 3) calc = calc + 8 * 2 + 16;
            else if (time === 4) calc = calc + 8 * 3 + 16;
            else if (time === 5) calc = calc + 45;
            else if (time === 6) calc = calc + 60;
        }
    } else if (floor === 16) {
        if (volume === 1) {
            //물량
            if (quantity === 1) calc = calc + 14;
            else if (quantity === 2) calc = calc + 17;
            else if (quantity === 3) calc = calc + 19;
            else if (quantity === 4) calc = calc + 23;
            else if (quantity === 5) calc = calc + 27;
            else if (quantity === 6) calc = calc + 31;
        } else if (volume === 2) {
            //시간
            if (time === 1) calc = calc + 17;
            else if (time === 2) calc = calc + 8 + 17;
            else if (time === 3) calc = calc + 8 * 2 + 17;
            else if (time === 4) calc = calc + 8 * 3 + 17;
            else if (time === 5) calc = calc + 50;
            else if (time === 6) calc = calc + 65;
        }
    } else if (floor === 17) {
        if (volume === 1) {
            //물량
            if (quantity === 1) calc = calc + 15;
            else if (quantity === 2) calc = calc + 18;
            else if (quantity === 3) calc = calc + 20;
            else if (quantity === 4) calc = calc + 24;
            else if (quantity === 5) calc = calc + 28;
            else if (quantity === 6) calc = calc + 32;
        } else if (volume === 2) {
            //시간
            if (time === 1) calc = calc + 18;
            else if (time === 2) calc = calc + 8 + 18;
            else if (time === 3) calc = calc + 8 * 2 + 18;
            else if (time === 4) calc = calc + 8 * 3 + 18;
            else if (time === 5) calc = calc + 50;
            else if (time === 6) calc = calc + 65;
        }
    } else if (floor === 18) {
        if (volume === 1) {
            //물량
            if (quantity === 1) calc = calc + 16;
            else if (quantity === 2) calc = calc + 19;
            else if (quantity === 3) calc = calc + 22;
            else if (quantity === 4) calc = calc + 26;
            else if (quantity === 5) calc = calc + 30;
            else if (quantity === 6) calc = calc + 34;
        } else if (volume === 2) {
            //시간
            if (time === 1) calc = calc + 20;
            else if (time === 2) calc = calc + 10 + 20;
            else if (time === 3) calc = calc + 10 * 2 + 20;
            else if (time === 4) calc = calc + 10 * 3 + 20;
            else if (time === 5) calc = calc + 55;
            else if (time === 6) calc = calc + 70;
        }
    } else if (floor === 19) {
        if (volume === 1) {
            //물량
            if (quantity === 1) calc = calc + 18;
            else if (quantity === 2) calc = calc + 19;
            else if (quantity === 3) calc = calc + 24;
            else if (quantity === 4) calc = calc + 28;
            else if (quantity === 5) calc = calc + 32;
            else if (quantity === 6) calc = calc + 36;
        } else if (volume === 2) {
            //시간
            if (time === 1) calc = calc + 22;
            else if (time === 2) calc = calc + 10 + 22;
            else if (time === 3) calc = calc + 10 * 2 + 22;
            else if (time === 4) calc = calc + 10 * 3 + 22;
            else if (time === 5) calc = calc + 55;
            else if (time === 6) calc = calc + 70;
        }
    } else if (floor === 20) {
        if (volume === 1) {
            //물량
            if (quantity === 1) calc = calc + 21;
            else if (quantity === 2) calc = calc + 23;
            else if (quantity === 3) calc = calc + 26;
            else if (quantity === 4) calc = calc + 30;
            else if (quantity === 5) calc = calc + 34;
            else if (quantity === 6) calc = calc + 38;
        } else if (volume === 2) {
            //시간
            if (time === 1) calc = calc + 24;
            else if (time === 2) calc = calc + 10 + 24;
            else if (time === 3) calc = calc + 10 * 2 + 24;
            else if (time === 4) calc = calc + 10 * 3 + 24;
            else if (time === 5) calc = calc + 60;
            else if (time === 6) calc = calc + 75;
        }
    } else if (floor === 21) {
        if (volume === 1) {
            //물량
            if (quantity === 1) calc = calc + 23;
            else if (quantity === 2) calc = calc + 26;
            else if (quantity === 3) calc = calc + 29;
            else if (quantity === 4) calc = calc + 34;
            else if (quantity === 5) calc = calc + 39;
            else if (quantity === 6) calc = calc + 44;
        } else if (volume === 2) {
            //시간
            if (time === 1) calc = calc + 27;
            else if (time === 2) calc = calc + 10 + 27;
            else if (time === 3) calc = calc + 10 * 2 + 27;
            else if (time === 4) calc = calc + 10 * 3 + 27;
            else if (time === 5) calc = calc + 60;
            else if (time === 6) calc = calc + 80;
        }
    } else if (floor === 22) {
        if (volume === 1) {
            //물량
            if (quantity === 1) calc = calc + 26;
            else if (quantity === 2) calc = calc + 39;
            else if (quantity === 3) calc = calc + 32;
            else if (quantity === 4) calc = calc + 37;
            else if (quantity === 5) calc = calc + 42;
            else if (quantity === 6) calc = calc + 47;
        } else if (volume === 2) {
            //시간
            if (time === 1) calc = calc + 30;
            else if (time === 2) calc = calc + 10 + 30;
            else if (time === 3) calc = calc + 10 * 2 + 30;
            else if (time === 4) calc = calc + 10 * 3 + 30;
            else if (time === 5) calc = calc + 65;
            else if (time === 6) calc = calc + 85;
        }
    } else if (floor === 23) {
        if (volume === 1) {
            //물량
            if (quantity === 1) calc = calc + 29;
            else if (quantity === 2) calc = calc + 32;
            else if (quantity === 3) calc = calc + 35;
            else if (quantity === 4) calc = calc + 40;
            else if (quantity === 5) calc = calc + 45;
            else if (quantity === 6) calc = calc + 50;
        } else if (volume === 2) {
            //시간
            if (time === 1) calc = calc + 33;
            else if (time === 2) calc = calc + 10 + 33;
            else if (time === 3) calc = calc + 10 * 2 + 33;
            else if (time === 4) calc = calc + 10 * 3 + 33;
            else if (time === 5) calc = calc + 65;
            else if (time === 6) calc = calc + 90;
        }
    } else if (floor === 24) {
        calc = calc + 31;
        if (volume === 1) {
            //물량
            return "consultation";
        } else if (volume === 2) {
            //시간
            if (time === 1) calc = calc + 37;
            else if (time === 2) calc = calc + 10 + 37;
            else if (time === 3) calc = calc + 10 * 2 + 37;
            else if (time === 4) calc = calc + 10 * 3 + 37;
            else if (time === 5) calc = calc + 70;
            else if (time === 6) calc = calc + 95;
        }
    } else if (floor === 25) {
        calc = calc + 36;
        if (volume === 1) {
            //물량
            return "consultation";
        } else if (volume === 2) {
            //시간
            if (time === 1) calc = calc + 42;
            else if (time === 2) calc = calc + 10 + 42;
            else if (time === 3) calc = calc + 10 * 2 + 42;
            else if (time === 4) calc = calc + 10 * 3 + 42;
            else if (time === 5) calc = calc + 75;
            else if (time === 6) calc = calc + 105;
        }
    } else if (floor === 26) return "consultation";

    return calc * 10000;
};

export const GetSkyPrice = (floor, time) => {
    let calc = 0;

    if (floor >= 2 && floor <= 7) {
        if (time === 1) calc = calc + 20;
        else if (time === 2) calc = calc + 15 + 20;
        else if (time === 3) calc = calc + 15 * 2 + 20;
        else if (time === 4) calc = calc + 15 * 3 + 20;
        else if (time === 5) calc = calc + 40;
        else if (time === 6) calc = calc + 60;
    } else if (floor >= 8 && floor <= 11) {
        if (time === 1) calc = calc + 35;
        else if (time === 2) calc = calc + 20 + 35;
        else if (time === 3) calc = calc + 20 * 2 + 35;
        else if (time === 4) calc = calc + 20 * 3 + 35;
        else if (time === 5) calc = calc + 50;
        else if (time === 6) calc = calc + 70;
    } else if (floor >= 12 && floor <= 14) {
        if (time === 1) calc = calc + 40;
        else if (time === 2) calc = calc + 20 + 40;
        else if (time === 3) calc = calc + 20 * 2 + 40;
        else if (time === 4) calc = calc + 20 * 3 + 40;
        else if (time === 5) calc = calc + 70;
        else if (time === 6) calc = calc + 90;
    } else if (floor >= 15 && floor <= 17) {
        if (time === 1) calc = calc + 0;
        else if (time === 2) calc = calc + 30 + 0;
        else if (time === 3) calc = calc + 30 * 2 + 0;
        else if (time === 4) calc = calc + 30 * 3 + 0;
        else if (time === 5) calc = calc + 90;
        else if (time === 6) calc = calc + 130;
    } else if (floor >= 18 && floor <= 20) {
        if (time === 1) calc = calc + 0;
        else if (time === 2) calc = calc + 40 + 0;
        else if (time === 3) calc = calc + 40 * 2 + 0;
        else if (time === 4) calc = calc + 40 * 3 + 0;
        else if (time === 5) calc = calc + 130;
        else if (time === 6) calc = calc + 180;
    } else if (floor === 21) return "consultation";

    return calc * 10000;
};

export const GetEmergencyPrice = (price) => price * 0.25;
