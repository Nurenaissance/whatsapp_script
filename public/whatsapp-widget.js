(function() {
    function createWhatsAppWidget() {
      const scripts = document.getElementsByTagName('script');
      const currentScript = scripts[scripts.length - 1];
      const phoneNumber = currentScript.getAttribute('phone') || "1234567890";
      const chatTitle = currentScript.getAttribute('name') || "Chat with us";
      
      const quickReplies = [
        "Hi! I'm interested in your services 👋",
        "What are your working hours? 🕒",
        "Can you share your pricing details? 💰",
        "I need support 🆘"
      ];
  
      const chatIcon = document.createElement("div");
      chatIcon.id = "whatsapp-icon";
      chatIcon.setAttribute('aria-label', 'Open WhatsApp Chat');
      chatIcon.setAttribute('role', 'button');
      chatIcon.innerHTML = `<svg viewBox="0 0 24 24" width="30" height="30">
        <path fill="#fff" d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564c.173.087.289.129.332.202.043.073.043.423-.101.827z"/>
      </svg>`;
      
      const chatBox = document.createElement("div");
      chatBox.id = "chat-box";
      chatBox.setAttribute('aria-modal', 'true');
      chatBox.innerHTML = `
        <div id="chat-header" role="heading" aria-level="2">
          <div class="header-content">
            <svg viewBox="0 0 24 24" width="24" height="24">
              <path fill="#fff" d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564c.173.087.289.129.332.202.043.073.043.423-.101.827z"/>
            </svg>
            <span>${chatTitle}</span>
          </div>
          <button id="close-chat" aria-label="Close chat">✕</button>
        </div>
        <div id="chat-body">
          <div class="welcome-message">
            <p>👋 Hello! How can we help you today?</p>
            <div class="quick-replies">
              ${quickReplies.map(msg => `
                <button class="quick-reply" data-message="${msg}">${msg}</button>
              `).join('')}
            </div>
          </div>
        </div>
        <div id="chat-footer">
          <input type="text" id="chat-input" placeholder="Type a message..." aria-label="Message input">
          <button id="send-btn" aria-label="Send WhatsApp message">
            <svg viewBox="0 0 24 24" width="24" height="24">
              <path fill="#fff" d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
            </svg>
          </button>
        </div>
        <div class="powered-by">Powered by Nuren AI ✨</div>
      `;
      
      const styles = document.createElement("style");
      styles.innerHTML = `
        #whatsapp-icon {
          position: fixed;
          bottom: 20px;
          right: 20px;
          background-color: #25D366;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
          z-index: 999999;
          transition: transform 0.3s ease;
        }
        
        #whatsapp-icon:hover {
          transform: scale(1.1);
        }
        
        #chat-box {
          display: none;
          position: fixed;
          bottom: 90px;
          right: 20px;
          width: 360px;
          background: #f5f6f7;
          border-radius: 15px;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
          z-index: 999999;
          overflow: hidden;
        }
        
        #chat-header {
          background: #075e54;
          color: white;
          padding: 15px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .header-content {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        
        #close-chat {
          background: none;
          border: none;
          color: white;
          font-size: 20px;
          cursor: pointer;
        }
        
        #chat-body {
          padding: 20px;
          min-height: 300px;
          background: #e5ddd5;
          background-image: url("data:image/svg+xml,%3Csvg width='64' height='64' viewBox='0 0 64 64' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M8 16c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8zm0-2c3.314 0 6-2.686 6-6s-2.686-6-6-6-6 2.686-6 6 2.686 6 6 6zm33.414-6l5.95-5.95L45.95.636 40 6.586 34.05.636 32.636 2.05 38.586 8l-5.95 5.95 1.414 1.414L40 9.414l5.95 5.95 1.414-1.414L41.414 8zM40 48c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8zm0-2c3.314 0 6-2.686 6-6s-2.686-6-6-6-6 2.686-6 6 2.686 6 6 6zM9.414 40l5.95-5.95-1.414-1.414L8 38.586l-5.95-5.95L.636 34.05 6.586 40l-5.95 5.95 1.414 1.414L8 41.414l5.95 5.95 1.414-1.414L9.414 40z' fill='%23128c7e' fill-opacity='0.06' fill-rule='evenodd'/%3E%3C/svg%3E");
        }
        
        .welcome-message {
          background: white;
          padding: 15px;
          border-radius: 10px;
          box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }
        
        .welcome-message p {
          margin: 0 0 15px 0;
          color: #333;
        }
        
        .quick-replies {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        
        .quick-reply {
          background: #dcf8c6;
          border: none;
          padding: 10px 15px;
          border-radius: 20px;
          cursor: pointer;
          text-align: left;
          font-size: 14px;
          transition: background 0.2s;
        }
        
        .quick-reply:hover {
          background: #b7f0a3;
        }
        
        #chat-footer {
          display: flex;
          padding: 15px;
          background: white;
          gap: 10px;
        }
        
        #chat-input {
          flex-grow: 1;
          padding: 10px 15px;
          border: 1px solid #ddd;
          border-radius: 25px;
          outline: none;
          font-size: 14px;
        }
        
        #chat-input:focus {
          border-color: #128c7e;
        }
        
        #send-btn {
          background: #25D366;
          border: none;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 0.2s;
        }
        
        #send-btn:hover {
          background: #128c7e;
        }
        
        .powered-by {
          text-align: center;
          padding: 8px;
          background: #f0f0f0;
          color: #666;
          font-size: 12px;
          border-top: 1px solid #ddd;
        }
      `;
      
      document.head.appendChild(styles);
      document.body.appendChild(chatIcon);
      document.body.appendChild(chatBox);
      
      chatIcon.addEventListener("click", () => {
        chatBox.style.display = "block";
      });
      
      document.getElementById("close-chat").addEventListener("click", () => {
        chatBox.style.display = "none";
      });
      
      const sendButton = document.getElementById("send-btn");
      const chatInput = document.getElementById("chat-input");
      
      function sendMessage(message) {
        if (message.trim()) {
          window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, "_blank");
          chatInput.value = "";
        }
      }
      
      sendButton.addEventListener("click", () => {
        sendMessage(chatInput.value);
      });
      
      chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage(chatInput.value);
      });
      
      document.querySelectorAll('.quick-reply').forEach(button => {
        button.addEventListener('click', () => {
          sendMessage(button.getAttribute('data-message'));
        });
      });
    }
  
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', createWhatsAppWidget);
    } else {
      createWhatsAppWidget();
    }
  })();