const setToScrollChat = (position: string) => {
  const chatContainer = document.getElementById('message-box') as HTMLElement;
  setTimeout(() => {
    chatContainer.scrollTop =
      position === 'down' ? chatContainer.scrollHeight + 300 : 0;
  }, 0);
};

export default setToScrollChat;
