// index.js
export default function handler(req, res) {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept');
    if (req.method === 'GET') {
      const script = `
        (function() {
          let urlParams = new URLSearchParams(window.location.search);
          let phoneNumber = urlParams.get("phone") || "1234567890";
          let chatTitle = urlParams.get("name") || "Chat with us";
          
          let chatIcon = document.createElement("div");
          chatIcon.id = "whatsapp-icon";
          chatIcon.innerHTML = "💬";
          document.body.appendChild(chatIcon);
          
          let chatBox = document.createElement("div");
          chatBox.id = "chat-box";
          chatBox.innerHTML = \`
              <div id="chat-header">\${chatTitle}</div>
              <div id="chat-body">Hello! How can we help you?</div>
              <div id="chat-footer">
                  <input type="text" id="chat-input" placeholder="Type a message...">
                  <button id="send-btn">Send</button>
              </div>
          \`;
          document.body.appendChild(chatBox);
          
          let styles = document.createElement("style");
          styles.innerHTML = \`
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
          \`;
          document.head.appendChild(styles);
          
          chatIcon.addEventListener("click", function() {
              chatBox.style.display = chatBox.style.display === "block" ? "none" : "block";
          });
          
          document.getElementById("send-btn").addEventListener("click", function() {
              let message = document.getElementById("chat-input").value;
              if (message.trim() !== "") {
                  let whatsappUrl = \`https://wa.me/\${phoneNumber}?text=\${encodeURIComponent(message)}\`;
                  window.open(whatsappUrl, "_blank");
                  document.getElementById("chat-input").value = "";
              }
          });
        })();
      `;
      
      res.setHeader('Content-Type', 'application/javascript');
      res.status(200).send(script);
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  }