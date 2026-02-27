# lounas アーキテクチャ概要

> コクーンタワー周辺で働く人向けの昼食レコメンドWebアプリ

---

## サービス概要

**lounas** は「シンプル」かつ「新しい体験」を提供する昼食レコメンドサービスです。ユーザーが好みの量・予算・個性を選択すると、昼休み(45分)内に往復・食事が可能な近隣レストランの料理を最大5件提案します。

---

## インフラ構成

```
ユーザー
  │
  ▼
[お名前.com] ─── DNS管理
  │
  ▼
[Cloudflare] ─── プロキシ・キャッシュ・DDoS保護
  │
  ▼
[Vercel] ─── Next.jsアプリホスティング・Edge Middleware
  │          ビルド・デプロイ: GitHub Actions (CI/CD)
  │
  ├──▶ [Supabase] ─── PostgreSQL DB・認証(Auth)
  │
  └──▶ [Cloudinary] ─── 店舗・料理写真のCDN配信
```

| サービス | 用途 |
|---|---|
| **Vercel** | Next.jsアプリのホスティング・サーバーレス関数実行 |
| **Supabase** | PostgreSQLデータベース・OTP認証・セッション管理 |
| **Cloudinary** | 店舗・料理画像のCDN配信・最適化 |
| **Cloudflare** | DNSプロキシ・キャッシュ・セキュリティ保護 |
| **お名前.com** | ドメイン取得・DNS登録 |
| **GitHub** | ソースコード管理・CI/CDパイプライン |

---

## 技術スタック

### フロントエンド / フレームワーク

| 技術 | バージョン | 用途 |
|---|---|---|
| **Next.js** | ^14.2 | App Routerによるフルスタックフレームワーク |
| **React** | ^18 | UIライブラリ |
| **TypeScript** | ^5 | 型安全な開発 |

### スタイリング

| 技術 | バージョン | 用途 |
|---|---|---|
| **Tailwind CSS** | ^3 | ユーティリティファーストCSS |
| **SCSS Modules** | (sass ^1) | コンポーネント単位のスコープドCSS |
| **MUI (Material UI)** | ^5 | Dialogなど一部UIコンポーネント |
| **Emotion** | ^11 | MUIのスタイリングエンジン |

### データ・状態管理

| 技術 | バージョン | 用途 |
|---|---|---|
| **Prisma** | ^5 | ORM・スキーマ管理・マイグレーション |
| **Supabase JS** | ^2 | Supabase接続クライアント |
| **SWR** | ^2 | クライアントサイドデータフェッチ・キャッシュ |
| **zod** | ^3 | スキーマ定義・バリデーション |
| **zod-prisma-types** | ^3 | PrismaスキーマからZodスキーマを自動生成 |

### フォーム

| 技術 | バージョン | 用途 |
|---|---|---|
| **React Hook Form** | ^7 | フォーム状態管理 |
| **@hookform/resolvers** | ^3 | ZodをRHFのバリデーターとして統合 |

### アニメーション

| 技術 | バージョン | 用途 |
|---|---|---|
| **Framer Motion** | ^11 | ページ遷移・UIアニメーション |
| **@lottiefiles/react-lottie-player** | ^3 | Lottieアニメーション再生 |

### 画像

| 技術 | バージョン | 用途 |
|---|---|---|
| **next-cloudinary** | ^6 | CloudinaryのNext.js統合 |
| **@svgr/webpack** | ^8 | SVGをReactコンポーネントとしてimport |

### 計測・分析

| 技術 | バージョン | 用途 |
|---|---|---|
| **@vercel/analytics** | ^1 | Vercel Analyticsによるアクセス解析 |
| **@next/third-parties** | ^14 | Google Analytics統合 |

---

## アプリケーション構成

