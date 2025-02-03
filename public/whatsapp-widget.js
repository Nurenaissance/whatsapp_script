// Save as whatsapp-widget.js
(function() {
    function createWhatsAppWidget() {
      // Get current script tag
      const scripts = document.getElementsByTagName('script');
      const currentScript = scripts[scripts.length - 1];
      
      // Get attributes with fallbacks
      const phoneNumber = currentScript.getAttribute('phone') || "1234567890";
      const chatTitle = currentScript.getAttribute('name') || "Chat with us";
      
      // Create widget elements
      const chatIcon = document.createElement("div");
      chatIcon.id = "whatsapp-icon";
      chatIcon.setAttribute('aria-label', 'Open WhatsApp Chat');
      chatIcon.setAttribute('role', 'button');
      chatIcon.innerHTML = "💬";
      
      const chatBox = document.createElement("div");
      chatBox.id = "chat-box";
      chatBox.setAttribute('aria-modal', 'true');
      chatBox.innerHTML = `
        <div id="chat-header" role="heading" aria-level="2">${chatTitle}</div>
        <div id="chat-body">Hello! How can we help you?</div>
        <div id="chat-footer">
          <input type="text" id="chat-input" placeholder="Type a message..." aria-label="Message input">
          <button id="send-btn" aria-label="Send WhatsApp message">Send</button>
        </div>
      `;
      
      // Add styles
      const styles = document.createElement("style");
      styles.innerHTML = `
        #whatsapp-icon {
          position: fixed;
          bottom: 20px;
          right: 20px;
          background-color: #25D366;
          color: white;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 30px;
          cursor: pointer;
          box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
          z-index: 999999;
        }
        
        #chat-box {
          display: none;
          position: fixed;
          bottom: 90px;
          right: 20px;
          width: 300px;
          background: white;
          border-radius: 10px;
          box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
          padding: 10px;
          font-family: Arial, sans-serif;
          z-index: 999999;
        }
        
        #chat-header {
          background: #25D366;
          color: white;
          padding: 10px;
          border-top-left-radius: 10px;
          border-top-right-radius: 10px;
          font-weight: bold;
        }
        
        #chat-body {
          padding: 10px;
          min-height: 100px;
        }
        
        #chat-footer {
          display: flex;
          padding: 10px;
        }
        
        #chat-input {
          flex-grow: 1;
          padding: 5px;
          border: 1px solid #ccc;
          border-radius: 5px;
          outline: none;
        }
        
        #send-btn {
          background: #25D366;
          color: white;
          border: none;
          padding: 5px 10px;
          margin-left: 5px;
          cursor: pointer;
          border-radius: 5px;
        }
      `;
      
      // Append elements to document
      document.head.appendChild(styles);
      document.body.appendChild(chatIcon);
      document.body.appendChild(chatBox);
      
      // Add event listeners
      chatIcon.addEventListener("click", () => {
        chatBox.style.display = chatBox.style.display === "block" ? "none" : "block";
      });
      
      const sendButton = document.getElementById("send-btn");
      const chatInput = document.getElementById("chat-input");
      
      sendButton.addEventListener("click", () => {
        const message = chatInput.value.trim();
        if (message) {
          window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, "_blank");
          chatInput.value = "";
        }
      });
      
      chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendButton.click();
      });
    }
  
    // Initialize widget
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', createWhatsAppWidget);
    } else {
      createWhatsAppWidget();
    }
  })();