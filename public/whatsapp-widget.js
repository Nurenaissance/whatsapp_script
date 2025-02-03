(function() {
    window.WhatsAppWidget = {
        init: function(options = {}) {
            function createWhatsAppWidget() {
                const phoneNumber = options.phone || "1234567890";
                const chatTitle = options.name || "Chat with us";
                const quickReplies = options.quickReplies || [
                    "Hi! I'm interested in your services 👋",
                    "What are your working hours? 🕒",
                    "Can you share your pricing details? 💰",
                    "I need support 🆘"
                ];
        
                const chatIcon = document.createElement("div");
                chatIcon.id = "whatsapp-icon";
                chatIcon.setAttribute('aria-label', 'Open WhatsApp Chat');
                chatIcon.setAttribute('role', 'button');
                chatIcon.innerHTML = `<svg viewBox="0 0 24 24" width="40" height="40">
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
                        width: 80px;
                        height: 80px;
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
                    
                    #whatsapp-icon svg {
                        width: 50px;
                        height: 50px;
                    }
                    
                    /* Rest of the existing styles remain the same */
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
        }
    };
})();