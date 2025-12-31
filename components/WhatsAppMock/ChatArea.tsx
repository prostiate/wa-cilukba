import React, { useState, useRef, useEffect } from "react";
import { Avatar } from "./Avatar";
import { BlurText } from "./BlurText";
import { usePrivacy } from "../../context/PrivacyContext";
import {
  Search,
  MoreVertical,
  Paperclip,
  Smile,
  Mic,
  Send,
} from "lucide-react";
import { Message } from "../../types";
import { contacts } from "./Sidebar";

// Mock Data
const singleMessages: Message[] = [
  {
    id: "1",
    text: "Hey, are you free to talk about the project?",
    sender: "them",
    time: "10:30 AM",
  },
  {
    id: "2",
    text: "Yes, sure. Give me 5 minutes.",
    sender: "me",
    time: "10:32 AM",
  },
  {
    id: "3",
    text: "Great. Here is the design draft we discussed.",
    sender: "them",
    time: "10:35 AM",
  },
  {
    id: "4",
    image: "https://picsum.photos/600/400?random=101",
    sender: "them",
    time: "10:35 AM",
    isMedia: true,
  },
  {
    id: "5",
    text: "Looks interesting! But we need to change the header color.",
    sender: "me",
    time: "10:38 AM",
  },
  {
    id: "6",
    text: "Agreed. I will update it and send it back.",
    sender: "them",
    time: "10:40 AM",
  },
  { id: "7", text: "Perfect. Thanks!", sender: "me", time: "10:42 AM" },
];

const groupMessages: Message[] = [
  {
    id: "10",
    text: "Morning Team! Updates on the launch?",
    sender: "them",
    senderName: "John Manager",
    senderColor: "text-orange-500",
    time: "09:00 AM",
  },
  {
    id: "11",
    text: "Backend is ready to deploy.",
    sender: "them",
    senderName: "Sarah Dev",
    senderColor: "text-purple-500",
    time: "09:15 AM",
  },
  {
    id: "12",
    text: "Frontend needs a final polish.",
    sender: "me",
    time: "09:20 AM",
  },
  {
    id: "13",
    text: "I found a bug in the login flow.",
    sender: "them",
    senderName: "Mike QA",
    senderColor: "text-blue-500",
    time: "09:30 AM",
  },
  {
    id: "14",
    image: "https://picsum.photos/600/400?random=102",
    sender: "them",
    senderName: "Mike QA",
    senderColor: "text-blue-500",
    time: "09:31 AM",
    isMedia: true,
  },
  {
    id: "15",
    text: "On it. Will fix by noon.",
    sender: "me",
    time: "09:35 AM",
  },
  {
    id: "16",
    text: "Great work everyone.",
    sender: "them",
    senderName: "John Manager",
    senderColor: "text-orange-500",
    time: "10:30 AM",
  },
];

