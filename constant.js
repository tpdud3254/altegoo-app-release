// export const SERVER = "https://altegoo.shop";
export const SERVER = "https://91e2-121-66-109-244.ngrok-free.app";
export const WSS_SERVER = "wss://91e2-121-66-109-244.ngrok-free.app";

export const PAYMENT_SERVER =
    "https://master.d1p7wg3e032x9j.amplifyapp.com/payment";

export const VALID = "VALID";

export const ORDINARY = "ORDINARY";
export const SPECIAL = "SPECIAL";
export const PERSON = "PERSON";

//TODO: 상수 전환
export const NORMAL = "NORMAL";
export const DRIVER = "DRIVER";
export const COMPANY = "COMPANY";

export const TOKEN = "token";

export const SIGNUP_NAV = {
    NORMAL: ["Agreements", "Identification", "EnterPassword", "SignUpComplete"],
    DRIVER: [
        "Agreements",
        "Identification",
        "EnterPassword",
        "BusinessLicense",
        "RegisterVehicle",
        "VehicleLicense",
        "WorkingArea",
        "RecomendedMember",
        "SignUpComplete",
    ],
    COMPANY: [
        "Agreements",
        "Identification",
        "CompanyInfomation",
        "EnterPassword",
        "BusinessLicense",
        "RecomendedMember",
        "SignUpComplete",
    ],
};

export const REGIST_NAV = [
    "SelectWorkType",
    "SelectDateTime",
    "SearchAddress",
    "SelectFloor",
    "SelectVolume",
    "AddOtherData",
    "RegistDone",
    "Payment",
    "RegistCompleted",
];

export const FONTS = {
    bold: "SpoqaHanSansNeo-Bold",
    light: "SpoqaHanSansNeo-Light",
    medium: "SpoqaHanSansNeo-Medium",
    regular: "SpoqaHanSansNeo-Regular",
    thin: "SpoqaHanSansNeo-Thin",
};
