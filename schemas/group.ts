import mongoose, { Schema } from "mongoose";

const GroupSchema = new Schema({
    name: { type: String, required: true },
    createdAt: { type: Date, required: true },
    updatedAt: { type: Date, required: true },
    members: [{
        user: { type: Schema.Types.ObjectId, ref: "user", required: true },
        role: { type: String, required: true }
    }]
});

export { GroupSchema };