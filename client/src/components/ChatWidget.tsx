import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, User as UserIcon, Settings, ShieldCheck } from "lucide-react";
import { useMessages, useSendMessage } from "../hooks/use-messages";
import { format } from "date-fns";
import { MOCK_USER } from "../lib/mock-data";

interface ChatWidgetProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ChatWidget({ isOpen, onClose }: ChatWidgetProps) {
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Hardcoded to MOCK_USER.id for demo
  const { data: messages = [], isLoading } = useMessages(MOCK_USER.id);
  const sendMessage = useSendMessage();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [isOpen, messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    sendMessage.mutate({
      senderId: MOCK_USER.id,
      receiverId: 2, // Hardcoded recipient for demo
      content: input,
    }, {
      onSuccess: () => {
        setInput("");
        scrollToBottom();
      }
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="fixed bottom-6 right-6 w-full max-w-[380px] h-[550px] bg-card border border-white/10 rounded-2xl shadow-2xl shadow-black/80 flex flex-col z-50 overflow-hidden"
        >
          {/* Header */}
          <div className="p-4 border-b border-white/5 bg-black/20 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center border border-white/10 overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?w=100&h=100&fit=crop" alt="Trader" />
                </div>
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-card rounded-full"></div>
              </div>
              <div>
                <h3 className="font-semibold text-sm flex items-center gap-1 text-white">
                  Trader_0x89 <ShieldCheck className="w-3.5 h-3.5 text-primary" />
                </h3>
                <p className="text-xs text-green-400">Online • P2P Secured</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 text-muted-foreground hover:text-white transition-colors">
                <Settings className="w-4 h-4" />
              </button>
              <button onClick={onClose} className="p-2 text-muted-foreground hover:text-white transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-transparent to-black/20">
            <div className="text-center">
              <span className="text-[10px] uppercase tracking-widest text-muted-foreground bg-white/5 px-3 py-1 rounded-full">
                Intercom P2P Channel Established
              </span>
            </div>
            
            {isLoading ? (
              <div className="flex justify-center p-4">
                <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : (
              messages.map((msg) => {
                const isMe = msg.senderId === MOCK_USER.id;
                return (
                  <div key={msg.id} className={cn("flex flex-col max-w-[85%]", isMe ? "ml-auto items-end" : "mr-auto items-start")}>
                    <div 
                      className={cn(
                        "px-4 py-2.5 rounded-2xl text-sm",
                        isMe 
                          ? "bg-primary text-primary-foreground rounded-tr-sm" 
                          : "bg-white/10 text-white rounded-tl-sm border border-white/5"
                      )}
                    >
                      {msg.content}
                    </div>
                    <span className="text-[10px] text-muted-foreground mt-1 px-1">
                      {msg.createdAt ? format(new Date(msg.createdAt), 'h:mm a') : ''}
                    </span>
                  </div>
                );
              })
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-white/5 bg-black/20">
            <form onSubmit={handleSend} className="relative flex items-center">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Negotiate trade..."
                className="w-full bg-white/5 border border-white/10 rounded-full py-3 pl-4 pr-12 text-sm text-white placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
                disabled={sendMessage.isPending}
              />
              <button 
                type="submit" 
                disabled={!input.trim() || sendMessage.isPending}
                className="absolute right-2 w-8 h-8 flex items-center justify-center bg-primary text-white rounded-full hover:bg-primary/90 disabled:opacity-50 transition-colors"
              >
                <Send className="w-4 h-4 ml-0.5" />
              </button>
            </form>
            <p className="text-[10px] text-center text-muted-foreground mt-3">
              Smart contracts automatically execute agreed terms.
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Simple internal cn helper for ChatWidget
function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(" ");
}
