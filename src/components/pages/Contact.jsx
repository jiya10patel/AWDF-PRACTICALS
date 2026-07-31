import { useState } from 'react';

function Contact() {
  const [message, setMessage] = useState('');
  const [showHelp, setShowHelp] = useState(false);
  const [history, setHistory] = useState([]);

  const handleSubmit = () => {
    if (message.trim() === '') return;
    setHistory([...history, message]);
    setMessage('');
  };

  return (
    <section className="contact-card">
      <h2>Get In Touch</h2>
      <p className="contact-subtitle">Have a question or want to collaborate? Send a message below.</p>

      <div className="form-group">
        <label>Your Message</label>
        <input
          type="text"
          placeholder="Type something..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className="submit-btn" onClick={handleSubmit}>Submit</button>
      </div>

      {message && <p className="live-preview">Live preview: {message}</p>}

      <button className="help-btn" onClick={() => setShowHelp(!showHelp)}>
        {showHelp ? 'Hide Help' : 'Need Help?'}
      </button>

      {showHelp && (
        <p className="help-text">
          Type your message above to see a live preview. Click Submit to add it to your message history below.
        </p>
      )}

      {history.length > 0 && (
        <div className="history-box">
          <h3>Submitted Messages</h3>
          <ul>
            {history.map((msg, index) => (
              <li key={index}>{msg}</li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}

export default Contact;