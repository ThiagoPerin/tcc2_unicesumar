import dotenv from "dotenv";
dotenv.config();
import app from "../app";
import http from "node:http";
import mysql from "mysql2";

const PORT = normalizePort(process.env["PORT"] || "3000");

app.set("port", PORT);

const server = http.createServer(app);

server.on("error", onErrorHandler);
server.on("listening", onListeningHandler);

process.on("exit", () => {
    console.log("exiting");
    server.close();
});
process.on("uncaughtException", () => {
    console.error("uncaught exception");
    server.close();
});
process.on("unhandledRejection", () => {
    console.error("unhandled rejection");
    server.close();
});
process.on("SIGTERM", () => {
    console.log("SIGTERM");
    server.close();
});

export const pool = mysql.createPool({
    host: process.env["MYSQL_HOST"] as string,
    port: Number(process.env["MYSQL_PORT"]),
    user: process.env["MYSQL_USER"] as string,
    password: process.env["MYSQL_PASS"] as string,
    waitForConnections: true,
    connectionLimit: 5,
    idleTimeout: 300000,
    queueLimit: 0,
});

const sql = "SELECT 1";

try {
    pool.query(sql, (err, _) => {
        if (err) {
            console.error(err);
            throw err;
        };
        console.log("Banco de dados iniciado.");
    });
    server.listen(PORT);
} catch (e) {
    console.error(e);
}

function normalizePort(port: string) {
    const normalizedPort = parseInt(port, 10);
    if (isNaN(normalizedPort)) return port; // named pipe 
    if (normalizedPort >= 0) return normalizedPort; // port number 
    return false;
}

function onErrorHandler(error: NodeSystemError) {
    if (error.syscall !== "listen") {
        throw error;
    }

    const bind = typeof PORT === "string"
        ? "Pipe " + PORT
        : "Port " + PORT;

    // handle specific listen errors with friendly messages 
    switch (error.code) {
        case "EACCES":
            console.error(bind + " requires elevated privileges");
            process.exit(1);
            break;
        case "EADDRINUSE":
            console.error(bind + " is already in use");
            process.exit(1);
            break;
        default:
            throw error;
    }
}

function onListeningHandler() {
    const addr = server.address();
    const bind = typeof addr === "string"
        ? "pipe " + addr
        : "port " + (addr?.port || PORT);
    console.log("Listening on " + bind);
    console.log(`http://localhost:${PORT}/app`);
}

interface NodeSystemError extends Error {
    address?: string; //If present, the address to which a network connection failed 
    code: string;// The string error code 
    dest: string;// If present, the file path destination when reporting a file system error 
    errno: number;// The system-provided error number 
    info?: unknown;// If present, extra details about the error condition 
    message: string;// A system-provided human-readable description of the error 
    path?: string;// If present, the file path when reporting a file system error 
    port?: number;// If present, the network connection port that is not available 
    syscall: string;// The name of the system call that triggered the error 
}