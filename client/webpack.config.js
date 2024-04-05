import { resolve } from "path"

module.exports = {
    resolve: {
        fallback: {
            path: false,
            buffer: false,
            crypto: false,
        
            "http": require.resolve("stream-http")
        },
    },
};