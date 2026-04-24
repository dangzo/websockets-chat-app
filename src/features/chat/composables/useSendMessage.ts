import useChatSocket from './useChatSocket'

const useSendMessage = () => {
  const { sendMessage } = useChatSocket()

  function submitMessage(text: string) {
    return sendMessage(text)
  }

  return {
    sendMessage: submitMessage
  }
};

export default useSendMessage;