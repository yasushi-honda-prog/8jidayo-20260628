# 8jidayo_20260628

タダカヨ「8時だヨ勉強会 #1」（2026年6月28日開催）のオンライン限定資料サイト。

- 参加者向けトップ：`index.html`
- 発表者用ノート：`notes.html`（noindex設定済、トップからのリンクなし）
- スタイル：`css/style.css`

## ローカルで見る

```bash
cd /Users/yyyhhh/Projects/tadakayo/8jidayo_20260628
python3 -m http.server 8000
# ブラウザで http://localhost:8000/ を開く
```

## GitHub Pages 公開手順（案）

公開リポジトリ名案：
- `yasushi-honda-prog/8jidayo-20260628`（イベント単位で独立リポ／推奨）
- `yasushi-honda-prog/tadakayo-events`（複数回をまとめる場合）

### 単独リポで公開する場合

```bash
cd /Users/yyyhhh/Projects/tadakayo/8jidayo_20260628
git init -b main
git add .
git commit -m "Initial: 8時だヨ勉強会 #1 サイト"
gh repo create yasushi-honda-prog/8jidayo-20260628 \
  --public \
  --source . \
  --remote origin \
  --push
gh api -X POST repos/yasushi-honda-prog/8jidayo-20260628/pages \
  -f source.branch=main -f source.path=/
```

公開後の想定URL：
```
https://yasushi-honda-prog.github.io/8jidayo-20260628/
```

### 注意

- `notes.html` は noindex 設定済だが、URLを知っていれば閲覧可能。発表者専用なら**別リポジトリのPrivate**にする選択肢もあり。
- カスタムドメイン使う場合は `CNAME` ファイルを追加して Pages 設定で指定。

## 当日までのTODO

- [ ] サンプルPDFを1〜2本決定（厚労省 介護保険最新情報 など）
- [ ] NotebookLMにサンプルPDFを事前投入してノートブックを作成
- [ ] Zoom画面共有のリハーサル（このサイト・NotebookLM・PDF）
- [ ] 開催時刻の確定（仮：20:00開始 / 約37分）
- [ ] 参加者にサイトURLを事前 or 開始時にチャットで案内

## ファイル構成

```
8jidayo_20260628/
├── README.md           # このファイル
├── index.html          # 参加者向けトップページ
├── notes.html          # 発表者ノート
├── css/
│   └── style.css       # タダカヨブランドスタイル
├── images/             # 画像格納用（現状空）
└── js/                 # JS格納用（現状空）
```

## デザインスペック

- カラー：赤 `#e33535` / ピンク `#ffe2f7` / 黒 `#000000` / グレー `#f2f2f2`
- フォント：Noto Sans JP（Google Fonts）
- ロゴ：CSS再現の「タダ[カ]ヨ」テキストロゴ（画像不要）
- レスポンシブ対応（720px ブレークポイント）

## クレジット

NPO法人タダカヨ／介護 × 無料IT
