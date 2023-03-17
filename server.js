import { useRef } from "react";
import { speech } from "./utils";

// export const SERVER = "https://altegoo.shop";
export const SERVER = "https://d0ba-211-59-182-118.jp.ngrok.io";
function createSocket() {
    // ws = new WebSocket(`wss://altegoo.shop`);
    const ws = new WebSocket(`wss://d0ba-211-59-182-118.jp.ngrok.io`);
    console.log(ws);
    ws.onopen = () => {
        // connection opened
        console.log("connected");
        // send a message
        ws.send("hello");
    };

    ws.onmessage = (e) => {
        // a message was received
        console.log("message : ", e.data);
        if (e.data === "hello") {
            speech();
        }
    };

    ws.onerror = (e) => {
        // an error occurred
        console.log("ws.onerror:", e.message);
    };

    ws.onclose = (e) => {
        // connection closed
        console.log("ws.onclose:", e);
        setTimeout(() => createSocket(), 1000);
    };

    // return () => {
    //     ws.close();
    // };
}

// export const ws = new WebSocket(`wss://altegoo.shop`);

createSocket();
