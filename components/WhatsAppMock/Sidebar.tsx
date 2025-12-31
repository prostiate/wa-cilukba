import React from 'react';
import { Contact } from '../../types';
import { Avatar } from './Avatar';
import { BlurText } from './BlurText';
import { usePrivacy } from '../../context/PrivacyContext';
import { MessageSquarePlus, MoreVertical, CircleDashed } from 'lucide-react';

const contacts: Contact[] = [
  { id: '1', name: 'Alice Freeman', avatar: 'https://picsum.photos/200?random=1', lastMessage: 'See you at the meeting tomorrow!', time: '10:42 AM', unread: 2 },
  { id: '2', name: 'Team Alpha', avatar: 'https://picsum.photos/200?random=2', lastMessage: 'John: Please check the latest deployment logs.', time: 'Yesterday', unread: 0 },
  { id: '3', name: 'Mom', avatar: 'https://picsum.photos/200?random=3', lastMessage: 'Call me when you are free.', time: 'Yesterday', unread: 0 },
  { id: '4', name: 'Sarah Designer', avatar: 'https://picsum.photos/200?random=4', lastMessage: '📷 Photo', time: 'Tuesday', unread: 0 },
  { id: '5', name: 'Gym Buddies', avatar: 'https://picsum.photos/200?random=5', lastMessage: 'Mike: Leg day today?', time: 'Monday', unread: 1 },
  { id: '6', name: 'Unknown Number', avatar: 'https://picsum.photos/200?random=6', lastMessage: 'Your package has arrived.', time: 'Sunday', unread: 0 },
  { id: '7', name: 'David Smith', avatar: 'https://picsum.photos/200?random=7', lastMessage: 'Can you send the report?', time: 'Last week', unread: 0 },
];

export const Sidebar: React.FC = () => {
  const { settings } = usePrivacy();

  return (
    <div className="w-[400px] h-full flex flex-col border-r border-gray-200 bg-white">
      {/* Header */}
      <div className="h-16 bg-[#f0f2f5] flex items-center justify-between px-4 py-2 shrink-0">
        <Avatar src="https://picsum.photos/200?random=99" size="md" />
        <div className="flex space-x-4 text-gray-600">
           <CircleDashed className="w-6 h-6 cursor-pointer" />
           <MessageSquarePlus className="w-6 h-6 cursor-pointer" />
           <MoreVertical className="w-6 h-6 cursor-pointer" />
        </div>
      </div>

      {/* Search (Visual Only) */}
      <div className="p-2 bg-white border-b border-gray-100">
         <div className="bg-[#f0f2f5] rounded-lg h-9 flex items-center px-4 text-sm text-gray-500">
            Search or start new chat
         </div>
      </div>

      {/* Contact List */}
      <div className="flex-1 overflow-y-auto">
        {contacts.map((contact) => (
          <div key={contact.id} className="flex items-center p-3 hover:bg-[#f5f6f6] cursor-pointer group transition-colors">
            <div className="mr-3">
               <Avatar src={contact.avatar} size="lg" />
            </div>
            <div className="flex-1 border-b border-gray-100 pb-3 group-hover:border-transparent min-w-0">
              <div className="flex justify-between items-baseline mb-1">
                <BlurText active={settings.blurNames} className="font-medium text-gray-900 truncate">
                  {contact.name}
                </BlurText>
                <span className={`text-xs ${contact.unread > 0 ? 'text-teal-500 font-medium' : 'text-gray-400'}`}>
                  {contact.time}
                </span>
              </div>
              <div className="flex justify-between items-center">
                 <BlurText active={settings.blurPreviews} className="text-sm text-gray-500 truncate w-full pr-2">
                    {contact.lastMessage}
                 </BlurText>
                 {contact.unread > 0 && (
                     <span className="bg-teal-500 text-white text-xs font-bold rounded-full h-5 min-w-[1.25rem] px-1 flex items-center justify-center">
                         {contact.unread}
                     </span>
                 )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
