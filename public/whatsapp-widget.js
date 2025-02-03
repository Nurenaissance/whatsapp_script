(function() {
    function createWhatsAppWidget() {
        const phoneNumber = currentScript.getAttribute('phone') || "1234567890";
        const chatTitle = currentScript.getAttribute('name') || "Chat with us";
      
      const chatIcon = document.createElement("div");
      chatIcon.id = "whatsapp-icon";
      chatIcon.setAttribute('aria-label', 'Open WhatsApp Chat');
      chatIcon.setAttribute('role', 'button');
      chatIcon.innerHTML = "💬";
      document.body.appendChild(chatIcon);
      
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
      document.body.appendChild(chatBox);
      
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
      document.head.appendChild(styles);
      
      chatIcon.addEventListener("click", function() {
        chatBox.style.display = chatBox.style.display === "block" ? "none" : "block";
      });
      
      const sendButton = document.getElementById("send-btn");
      const chatInput = document.getElementById("chat-input");
      
      sendButton.addEventListener("click", function() {
        const message = chatInput.value.trim();
        if (message) {
          const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
          window.open(whatsappUrl, "_blank");
          chatInput.value = "";
        } else {
          chatInput.setAttribute('aria-invalid', 'true');
          setTimeout(() => chatInput.removeAttribute('aria-invalid'), 2000);
        }
      });
  
      // Allow sending message with Enter key
      chatInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
          sendButton.click();
        }
      });
    }
  
    // Initialize the widget when the DOM is fully loaded
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', createWhatsAppWidget);
    } else {
      createWhatsAppWidget();
    }
  })();