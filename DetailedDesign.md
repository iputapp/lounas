# lounas 詳細設計書

---

## 目次

1. [ライブラリ詳細](#ライブラリ詳細)
2. [データモデル定義](#データモデル定義)
3. [Zodスキーマ・バリデーション](#zodスキーマバリデーション)
4. [APIエンドポイント仕様](#apiエンドポイント仕様)
5. [フロントエンドページ構成](#フロントエンドページ構成)
6. [コンポーネント設計](#コンポーネント設計)
7. [スタイリング方針](#スタイリング方針)

---

## ライブラリ詳細

### データ永続化・バリデーション

#### Prisma (`@prisma/client` ^5)

- `src/lib/prisma.ts` にシングルトンクライアントを定義
- スキーマファイル: `prisma/schema.prisma`
- `multiSchema` プレビュー機能を使用し、`public` スキーマと `auth` スキーマを管理
- マイグレーションは `dotenv-cli` で `.env.local` を読み込んで実行: `npm run db:mig:dev`
- **注意**: Prismaは現状JSTタイムゾーンを正しく扱えないため、時刻に関するクエリは `$queryRaw` でraw SQLを使用している

#### zod (`zod` ^3)

- フォーム入力・APIリクエスト・レスポンスの型安全なスキーマ定義とバリデーションに使用
- 各APIルートの `index.ts` にリクエスト/レスポンス用のZodスキーマを定義
- React Hook Formと `@hookform/resolvers/zod` で統合し、フォームバリデーションにも使用

#### zod-prisma-types (`zod-prisma-types` ^3)

- `prisma/schema.prisma` のモデル定義からZodスキーマを自動生成
- 出力先: `src/lib/zod/index.ts` (自動生成のため手動編集不可)
- `schema.prisma` 内にコメント記法 (`/// @zod.string.min(1)`) でバリデーションルールを記述可能
- `npm run db:gen` (`prisma generate`) 実行で再生成
- 生成設定 (`prisma/schema.prisma`):
  - `createInputTypes = false`: 入力型は生成しない (最小限に抑制)
  - `createOptionalDefaultValuesTypes = true`: `default()` フィールドをオプショナルにした型も生成
  - `createRelationValuesTypes = true`: リレーションフィールドを含む型も生成

### データフェッチ

#### SWR (`swr` ^2)

- クライアントサイドのAPIフェッチ・キャッシュ・再検証に使用
- `src/lib/swr.ts` に共通フェッチャー関数を定義

### フォーム

#### React Hook Form (`react-hook-form` ^7) + @hookform/resolvers

- `src/hooks/auth/otp/` に認証フロー用カスタムフックを実装
  - `SignupHookForm.ts`: メール入力フォームのロジック
  - `VerificationHookForm.ts`: OTP入力フォームのロジック
- Zodスキーマをリゾルバとして渡すことでバリデーションを一元管理

### 認証

#### @supabase/ssr + @supabase/supabase-js

- `src/lib/supabase/` にクライアント種別ごとにクライアントを分離:
  - `client.ts`: ブラウザ (Client Component) 向けクライアント
  - `server.ts`: RSC (Server Component / Route Handler) 向けクライアント
  - `middleware.ts`: Edge Middleware向けクライアント
- 認証方式: OTP (ワンタイムパスワード、メールアドレスのみで登録)

### UIコンポーネント

#### MUI v5 (`@mui/material` ^5) + Emotion

- Dialog (AlertDialog, InfoDialog) などの一部コンポーネントのみ使用
- `src/styles/mui.ts` でカスタムテーマを定義

#### Framer Motion (`framer-motion` ^11)

- ページ遷移・要素のアニメーションに使用
- `src/components/layouts/AnimatePresenceLayer/` でラッパーを提供

#### Lottie (`@lottiefiles/react-lottie-player` ^3)

- `public/lottie/` にJSONアニメーションデータを配置
  - `navigation-animation.json`: ナビゲーション
  - `privacy-animation.json`: プライバシー
  - `error-animation.json`: エラー
- `src/components/lottie/` にラッパーコンポーネントを実装

### 画像

#### next-cloudinary (`next-cloudinary` ^6)

- `src/components/image/CldImg/` にラッパーコンポーネントを実装
- 環境変数 `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` で接続

#### @svgr/webpack

- SVGファイルをReactコンポーネントとして `import` できるよう設定 (`next.config.mjs`)
- `fill`/`stroke` の色値 (`#000`, `#FFF` 等) は `currentColor` に自動置換

---

## データモデル定義

> `prisma/schema.prisma` に基づく。DBテーブル名 (snake_case) はモデル名の右に記載。

### ID命名規則

| IDパターン | 形式 | 例 |
|---|---|---|
| 主要エンティティ (Restaurant, Dish) | `^[A-Z0-9]+$` 8文字 | `AB12CD34` |
| Route | `^[A-Z0-9]{8}\d{4}[A-Z0-9]{8}$` | `AB12CD34` + `0001` + `EF56GH78` |
| その他 | UUID v4 | `xxxxxxxx-xxxx-...` |

### Restaurant (`restaurants`)

店舗情報を管理する中心エンティティ。

| フィールド | 型 | 制約 | 説明 |
|---|---|---|---|
| `id` | String | PK, Unique, `[A-Z0-9]{8}` | 店舗ID |
| `createdAt` | DateTime | default: now() | 作成日時 (Timestamptz) |
| `updatedAt` | DateTime | default: now(), @updatedAt | 更新日時 (Timestamptz) |
| `name` | String | min(1) | 店舗名 |
| `description` | String? | nullable | 説明 |
| `website` | String? | nullable, url() | Webサイト |
| `address` | String? | nullable | 住所 |
| `longitude` | Float | - | 経度 |
| `latitude` | Float | - | 緯度 |
| `travelTime` | Int | nonnegative() | 徒歩移動時間 (秒) |
| `travelDistance` | Int | nonnegative() | 移動距離 (m) |

**リレーション**: `restaurantTags` (多対多), `restaurantOpens`, `routes`, `payments`, `dishes`

**インデックス**: `travelTime`

---

### RestaurantTag (`restaurant_tags`)

店舗に付与するタグ。Restaurant と多対多。

| フィールド | 型 | 説明 |
|---|---|---|
| `id` | String (UUID) | PK |
| `name` | String | タグ名 |
| `description` | String? | 説明 |

---

### RestaurantOpen (`restaurant_opens`)

店舗の営業時間。曜日ごとに1レコード。

| フィールド | 型 | 制約 | 説明 |
|---|---|---|---|
| `id` | String (UUID) | PK | |
| `timeOpen` | DateTime | Timetz | 開店時刻 |
| `timeClose` | DateTime | Timetz | 閉店時刻 |
| `weekTypeId` | Int | FK → WeekType | 曜日ID (0=日曜〜6=土曜) |
| `restaurantId` | String | FK → Restaurant | 店舗ID |

**ユニーク制約**: `(weekTypeId, restaurantId)`

---

### WeekType (`week_types`)

曜日マスタ。ID = 0 (日曜) 〜 6 (土曜)。

| フィールド | 型 | 制約 | 説明 |
|---|---|---|---|
| `id` | Int | PK, min(0), max(6) | 曜日番号 |
| `name` | String | min(1) | 曜日名 |

---

### Route (`routes`)

店舗への経路を表す。**連結リスト構造**で経路のステップを表現。

| フィールド | 型 | 制約 | 説明 |
|---|---|---|---|
| `id` | String | PK, Unique | `[A-Z0-9]{8}\d{4}[A-Z0-9]{8}` |
| `description` | String? | nullable | 説明 |
| `thumbnailId` | String? | nullable | サムネイル画像ID (Cloudinary) |
| `nextStepId` | String? | nullable | 次ステップのRoute ID |
| `previousStepId` | String? | nullable | 前ステップのRoute ID |
| `routeTypeId` | String (UUID) | FK → RouteType | 経路種別ID |
| `restaurantId` | String | FK → Restaurant | 店舗ID |

---

### RouteType (`route_types`)

経路の種別マスタ (例: 徒歩、地下鉄など)。

| フィールド | 型 | 説明 |
|---|---|---|
| `id` | String (UUID) | PK |
| `name` | String | 種別名 |
| `description` | String? | 説明 |

---

### Payment (`payments`)

店舗で利用可能な支払い方法の情報。

| フィールド | 型 | 制約 | 説明 |
|---|---|---|---|
| `id` | String (UUID) | PK | |
| `accepted` | Boolean | - | 利用可否 |
| `details` | String? | nullable | 補足情報 |
| `paymentTypeId` | String (UUID) | FK → PaymentType | 支払い種別ID |
| `restaurantId` | String | FK → Restaurant | 店舗ID |

**ユニーク制約**: `(paymentTypeId, restaurantId)`

---

### PaymentType (`payment_types`)

支払い方法の種別マスタ (例: 現金, クレジットカード, PayPayなど)。

| フィールド | 型 | 説明 |
|---|---|---|
| `id` | String (UUID) | PK |
| `name` | String | 種別名 |

---

### Dish (`dishes`)

料理情報。レコメンドの中心エンティティ。

| フィールド | 型 | 制約 | 説明 |
|---|---|---|---|
| `id` | String | PK, Unique, `[A-Z0-9]{8}` | 料理ID |
| `name` | String | min(1) | 料理名 |
| `description` | String? | nullable | 説明 |
| `price` | Int | nonnegative() | 価格 (円) |
| `eatTime` | Int | positive() | 食事時間 (秒) |
| `restaurantId` | String | FK → Restaurant | 店舗ID |

**リレーション**: `dishTags` (多対多), `dishScores`, `visitHistories`

**インデックス**: `price`

---

### DishTag (`dish_tags`)

料理に付与するタグ。Dish と多対多。

| フィールド | 型 | 説明 |
|---|---|---|
| `id` | String (UUID) | PK |
| `name` | String | タグ名 |
| `description` | String? | 説明 |

---

### DishScore (`dish_scores`)

料理の特性スコア。料理ごとに特性（DishTrait）別のスコアを持つ。

| フィールド | 型 | 制約 | 説明 |
|---|---|---|---|
| `id` | String (UUID) | PK | |
| `score` | Int | - | スコア (0〜100) |
| `dishId` | String | FK → Dish | 料理ID |
| `traitId` | String (UUID) | FK → DishTrait | 特性ID |

**ユニーク制約**: `(dishId, traitId)`

---

### DishTrait (`dish_traits`)

料理の特性マスタ。レコメンドのフィルタリング軸。

| フィールド | 型 | 説明 |
|---|---|---|
| `id` | String (UUID) | PK |
| `name` | String | 特性名 (例: `amount`, `commonality`) |
| `description` | String? | 説明 |

**現在使用している特性**:
- `amount`: 量 (small: 0-50 / medium: 50-75 / large: 75-100)
- `commonality`: 定番度 (common: 0-45 / unique: 45-100)

---

### VisitHistory (`visit_histories`)

ユーザーの料理訪問履歴。

| フィールド | 型 | 制約 | 説明 |
|---|---|---|---|
| `id` | String (UUID) | PK | |
| `userId` | String (UUID) | FK → User | ユーザーID |
| `dishId` | String | FK → Dish | 料理ID |

**インデックス**: `createdAt`

---

### User (`users`)

アプリ内ユーザー。Supabaseの `auth.users` とは別管理 (同一UUID)。

| フィールド | 型 | 制約 | 説明 |
|---|---|---|---|
| `id` | String (UUID) | PK | Supabase auth.users と同一ID |
| `username` | String | - | 組織内識別名 |
| `lastLogin` | DateTime? | nullable, Timestamptz | 最終ログイン日時 |
| `dataUsageAgreed` | Boolean | - | データ利用規約同意状態 |
| `organizationId` | String (UUID)? | FK → Organization, nullable | 所属組織ID |

**ユニーク制約**: `(username, organizationId)`

**インデックス**: `lastLogin`

---

### Organization (`organizations`)

ユーザーの所属組織 (大学・会社など)。

| フィールド | 型 | 制約 | 説明 |
|---|---|---|---|
| `id` | String (UUID) | PK | |
| `name` | String | Unique, min(1) | 組織識別名 |
| `displayName` | String | min(1) | 表示名 |
| `description` | String? | nullable | 説明 |
| `emailDomain` | String? | nullable | メールドメイン (例: `xxx.ac.jp`) |
| `isStudent` | Boolean | - | 学生組織フラグ |
| `isStaff` | Boolean | - | スタッフ組織フラグ |

---

### ERD (概略)

```
Organization ──< User ──< VisitHistory >── Dish >──< DishTag
                                                │
                                           DishScore >── DishTrait
                                                │
Restaurant ──────────────────────────────────── ┘
    │
    ├──< RestaurantOpen >── WeekType
    ├──< Payment >── PaymentType
    ├──< Route >── RouteType
    └──>── RestaurantTag (多対多)
```

---

## Zodスキーマ・バリデーション

### 自動生成スキーマ (`src/lib/zod/index.ts`)

`zod-prisma-types` によって自動生成。各モデルに対して以下が生成される:

| スキーマ名 | 内容 |
|---|---|
| `XxxSchema` | 基本スキーマ |
| `XxxOptionalDefaultsSchema` | `default()` フィールドをオプショナルにしたスキーマ |
| `XxxWithRelationsSchema` | リレーションを含む型 |

### 手書きスキーマ (各APIの `index.ts`)

| ファイル | スキーマ名 | 説明 |
|---|---|---|
| `api/auth/otp/index.ts` | `signupSchema` | メールアドレス + 利用規約同意 |
| `api/v-beta/recommend/index.ts` | `recommendRequestSchema` | レコメンドリクエスト (amount, price, commonality) |
| `api/v-beta/recommend/index.ts` | `recommendResponseSchema` | レコメンドレスポンス (Dish + Restaurant + Payment 結合) |
| `api/v-beta/dish/[id]/index.ts` | `dishSchema` | 料理詳細 (関連情報含む) |
| `api/v-beta/restaurant/[id]/navi/index.ts` | `routeSchema` | ナビ用ルート配列 |
| `api/v-beta/user/visit/new/index.ts` | `visitRegisterRequestSchema` | 訪問履歴登録 (`dishId` のみ) |
| `api/v-beta/user/data-agreement/index.ts` | `dataAgreementRequestSchema` | データ利用同意 (`dataUsageAgreed` のみ) |

### バリデーション統合フロー

```
ユーザー入力
    │
React Hook Form (フォーム状態管理)
    │
zodResolver (バリデーション実行)
    │
Zod スキーマ
    │
API Fetch
    │
Route Handler (safeParse でリクエスト検証)
    │
Prisma クエリ
```

---

## APIエンドポイント仕様

ベースパス: `/api/v-beta/`

### レコメンド

#### `GET /api/v-beta/recommend`

昼食レコメンドを最大5件返す。

**クエリパラメータ**

| パラメータ | 型 | 値 | 説明 |
|---|---|---|---|
| `amount` | string | `small` / `medium` / `large` / `any` | 量の好み |
| `price` | number | `650` / `850` / `1000` / `999999` | 価格上限 (円) |
| `commonality` | string | `common` / `unique` / `any` | 定番度 |

**レスポンス** (200)

```json
[
  {
    "dish": {
      "id": "AB12CD34",
      "name": "カルボナーラ",
      "price": 850,
      "eatTime": 1200
    },
    "restaurant": {
      "id": "EF56GH78",
      "name": "イタリアントレ",
      "travelTime": 420,
      "travelDistance": 350,
      "timeOpen": "11:00:00+09",
      "timeClose": "14:00:00+09",
      "payments": [
        { "type": "cash", "accepted": true },
        { "type": "credit_card", "accepted": true }
      ]
    }
  }
]
```

**スコアフィルタリング詳細**

| amount | scoreMin | scoreMax |
|---|---|---|
| `small` | 0 | 50 |
| `medium` | 50 | 75 |
| `large` | 75 | 100 |
| `any` | 0 | 100 |

| commonality | scoreMin | scoreMax |
|---|---|---|
| `common` | 0 | 45 |
| `unique` | 45 | 100 |
| `any` | 0 | 100 |

---

### 店舗

#### `GET /api/v-beta/restaurants`

全店舗一覧を返す。

#### `GET /api/v-beta/restaurant/[id]`

指定IDの店舗詳細を返す。

#### `GET /api/v-beta/restaurant/[id]/navi`

指定店舗へのナビ用ルート情報を返す。

**レスポンス**: `Route[]` (Route + RouteType + Restaurant 結合)

---

### 料理

#### `GET /api/v-beta/dishes`

全料理一覧を返す。

#### `GET /api/v-beta/dish/[id]`

指定IDの料理詳細を返す。

**レスポンス**: Dish + Restaurant (RestaurantOpens + Payments 含む) 結合

---

### ユーザー

#### `POST /api/v-beta/user/visit/new`

訪問履歴を登録する (要認証)。

**リクエストボディ**: `{ "dishId": "AB12CD34" }`

#### `GET /api/v-beta/user/visits-count`

ユーザーの累計訪問回数を返す (要認証)。

**レスポンス**: `number`

#### `POST /api/v-beta/user/data-agreement`

データ利用規約の同意状態を更新する (要認証)。

**リクエストボディ**: `{ "dataUsageAgreed": true }`

---

### 認証

#### `POST /api/auth/otp`

OTP認証メールを送信する。

**リクエストボディ**: `{ "email": "user@example.com", "agreePolicy": true }`

#### `POST /api/auth/otp/verification`

OTPを検証してセッションを確立する。

#### `POST /api/auth/otp/verification/resend`

OTPを再送信する。

#### `GET /api/auth/callback`

Supabaseからの認証コールバック。セッションCookieを設定する。

---

## フロントエンドページ構成

### 公開ページ (`(root)`, `(pages)`)

| パス | コンポーネント | 説明 |
|---|---|---|
| `/` | `(root)/page.tsx` | デスクトップ向けランディング |
| `/mobile` | `(root)/mobile/page.tsx` | モバイル向けランディング (middleware rewrite) |
| `/recommend/explore` | `(pages)/recommend/explore/page.tsx` | レコメンド属性選択トップ |
| `/recommend/explore/amount` | `(pages)/recommend/explore/(attributes)/amount/page.tsx` | 量の選択 |
| `/recommend/explore/price` | `(pages)/recommend/explore/(attributes)/price/page.tsx` | 価格の選択 |
| `/recommend/explore/commonality` | `(pages)/recommend/explore/(attributes)/commonality/page.tsx` | 定番度の選択 |
| `/recommend/result` | `(pages)/recommend/result/page.tsx` | レコメンド結果表示 |
| `/dish/[id]` | `(pages)/dish/[id]/page.tsx` | 料理詳細 |
| `/restaurant/[id]` | `(pages)/restaurant/[id]/` | 店舗詳細 |
| `/restaurant/[id]/navi` | `(pages)/restaurant/[id]/navi/page.tsx` | ナビ |
| `/signup` | `(pages)/signup/(otp)/page.tsx` | サインアップ (メール入力) |
| `/signup/verify` | `(pages)/signup/(otp)/verify/page.tsx` | OTP入力 |
| `/tos` | `(pages)/tos/page.tsx` | 利用規約 |
| `/privacy` | `(pages)/privacy/page.tsx` | プライバシーポリシー |

### 認証済みアプリ (`webapp`)

| パス | コンポーネント | 説明 |
|---|---|---|
| `/webapp/home` | `webapp/home/page.tsx` | ホーム |
| `/webapp/diary` | `webapp/diary/page.tsx` | 訪問履歴・日記 |
| `/webapp/ranking` | `webapp/ranking/page.tsx` | 料理ランキング |
| `/webapp/user` | `webapp/user/page.ts` | ユーザー設定 |
| `/webapp/user/signin` | `webapp/user/signin/page.tsx` | サインイン |
| `/webapp/user/signout` | `webapp/user/signout/page.tsx` | サインアウト |

### レコメンドフロー

```
/recommend/explore
    │
    ├──▶ /recommend/explore/amount     (量: がっつり / 普通 / 少なめ / おまかせ)
    │
    ├──▶ /recommend/explore/price      (値段: ~650円 / ~850円 / ~1000円 / おまかせ)
    │
    └──▶ /recommend/explore/commonality (個性: 定番 / 個性 / おまかせ)
              │
              ▼
        /recommend/result  (API呼び出し → 最大5件表示)
```

---

## コンポーネント設計

`src/components/` 以下をUIの種類で分類:

| ディレクトリ | 内容 |
|---|---|
| `backgrounds/` | 装飾的背景コンポーネント (CirclesTopLeft, TrianglesBottom, TrianglesCover) |
| `buttons/` | ボタン系 (BackButton, CircleButton, BorderCircleButton, BorderRoundButton, RectButton) |
| `cards/` | カード系 (Card, CardFull, CardHorizontal) |
| `dialogs/` | ダイアログ (DialogAlert, DialogInfo) ※MUI使用 |
| `forms/` | フォーム (BasicTextField, BasicCheckbox, otp/SignupForm, otp/VerificationForm) |
| `headers/` | ヘッダー (BorderTitle) |
| `image/` | 画像 (CldImg: Cloudinaryラッパー) |
| `layouts/` | レイアウト (AnimatePresenceLayer, ExpandablePanel, DummyPanel) |
| `lists/` | リスト (PaymentShort, PaymentLong: 支払い方法表示) |
| `lottie/` | Lottieアニメーション (Navigation, Privacy, Error) |
| `navigations/` | ナビゲーション (BottomNavigationBar: webapp用底部ナビ) |
| `overlays/` | オーバーレイ (LoadingLayer) |
| `progresses/` | プログレス (BasicLinearProgress) |
| `skeletons/` | スケルトン (BasicSkeleton) |
| `suspenses/` | Suspenseフォールバック (DishListSuspense) |
| `widgets/` | ウィジェット (FavButton, ShareButton, SelectionStack) |

---

## スタイリング方針

### Tailwind CSS と SCSS Modules の使い分け

- **Tailwind CSS**: ユーティリティクラスによる基本レイアウト・余白・色など
- **SCSS Modules**: コンポーネント固有の複雑なスタイル、擬似要素、アニメーションなど

### CSS Modules設定

- クラス名は **camelCase** で記述 (next.config.mjsで `exportLocalsConvention: "camelCase"` を設定)
- `src/styles/` 以下のグローバルSCSSは `sassOptions.includePaths` によってどこからでも `@use` 可能

### SVGの扱い

- `@svgr/webpack` によってSVGをReactコンポーネントとしてimport可能
- `fill`/`stroke` の黒・白色値は自動的に `currentColor` に置換されるため、CSSの `color` プロパティで色を制御できる

### コンポーネントスタイルファイル命名規則

各コンポーネントディレクトリ内に `styles.module.scss` を配置:

```
src/components/buttons/CircleButton/
├── index.tsx
└── styles.module.scss
```
