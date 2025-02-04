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
            <svg viewBox="0 0 24 24" width="40" height="40">
                <path fill="#fff" d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564c.173.087.289.129.332.202.043.073.043.423-.101.827z"/>
            </svg>`,
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
        position: relative;
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
        }

        bindEvents() {
            const icon = document.getElementById('whatsapp-widget-icon');
            const chat = document.getElementById('whatsapp-widget-chat');
            const closeBtn = document.getElementById('whatsapp-widget-close');
            const input = document.getElementById('whatsapp-widget-input');
            const sendBtn = document.getElementById('whatsapp-widget-send');
            const quickReplies = document.querySelectorAll('.whatsapp-widget-quick-reply');

            icon.addEventListener('click', () => chat.style.display = 'block');
            closeBtn.addEventListener('click', () => chat.style.display = 'none');

            const sendMessage = (message) => {
                if (message.trim()) {
                    window.open(`https://wa.me/${this.options.phone}?text=${encodeURIComponent(message)}`, '_blank');
                    input.value = '';
                }
            };

            sendBtn.addEventListener('click', () => sendMessage(input.value));
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') sendMessage(input.value);
            });

            quickReplies.forEach(button => {
                button.addEventListener('click', () => {
                    sendMessage(button.getAttribute('data-message'));
                });
            });
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