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
| 主要エンティティ (Restaurant, Dish) | `^[A-Z0-9]{8}$` (8文字) | `AB12CD34` |
| Route | `^[A-Z0-9]{8}\d{4}[A-Z0-9]{8}$` | `AB12CD34` + `0001` + `EF56GH78` |
| その他 | UUID v4 | `xxxxxxxx-xxxx-...` |

**主要エンティティに短縮IDを採用した理由**

Restaurant と Dish の ID は `/restaurant/AB12CD34` や `/dish/AB12CD34` のようにURLパスに直接使用される。ユーザー同士がリンクを共有することを想定しており、UUIDのような長い文字列より短く視認性の高い形式が適していると判断した。

将来的にユーザー投稿による料理・店舗データの追加も想定していたが、**審査制**を前提とするためデータ件数は限定的に増加する見込みであり、PKとURLパスを一致させる単純な設計が成立すると判断した。審査なしで大量データが登録されるケースでは、PKとURLパスを分離する設計を検討する必要がある。

その他のテーブル (中間テーブル・マスタ・ユーザー等) はURLに露出しないため、通常の UUID v4 を採用している。

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
DishScoreと同様、DB上にデータは入っていない。将来的に料理カテゴリ（和食, 中華, イタリアン, etc.）ごとのタグ付け/検索を想定していた。

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

料理のカテゴリ分類タグ。Dish と多対多のリレーション。

> **注意**: DishTag は料理のカテゴリ付けのみを目的としており、後述の **DishScore / DishTrait (レコメンドスコアリング)** とは完全に独立した仕組みである。また、RestaurantTagと同様、DB上にデータは入っていない。将来的に料理カテゴリ（和食, 中華, イタリアン, etc.）ごとのタグ付け/検索を想定していた。

| フィールド | 型 | 説明 |
|---|---|---|
| `id` | String (UUID) | PK |
| `name` | String | タグ名 |
| `description` | String? | 説明 |

---

### DishScore (`dish_scores`) · DishTrait (`dish_traits`)

> この2つのテーブルはセットで理解する必要がある。

**概念**

`DishTrait` はレコメンドのフィルタリング軸（特性）を定義するマスタテーブルである。現在 `amount`（量）・`commonality`（定番度）の2種類が登録されている。

`DishScore` は `Dish` と `DishTrait` を結ぶ**中間テーブル**であり、「ある料理がある特性についていくつのスコアを持つか」を記録する。すなわち **Dish (マスタ) × DishTrait (マスタ) = DishScore (スコア値)** という構造になっている。

```
Dish ─────────────── DishScore ─────────────── DishTrait
(料理マスタ)     (中間テーブル: score値を保持)   (特性マスタ)

例:
"カルボナーラ" × "amount"      → score: 60  (medium相当)
"カルボナーラ" × "commonality" → score: 30  (common相当)
"冷やし中華"   × "amount"      → score: 45  (small相当)
"冷やし中華"   × "commonality" → score: 70  (unique相当)
```

`@@unique([dishId, traitId])` 制約により、**1つの料理は各特性につき必ず1レコードのみ**持つ。

**DishScore (`dish_scores`)**

| フィールド | 型 | 制約 | 説明 |
|---|---|---|---|
| `id` | String (UUID) | PK | |
| `score` | Int | - | 特性スコア値 (運用上 0〜100 の範囲) |
| `dishId` | String | FK → Dish | 料理ID |
| `traitId` | String (UUID) | FK → DishTrait | 特性ID |

**ユニーク制約**: `(dishId, traitId)` — 料理×特性の組み合わせは一意

**DishTrait (`dish_traits`)**

| フィールド | 型 | 説明 |
|---|---|---|
| `id` | String (UUID) | PK |
| `name` | String | 特性名 (例: `amount`, `commonality`) |
| `description` | String? | 説明 |

**現在登録されている特性と、レコメンドAPIでのスコア範囲マッピング**:

| 特性名 | 意味 | APIパラメータ値 | scoreMin | scoreMax |
|---|---|---|---|---|
| `amount` | 量 | `small` | 0 | 50 |
| `amount` | 量 | `medium` | 50 | 75 |
| `amount` | 量 | `large` | 75 | 100 |
| `commonality` | 定番度 | `common` | 0 | 45 |
| `commonality` | 定番度 | `unique` | 45 | 100 |

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
                                                ┌─── DishTag (カテゴリタグ, 多対多)
                                                │※スコアリング系: DishTagとは無関係
                                                │
Organization ──< User ──< VisitHistory >── Dish ──< Restaurant
                                                │
                                                │    
                                                │
                                           DishScore ──> DishTrait (特性マスタ)
                                  (中間テーブル)    name: amount / commonality ...
                                  @@unique(dishId, traitId)

Restaurant
    ├──< RestaurantOpen >── WeekType
    ├──< Payment >── PaymentType
    ├──< Route >── RouteType
    └──>── RestaurantTag (カテゴリタグ, 多対多)
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

