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
        name: 'Support Team',
        title: 'Chat with us',
        subtitle: 'We typically reply in a few minutes',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face&auto=format',
        welcomeMessage: 'Hi there! 👋\\nHow can we help you today?',
        placeholderText: 'Type a message...',
        quickReplies: [
            "Hi! I'm interested in your services 👋",
            "What are your working hours? 🕒", 
            "Can you share your pricing details? 💰",
            "I need technical support 🆘"
        ],
        theme: {
            primaryColor: '#25D366',
            secondaryColor: '#128C7E',
            accentColor: '#DCF8C6'
        },
        position: 'bottom-right',
        showBranding: true
    };

    const ICONS = {
        whatsapp: \`<svg viewBox="0 0 24 24" width="100%" height="100%" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.516"/>
        </svg>\`,
        close: \`<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
        </svg>\`,
        send: \`<svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
        </svg>\`,
        typing: \`<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
            <circle cx="4" cy="12" r="1.5"><animate attributeName="opacity" values="1;0.5;1" dur="1s" repeatCount="indefinite" begin="0s"/></circle>
            <circle cx="12" cy="12" r="1.5"><animate attributeName="opacity" values="1;0.5;1" dur="1s" repeatCount="indefinite" begin="0.2s"/></circle>
            <circle cx="20" cy="12" r="1.5"><animate attributeName="opacity" values="1;0.5;1" dur="1s" repeatCount="indefinite" begin="0.4s"/></circle>
        </svg>\`,
        online: \`<svg viewBox="0 0 12 12" width="12" height="12">
            <circle cx="6" cy="6" r="6" fill="#4ade80"/>
            <circle cx="6" cy="6" r="3" fill="#ffffff"/>
        </svg>\`
    };

    const STYLES = \`
        /* Reset and base styles */
        * {
            box-sizing: border-box;
        }

        /* Animations */
        @keyframes wa-bounce-in {
            0% { 
                opacity: 0; 
                transform: scale(0.3) rotate(-10deg); 
            }
            50% { 
                opacity: 1; 
                transform: scale(1.05) rotate(2deg); 
            }
            70% { 
                transform: scale(0.9) rotate(-1deg); 
            }
            100% { 
                opacity: 1; 
                transform: scale(1) rotate(0deg); 
            }
        }

        @keyframes wa-pulse {
            0% { 
                box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.7); 
            }
            70% { 
                box-shadow: 0 0 0 15px rgba(37, 211, 102, 0); 
            }
            100% { 
                box-shadow: 0 0 0 0 rgba(37, 211, 102, 0); 
            }
        }

        @keyframes wa-slide-up {
            0% { 
                opacity: 0; 
                transform: translateY(30px) scale(0.8); 
            }
            100% { 
                opacity: 1; 
                transform: translateY(0) scale(1); 
            }
        }

        @keyframes wa-slide-down {
            0% { 
                opacity: 1; 
                transform: translateY(0) scale(1); 
            }
            100% { 
                opacity: 0; 
                transform: translateY(30px) scale(0.8); 
            }
        }

        @keyframes wa-message-appear {
            0% { 
                opacity: 0; 
                transform: translateY(10px) scale(0.9); 
            }
            100% { 
                opacity: 1; 
                transform: translateY(0) scale(1); 
            }
        }

        @keyframes wa-ripple {
            0% {
                transform: scale(0);
                opacity: 1;
            }
            100% {
                transform: scale(4);
                opacity: 0;
            }
        }

        /* Main widget styles */
        #wa-widget-container {
            position: fixed;
            z-index: 999999;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            font-size: 14px;
            line-height: 1.4;
        }

        #wa-widget-container.bottom-right {
            bottom: 20px;
            right: 20px;
        }

        #wa-widget-container.bottom-left {
            bottom: 20px;
            left: 20px;
        }

        /* Floating button */
        #wa-widget-button {
            position: relative;
            width: 60px;
            height: 60px;
            background: linear-gradient(135deg, #25D366 0%, #128C7E 100%);
            border-radius: 50%;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 20px rgba(37, 211, 102, 0.4);
            transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
            animation: wa-pulse 2s infinite;
            overflow: hidden;
        }

        #wa-widget-button::before {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%);
            transform: scale(0);
            transition: transform 0.3s ease;
        }

        #wa-widget-button:hover {
            transform: scale(1.1);
            box-shadow: 0 6px 30px rgba(37, 211, 102, 0.6);
            animation: none;
        }

        #wa-widget-button:hover::before {
            transform: scale(1);
        }

        #wa-widget-button:active {
            transform: scale(0.95);
        }

        #wa-widget-button svg {
            width: 32px;
            height: 32px;
            color: white;
            filter: drop-shadow(0 2px 4px rgba(0,0,0,0.2));
            z-index: 1;
        }

        /* Notification badge */
        #wa-notification-badge {
            position: absolute;
            top: -2px;
            right: -2px;
            width: 20px;
            height: 20px;
            background: #ff3333;
            border-radius: 50%;
            display: none;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 11px;
            font-weight: bold;
            border: 2px solid white;
            animation: wa-bounce-in 0.5s ease-out;
        }

        /* Chat window */
        #wa-widget-chat {
            position: absolute;
            bottom: 75px;
            right: 0;
            width: 350px;
            max-width: calc(100vw - 40px);
            background: white;
            border-radius: 16px;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
            overflow: hidden;
            transform-origin: bottom right;
            animation: wa-slide-up 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
            display: none;
            border: 1px solid rgba(0, 0, 0, 0.08);
        }

        #wa-widget-chat.closing {
            animation: wa-slide-down 0.2s ease-in;
        }

        #wa-widget-chat.bottom-left {
            right: auto;
            left: 0;
            transform-origin: bottom left;
        }

        /* Header */
        #wa-widget-header {
            background: linear-gradient(135deg, #128C7E 0%, #075E54 100%);
            padding: 16px 20px;
            color: white;
            position: relative;
            overflow: hidden;
        }

        #wa-widget-header::before {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%);
            transform: translateX(-100%);
            animation: header-shine 3s ease-in-out infinite;
        }

        @keyframes header-shine {
            0%, 90%, 100% { transform: translateX(-100%); }
            10%, 80% { transform: translateX(100%); }
        }

        .wa-header-content {
            display: flex;
            align-items: center;
            justify-content: space-between;
            position: relative;
            z-index: 1;
        }

        .wa-header-info {
            display: flex;
            align-items: center;
            gap: 12px;
        }

        .wa-avatar {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: #fff;
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }

        .wa-avatar img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        .wa-avatar svg {
            width: 24px;
            height: 24px;
            color: #25D366;
        }

        .wa-contact-info h4 {
            margin: 0;
            font-size: 16px;
            font-weight: 600;
            text-shadow: 0 1px 2px rgba(0,0,0,0.1);
        }

        .wa-status {
            display: flex;
            align-items: center;
            gap: 6px;
            font-size: 12px;
            opacity: 0.9;
            margin-top: 2px;
        }

        .wa-close-btn {
            background: rgba(255,255,255,0.1);
            border: none;
            color: white;
            width: 32px;
            height: 32px;
            border-radius: 50%;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.2s ease;
            position: relative;
            overflow: hidden;
        }

        .wa-close-btn::before {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            width: 0;
            height: 0;
            background: rgba(255,255,255,0.2);
            border-radius: 50%;
            transform: translate(-50%, -50%);
            transition: all 0.3s ease;
        }

        .wa-close-btn:hover::before {
            width: 100%;
            height: 100%;
        }

        .wa-close-btn:hover {
            transform: rotate(90deg);
        }

        /* Chat body */
        #wa-widget-body {
            height: 280px;
            overflow-y: auto;
            background: #e5ddd5;
            background-image: 
                radial-gradient(circle at 25% 25%, rgba(37, 211, 102, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 75% 75%, rgba(18, 140, 126, 0.1) 0%, transparent 50%);
            position: relative;
            padding: 16px;
        }

        #wa-widget-body::-webkit-scrollbar {
            width: 4px;
        }

        #wa-widget-body::-webkit-scrollbar-track {
            background: transparent;
        }

        #wa-widget-body::-webkit-scrollbar-thumb {
            background: rgba(0,0,0,0.2);
            border-radius: 2px;
        }

        /* Messages */
        .wa-message {
            margin-bottom: 12px;
            animation: wa-message-appear 0.3s ease-out;
        }

        .wa-message-bubble {
            background: #DCF8C6;
            padding: 12px 16px;
            border-radius: 12px 12px 12px 4px;
            position: relative;
            box-shadow: 0 1px 2px rgba(0,0,0,0.1);
            max-width: 85%;
        }

        .wa-message-bubble::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: -6px;
            width: 0;
            height: 0;
            border-style: solid;
            border-width: 0 6px 8px 0;
            border-color: transparent #DCF8C6 transparent transparent;
        }

        .wa-message-text {
            margin: 0;
            color: #1f2937;
            word-wrap: break-word;
            white-space: pre-wrap;
        }

        .wa-message-time {
            font-size: 11px;
            color: #667781;
            margin-top: 6px;
            text-align: right;
            display: flex;
            align-items: center;
            justify-content: flex-end;
            gap: 4px;
        }

        /* Typing indicator */
        .wa-typing-indicator {
            display: none;
            align-items: center;
            gap: 8px;
            margin: 12px 0;
            color: #667781;
            font-size: 12px;
        }

        .wa-typing-indicator.active {
            display: flex;
        }

        /* Quick replies */
        .wa-quick-replies {
            display: flex;
            flex-direction: column;
            gap: 8px;
            margin-top: 16px;
        }

        .wa-quick-reply {
            background: white;
            border: 1px solid #e5e7eb;
            padding: 12px 16px;
            border-radius: 20px;
            cursor: pointer;
            transition: all 0.2s ease;
            font-size: 13px;
            color: #374151;
            text-align: left;
            position: relative;
            overflow: hidden;
        }

        .wa-quick-reply::before {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            width: 0;
            height: 0;
            background: rgba(37, 211, 102, 0.1);
            border-radius: 50%;
            transform: translate(-50%, -50%);
            transition: all 0.3s ease;
        }

        .wa-quick-reply:hover {
            background: #f8fafc;
            border-color: #25D366;
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }

        .wa-quick-reply:hover::before {
            width: 200%;
            height: 200%;
        }

        .wa-quick-reply:active {
            transform: translateY(0);
        }

        /* Input area */
        #wa-widget-footer {
            padding: 16px;
            background: #f8f9fa;
            border-top: 1px solid #e5e7eb;
            display: flex;
            gap: 12px;
            align-items: flex-end;
        }

        #wa-widget-input {
            flex: 1;
            min-height: 40px;
            max-height: 80px;
            padding: 10px 16px;
            border: 1px solid #d1d5db;
            border-radius: 20px;
            outline: none;
            font-family: inherit;
            font-size: 14px;
            resize: none;
            transition: all 0.2s ease;
            background: white;
        }

        #wa-widget-input:focus {
            border-color: #25D366;
            box-shadow: 0 0 0 3px rgba(37, 211, 102, 0.1);
        }

        #wa-widget-input::placeholder {
            color: #9ca3af;
        }

        #wa-widget-send {
            width: 40px;
            height: 40px;
            background: linear-gradient(135deg, #25D366 0%, #128C7E 100%);
            border: none;
            border-radius: 50%;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            transition: all 0.2s ease;
            position: relative;
            overflow: hidden;
            box-shadow: 0 2px 8px rgba(37, 211, 102, 0.3);
        }

        #wa-widget-send::before {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            width: 0;
            height: 0;
            background: rgba(255,255,255,0.3);
            border-radius: 50%;
            transform: translate(-50%, -50%);
            transition: all 0.3s ease;
        }

        #wa-widget-send:hover {
            transform: scale(1.05);
            box-shadow: 0 4px 16px rgba(37, 211, 102, 0.4);
        }

        #wa-widget-send:hover::before {
            width: 100%;
            height: 100%;
        }

        #wa-widget-send:active {
            transform: scale(0.95);
        }

        #wa-widget-send:disabled {
            opacity: 0.5;
            cursor: not-allowed;
        }

        /* Branding */
        .wa-branding {
            padding: 8px 16px;
            text-align: center;
            font-size: 11px;
            color: #9ca3af;
            background: #f8f9fa;
            border-top: 1px solid rgba(0,0,0,0.05);
        }

        .wa-branding a {
            color: #25D366;
            text-decoration: none;
            font-weight: 500;
            transition: color 0.2s ease;
        }

        .wa-branding a:hover {
            color: #128C7E;
        }

        /* Responsive design */
        @media (max-width: 480px) {
            #wa-widget-chat {
                width: calc(100vw - 20px);
                bottom: 75px;
            }
            
            #wa-widget-container.bottom-right {
                right: 10px;
                bottom: 10px;
            }
            
            #wa-widget-container.bottom-left {
                left: 10px;
                bottom: 10px;
            }
            
            #wa-widget-button {
                width: 56px;
                height: 56px;
            }
            
            #wa-widget-button svg {
                width: 28px;
                height: 28px;
            }
        }

        @media (max-width: 360px) {
            #wa-widget-body {
                height: 240px;
                padding: 12px;
            }
            
            #wa-widget-footer {
                padding: 12px;
            }
        }

        /* Accessibility */
        @media (prefers-reduced-motion: reduce) {
            * {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
            }
        }

        /* Dark mode support */
        @media (prefers-color-scheme: dark) {
            #wa-widget-chat {
                background: #1f2937;
                border-color: #374151;
            }
            
            #wa-widget-body {
                background: #111827;
            }
            
            .wa-message-bubble {
                background: #DCF8C6;
                color: #1f2937;
            }
            
            .wa-quick-reply {
                background: #374151;
                border-color: #4b5563;
                color: #f9fafb;
            }
            
            .wa-quick-reply:hover {
                background: #4b5563;
            }
            
            #wa-widget-footer {
                background: #374151;
                border-color: #4b5563;
            }
            
            #wa-widget-input {
                background: #1f2937;
                border-color: #4b5563;
                color: #f9fafb;
            }
            
            #wa-widget-input::placeholder {
                color: #9ca3af;
            }
        }
    \`;

    class WhatsAppWidget {
        constructor(options = {}) {
            this.options = { ...DEFAULT_OPTIONS, ...options };
            this.elements = [];
            this.eventListeners = [];
            this.isOpen = false;
            this.typingTimeout = null;
            
            this.init();
        }

        init() {
            this.injectStyles();
            this.createWidget();
            this.bindEvents();
            this.showWelcomeMessage();
        }

        destroy() {
            this.elements.forEach(element => element.remove());
            this.eventListeners.forEach(({ target, type, listener }) => {
                target.removeEventListener(type, listener);
            });
            
            // Remove injected styles
            const styles = document.querySelectorAll('style');
            styles.forEach(style => {
                if (style.textContent.includes('#wa-widget')) {
                    style.remove();
                }
            });
        }

        injectStyles() {
            const styleSheet = document.createElement('style');
            styleSheet.textContent = STYLES;
            document.head.appendChild(styleSheet);
            this.elements.push(styleSheet);
        }

        getCurrentTime() {
            return new Date().toLocaleTimeString([], { 
                hour: '2-digit', 
                minute: '2-digit' 
            });
        }

        createWidget() {
            const widget = document.createElement('div');
            widget.id = 'wa-widget-container';
            widget.className = this.options.position;
            
            widget.innerHTML = \`
                <div id="wa-widget-button" role="button" aria-label="Open WhatsApp Chat" tabindex="0">
                    \${ICONS.whatsapp}
                    <div id="wa-notification-badge">1</div>
                </div>
                
                <div id="wa-widget-chat" class="\${this.options.position}" role="dialog" aria-label="WhatsApp Chat" aria-hidden="true">
                    <div id="wa-widget-header">
                        <div class="wa-header-content">
                            <div class="wa-header-info">
                                <div class="wa-avatar">
                                    \${this.options.avatar ? 
                                        \`<img src="\${this.options.avatar}" alt="Avatar" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">\` +
                                        \`<div style="display:none;">\${ICONS.whatsapp}</div>\` :
                                        ICONS.whatsapp
                                    }
                                </div>
                                <div class="wa-contact-info">
                                    <h4>\${this.options.name}</h4>
                                    <div class="wa-status">
                                        \${ICONS.online}
                                        <span>Online • \${this.options.subtitle}</span>
                                    </div>
                                </div>
                            </div>
                            <button class="wa-close-btn" aria-label="Close chat">
                                \${ICONS.close}
                            </button>
                        </div>
                    </div>
                    
                    <div id="wa-widget-body">
                        <div class="wa-typing-indicator">
                            \${ICONS.typing}
                            <span>Typing...</span>
                        </div>
                    </div>
                    
                    <div id="wa-widget-footer">
                        <textarea 
                            id="wa-widget-input" 
                            placeholder="\${this.options.placeholderText}"
                            aria-label="Message input"
                            rows="1"
                        ></textarea>
                        <button id="wa-widget-send" aria-label="Send message">
                            \${ICONS.send}
                        </button>
                    </div>
                    
                    \${this.options.showBranding ? \`
                        <div class="wa-branding">
                            Powered by <a href="#" target="_blank">WhatsApp Widget</a>
                        </div>
                    \` : ''}
                </div>
            \`;
            
            document.body.appendChild(widget);
            this.elements.push(widget);
        }

        showWelcomeMessage() {
            setTimeout(() => {
                this.addMessage(this.options.welcomeMessage, true);
                this.showNotification();
            }, 1000);
        }

        showNotification() {
            const badge = document.getElementById('wa-notification-badge');
            if (badge && !this.isOpen) {
                badge.style.display = 'flex';
            }
        }

        hideNotification() {
            const badge = document.getElementById('wa-notification-badge');
            if (badge) {
                badge.style.display = 'none';
            }
        }

        addMessage(text, isBot = false, showQuickReplies = true) {
            const body = document.getElementById('wa-widget-body');
            const message = document.createElement('div');
            message.className = 'wa-message';
            
            message.innerHTML = \`
                <div class="wa-message-bubble">
                    <p class="wa-message-text">\${text}</p>
                    <div class="wa-message-time">
// Continuing from the message time div...
                        <span>${this.getCurrentTime()}</span>
                    </div>
                </div>
            `;
            
            body.appendChild(message);
            
            // Add quick replies for bot messages
            if (isBot && showQuickReplies && this.options.quickReplies.length > 0) {
                setTimeout(() => {
                    this.showQuickReplies();
                }, 500);
            }
            
            this.scrollToBottom();
        }

        showQuickReplies() {
            const body = document.getElementById('wa-widget-body');
            const existingReplies = body.querySelector('.wa-quick-replies');
            
            if (existingReplies) {
                existingReplies.remove();
            }
            
            const quickReplies = document.createElement('div');
            quickReplies.className = 'wa-quick-replies';
            
            this.options.quickReplies.forEach(reply => {
                const button = document.createElement('button');
                button.className = 'wa-quick-reply';
                button.textContent = reply;
                button.onclick = () => this.handleQuickReply(reply);
                quickReplies.appendChild(button);
            });
            
            body.appendChild(quickReplies);
            this.scrollToBottom();
        }

        handleQuickReply(text) {
            this.sendMessage(text);
            
            // Remove quick replies after selection
            const quickReplies = document.querySelector('.wa-quick-replies');
            if (quickReplies) {
                quickReplies.remove();
            }
        }

        showTypingIndicator() {
            const indicator = document.querySelector('.wa-typing-indicator');
            if (indicator) {
                indicator.classList.add('active');
                this.scrollToBottom();
            }
        }

        hideTypingIndicator() {
            const indicator = document.querySelector('.wa-typing-indicator');
            if (indicator) {
                indicator.classList.remove('active');
            }
        }

        sendMessage(text) {
            if (!text.trim()) return;
            
            // Show typing indicator
            this.showTypingIndicator();
            
            // Simulate bot response delay
            setTimeout(() => {
                this.hideTypingIndicator();
                
                // Open WhatsApp with the message
                const phone = this.options.phone.replace(/\D/g, '');
                const message = encodeURIComponent(text);
                const whatsappUrl = `https://wa.me/${phone}?text=${message}`;
                
                window.open(whatsappUrl, '_blank');
                
                // Add confirmation message
                setTimeout(() => {
                    this.addMessage("Thanks for your message! We'll continue our conversation on WhatsApp. 🚀", true, false);
                }, 800);
            }, 1500);
        }

        scrollToBottom() {
            const body = document.getElementById('wa-widget-body');
            if (body) {
                setTimeout(() => {
                    body.scrollTop = body.scrollHeight;
                }, 100);
            }
        }

        openChat() {
            const chat = document.getElementById('wa-widget-chat');
            const button = document.getElementById('wa-widget-button');
            
            if (chat && !this.isOpen) {
                chat.style.display = 'block';
                chat.setAttribute('aria-hidden', 'false');
                this.isOpen = true;
                this.hideNotification();
                
                // Focus on input
                setTimeout(() => {
                    const input = document.getElementById('wa-widget-input');
                    if (input) {
                        input.focus();
                    }
                }, 300);
            }
        }

        closeChat() {
            const chat = document.getElementById('wa-widget-chat');
            
            if (chat && this.isOpen) {
                chat.classList.add('closing');
                chat.setAttribute('aria-hidden', 'true');
                
                setTimeout(() => {
                    chat.style.display = 'none';
                    chat.classList.remove('closing');
                    this.isOpen = false;
                }, 200);
            }
        }

        toggleChat() {
            if (this.isOpen) {
                this.closeChat();
            } else {
                this.openChat();
            }
        }

        handleInput(e) {
            const input = e.target;
            
            // Auto-resize textarea
            input.style.height = 'auto';
            input.style.height = Math.min(input.scrollHeight, 80) + 'px';
            
            // Handle Enter key
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.handleSend();
            }
        }

        handleSend() {
            const input = document.getElementById('wa-widget-input');
            const text = input.value.trim();
            
            if (text) {
                this.sendMessage(text);
                input.value = '';
                input.style.height = 'auto';
            }
        }

        bindEvents() {
            const button = document.getElementById('wa-widget-button');
            const closeBtn = document.querySelector('.wa-close-btn');
            const sendBtn = document.getElementById('wa-widget-send');
            const input = document.getElementById('wa-widget-input');
            const chat = document.getElementById('wa-widget-chat');

            // Button events
            if (button) {
                const buttonClickHandler = () => this.toggleChat();
                const buttonKeyHandler = (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        this.toggleChat();
                    }
                };
                
                button.addEventListener('click', buttonClickHandler);
                button.addEventListener('keydown', buttonKeyHandler);
                
                this.eventListeners.push(
                    { target: button, type: 'click', listener: buttonClickHandler },
                    { target: button, type: 'keydown', listener: buttonKeyHandler }
                );
            }

            // Close button
            if (closeBtn) {
                const closeHandler = () => this.closeChat();
                closeBtn.addEventListener('click', closeHandler);
                this.eventListeners.push({ target: closeBtn, type: 'click', listener: closeHandler });
            }

            // Send button
            if (sendBtn) {
                const sendHandler = () => this.handleSend();
                sendBtn.addEventListener('click', sendHandler);
                this.eventListeners.push({ target: sendBtn, type: 'click', listener: sendHandler });
            }

            // Input events
            if (input) {
                const inputHandler = (e) => this.handleInput(e);
                input.addEventListener('keydown', inputHandler);
                input.addEventListener('input', inputHandler);
                
                this.eventListeners.push(
                    { target: input, type: 'keydown', listener: inputHandler },
                    { target: input, type: 'input', listener: inputHandler }
                );
            }

            // Click outside to close
            const outsideClickHandler = (e) => {
                if (this.isOpen && chat && !chat.contains(e.target) && !button.contains(e.target)) {
                    this.closeChat();
                }
            };
            
            document.addEventListener('click', outsideClickHandler);
            this.eventListeners.push({ target: document, type: 'click', listener: outsideClickHandler });

            // Escape key to close
            const escapeHandler = (e) => {
                if (e.key === 'Escape' && this.isOpen) {
                    this.closeChat();
                }
            };
            
            document.addEventListener('keydown', escapeHandler);
            this.eventListeners.push({ target: document, type: 'keydown', listener: escapeHandler });
        }

        // Public API methods
        updateOptions(newOptions) {
            this.options = { ...this.options, ...newOptions };
            
            // Update DOM elements if needed
            const nameElement = document.querySelector('.wa-contact-info h4');
            if (nameElement) nameElement.textContent = this.options.name;
            
            const subtitleElement = document.querySelector('.wa-status span');
            if (subtitleElement) subtitleElement.textContent = `Online • ${this.options.subtitle}`;
            
            const inputElement = document.getElementById('wa-widget-input');
            if (inputElement) inputElement.placeholder = this.options.placeholderText;
        }

        sendCustomMessage(message) {
            this.addMessage(message, true);
            this.showNotification();
        }

        show() {
            const container = document.getElementById('wa-widget-container');
            if (container) {
                container.style.display = 'block';
            }
        }

        hide() {
            const container = document.getElementById('wa-widget-container');
            if (container) {
                container.style.display = 'none';
            }
            this.closeChat();
        }
    }

    // Initialize widget with options from URL parameters or window.WhatsAppWidget
    function initializeWidget() {
        const urlParams = new URLSearchParams(window.location.search);
        const options = {};
        
        // Get options from URL parameters
        if (urlParams.get('phone')) options.phone = urlParams.get('phone');
        if (urlParams.get('name')) options.name = urlParams.get('name');
        if (urlParams.get('title')) options.title = urlParams.get('title');
        if (urlParams.get('subtitle')) options.subtitle = urlParams.get('subtitle');
        if (urlParams.get('avatar')) options.avatar = urlParams.get('avatar');
        if (urlParams.get('message')) options.welcomeMessage = decodeURIComponent(urlParams.get('message'));
        if (urlParams.get('placeholder')) options.placeholderText = urlParams.get('placeholder');
        if (urlParams.get('position')) options.position = urlParams.get('position');
        if (urlParams.get('branding')) options.showBranding = urlParams.get('branding') === 'true';
        
        // Get theme colors
        if (urlParams.get('primary')) options.theme.primaryColor = '#' + urlParams.get('primary');
        if (urlParams.get('secondary')) options.theme.secondaryColor = '#' + urlParams.get('secondary');
        if (urlParams.get('accent')) options.theme.accentColor = '#' + urlParams.get('accent');
        
        // Get quick replies
        if (urlParams.get('replies')) {
            try {
                options.quickReplies = JSON.parse(decodeURIComponent(urlParams.get('replies')));
            } catch (e) {
                console.warn('Invalid quick replies format');
            }
        }
        
        // Merge with window options if available
        const windowOptions = window.WhatsAppWidgetOptions || {};
        const finalOptions = { ...windowOptions, ...options };
        
        // Create and expose widget instance
        window.WhatsAppWidget = new WhatsAppWidget(finalOptions);
        
        // Expose public methods
        window.WAWidget = {
            open: () => window.WhatsAppWidget.openChat(),
            close: () => window.WhatsAppWidget.closeChat(),
            toggle: () => window.WhatsAppWidget.toggleChat(),
            send: (message) => window.WhatsAppWidget.sendCustomMessage(message),
            update: (options) => window.WhatsAppWidget.updateOptions(options),
            show: () => window.WhatsAppWidget.show(),
            hide: () => window.WhatsAppWidget.hide(),
            destroy: () => window.WhatsAppWidget.destroy()
        };
        
        // Fire ready event
        window.dispatchEvent(new CustomEvent('WhatsAppWidgetReady', {
            detail: { widget: window.WhatsAppWidget, api: window.WAWidget }
        }));
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeWidget);
    } else {
        initializeWidget();
    }

})();
        `;
        
        res.setHeader('Content-Type', 'application/javascript');
        res.status(200).send(script);
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}