export const ChatArea: React.FC = () => {
  const { settings, activeChatId } = usePrivacy();
  const [messages, setMessages] = useState<Message[]>(singleMessages);
  const [inputText, setInputText] = useState("");
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const activeContact =
    contacts.find((c) => c.id === activeChatId) || contacts[0];

  useEffect(() => {
    // Switch messages based on active chat
    if (activeContact.isGroup) {
      setMessages(groupMessages);
    } else {
      setMessages(singleMessages);
    }
  }, [activeChatId, activeContact]);

  const scrollToBottom = (behavior: ScrollBehavior = "smooth") => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: scrollContainerRef.current.scrollHeight,
        behavior,
      });
    }
  };

  useEffect(() => {
    // Use instant scroll on first load, smooth after
    scrollToBottom("auto");
  }, []);

  useEffect(() => {
    if (
      messages.length > singleMessages.length ||
      messages.length > groupMessages.length
    ) {
      scrollToBottom("smooth");
    }
  }, [messages]);

  const handleSend = () => {
    if (!inputText.trim()) return;
    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: "me",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    setMessages([...messages, newMessage]);
    setInputText("");
  };

  const isExtensionActive = settings.enableExtension;
  const canHover = isExtensionActive && settings.hoverToReveal;

  return (
    <div className="flex-1 flex flex-col h-full bg-[#efeae2] relative">
      {/* Chat Background */}
      <div className="absolute inset-0 wa-bg pointer-events-none z-0"></div>

      {/* Header */}
      <div className="h-16 bg-[#f0f2f5] px-4 py-2 flex justify-between items-center z-10 border-b border-gray-200">
        <div className="flex items-center cursor-pointer">
          <Avatar
            src={activeContact.avatar}
            size="md"
            blurOverride={settings.chatBlurPhoto}
          />
          <div className="ml-3 flex flex-col">
            <BlurText
              active={settings.chatBlurName}
              className="font-medium text-gray-900 leading-tight"
            >
              {activeContact.name}
            </BlurText>
            <span className="text-xs text-gray-500">
              {activeContact.isGroup
                ? "John, Sarah, Mike, You"
                : "last seen today at 10:45 AM"}
            </span>
          </div>
        </div>
        <div className="flex space-x-4 text-gray-600">
          <Search className="w-5 h-5 cursor-pointer" />
          <MoreVertical className="w-5 h-5 cursor-pointer" />
        </div>
      </div>

      {/* Messages List */}
      <div
        ref={scrollContainerRef}
        className="flex-1 overflow-y-auto p-4 z-10 space-y-2"
      >
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${
              msg.sender === "me" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[70%] rounded-lg p-1 shadow-sm relative text-sm ${
                msg.sender === "me" ? "bg-[#d9fdd3]" : "bg-white"
              }`}
            >
              {/* Group Participant Name */}
              {activeContact.isGroup &&
                msg.sender !== "me" &&
                msg.senderName && (
                  <div
                    className={`px-2 pt-1 text-xs font-bold ${
                      msg.senderColor || "text-gray-500"
                    }`}
                  >
                    <BlurText active={settings.chatBlurGroupParticipant}>
                      {msg.senderName}
                    </BlurText>
                  </div>
                )}

              {msg.isMedia && msg.image ? (
                <div className="p-1 pb-0">
                  <div
                    className={`rounded overflow-hidden relative cursor-pointer group ${
                      isExtensionActive && settings.chatBlurMedia
                        ? "overflow-hidden"
                        : ""
                    }`}
                  >
                    <img
                      src={msg.image}
                      alt="Media"
                      className={`w-full h-auto object-cover max-h-64 transition-all duration-300
                            ${
                              isExtensionActive && settings.chatBlurMedia
                                ? "filter blur-[10px]"
                                : ""
                            }
                            ${
                              isExtensionActive &&
                              settings.chatBlurMedia &&
                              canHover
                                ? "group-hover:filter-none"
                                : ""
                            }
                        `}
                    />
                  </div>
                </div>
              ) : (
                <div className="px-2 pt-1 pb-1">
                  <BlurText active={settings.chatBlurMessage}>
                    {msg.text}
                  </BlurText>
                </div>
              )}

              <div className="flex justify-end px-2 pb-1">
                <span className="text-[10px] text-gray-500 leading-none ml-2 mt-1">
                  {msg.time}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="bg-[#f0f2f5] px-4 py-3 flex items-center space-x-4 z-10">
        <Smile className="w-6 h-6 text-gray-500 cursor-pointer" />
        <Paperclip className="w-6 h-6 text-gray-500 cursor-pointer" />
        <div className="flex-1 bg-white rounded-lg h-10 flex items-center px-4 overflow-hidden">
          <input
            type="text"
            className="w-full h-full outline-none text-sm text-gray-700 placeholder-gray-500"
            placeholder="Type a message"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
        </div>
        {inputText.trim() ? (
          <Send
            className="w-6 h-6 text-gray-500 cursor-pointer hover:text-teal-600 transition-colors"
            onClick={handleSend}
          />
        ) : (
          <Mic className="w-6 h-6 text-gray-500 cursor-pointer" />
        )}
      </div>
    </div>
  );
};