**スコアフィルタリング詳細** (DishScore・DishTrait の仕組みについては[データモデル定義 > DishScore / DishTrait](#dishscore-dish_scores--dishtrait-dish_traits)を参照)

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

#### 技術的判断: raw SQL採用の理由

**問題**: Prisma ORM は内部的にすべての `DateTime` / `Timetz` 値を **UTC** として扱う。`RestaurantOpen.timeOpen` / `timeClose` は `Timetz` 型で JST の営業時間を格納しているが、Prisma 経由で取得・比較すると UTC として解釈されてしまい、JSTと最大9時間ズレた誤った営業時間フィルタリングになる。

**解決策**: `prisma.$queryRaw` を使用して PostgreSQL の `timezone()` 関数を直接利用し、DB側で JST 変換を完結させる。Prisma が JST をサポートした時点で通常のORM構文に戻す予定 (`@todo` コメントあり)。

#### raw SQLの要点 (`src/app/api/v-beta/recommend/route.ts`)

**JOINの構成**

```
dishes (d)
  LEFT JOIN restaurants (r)           ON d.restaurant_id = r.id
  LEFT JOIN restaurant_opens (ro)     ON r.id = ro.restaurant_id
  LEFT JOIN payments (p)              ON r.id = p.restaurant_id
  LEFT JOIN payment_types (pt)        ON p.payment_type_id = pt.id
  LEFT JOIN dish_scores (ds)          ON d.id = ds.dish_id
  LEFT JOIN dish_traits (dt)          ON ds.trait_id = dt.id
```

> 支払い方法が複数ある場合、同一料理が支払い方法の数だけ重複して返る (フラットな行)。アプリ側で `reduce` により `payments[]` 配列に集約する。

**WHEREの絞り込み条件**

| 条件 | SQL抜粋 | 説明 |
|---|---|---|
| 価格上限 | `d.price <= $price` | リクエストの price 以下 |
| 現在の曜日 (JST) | `ro.week_type_id = extract(dow from date (timezone('Asia/Tokyo', now()::date)))` | `now()` を JST 日付に変換してから曜日 (0=日〜6=土) を抽出 |
| 営業時間内 (JST) | `timezone('Asia/Tokyo', now()::timetz) BETWEEN timezone('Asia/Tokyo', ro.time_open) AND timezone('Asia/Tokyo', ro.time_close)` | 現在時刻・開閉店時刻をともに JST に変換して比較 |
| 特性スコア①<br>(メイン JOIN) | `dt.name = $trait1 AND ds.score >= $min AND ds.score < $max` | 1つ目の特性 (`amount`) をメインの JOIN で絞り込む |
| 特性スコア②<br>(サブクエリ) | `d.id IN (SELECT ds.dish_id FROM dish_scores ... WHERE dt.name = $trait2 ...)` | 2つ目の特性 (`commonality`) はサブクエリで絞り込む (メインJOINと同じ `ds` エイリアスを使えないため) |

**アプリ側の後処理**

```
raw SQL結果 (フラット行: 支払い方法×料理の行数)
    │
reduce() → 料理IDをキーにしたオブジェクトに集約し payments[] を構築
    │
map() → レスポンス形式に整形 (camelCase変換、不要フィールドの除外)
    │
filter() → 昼休み45分以内に物理的に可能な料理のみ残す
           条件: restaurant.travelTime × 2 + dish.eatTime ≦ 2700秒
    │
shuffleArray() → ランダムシャッフル → 先頭5件を返却
```

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

| ディレクトリ | 名称 | 役割 |
|---|---|---|
| `backgrounds/` | CirclesTopLeft, TrianglesBottom, TrianglesCover | 装飾的背景SVGコンポーネント |
| `buttons/` | BackButton, CircleButton, BorderCircleButton, BorderRoundButton, RectButton | ボタン各種 |
| `cards/` | Card, CardFull, CardHorizontal | 情報表示カード各種 |
| `dialogs/` | DialogAlert, DialogInfo | ダイアログ (MUI使用) |
| `forms/` | BasicTextField, BasicCheckbox, otp/SignupForm, otp/VerificationForm | フォーム入力コンポーネント各種 |
| `headers/` | BorderTitle | セクション見出し |
| `image/` | CldImg | Cloudinary画像表示ラッパー |
| `layouts/` | AnimatePresenceLayer, ExpandablePanel, DummyPanel | レイアウト・アニメーション制御 |
| `lists/` | PaymentShort, PaymentLong | 支払い方法の一覧表示 |
| `lottie/` | Navigation, Privacy, Error | Lottieアニメーション |
| `navigations/` | BottomNavigationBar | webapp用底部ナビゲーションバー |
| `overlays/` | LoadingLayer | ローディングオーバーレイ |
| `progresses/` | BasicLinearProgress | 進捗バー |
| `skeletons/` | BasicSkeleton | データ読み込み中のスケルトン |
| `suspenses/` | DishListSuspense | Suspenseのフォールバック |
| `widgets/` | FavButton, ShareButton, SelectionStack | 単独機能の小型ウィジェット |

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
