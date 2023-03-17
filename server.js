import { useRef } from "react";
import { speech } from "./utils";

// export const SERVER = "https://altegoo.shop";
export const SERVER = "https://d0ba-211-59-182-118.jp.ngrok.io";

function createSocket() {
    // ws = new WebSocket(`wss://altegoo.shop`);
    const ws = new WebSocket(`wss://d0ba-211-59-182-118.jp.ngrok.io`);

    ws.onopen = (e) => {
        // connection opened
        console.log("connected");

        // send a message
        // ws.send("hello");
    };

    ws.onmessage = (e) => {
        // a message was received
        console.log("message : ", e.data);
        const parsed = JSON.parse(e.data);

        if (parsed.type === "REGIST") {
            speech(parsed.tts_msg, parsed.exceptionUserId);
        }
    };

    ws.onerror = (e) => {
        // an error occurred
        console.log("ws.onerror:", e.message);
    };

    ws.onclose = (e) => {
        // connection closed
        console.log("ws.onclose:", e);
        // setTimeout(() => createSocket(), 1000);
    };

    // ws.close();
}

// export const ws = new WebSocket(`wss://altegoo.shop`);

createSocket();
