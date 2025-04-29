import { useState, useEffect } from 'react';

const qaPairs = [
  { question: 'Where are you located?', answer: 'We are located in South, Caloocan, Philippines.' },
  { question: 'What is your Facebook page?', answer: 'You can visit us at www.facebook.com/loverivi.ph' },
  { question: 'What is your email?', answer: 'You can reach us at loverivi28@gmail.com' },
  { question: 'Do you have Instagram?', answer: 'Yes! Follow us at @loverivicustomgiftsandprints' },
  { question: 'What is your contact number?', answer: 'You can call us at 0927 009 2386.' },
  { question: 'What do you sell?', answer: 'We sell custom gifts, souvenirs, mementos, and keepsakes.' },
  { question: 'What services do you offer?', answer: 'We offer printing and customized gift services.' },
  { question: 'How can I shop?', answer: 'Go to our SHOP page to browse and purchase items.' },
];

type Message = { sender: 'user' | 'bot'; text: string };

function Chatbot() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isCollapsed, setIsCollapsed] = useState(() => {
      // Read from localStorage on first render
      const saved = localStorage.getItem('chatbot-collapsed');
      return saved === null ? false : JSON.parse(saved);
    });
  
    useEffect(() => {
      // Save to localStorage whenever isCollapsed changes
      localStorage.setItem('chatbot-collapsed', JSON.stringify(isCollapsed));
    }, [isCollapsed]);

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = { sender: 'user', text };
    const matched = qaPairs.find(q => text.toLowerCase().includes(q.question.toLowerCase()));
    const botMessage: Message = matched
      ? { sender: 'bot', text: matched.answer }
      : { sender: 'bot', text: "Sorry, I didn't understand. Please ask something like 'Where are you located?'" };

    setMessages([...messages, userMessage, botMessage]);
    setInput('');
  };

  const handleQuestionClick = (question: string) => {
    handleSend(question);
  };

  return (
    <>
      {isCollapsed ? (
        <button
          onClick={() => setIsCollapsed(false)}
          className="fixed bottom-5 right-5 bg-pink-400 text-white p-3 rounded-full shadow-lg hover:bg-pink-500 z-50"
          aria-label="Open chat"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-4l-4 4z" />
          </svg>
        </button>
      ) : (
        <div
          className="fixed bottom-5 right-5 w-130 bg-white shadow-xl rounded-lg p-4 border border-pink-300 z-50"
          style={{
            fontFamily: '"TT Firs Text Trial Light", sans-serif',
          }}
        >
          <button
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            onClick={() => setIsCollapsed(true)}
            aria-label="Minimize chat"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
          <div className="h-64 overflow-y-auto mb-2 border-b pb-2">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`mb-2 text-sm ${
                  msg.sender === 'user' ? 'text-right' : 'text-left text-pink-600'
                }`}
              >
                <span
                  className={`inline-block p-2 rounded-md ${
                    msg.sender === 'user' ? 'bg-blue-200' : 'bg-gray-200'
                  }`}
                >
                  {msg.text}
                </span>
              </div>
            ))}
          </div>
          <div className="mb-2">
            <p className="text-sm font-bold text-gray-700 mb-1">Quick Questions:</p>
            <div className="flex flex-wrap gap-2">
              {qaPairs.map((qa, idx) => (
                <button
                  key={idx}
                  className="text-xs bg-pink-200 text-pink-700 px-2 py-1 rounded-md hover:bg-pink-300"
                  onClick={() => handleQuestionClick(qa.question)}
                >
                  {qa.question}
                </button>
              ))}
            </div>
          </div>
          <div className="flex">
            <input
              type="text"
              className="flex-1 p-2 border border-pink-500 rounded-l-md focus:outline-none focus:ring-1 focus:ring-pink-600"
              value={input}
              placeholder="Ask me something..."
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend(input)}
            />
            <button
              className="bg-pink-400 text-white px-4 rounded-r-md hover:bg-pink-500"
              onClick={() => handleSend(input)}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Chatbot;