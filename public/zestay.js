(function() {
    'use strict';

    const DEFAULT_OPTIONS = {
        phone: '1234567890',
        name: 'Zestay Concierge',
        quickReplies: [
            "I need help with check-in 🏨",
            "Upload my documents 📄", 
            "Ask about my reservation 🗓️",
            "Speak to concierge 💬"
        ]
    };

    const TEMPLATES = {
        whatsappIcon: `
      <svg viewBox="0 0 24 24" width="40" height="40" xmlns="http://www.w3.org/2000/svg">
  <path fill="#FFFFFF" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
</svg>
`,
        sendIcon: `
            <svg viewBox="0 0 24 24" width="20" height="20">
                <path fill="url(#gradient)" d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" style="stop-color:#9333ea;stop-opacity:1" />
                        <stop offset="100%" style="stop-color:#ec4899;stop-opacity:1" />
                    </linearGradient>
                </defs>
            </svg>`,
        zestayLogo: `
            <svg viewBox="0 0 24 24" width="24" height="24">
                <circle cx="12" cy="12" r="10" fill="url(#logoGradient)"/>
                <text x="12" y="16" text-anchor="middle" fill="white" font-family="system-ui" font-size="12" font-weight="600">Z</text>
                <defs>
                    <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style="stop-color:#9333ea;stop-opacity:1" />
                        <stop offset="100%" style="stop-color:#ec4899;stop-opacity:1" />
                    </linearGradient>
                </defs>
            </svg>`
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
            box-shadow: 0 8px 32px rgba(37, 211, 102, 0.3);
            z-index: 999999;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            animation: breathe 3s ease-in-out infinite;
        }
        
        @keyframes breathe {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
        }
        
        #whatsapp-widget-icon:hover {
            transform: scale(1.1);
            box-shadow: 0 12px 40px rgba(37, 211, 102, 0.4);
        }
        
        #whatsapp-widget-chat {
            position: fixed;
            bottom: 100px;
            right: 20px;
            width: 380px;
            background: white;
            border-radius: 24px;
            box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
            z-index: 999998;
            display: none;
            overflow: hidden;
            backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            transform: translateY(20px) scale(0.95);
            opacity: 0;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        #whatsapp-widget-chat.show {
            transform: translateY(0) scale(1);
            opacity: 1;
        }
        
        #whatsapp-widget-header {
            background: linear-gradient(135deg, #9333ea 0%, #ec4899 100%);
            color: white;
            padding: 24px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            position: relative;
            overflow: hidden;
        }
        
        #whatsapp-widget-header::before {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
            animation: shimmer 4s linear infinite;
        }
        
        @keyframes shimmer {
            0% { transform: translateX(-100%) translateY(-100%) rotate(0deg); }
            100% { transform: translateX(100%) translateY(100%) rotate(360deg); }
        }
        
        .whatsapp-widget-header-content {
            display: flex;
            align-items: center;
            gap: 12px;
            z-index: 1;
        }
        
        .whatsapp-widget-title {
            font-weight: 600;
            font-size: 18px;
            letter-spacing: -0.025em;
        }
        
        .whatsapp-widget-subtitle {
            font-size: 14px;
            opacity: 0.9;
            font-weight: 400;
            margin-top: 2px;
        }
        
        #whatsapp-widget-close {
            background: rgba(255, 255, 255, 0.2);
            border: none;
            color: white;
            width: 32px;
            height: 32px;
            border-radius: 50%;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 16px;
            transition: all 0.2s ease;
            z-index: 1;
        }
        
        #whatsapp-widget-close:hover {
            background: rgba(255, 255, 255, 0.3);
            transform: scale(1.1);
        }
        
        #whatsapp-widget-body {
            padding: 24px;
            background: linear-gradient(145deg, #fafafa 0%, #f5f5f5 100%);
            position: relative;
        }
        
        .whatsapp-widget-welcome {
            background: white;
            padding: 20px;
            border-radius: 16px;
            margin-bottom: 20px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
            border: 1px solid rgba(0, 0, 0, 0.05);
            position: relative;
        }
        
        .whatsapp-widget-welcome::after {
            content: '';
            position: absolute;
            bottom: -8px;
            left: 24px;
            width: 0;
            height: 0;
            border-style: solid;
            border-width: 8px 8px 0 8px;
            border-color: white transparent transparent transparent;
        }
        
        .whatsapp-widget-welcome-text {
            font-size: 16px;
            color: #1f2937;
            line-height: 1.5;
            margin: 0 0 16px 0;
            font-weight: 500;
        }
        
        .whatsapp-widget-quick-replies {
            display: flex;
            flex-direction: column;
            gap: 8px;
        }
        
        .whatsapp-widget-quick-reply {
            background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
            border: 1px solid rgba(148, 163, 184, 0.2);
            padding: 12px 16px;
            border-radius: 12px;
            cursor: pointer;
            text-align: left;
            transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
            font-size: 14px;
            color: #374151;
            font-weight: 500;
            position: relative;
            overflow: hidden;
        }
        
        .whatsapp-widget-quick-reply::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(135deg, #9333ea 0%, #ec4899 100%);
            opacity: 0;
            transition: opacity 0.2s ease;
        }
        
        .whatsapp-widget-quick-reply:hover {
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(147, 51, 234, 0.15);
            border-color: rgba(147, 51, 234, 0.3);
            color: white;
        }
        
        .whatsapp-widget-quick-reply:hover::before {
            opacity: 1;
        }
        
        .whatsapp-widget-quick-reply span {
            position: relative;
            z-index: 1;
        }
        
        #whatsapp-widget-footer {
            padding: 20px 24px 24px;
            background: white;
            display: flex;
            gap: 12px;
            align-items: flex-end;
        }
        
        #whatsapp-widget-input {
            flex: 1;
            padding: 12px 16px;
            border: 2px solid #e5e7eb;
            border-radius: 12px;
            outline: none;
            font-family: inherit;
            font-size: 14px;
            transition: all 0.2s ease;
            background: #fafafa;
        }
        
        #whatsapp-widget-input:focus {
            border-color: #9333ea;
            background: white;
            box-shadow: 0 0 0 3px rgba(147, 51, 234, 0.1);
        }
        
        #whatsapp-widget-send {
            background: linear-gradient(135deg, #9333ea 0%, #ec4899 100%);
            border: none;
            width: 44px;
            height: 44px;
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
            box-shadow: 0 4px 12px rgba(147, 51, 234, 0.3);
        }
        
        #whatsapp-widget-send:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(147, 51, 234, 0.4);
        }
        
        #whatsapp-widget-send:active {
            transform: translateY(0);
        }
        
        .whatsapp-widget-powered {
            text-align: center;
            padding: 12px;
            font-size: 12px;
            color: #9ca3af;
            background: #fafafa;
            border-top: 1px solid rgba(0,0,0,0.05);
            font-weight: 500;
            letter-spacing: 0.025em;
        }
        
        @media (max-width: 480px) {
            #whatsapp-widget-chat {
                width: calc(100% - 40px);
                right: 20px;
                bottom: 90px;
            }
        }
        
        .fade-in {
            animation: fadeIn 0.5s ease-out forwards;
        }
        
        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: translateY(10px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
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
                            ${TEMPLATES.zestayLogo}
                            <div>
                                <div class="whatsapp-widget-title">${this.options.name}</div>
                                <div class="whatsapp-widget-subtitle">Always here to help</div>
                            </div>
                        </div>
                        <button id="whatsapp-widget-close" aria-label="Close chat">✕</button>
                    </div>
                    <div id="whatsapp-widget-body">
                        <div class="whatsapp-widget-welcome">
                            <p class="whatsapp-widget-welcome-text">👋 Welcome! How can we make your stay perfect?</p>
                            <div class="whatsapp-widget-quick-replies">
                                ${this.options.quickReplies.map(msg => `
                                    <button class="whatsapp-widget-quick-reply" data-message="${msg}">
                                        <span>${msg}</span>
                                    </button>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                    <div id="whatsapp-widget-footer">
                        <input type="text" id="whatsapp-widget-input" placeholder="Type your message..." aria-label="Message input">
                        <button id="whatsapp-widget-send" aria-label="Send message">
                            ${TEMPLATES.sendIcon}
                        </button>
                    </div>
                    <div class="whatsapp-widget-powered">Powered by Zestay ✨</div>
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
                const isVisible = chat.style.display === 'block';
                if (isVisible) {
                    chat.classList.remove('show');
                    setTimeout(() => {
                        chat.style.display = 'none';
                    }, 300);
                } else {
                    chat.style.display = 'block';
                    setTimeout(() => {
                        chat.classList.add('show');
                    }, 10);
                    input.focus();
                }
            };

            const closeClick = () => {
                chat.classList.remove('show');
                setTimeout(() => {
                    chat.style.display = 'none';
                }, 300);
            };

            const sendMessage = (message) => {
                if (message.trim()) {
                    window.open(`https://wa.me/${this.options.phone}?text=${encodeURIComponent(message)}`, '_blank');
                    input.value = '';
                    closeClick();
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
