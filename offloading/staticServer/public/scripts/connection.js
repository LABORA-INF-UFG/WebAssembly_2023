import { io } from "https://cdn.socket.io/4.7.5/socket.io.esm.min.js";

async function initializeServer(serverUrl, width, height) {
    const socket = io(serverUrl, { reconnection: false });

    await new Promise((resolve) => {
        socket.io.on("error", (error) => {
            error = new Error("Could not connect to " + serverUrl);
            window.alert("Não foi possível conectar ao servidor");
            console.error(error);
        });
        resolve();
    });

    await new Promise((resolve) =>
        socket.on("connect", () => {
            socket.emit("initialize alva", { width, height }, () => resolve());
        })
    );

    return socket;
}

export { initializeServer };
