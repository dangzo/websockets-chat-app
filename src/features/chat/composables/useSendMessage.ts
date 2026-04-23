import { useMessagesStore } from '@/store/messages'

const useSendMessage = () => {
  const messagesStore = useMessagesStore()

  function sendMessage(text: string) {
    const newMessage = {
      id: Date.now(), // Using timestamp as a unique ID for simplicity
      authorId: 2, // Assuming the current user has an ID of 2
      text,
      timestamp: new Date().toISOString(),
      own: true
    }
    messagesStore.addMessage(newMessage)
  }

  return {
    sendMessage
  }
};

export default useSendMessage;