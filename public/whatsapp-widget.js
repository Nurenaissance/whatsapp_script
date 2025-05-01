(function() {
  'use strict';

  const DEFAULT_OPTIONS = {
    phone: '1234567890',
    name: 'Any Doubts?',
    social: [
      { name: 'Instagram', href: 'https://instagram.com/yourprofile', iconPath: '…' },
      { name: 'Facebook', href: 'https://facebook.com/yourpage',    iconPath: '…' },
      { name: 'WhatsApp', href: 'https://wa.me/1234567890',          iconPath: '…' },
      { name: 'Twitter',  href: 'https://twitter.com/yourhandle',    iconPath: '…' }
    ],
    actions: [
      { label: 'Whatsapp Chat',   type: 'whatsapp', icon: 'whatsappIcon' },
      { label: 'Leave a message', type: 'email',    icon: 'emailIcon', href: 'mailto:help@yourdomain.com' }
    ]
  };

  const TEMPLATES = {
    whatsappIcon: `
      <svg viewBox="0 0 24 24" width="20" height="20" fill="#25D366">
        <path d="…"/>
      </svg>`,
    emailIcon: `
      <svg viewBox="0 0 24 24" width="20" height="20" fill="#666">
        <path d="…"/>
      </svg>`,
    facebookIcon: `
      <svg viewBox="0 0 24 24" width="24" height="24" fill="#fff">
        <path d="…"/>
      </svg>`,
    instagramIcon: `
      <svg viewBox="0 0 24 24" width="24" height="24" fill="#fff">
        <path d="…"/>
      </svg>`,
    twitterIcon: `
      <svg viewBox="0 0 24 24" width="24" height="24" fill="#fff">
        <path d="…"/>
      </svg>`
  };

  const STYLES = `
  #dc-widget-trigger {
    position: fixed; bottom: 20px; right: 20px;
    background: #25D366; width: 60px; height: 60px; border-radius: 50%;
    box-shadow: 0 4px 15px rgba(0,0,0,0.2); display: flex;
    align-items: center; justify-content: center; cursor: pointer;
    z-index: 10000; transition: transform .3s;
  }
  #dc-widget-trigger:hover { transform: scale(1.1); }

  #dc-widget-panel {
    position: fixed; top: 20%; right: -360px; width: 340px;
    background: #fff; border-radius: 12px 0 0 12px;
    box-shadow: -4px 0 15px rgba(0,0,0,0.1); z-index: 9999;
    transition: right .4s ease;
    display: flex; flex-direction: column; overflow: hidden;
  }
  #dc-widget-panel.open { right: 0; }

  #dc-widget-header {
    background: #128C7E; color: #fff; padding: 16px;
    display: flex; justify-content: space-between; align-items: center;
  }
  #dc-widget-header h3 { margin: 0; font-size: 18px; }

  #dc-widget-socials {
    display: flex; gap: 12px;
  }
  #dc-widget-socials a { display: inline-flex; }

  #dc-widget-close {
    background: none; border: none; color: #fff;
    font-size: 20px; cursor: pointer;
  }

  #dc-widget-body {
    padding: 16px; background: #f9f9f9; flex: 1;
  }
  #dc-widget-body h4 {
    margin-top: 0; font-size: 16px; color: #333;
  }
  .dc-action-btn {
    width: 100%; padding: 10px 14px; margin-bottom: 10px;
    border: 1px solid #ddd; border-radius: 6px;
    background: #fff; font-size: 14px; color: #333;
    display: flex; align-items: center; gap: 8px;
    text-decoration: none; cursor: pointer;
    transition: background .2s, border-color .2s;
  }
  .dc-action-btn:hover {
    background: #f0f0f0; border-color: #ccc;
  }
  .dc-action-btn svg { flex-shrink: 0; }
  `;

  class DelightChat {
    constructor(opts) {
      this.opts = { ...DEFAULT_OPTIONS, ...opts };
      this._elements = [];
      this.injectStyles();
      this.build();
      this.bind();
    }
    injectStyles() {
      const s = document.createElement('style');
      s.textContent = STYLES;
      document.head.appendChild(s);
    }
    build() {
      // trigger
      const trg = document.createElement('div');
      trg.id = 'dc-widget-trigger';
      trg.innerHTML = TEMPLATES.whatsappIcon;
      document.body.appendChild(trg);
      this._elements.push(trg);

      // panel
      const pnl = document.createElement('div');
      pnl.id = 'dc-widget-panel';
      pnl.innerHTML = `
        <div id="dc-widget-header">
          <h3>${this.opts.name}</h3>
          <div id="dc-widget-socials">
            ${this.opts.social.map(s => `
              <a href="${s.href}" aria-label="${s.name}" target="_blank">
                ${TEMPLATES[s.name.toLowerCase()+'Icon']}
              </a>
            `).join('')}
          </div>
          <button id="dc-widget-close">✕</button>
        </div>
        <div id="dc-widget-body">
          <h4>Contact Us</h4>
          ${this.opts.actions.map(a => {
            if (a.type === 'whatsapp') {
              return `<div class="dc-action-btn" data-action="wa">
                        ${TEMPLATES.whatsappIcon}<span>${a.label}</span>
                      </div>`;
            } else {
              return `<a class="dc-action-btn" href="${a.href}">
                        ${TEMPLATES.emailIcon}<span>${a.label}</span>
                      </a>`;
            }
          }).join('')}
        </div>
      `;
      document.body.appendChild(pnl);
      this._elements.push(pnl);
    }
    bind() {
      const trigger = document.getElementById('dc-widget-trigger');
      const panel   = document.getElementById('dc-widget-panel');
      const close   = document.getElementById('dc-widget-close');
      const waBtns  = panel.querySelectorAll('[data-action="wa"]');

      trigger.addEventListener('click', () => panel.classList.add('open'));
      close.addEventListener('click', () => panel.classList.remove('open'));

      waBtns.forEach(btn =>
        btn.addEventListener('click', () => {
          const url = `https://wa.me/${this.opts.phone}`;
          window.open(url, '_blank');
        })
      );
    }
    destroy() {
      this._elements.forEach(el => el.remove());
    }
  }

  window.DelightChat = {
    init: (options) => {
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => new DelightChat(options));
      } else {
        new DelightChat(options);
      }
    }
  };
})();
