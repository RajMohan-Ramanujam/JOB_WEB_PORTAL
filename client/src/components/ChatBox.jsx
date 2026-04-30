import { useState } from 'react'
import API from '../api/axios'

function ChatBox() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    { role: 'ai', text: 'Hi! I am your career assistant. How can I help you today?' }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  const sendMessage = async () => {
    if (!input.trim()) return

    const userMessage = input
    setInput('')
    setMessages(prev => [...prev, { role: 'user', text: userMessage }])
    setLoading(true)

    try {
      const res = await API.post('/chat', { message: userMessage })
      setMessages(prev => [...prev, { role: 'ai', text: res.data.reply }])
    } catch (err) {
      setMessages(prev => [...prev, { role: 'ai', text: 'Sorry something went wrong. Try again!' }])
    }

    setLoading(false)
  }

  const handleKey = (e) => {
    if (e.key === 'Enter') sendMessage()
  }

  const token = localStorage.getItem('token')
  if (!token) return null

  return (
    <div style={{position:'fixed', bottom:'24px', right:'24px', zIndex:9999}}>

      {/* Chat Window */}
      {open && (
        <div className="bg-white rounded-lg shadow-xl w-80 h-96 flex flex-col mb-4 border border-gray-200">

          {/* Header */}
          <div className="bg-blue-600 text-white px-4 py-3 rounded-t-lg flex justify-between items-center">
            <span className="font-bold">Career Assistant AI</span>
            <button onClick={() => setOpen(false)} className="text-white hover:text-gray-200">✕</button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                  msg.role === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 px-3 py-2 rounded-lg text-sm text-gray-500">
                  Thinking...
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-3 border-t flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Ask me anything..."
              className="flex-1 border rounded p-2 text-sm focus:outline-none focus:border-blue-600"
            />
            <button
              onClick={sendMessage}
              className="bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700 text-sm"
            >
              Send
            </button>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setOpen(!open)}
        className="bg-blue-600 text-white w-14 h-14 rounded-full shadow-lg hover:bg-blue-700 text-2xl flex items-center justify-center"
      >
        {open ? '✕' : '💬'}
      </button>

    </div>
  )
}

export default ChatBox