import mongoose, { Schema } from "mongoose";

const MessageSchema = new Schema({
    group: { type: Schema.Types.ObjectId, ref: "group", required: true },
    user: { type: Schema.Types.ObjectId, ref: "user", required: true },
    message: { type: String, required: true },
    createdAt: { type: Date, required: true },
});

export { MessageSchema };