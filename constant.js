// export const SERVER = "https://altegoo.shop";
export const SERVER = "https://351d-121-66-109-244.ngrok-free.app";
export const WSS_SERVER = "wss://351d-121-66-109-244.ngrok-free.app";

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
        "RecommendedMember",
        "SignUpComplete",
    ],
    COMPANY: [
        "Agreements",
        "Identification",
        "CompanyInfomation",
        "EnterPassword",
        "BusinessLicense",
        "RecommendedMember",
        "SignUpComplete",
    ],
};

export const REGIST_NAV = [
    "RegistOrder",
    "SelectDateTime",
    "SearchAddress",
    "AddOtherData",
    "CheckOrderPrice",
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
