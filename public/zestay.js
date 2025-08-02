(function() {
    'use strict';

    const DEFAULT_OPTIONS = {
        phone: '1234567890',
        name: 'Zestay',
        quickReplies: [
            "Help with check-in",
            "Upload documents", 
            "My reservation",
            "Speak to someone"
        ]
    };

    const TEMPLATES = {
        whatsappIcon: `
      <svg viewBox="0 0 24 24" width="40" height="40" xmlns="http://www.w3.org/2000/svg">
  <path fill="#FFFFFF" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
</svg>
`,
        sendIcon: `
            <svg viewBox="0 0 24 24" width="18" height="18">
                <path fill="white" d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
            </svg>`,
        closeIcon: `
            <svg viewBox="0 0 24 24" width="14" height="14">
                <path fill="currentColor" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
            </svg>`
    };

    const STYLES = `
        #whatsapp-widget-icon {
            position: fixed;
            bottom: 24px;
            right: 24px;
            background-color: #25D366;
            width: 56px;
            height: 56px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
            z-index: 999999;
            transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        
        #whatsapp-widget-icon:hover {
            transform: scale(1.05);
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
        }
        
        #whatsapp-widget-chat {
            position: fixed;
            bottom: 88px;
            right: 24px;
            width: 320px;
            background: white;
            border-radius: 12px;
            box-shadow: 0 8px 40px rgba(0, 0, 0, 0.12);
            z-index: 999998;
            display: none;
            overflow: hidden;
            border: 1px solid rgba(0, 0, 0, 0.08);
            transform: translateY(8px);
            opacity: 0;
            transition: all 0.25s ease;
        }
        
        #whatsapp-widget-chat.show {
            transform: translateY(0);
            opacity: 1;
        }
        
        #whatsapp-widget-header {
            background: white;
            color: #1d1d1f;
            padding: 20px 20px 16px;
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            border-bottom: 1px solid #f2f2f7;
        }
        
        .whatsapp-widget-header-content {
            display: flex;
            align-items: center;
            gap: 0;
        }
        
        .whatsapp-widget-title {
            font-weight: 600;
            font-size: 17px;
            color: #1d1d1f;
            letter-spacing: -0.022em;
            line-height: 1.2;
        }
        
        .whatsapp-widget-subtitle {
            font-size: 13px;
            color: #86868b;
            font-weight: 400;
            margin-top: 1px;
            letter-spacing: -0.008em;
        }
        
        #whatsapp-widget-close {
            background: #f2f2f7;
            border: none;
            color: #86868b;
            width: 28px;
            height: 28px;
            border-radius: 50%;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.15s ease;
            margin-top: -2px;
        }
        
        #whatsapp-widget-close:hover {
            background: #e5e5ea;
            color: #1d1d1f;
        }
        
        #whatsapp-widget-body {
            padding: 20px;
            background: white;
        }
        
        .whatsapp-widget-welcome {
            margin-bottom: 16px;
        }
        
        .whatsapp-widget-welcome-text {
            font-size: 15px;
            color: #1d1d1f;
            line-height: 1.4;
            margin: 0 0 16px 0;
            font-weight: 400;
            letter-spacing: -0.016em;
        }
        
        .whatsapp-widget-quick-replies {
            display: flex;
            flex-direction: column;
            gap: 8px;
        }
        
        .whatsapp-widget-quick-reply {
            background: #f2f2f7;
            border: none;
            padding: 12px 16px;
            border-radius: 8px;
            cursor: pointer;
            text-align: left;
            transition: all 0.15s ease;
            font-size: 15px;
            color: #1d1d1f;
            font-weight: 400;
            letter-spacing: -0.016em;
            line-height: 1.3;
        }
        
        .whatsapp-widget-quick-reply:hover {
            background: #e5e5ea;
            transform: none;
        }
        
        .whatsapp-widget-quick-reply:active {
            background: #d1d1d6;
            transform: scale(0.98);
        }
        
        #whatsapp-widget-footer {
            padding: 16px 20px 20px;
            background: white;
            display: flex;
            gap: 8px;
            align-items: flex-end;
            border-top: 1px solid #f2f2f7;
        }
        
        #whatsapp-widget-input {
            flex: 1;
            padding: 10px 12px;
            border: 1px solid #d1d1d6;
            border-radius: 8px;
            outline: none;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
            font-size: 15px;
            background: white;
            color: #1d1d1f;
            letter-spacing: -0.016em;
            transition: border-color 0.15s ease;
        }
        
        #whatsapp-widget-input:focus {
            border-color: #1d1d1f;
        }
        
        #whatsapp-widget-input::placeholder {
            color: #86868b;
        }
        
        #whatsapp-widget-send {
            background: #1d1d1f;
            border: none;
            width: 36px;
            height: 36px;
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.15s ease;
            opacity: 0.3;
            pointer-events: none;
        }
        
        #whatsapp-widget-send.active {
            opacity: 1;
            pointer-events: all;
        }
        
        #whatsapp-widget-send.active:hover {
            background: #000;
        }
        
        #whatsapp-widget-send.active:active {
            transform: scale(0.95);
        }
        
        .whatsapp-widget-powered {
            text-align: center;
            padding: 12px;
            font-size: 11px;
            color: #86868b;
            background: #fbfbfd;
            border-top: 1px solid #f2f2f7;
            font-weight: 400;
            letter-spacing: 0.006em;
        }
        
        @media (max-width: 480px) {
            #whatsapp-widget-chat {
                width: calc(100% - 48px);
                right: 24px;
            }
        }
        
        * {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
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
                <div id="whatsapp-widget-icon" role="button" aria-label="Open chat">
                    ${TEMPLATES.whatsappIcon}
                </div>
                <div id="whatsapp-widget-chat" role="dialog" aria-label="Chat">
                    <div id="whatsapp-widget-header">
                        <div class="whatsapp-widget-header-content">
                            <div>
                                <div class="whatsapp-widget-title">${this.options.name}</div>
                                <div class="whatsapp-widget-subtitle">Always here to help</div>
                            </div>
                        </div>
                        <button id="whatsapp-widget-close" aria-label="Close">
                            ${TEMPLATES.closeIcon}
                        </button>
                    </div>
                    <div id="whatsapp-widget-body">
                        <div class="whatsapp-widget-welcome">
                            <p class="whatsapp-widget-welcome-text">How can we help you today?</p>
                            <div class="whatsapp-widget-quick-replies">
                                ${this.options.quickReplies.map(msg => `
                                    <button class="whatsapp-widget-quick-reply" data-message="${msg}">
                                        ${msg}
                                    </button>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                    <div id="whatsapp-widget-footer">
                        <input type="text" id="whatsapp-widget-input" placeholder="Message" aria-label="Type a message">
                        <button id="whatsapp-widget-send" aria-label="Send">
                            ${TEMPLATES.sendIcon}
                        </button>
                    </div>
                    <div class="whatsapp-widget-powered">Powered by Zestay</div>
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

            const updateSendButton = () => {
                if (input.value.trim()) {
                    sendBtn.classList.add('active');
                } else {
                    sendBtn.classList.remove('active');
                }
            };

            const iconClick = () => {
                const isVisible = chat.classList.contains('show');
                if (isVisible) {
                    chat.classList.remove('show');
                    setTimeout(() => {
                        chat.style.display = 'none';
                    }, 250);
                } else {
                    chat.style.display = 'block';
                    requestAnimationFrame(() => {
                        chat.classList.add('show');
                    });
                    setTimeout(() => input.focus(), 250);
                }
            };

            const closeClick = () => {
                chat.classList.remove('show');
                setTimeout(() => {
                    chat.style.display = 'none';
                }, 250);
            };

            const sendMessage = (message) => {
                if (message.trim()) {
                    window.open(`https://wa.me/${this.options.phone}?text=${encodeURIComponent(message)}`, '_blank');
                    input.value = '';
                    updateSendButton();
                    closeClick();
                }
            };

            const sendClick = () => {
                if (sendBtn.classList.contains('active')) {
                    sendMessage(input.value);
                }
            };

            const inputKeypress = (e) => {
                if (e.key === 'Enter' && sendBtn.classList.contains('active')) {
                    sendMessage(input.value);
                }
            };

            icon.addEventListener('click', iconClick);
            closeBtn.addEventListener('click', closeClick);
            sendBtn.addEventListener('click', sendClick);
            input.addEventListener('keypress', inputKeypress);
            input.addEventListener('input', updateSendButton);

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
                { target: input, type: 'input', listener: updateSendButton },
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
