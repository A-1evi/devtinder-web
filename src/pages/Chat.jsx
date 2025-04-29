import { useState, useEffect, useRef } from "react";
import { createSocketConnection } from "../utils/socket";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Chat = () => {
  const { targetId } = useParams();
  const user = useSelector((store) => store.user);
  const userId = user?._id;
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [socket, setSocket] = useState(null);
  const lastMessageRef = useRef(null);

  const fetchMessage = async () => {
    try {
      const chat = await axios.get(BASE_URL + "/chat/" + targetId, {
        withCredentials: true,
      });
      console.log(chat.data.messages);

      const chatMessage = chat.data.messages.map((msg) => {
        const { senderId, message } = msg;
        return {
          firstName: senderId.firstName,
          lastName: senderId.lastName,
          createdAt: msg.createdAt,
          message,
        };
      });
      setMessages(chatMessage);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  useEffect(() => {
    fetchMessage();
  }, []);
  useEffect(() => {
    const socketConnection = createSocketConnection();
    setSocket(socketConnection);

    if (!userId) return;
    socketConnection.emit("joinChat", {
      firstName: user.firstName,
      lastName: user.lastName,
      targetId,
      userId,
    });

    socketConnection.on(
      "messageRecieved",
      ({ firstName, lastName, message, createdAt }) => {
        setMessages((prev) => [
          ...prev,
          { firstName, lastName, message, createdAt },
        ]);
      }
    );

    return () => {
      socketConnection.disconnect();
    };
  }, [userId, targetId]);

  const sendMessage = () => {
    if (!newMessage || !socket) return;
    socket.emit("sendMessage", {
      firstName: user.firstName,
      lastName: user.lastName,
      userId,
      targetId,
      message: newMessage,
    });
    setNewMessage("");
  };

  return (
    <div>
      <div className="w-3/4 mx-auto border-2 border-gray-200  rounded-lg p-4 h-[73vh] overflow-y-auto">
        <div className="border-b-2 border-gray-300 pb-2">CHAT</div>

        {messages &&
          messages.map((msg, index) => (
            <div
              key={index}
              className={`chat ${
                msg.firstName === user.firstName ? "chat-end" : "chat-start"
              }`}
            >
              <div className="chat-image avatar">
                {/* <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS chat bubble component"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  />
                </div> */}
              </div>
              <div className="chat-header">
                {`${msg.firstName} ${msg.lastName}`}
                <time className="text-xs opacity-50">
                  {new Date(msg.createdAt).toLocaleTimeString().slice(0, 5)}
                </time>
              </div>
              <div
                className="chat-bubble"
                ref={index === messages.length - 1 ? lastMessageRef : null}
              >
                {msg.message}
              </div>
              <div className="chat-footer opacity-50">Delivered</div>
            </div>
          ))}
      </div>
      <div className="w-3/4 mx-auto rounded-lg p-4 overflow-y-auto">
        <div className="flex ">
          <input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            type="text"
            placeholder="Message"
            className="w-full placeholder:text-gray-400 px-2"
          />
          <button onClick={sendMessage} className="btn btn-primary">
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
