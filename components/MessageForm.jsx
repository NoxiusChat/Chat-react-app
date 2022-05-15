import { useState } from 'react';
import { SendOutlined, PictureOutlined } from '@ant-design/icons';
import { sendMessage, isTyping } from 'react-chat-engine';

const MessageForm = (props) => {
  const [value, setValue] = useState('');
  const { chatId, creds, userType } = props;

  const handleChange = (event) => {
    setValue(event.target.value);

    isTyping(props, chatId);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const text = value.trim();

    if (text.length > 0) {
      sendMessage(creds, chatId, { text });
    }

    setValue('');
  };

  const handleUpload = (event) => {
    sendMessage(creds, chatId, { files: event.target.files, text: '' });
  };
  if(userType === "guest"){
    return (
      <form className="message-form" onSubmit={handleSubmit} style={{backgroundColor: "rgb(243, 222, 222)", border: "1px solid rgb(243, 222, 222)"}}>
        <input
          disabled
          style={{backgroundColor: "rgb(243, 222, 222)", border: "1px solid rgb(243, 222, 222)"}}
            
          className="message-input"
          placeholder="Send a message..."
          value={value}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />
        <label htmlFor="upload-button" >
          <span className="image-button" style={{backgroundColor: "rgb(243, 222, 222)", border: "1px solid rgb(243, 222, 222)"}}>
            
            <PictureOutlined className="picture-icon" />
          </span>
        </label>
        <input
        
          disabled
          type="file"
          multiple={false}
          id="upload-button"
          style={{ display: 'none',backgroundColor: "rgb(243, 222, 222)",borderRadius: "6px", border: "1px solid rgb(243, 222, 222)" }}
          onChange={handleUpload.bind(this)}
        />
        <button type="submit" className="send-button" disabled style={{backgroundColor: "rgb(243, 222, 222)", border: "1px solid rgb(243, 222, 222)"}}>
          
          <SendOutlined className="send-icon" style={{backgroundColor: "rgb(243, 222, 222)", border: "1px solid rgb(243, 222, 222)"}}/>
        </button>
      </form>
    );
  }
  return (
    <form className="message-form" onSubmit={handleSubmit} >
      <input
        className="message-input"
        placeholder="Send a message..."
        value={value}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
      <label htmlFor="upload-button">
        <span className="image-button" >
          <PictureOutlined className="picture-icon" />
        </span>
      </label>
      <input
        type="file"
        multiple={false}
        id="upload-button"
        style={{ display: 'none' }}
        onChange={handleUpload.bind(this)}
      />
      <button type="submit" className="send-button">
        
        <SendOutlined className="send-icon" />
      </button>
    </form>
  );
};

export default MessageForm;