```
src/
├── app/
│   ├── (root)/               # ランディングページ
│   │   ├── page.tsx          # デスクトップ向けトップ
│   │   └── mobile/           # モバイル向けトップ (middleware rewrite)
│   ├── (pages)/              # 公開ページ群
│   │   ├── recommend/        # レコメンド (explore, result)
│   │   ├── dish/[id]/        # 料理詳細
│   │   ├── restaurant/[id]/  # 店舗詳細・ナビ
│   │   ├── signup/           # サインアップ・OTP検証
│   │   ├── tos/              # 利用規約
│   │   └── privacy/          # プライバシーポリシー
│   ├── webapp/               # 認証済みユーザー専用アプリ
│   │   ├── home/             # ホーム
│   │   ├── diary/            # 日記 (訪問履歴)
│   │   ├── ranking/          # ランキング
│   │   └── user/             # ユーザー設定・サインイン・アウト
│   └── api/
│       ├── auth/             # 認証API (OTPフロー・コールバック)
│       └── v-beta/           # アプリREST API
│           ├── recommend/
│           ├── restaurants/
│           ├── restaurant/[id]/
│           ├── dishes/
│           ├── dish/[id]/
│           └── user/
├── components/               # 再利用可能UIコンポーネント
├── hooks/                    # カスタムフック
├── lib/                      # ライブラリ初期化・共通ユーティリティ
│   ├── prisma.ts             # Prismaシングルトンクライアント
│   ├── supabase/             # Supabaseクライアント群
│   ├── zod/                  # 自動生成Zodスキーマ (編集不可)
│   └── swr.ts                # SWRフェッチャー
├── styles/                   # グローバルSCSS
├── _constants/               # アプリ全体定数
├── hooks/                    # カスタムフック (認証フォームなど)
└── middleware.ts             # Edge Middleware (認証・モバイル判定)
```

---

## ルーティングとミドルウェア

`src/middleware.ts` がすべてのリクエストに対して認証状態・デバイス判定を行います。

### 認証済みユーザー

| アクセスパス | 動作 |
|---|---|
| `/` | `/webapp` にリダイレクト |
| `/signup/*` | `/webapp` にリダイレクト |
| `/webapp` | `/webapp/home` にリダイレクト |
| `/webapp/user/signin` | `/webapp/user/signout` にリダイレクト |
| `/recommend` | `/recommend/explore` にリダイレクト |

### 未認証ユーザー

| アクセスパス | 動作 |
|---|---|
| `/` (モバイル) | `/mobile` にrewrite |
| `/mobile` (非モバイル) | `/` にリダイレクト |
| `/webapp/*` | `/webapp/user/signin` にリダイレクト |
| `/recommend/*` | `/` にリダイレクト |
| `/restaurant/*` | `/` にリダイレクト |
| `/privacy/*` | `/` にリダイレクト |

---

## 認証フロー (OTP)

```
1. メールアドレス入力 (/signup)
        │
        ▼
2. POST /api/auth/otp → Supabase OTP メール送信
        │
        ▼
3. OTPコード入力 (/signup/verify)
        │
        ▼
4. POST /api/auth/otp/verification → Supabase OTP検証
        │
        ▼
5. GET /api/auth/callback → セッション確立
        │
        ▼
6. /webapp/home にリダイレクト
```

ミドルウェアが `verify` Cookieの存在を確認し、OTP送信前に `/signup/verify` に直接アクセスされることを防止します。

---

## レコメンドロジック

`GET /api/v-beta/recommend?amount=...&price=...&commonality=...`

1. **フィルタリング条件**
   - `price`: 料理の価格上限 (650 / 850 / 1000 / 999999円)
   - `amount`: 量の特性スコア範囲 (small: 0-50 / medium: 50-75 / large: 75-100)
   - `commonality`: 個性の特性スコア範囲 (common: 0-45 / unique: 45-100)
   - 現在営業中のレストランのみ (JST対応のためraw SQL使用)

2. **物理的制約フィルタ**
   - 昼休み45分以内: `移動時間(往復) + 食事時間 ≦ 2700秒`

3. **レスポンス選択**
   - 条件合致が5件以上: ランダムシャッフルして5件返却
   - 5件未満: フィルタを緩めてランダム5件返却

---

## CI/CD

- **ブランチ戦略**: `develop` をメインブランチとし、`<type>/x-y-z` ブランチから作業
- **Vercel連携**: GitHub pushでVercelが自動ビルド・デプロイ
- **ビルドコマンド**: `prisma generate && next build`
- **ignoreCommand**: `vercel.json` に設定済み (`vercel-build-ignore.sh` で条件付きデプロイ制御)

---

## 環境変数

| 変数名 | 用途 |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase プロジェクトURL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase 匿名キー |
| `DATABASE_URL` | Prisma Client用 (Supavisor/pgbouncer経由) |
| `DIRECT_URL` | Prismaマイグレーション用 (direct接続) |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | Cloudinary クラウド名 |
| `NEXT_PUBLIC_GA_TRACKING_ID` | Google Analytics トラッキングID |
