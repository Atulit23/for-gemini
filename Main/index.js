const express = require("express");
var cors = require("cors");
const axios = require("axios");
const http = require("http");
const socketIo = require("socket.io");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI("AIzaSyC93XxpL8z7dz4UjNBvECFYaobAOQre0Bk");

const model = genAI.getGenerativeModel({ model: "gemini-pro" });

const app = express();
const server = http.createServer(app);

const PORT = 8001;

app.use(express.json());

app.use(cors());

// io.on("connection", (socket) => {
//   console.log("client connected: ", socket.id);
//   const roomId = socket.id

//   socket.on("disconnect", (reason) => {
//     console.log(reason);
//   });
//   socket.join('roomId');

//   // socket.on("joinRoom", (room) => {
//   //   console.log(room)
//   // });

//   socket.on("message", async (data) => {
//     console.log("Received message from client:", data);

//     let history = [];
//     data.array?.map((item) => {
//       history.push(
//         { role: "user", parts: [{ text: item?.question }] },
//         { role: "model", parts: [{ text: item?.answer }] }
//       );
//     });

//     const chat = model.startChat({
//       history: history,
//     });

//     const result = await chat.sendMessageStream(data.text);

//     for await (const chunk of result.stream) {
//       const chunkText = chunk.text();
//       console.log(chunkText);
//       const response = `${chunkText}`;
//       console.log(roomId)
//       io.to('roomId').emit("response", response);
//     }

//     // const response = await result.response;
//     // const text = response.text();

//     // console.log(text);
//     // res.send({gen_response: text})
//   });
// });

app.post("/generate", async (req, res) => {
  const query = req.body;

  const result = await model.generateContent(query.prompt);

  const response = await result.response;
  const text = response.text();

  console.log(text);
  res.send({ gen_response: text });
});

app.get('/', (req, res) => {
  res.send("Hi")
})

server.listen(PORT, (err) => {
  if (err) console.log(err);
  console.log("Server running on Port ", PORT);
});
