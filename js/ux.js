/* ============================================================
   タダカヨ サイトUX:
   - スクロール進行バー
   - コピーボタン (Clipboard API)
   - プロンプトモーダル
   ============================================================ */
(function () {
  'use strict';

  /* --------- スクロール進行バー --------- */
  var progress = document.getElementById('scroll-progress');
  if (progress) {
    var ticking = false;
    function update() {
      var h = document.documentElement.scrollHeight - window.innerHeight;
      var pct = h > 0 ? Math.min(100, Math.max(0, (window.scrollY / h) * 100)) : 0;
      progress.style.width = pct + '%';
      ticking = false;
    }
    window.addEventListener('scroll', function () {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    }, { passive: true });
    window.addEventListener('resize', update, { passive: true });
    update();
  }

  /* --------- コピーボタン --------- */
  document.addEventListener('click', function (e) {
    var btn = e.target.closest('.copy-btn');
    if (!btn) return;
    var targetId = btn.getAttribute('data-copy-target');
    if (!targetId) return;
    var src = document.getElementById(targetId);
    if (!src) return;
    var text = src.textContent.replace(/^\s+|\s+$/g, '');
    copyToClipboard(text).then(function () {
      var orig = btn.textContent;
      btn.classList.add('copied');
      btn.textContent = 'コピーしました';
      setTimeout(function () {
        btn.classList.remove('copied');
        btn.textContent = orig;
      }, 2000);
    }).catch(function () {
      btn.textContent = 'コピー失敗';
      setTimeout(function () {
        btn.textContent = 'コピー';
      }, 1500);
    });
  });

  function copyToClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text);
    }
    // Fallback for older browsers / non-https
    return new Promise(function (resolve, reject) {
      var ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.left = '-9999px';
      document.body.appendChild(ta);
      ta.select();
      try {
        var ok = document.execCommand('copy');
        document.body.removeChild(ta);
        ok ? resolve() : reject(new Error('execCommand failed'));
      } catch (err) {
        document.body.removeChild(ta);
        reject(err);
      }
    });
  }

  /* --------- プロンプトモーダル --------- */
  var modal = document.getElementById('prompt-modal');
  var openBtn = document.getElementById('open-prompts');
  if (modal && openBtn) {
    openBtn.addEventListener('click', function () {
      modal.hidden = false;
      requestAnimationFrame(function () { modal.classList.add('show'); });
      document.body.style.overflow = 'hidden';
    });

    modal.addEventListener('click', function (e) {
      if (e.target.hasAttribute('data-modal-close')) {
        hideModal();
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !modal.hidden) hideModal();
    });

    function hideModal() {
      modal.classList.remove('show');
      document.body.style.overflow = '';
      setTimeout(function () { modal.hidden = true; }, 250);
    }
  }
})();
