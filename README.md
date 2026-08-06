# euplotes.net

Next.js で作成したシンプルな個人プロフィールサイトです。

## ローカル起動

```bash
npm install
cp .env.example .env.local
npm run dev
```

プロフィール内容は `profile.toml` を編集してください。コードを変更せずに名前、ニックネーム、メール、アイコン、自己紹介、SNS、経歴、資格・免許を差し替えられます。

同梱画像を使う場合は画像を `public/profile.webp` に置き、次のように指定します。

```toml
icon_url = "/profile.webp"
```

Cloud Storage または Cloud CDN の画像を使う場合は、公開HTTPS URLを指定します。

```toml
icon_url = "https://storage.googleapis.com/euplotes-site-2hpiyu-assets/profile-icon.jpg"
```

背景色、文字色、ポイントカラーも `profile.toml` で指定できます。

```toml
[theme]
background_color = "#f5f5f3"
text_color = "#1f1f1f"
accent_color = "#15a8b0"
```

経歴は年月と内容を一件ずつ記載します。

```toml
[[career]]
date = "2020-04"
detail = "〇〇高校 入学"

[[career]]
date = "2023-03"
detail = "〇〇高校 卒業"
```

## GCP / Cloud Run

アイコンを Cloud Storage にアップロードして公開または Cloud CDN 経由で配信する場合は、その HTTPS URLを `profile.toml` の `icon_url` に設定します。

```bash
gcloud run deploy euplotes-site \
  --source . \
  --region asia-northeast1 \
  --allow-unauthenticated
```

ローカルで Docker イメージを作る場合は、次のコマンドを使えます。

```bash
docker build -t euplotes-site .
```

Cloud Run のカスタムドメイン、または外部 HTTPS Load Balancer を設定後、Cloudflare 側で `euplotes.net` の DNS をその接続先へ向けます。Cloudflare の SSL/TLS モードは `Full (strict)` を推奨します。

## アイコンのアップロード

Google Cloud CLIでログインした後、画像のパスを指定してスクリプトを実行します。GCPプロジェクトIDは `euplotes-site-2hpiyu`、バケットは `euplotes-site-2hpiyu-assets`、リージョンは `asia-northeast1` に設定済みです。

```bash
gcloud auth login
./scripts/upload-icon.sh ./icon.jpg
```

アップロード後に表示される `icon_url` を `profile.toml` に貼り付けてください。

このスクリプトは画像をWebサイトから表示するため、バケット内のオブジェクトをインターネットへ公開します。組織ポリシーで公開アクセスが禁止されている場合は実行できません。

## ブログを書く

`content/posts` にMarkdownファイルを追加します。ファイル名がURLのslugになります。

```markdown
---
title: "記事タイトル"
description: "一覧とOGPに表示する説明"
published: "2026-08-06"
tags: ["日記", "技術"]
thumbnail: "https://example.com/thumbnail.jpg"
revisions:
  - date: "2026-08-06"
    note: "初版公開"
  - date: "2026-08-07"
    note: "説明を追記"
---

本文をMarkdownで書きます。数式は `$E = mc^2$` または `$$ ... $$` で記述できます。
```

`thumbnail` を省略した場合は `profile.toml` の次の画像が使われます。

```toml
[blog]
default_thumbnail = "https://example.com/default.jpg"
```

本文中にURLだけの行を書くと、その位置にOGPリンクカードが表示されます。

個人サイト
