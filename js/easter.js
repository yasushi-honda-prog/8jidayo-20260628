/* ============================================================
   タダカヨ こっそりイースターエッグ
   - ヘッダーロゴの「カ」を 5 連打
   - or コナミコマンド (↑↑↓↓←→←→BA)
   どちらかでトーストを出し、ボタンからゲームを開く
   ============================================================ */
(function () {
  'use strict';

  var GAME_URL = 'https://tadakayo-game-yh.web.app/';
  var TARGET = document.getElementById('easter-ka');
  if (!TARGET) return;

  // クリックできるよ、と分かるくらいの控えめな見た目
  TARGET.style.cursor = 'pointer';
  TARGET.setAttribute('title', '');
  TARGET.setAttribute('tabindex', '-1');

  var count = 0;
  var lastClickAt = 0;
  var RESET_MS = 1200;
  var NEEDED = 5;

  TARGET.addEventListener('click', function (e) {
    e.preventDefault();
    var now = Date.now();
    if (now - lastClickAt > RESET_MS) count = 0;
    lastClickAt = now;
    count += 1;

    // 視覚フィードバック（軽く弾む）
    TARGET.style.transition = 'transform 0.15s cubic-bezier(0.2,0.7,0.2,1)';
    TARGET.style.transform = 'scale(' + (1 + count * 0.05) + ') rotate(' + (count * 2 - 4) + 'deg)';
    setTimeout(function () {
      TARGET.style.transform = '';
    }, 160);

    if (count >= NEEDED) {
      count = 0;
      lastClickAt = 0;
      showToast('🎮 みつけた！');
    }
  });

  // コナミコマンド
  var konami = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
  var kpos = 0;
  window.addEventListener('keydown', function (e) {
    var k = e.key;
    var expected = konami[kpos];
    var hit = false;
    if (expected.startsWith('Arrow')) {
      hit = (k === expected);
    } else {
      hit = (k && k.toLowerCase && k.toLowerCase() === expected);
    }
    if (hit) {
      kpos += 1;
      if (kpos === konami.length) {
        kpos = 0;
        showToast('🎮 コマンド成立！');
      }
    } else {
      kpos = 0;
    }
  });

  // トースト：自動でwindow.openするとブロックされる端末があるので、
  // ボタンを出してユーザーに踏んでもらう
  function showToast(headline) {
    // 既存があれば消す
    var prev = document.querySelector('.easter-toast');
    if (prev) prev.remove();

    var toast = document.createElement('div');
    toast.className = 'easter-toast';
    toast.setAttribute('role', 'dialog');
    toast.setAttribute('aria-label', 'タダカヨかくれゲーム');
    toast.innerHTML =
      '<button class="easter-close" aria-label="閉じる">×</button>' +
      '<p class="easter-head">' + headline + '</p>' +
      '<p class="easter-sub">タダカヨかくれゲームです。<br>休憩中にどうぞ。</p>' +
      '<a class="easter-cta" href="' + GAME_URL + '" target="_blank" rel="noopener noreferrer">🎮 ゲームを開く</a>';
    document.body.appendChild(toast);

    requestAnimationFrame(function () {
      toast.classList.add('show');
    });

    toast.querySelector('.easter-close').addEventListener('click', function () {
      hideToast(toast);
    });
    toast.querySelector('.easter-cta').addEventListener('click', function () {
      setTimeout(function () { hideToast(toast); }, 200);
    });

    // 10秒で自動的に消す
    setTimeout(function () { hideToast(toast); }, 10000);
  }

  function hideToast(el) {
    if (!el || !el.parentNode) return;
    el.classList.remove('show');
    setTimeout(function () {
      if (el.parentNode) el.parentNode.removeChild(el);
    }, 360);
  }
})();
