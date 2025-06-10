// index.js
export default function handler(req, res) {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept');
      // Handle OPTIONS preflight request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
    if (req.method === 'GET') {
      const script = `
       (function() {
    'use strict';

    const DEFAULT_OPTIONS = {
        phone: '1234567890',
        name: 'Chat with us',
        quickReplies: [
            "Hi! I'm interested in your services 👋",
            "What are your working hours? 🕒",
            "Can you share your pricing details? 💰",
            "I need support 🆘"
        ]
    };

    const TEMPLATES = {
        whatsappLogo: `
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/512px-WhatsApp.svg.png" 
                 alt="WhatsApp" 
                 style="width: 100%; height: 100%; object-fit: contain;" />`,
        sendIcon: `
            <svg viewBox="0 0 24 24" width="24" height="24">
                <path fill="currentColor" d="M1.101 21.757L23.8 12.028 1.101 2.3l.011 7.912 13.623 1.816-13.623 1.817-.011 7.912z"/>
            </svg>`,
        closeIcon: `
            <svg viewBox="0 0 24 24" width="20" height="20">
                <path fill="currentColor" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
            </svg>`,
        backgroundPattern: `data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%2300A884' fill-opacity='0.08'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-17c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z'/%3E%3C/g%3E%3C/svg%3E`
    };

    const STYLES = `
        @keyframes whatsapp-bounce {
            0%, 20%, 53%, 80%, 100% { transform: translate3d(0,0,0) scale(1); }
            40%, 43% { transform: translate3d(0,-15px,0) scale(1.05); }
            70% { transform: translate3d(0,-7px,0) scale(1.02); }
            90% { transform: translate3d(0,-2px,0) scale(1.01); }
        }

        @keyframes whatsapp-pulse {
            0% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.7); }
            70% { box-shadow: 0 0 0 15px rgba(37, 211, 102, 0); }
            100% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0); }
        }

        @keyframes whatsapp-slide-up {
            0% { 
                opacity: 0; 
                transform: translateY(20px) scale(0.9); 
            }
            100% { 
                opacity: 1; 
                transform: translateY(0) scale(1); 
            }
        }

        @keyframes whatsapp-slide-down {
            0% { 
                opacity: 1; 
                transform: translateY(0) scale(1); 
            }
            100% { 
                opacity: 0; 
                transform: translateY(20px) scale(0.9); 
            }
        }

        @keyframes whatsapp-message-in {
            0% { 
                opacity: 0; 
                transform: translateX(-20px) scale(0.8); 
            }
            100% { 
                opacity: 1; 
                transform: translateX(0) scale(1); 
            }
        }

        #whatsapp-widget-icon {
            position: fixed;
            bottom: 25px;
            right: 25px;
            background: linear-gradient(135deg, #25D366 0%, #128C7E 100%);
            width: 65px;
            height: 65px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            box-shadow: 0 8px 25px rgba(37, 211, 102, 0.3);
            z-index: 999999;
            transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
            animation: whatsapp-pulse 2s infinite;
        }

        #whatsapp-widget-icon:hover {
            transform: scale(1.1) rotate(5deg);
            box-shadow: 0 12px 35px rgba(37, 211, 102, 0.4);
            animation: whatsapp-bounce 1s ease-in-out;
        }

        #whatsapp-widget-icon svg {
            width: 35px;
            height: 35px;
            filter: drop-shadow(0 2px 4px rgba(0,0,0,0.2));
        }

        #whatsapp-widget-chat {
            position: fixed;
            bottom: 110px;
            right: 25px;
            width: 380px;
            background: #ffffff;
            border-radius: 20px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
            z-index: 999998;
            display: none;
            overflow: hidden;
            animation: whatsapp-slide-up 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
            border: 1px solid rgba(0, 0, 0, 0.08);
        }

        #whatsapp-widget-chat.closing {
            animation: whatsapp-slide-down 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }

        #whatsapp-widget-header {
            background: linear-gradient(135deg, #128C7E 0%, #075E54 100%);
            color: white;
            padding: 20px 25px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            position: relative;
            overflow: hidden;
        }

        #whatsapp-widget-header::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%);
            transform: translateX(-100%);
            transition: transform 1.5s;
        }

        #whatsapp-widget-header:hover::before {
            transform: translateX(100%);
        }

        .whatsapp-widget-header-content {
            display: flex;
            align-items: center;
            gap: 15px;
            position: relative;
            z-index: 1;
        }

        .whatsapp-widget-avatar {
            width: 45px;
            height: 45px;
            border-radius: 50%;
            background: linear-gradient(135deg, #25D366 0%, #128C7E 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        }

        .whatsapp-widget-avatar svg {
            width: 24px;
            height: 24px;
        }

        .whatsapp-widget-name {
            font-size: 18px;
            font-weight: 600;
            text-shadow: 0 1px 2px rgba(0,0,0,0.1);
        }

        .whatsapp-widget-status {
            font-size: 13px;
            opacity: 0.9;
            margin-top: 2px;
        }

        #whatsapp-widget-close {
            background: rgba(255,255,255,0.1);
            border: none;
            color: white;
            width: 32px;
            height: 32px;
            border-radius: 50%;
            cursor: pointer;
            padding: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.2s ease;
            position: relative;
            z-index: 1;
        }

        #whatsapp-widget-close:hover {
            background: rgba(255,255,255,0.2);
            transform: rotate(90deg);
        }

        #whatsapp-widget-body {
            padding: 25px;
            max-height: 420px;
            overflow-y: auto;
            background-color: #e5ddd5;
            background-image: url("${TEMPLATES.backgroundPattern}");
            background-attachment: fixed;
            position: relative;
        }

        #whatsapp-widget-body::-webkit-scrollbar {
            width: 4px;
        }

        #whatsapp-widget-body::-webkit-scrollbar-track {
            background: transparent;
        }

        #whatsapp-widget-body::-webkit-scrollbar-thumb {
            background: rgba(0,0,0,0.2);
            border-radius: 2px;
        }

        .whatsapp-widget-welcome {
            background: #DCF8C6;
            padding: 18px 20px;
            border-radius: 15px 15px 15px 5px;
            margin-bottom: 20px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.08);
            position: relative;
            animation: whatsapp-message-in 0.5s ease-out;
        }

        .whatsapp-widget-welcome::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: -8px;
            width: 0;
            height: 0;
            border-style: solid;
            border-width: 0 8px 10px 0;
            border-color: transparent #DCF8C6 transparent transparent;
        }

        .whatsapp-widget-welcome p {
            margin: 0 0 15px 0;
            font-size: 15px;
            line-height: 1.4;
            color: #1f2937;
        }

        .whatsapp-widget-time {
            font-size: 11px;
            color: #667781;
            margin-top: 8px;
            text-align: right;
        }

        .whatsapp-widget-quick-replies {
            display: flex;
            flex-direction: column;
            gap: 12px;
            margin-top: 20px;
        }

        .whatsapp-widget-quick-reply {
            background: #ffffff;
            border: 1px solid #e0e0e0;
            padding: 14px 18px;
            border-radius: 20px;
            cursor: pointer;
            text-align: left;
            transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
            box-shadow: 0 2px 8px rgba(0,0,0,0.06);
            font-size: 14px;
            color: #1f2937;
            position: relative;
            overflow: hidden;
        }

        .whatsapp-widget-quick-reply::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(37, 211, 102, 0.1), transparent);
            transition: left 0.5s;
        }

        .whatsapp-widget-quick-reply:hover {
            background: #f8f9fa;
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(0,0,0,0.12);
            border-color: #25D366;
        }

        .whatsapp-widget-quick-reply:hover::before {
            left: 100%;
        }

        .whatsapp-widget-quick-reply:active {
            transform: translateY(0);
        }

        #whatsapp-widget-footer {
            padding: 20px 25px;
            background: #f8f9fa;
            display: flex;
            gap: 12px;
            border-top: 1px solid rgba(0,0,0,0.08);
        }

        #whatsapp-widget-input {
            flex: 1;
            padding: 12px 18px;
            border: 2px solid #e0e0e0;
            border-radius: 25px;
            outline: none;
            font-family: inherit;
            font-size: 14px;
            transition: all 0.2s ease;
            background: white;
        }

        #whatsapp-widget-input:focus {
            border-color: #25D366;
            box-shadow: 0 0 0 3px rgba(37, 211, 102, 0.1);
        }

        #whatsapp-widget-input::placeholder {
            color: #9ca3af;
        }

        #whatsapp-widget-send {
            background: linear-gradient(135deg, #25D366 0%, #128C7E 100%);
            border: none;
            width: 45px;
            height: 45px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
            color: white;
            box-shadow: 0 4px 15px rgba(37, 211, 102, 0.3);
        }

        #whatsapp-widget-send:hover {
            transform: scale(1.1) rotate(15deg);
            box-shadow: 0 6px 25px rgba(37, 211, 102, 0.4);
        }

        #whatsapp-widget-send:active {
            transform: scale(0.95);
        }

        .whatsapp-widget-powered {
            text-align: center;
            padding: 12px;
            font-size: 12px;
            color: #9ca3af;
            background: #f8f9fa;
            border-top: 1px solid rgba(0,0,0,0.05);
            font-weight: 500;
        }

        .whatsapp-widget-powered a {
            color: #25D366;
            text-decoration: none;
            transition: color 0.2s ease;
        }

        .whatsapp-widget-powered a:hover {
            color: #128C7E;
        }

        @media (max-width: 480px) {
            #whatsapp-widget-chat {
                width: calc(100vw - 30px);
                right: 15px;
                bottom: 100px;
                border-radius: 15px;
            }
            
            #whatsapp-widget-icon {
                right: 15px;
                bottom: 15px;
                width: 55px;
                height: 55px;
            }
            
            #whatsapp-widget-icon svg {
                width: 28px;
                height: 28px;
            }
        }

        @media (max-width: 360px) {
            #whatsapp-widget-body {
                padding: 20px;
            }
            
            #whatsapp-widget-footer {
                padding: 15px 20px;
            }
            
            #whatsapp-widget-header {
                padding: 15px 20px;
            }
        }
    `;

    class WhatsAppWidget {
        constructor(options) {
            this.options = { ...DEFAULT_OPTIONS, ...options };
            this.elements = [];
            this.eventListeners = [];
            this.init();
        }

        init() {
            this.injectStyles();
            this.createWidget();
            this.bindEvents();
        }

        destroy() {
            this.elements.forEach(element => element.remove());
            this.eventListeners.forEach(({ target, type, listener }) => {
                target.removeEventListener(type, listener);
            });
            const styles = document.querySelectorAll('style');
            styles.forEach(style => {
                if (style.textContent.includes('#whatsapp-widget')) style.remove();
            });
        }

        injectStyles() {
            const styleSheet = document.createElement('style');
            styleSheet.textContent = STYLES;
            document.head.appendChild(styleSheet);
            this.elements.push(styleSheet);
        }

        getCurrentTime() {
            const now = new Date();
            return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        }

        createWidget() {
            const widget = document.createElement('div');
            widget.innerHTML = `
                <div id="whatsapp-widget-icon" role="button" aria-label="Open WhatsApp Chat">
                    ${TEMPLATES.whatsappLogo}
                </div>
                <div id="whatsapp-widget-chat" role="dialog" aria-label="WhatsApp Chat">
                    <div id="whatsapp-widget-header">
                        <div class="whatsapp-widget-header-content">
                            <div class="whatsapp-widget-avatar">
                                ${TEMPLATES.whatsappLogo}
                            </div>
                            <div>
                                <div class="whatsapp-widget-name">${this.options.name}</div>
                                <div class="whatsapp-widget-status">● Online</div>
                            </div>
                        </div>
                        <button id="whatsapp-widget-close" aria-label="Close chat">
                            ${TEMPLATES.closeIcon}
                        </button>
                    </div>
                    <div id="whatsapp-widget-body">
                        <div class="whatsapp-widget-welcome">
                            <p>👋 Hello! How can we help you today?</p>
                            <div class="whatsapp-widget-time">${this.getCurrentTime()}</div>
                            <div class="whatsapp-widget-quick-replies">
                                ${this.options.quickReplies.map(msg => `
                                    <button class="whatsapp-widget-quick-reply" data-message="${msg}">${msg}</button>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                    <div id="whatsapp-widget-footer">
                        <input type="text" id="whatsapp-widget-input" placeholder="Type a message..." aria-label="Message input">
                        <button id="whatsapp-widget-send" aria-label="Send message">
                            ${TEMPLATES.sendIcon}
                        </button>
                    </div>
                    <div class="whatsapp-widget-powered">
                        Powered by <a href="#" target="_blank">Nuren AI</a> ✨
                    </div>
                </div>
            `;
            document.body.appendChild(widget);
            this.elements.push(widget);
        }

        bindEvents() {
            const icon = document.getElementById('whatsapp-widget-icon');
            const chat = document.getElementById('whatsapp-widget-chat');
            const closeBtn = document.getElementById('whatsapp-widget-close');
            const input = document.getElementById('whatsapp-widget-input');
            const sendBtn = document.getElementById('whatsapp-widget-send');
            const quickReplies = document.querySelectorAll('.whatsapp-widget-quick-reply');

            const toggleChat = () => {
                if (chat.style.display === 'block') {
                    chat.classList.add('closing');
                    setTimeout(() => {
                        chat.style.display = 'none';
                        chat.classList.remove('closing');
                    }, 300);
                } else {
                    chat.classList.remove('closing');
                    chat.style.display = 'block';
                    setTimeout(() => input.focus(), 400);
                }
            };

            const iconClickListener = () => toggleChat();
            const closeBtnClickListener = () => toggleChat();

            icon.addEventListener('click', iconClickListener);
            closeBtn.addEventListener('click', closeBtnClickListener);

            this.eventListeners.push(
                { target: icon, type: 'click', listener: iconClickListener },
                { target: closeBtn, type: 'click', listener: closeBtnClickListener }
            );

            const sendMessage = (message) => {
                if (message.trim()) {
                    const encodedMessage = encodeURIComponent(message);
                    window.open(`https://wa.me/${this.options.phone}?text=${encodedMessage}`, '_blank');
                    input.value = '';
                    toggleChat();
                }
            };

            const sendBtnClickListener = () => sendMessage(input.value);
            const inputKeyListener = (e) => {
                if (e.key === 'Enter') sendMessage(input.value);
            };

            sendBtn.addEventListener('click', sendBtnClickListener);
            input.addEventListener('keypress', inputKeyListener);

            this.eventListeners.push(
                { target: sendBtn, type: 'click', listener: sendBtnClickListener },
                { target: input, type: 'keypress', listener: inputKeyListener }
            );

            quickReplies.forEach(button => {
                const quickReplyListener = () => {
                    sendMessage(button.getAttribute('data-message'));
                };
                button.addEventListener('click', quickReplyListener);
                this.eventListeners.push(
                    { target: button, type: 'click', listener: quickReplyListener }
                );
            });

            // Close chat when clicking outside
            const outsideClickListener = (e) => {
                if (!chat.contains(e.target) && !icon.contains(e.target) && chat.style.display === 'block') {
                    toggleChat();
                }
            };

            document.addEventListener('click', outsideClickListener);
            this.eventListeners.push(
                { target: document, type: 'click', listener: outsideClickListener }
            );
        }
    }

    window.WhatsAppWidget = {
        init: function(options) {
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', () => new WhatsAppWidget(options));
            } else {
                return new WhatsAppWidget(options);
            }
        }
    };

    // Auto-initialize for demo
    window.WhatsAppWidget.init({
        phone: '1234567890',
        name: 'Support Team',
        quickReplies: [
            "Hi! I'm interested in your services 👋",
            "What are your working hours? 🕒",
            "Can you share your pricing details? 💰",
            "I need technical support 🆘"
        ]
    });
})();
      `;
      
      res.setHeader('Content-Type', 'application/javascript');
      res.status(200).send(script);
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  }
