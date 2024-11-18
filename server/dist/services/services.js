"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractVideoId = void 0;
const extractVideoId = (url) => {
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null; // Return the video ID or null if not found
};
exports.extractVideoId = extractVideoId;
