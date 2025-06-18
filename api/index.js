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
        whatsappIcon: `
      <svg viewBox="0 0 24 24" width="40" height="40" xmlns="http://www.w3.org/2000/svg">
  <path fill="#FFFFFF" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
</svg>
`,
        sendIcon: `
            <svg viewBox="0 0 24 24" width="24" height="24">
                <path fill="#fff" d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
            </svg>`,
        backgroundPattern: `data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23128C7E' fill-opacity='0.04' fill-rule='evenodd'%3E%3Cpath d='M50 50c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10s-10-4.477-10-10 4.477-10 10-10zM10 10c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10S0 25.523 0 20s4.477-10 10-10zm10 8c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8zm40 40c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8z' /%3E%3C/g%3E%3C/svg%3E`
    };

    const STYLES = `
        #whatsapp-widget-icon {
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
        #whatsapp-widget-icon:hover {
            transform: scale(1.1);
        }
        #whatsapp-widget-chat {
            position: fixed;
            bottom: 100px;
            right: 20px;
            width: 350px;
            background: white;
            border-radius: 10px;
            box-shadow: 0 5px 25px rgba(0, 0, 0, 0.2);
            z-index: 999998;
            display: none;
            overflow: hidden;
        }
        #whatsapp-widget-header {
            background: #075E54;
            color: white;
            padding: 15px 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .whatsapp-widget-header-content {
            display: flex;
            align-items: center;
            gap: 10px;
        }
        #whatsapp-widget-close {
            background: none;
            border: none;
            color: white;
            font-size: 20px;
            cursor: pointer;
            padding: 0;
        }
        #whatsapp-widget-body {
            padding: 20px;
            max-height: 400px;
            overflow-y: auto;
            background-color: #e5ddd5;
            background-image: url("${TEMPLATES.backgroundPattern}");
            background-repeat: repeat;
            background-size: 80px;
            position: relative;
        }
        .whatsapp-widget-welcome {
            background: #DCF8C6;
            padding: 15px;
            border-radius: 8px;
            margin-bottom: 15px;
            box-shadow: 0 1px 2px rgba(0,0,0,0.1);
            position: relative;
        }
        .whatsapp-widget-welcome::after {
            content: '';
            position: absolute;
            top: 15px;
            right: -8px;
            width: 0;
            height: 0;
            border-style: solid;
            border-width: 8px 0 8px 8px;
            border-color: transparent transparent transparent #DCF8C6;
        }
        .whatsapp-widget-quick-replies {
            display: flex;
            flex-direction: column;
            gap: 10px;
            margin-top: 15px;
        }
        .whatsapp-widget-quick-reply {
            background: white;
            border: none;
            padding: 10px 15px;
            border-radius: 20px;
            cursor: pointer;
            text-align: left;
            transition: background 0.2s;
            box-shadow: 0 1px 2px rgba(0,0,0,0.1);
        }
        .whatsapp-widget-quick-reply:hover {
            background: #F5F5F5;
        }
        #whatsapp-widget-footer {
            padding: 15px;
            background: #F0F2F5;
            display: flex;
            gap: 10px;
            border-top: 1px solid rgba(0,0,0,0.1);
        }
        #whatsapp-widget-input {
            flex: 1;
            padding: 10px 15px;
            border: 1px solid #DDD;
            border-radius: 20px;
            outline: none;
            font-family: inherit;
        }
        #whatsapp-widget-input:focus {
            border-color: #25D366;
        }
        #whatsapp-widget-send {
            background: #25D366;
            border: none;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: background-color 0.2s;
        }
        #whatsapp-widget-send:hover {
            background: #1EA952;
        }
        .whatsapp-widget-powered {
            text-align: center;
            padding: 5px;
            font-size: 12px;
            color: #666;
            background: #F0F2F5;
            border-top: 1px solid rgba(0,0,0,0.05);
        }
        @media (max-width: 480px) {
            #whatsapp-widget-chat {
                width: calc(100% - 40px);
                right: 20px;
                bottom: 90px;
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

        injectStyles() {
            const styleSheet = document.createElement('style');
            styleSheet.textContent = STYLES;
            document.head.appendChild(styleSheet);
            this.elements.push(styleSheet);
        }

        createWidget() {
            const widget = document.createElement('div');
            widget.innerHTML = `
                <div id="whatsapp-widget-icon" role="button" aria-label="Open WhatsApp Chat">
                    ${TEMPLATES.whatsappIcon}
                </div>
                <div id="whatsapp-widget-chat" role="dialog" aria-label="WhatsApp Chat">
                    <div id="whatsapp-widget-header">
                        <div class="whatsapp-widget-header-content">
                            ${TEMPLATES.whatsappIcon}
                            <span>${this.options.name}</span>
                        </div>
                        <button id="whatsapp-widget-close" aria-label="Close chat">✕</button>
                    </div>
                    <div id="whatsapp-widget-body">
                        <div class="whatsapp-widget-welcome">
                            <p>👋 Hello! How can we help you today?</p>
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
                    <div class="whatsapp-widget-powered">Powered by Nuren AI ✨</div>
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

            const iconClick = () => {
                chat.style.display = (chat.style.display === 'block') ? 'none' : 'block';
            };

            const closeClick = () => chat.style.display = 'none';

            const sendMessage = (message) => {
                if (message.trim()) {
                    window.open(`https://wa.me/${this.options.phone}?text=${encodeURIComponent(message)}`, '_blank');
                    input.value = '';
                }
            };

            const sendClick = () => sendMessage(input.value);
            const inputKeypress = (e) => {
                if (e.key === 'Enter') sendMessage(input.value);
            };

            icon.addEventListener('click', iconClick);
            closeBtn.addEventListener('click', closeClick);
            sendBtn.addEventListener('click', sendClick);
            input.addEventListener('keypress', inputKeypress);

            quickReplies.forEach(button => {
                const quickReplyClick = () => {
                    sendMessage(button.getAttribute('data-message'));
                };
                button.addEventListener('click', quickReplyClick);
            });

            // Store for cleanup
            this.eventListeners.push(
                { target: icon, type: 'click', listener: iconClick },
                { target: closeBtn, type: 'click', listener: closeClick },
                { target: sendBtn, type: 'click', listener: sendClick },
                { target: input, type: 'keypress', listener: inputKeypress },
                ...Array.from(quickReplies).map(button => ({
                    target: button,
                    type: 'click',
                    listener: () => sendMessage(button.getAttribute('data-message'))
                }))
            );
        }

        destroy() {
            this.elements.forEach(el => el.remove());
            this.eventListeners.forEach(({ target, type, listener }) => {
                target.removeEventListener(type, listener);
            });
            this.elements = [];
            this.eventListeners = [];
        }
    }

    window.WhatsAppWidget = {
        init: function(options) {
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', () => new WhatsAppWidget(options));
            } else {
                new WhatsAppWidget(options);
            }
        }
    };
})();
