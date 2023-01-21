//A server-side application using Node.js, Express, TypeScript, Mongoose for MongoDB as ORM.

import express, { Request, Response } from "express";
import mongoose from 'mongoose';
import { MessageSchema } from "./schemas/message";
import { GroupSchema } from "./schemas/group";
import { UserSchema } from "./schemas/user";
import { checkJwt } from "./middleware/checkJwt";

const app = express();
const port = 3000;

//connect to the MongoDB
mongoose.connect("mongodb://localhost:27017/whatsapp");

const Message = mongoose.model("Message", MessageSchema);
const Group = mongoose.model("Group", GroupSchema);
const User = mongoose.model("User", UserSchema);

app.use(express.json());

app.use(checkJwt);

app.get("/messages", async (req: Request, res: Response) => {
  // Get the page number and page size from the query parameters
  let page = parseInt(req.query.page) || 1;
  let size = parseInt(req.query.size) || 10;

  // Calculate the start index and end index of the messages to return
  let start = (page - 1) * size;
  let messages = await Message.find({ group: req.query.groupId }).skip(start).limit(size);

  res.send(messages);
});

app.post("/messages", async (req: Request, res: Response) => {
  let user = await User.findById(req.body.userId);
  let group = await Group.findById(req.body.groupId);

  if (!user || !group) {
    res.status(404).send();
  }

  let message = new Message({
    user: user,
    group: group,
    message: req.body.message,
    createdAt: new Date()
  });

  await message.save();
  res.send(message);
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
// This application uses Mongoose to interact with the database. It also uses the checkJwt middleware for token validation and authentication.
// The application has two endpoints:
// GET /messages: This endpoint accepts query parameters page and size and returns a paginated list of messages in the group, filtered by group id.
// POST /messages: This endpoint accepts a JSON payload containing the userId, groupId, and message and creates a new message in the group. It also check if user and group exists before creating the message.
