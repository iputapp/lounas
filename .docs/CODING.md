# コーディング規約

この規約に遵守すること。

## 環境変数

**ハードコーディング**は禁止！

特に、`API key`, `Token`, `URL`の扱いには注意すること！

> **Warning**
>
> グレーゾーン(環境変数にするべきか迷う際)は GitHub へ `Commit` する前に相談すること！
> Token が外部にもれたら終わりでーす 🤗

## 定数

環境変数にする必要のない定数は `src/constants.ts` で定義している。

[環境変数](#環境変数)にするか、否かは慎重に判断する必要がある。

## 安全性

セキュアが伴う処理は必ず `server` で行うこと。

リダイレクトは `src/middleware.ts` にて行う。`middleware` にて行えないリダイレクトは極力避けるべきである。

### `use server` と `use client`

脆弱性となり得るため、安易に `use client` を使わず、必ず[Next.js Docs](https://nextjs.org/docs/getting-started/react-essentials)を確認し、理解してから使用すること。

## ページ

`src/app/`

ページは `default export` を使うこと。

```tsx
export default function Home() {
  return (
    <main>
      <div></div>
    </main>
  );
}
```

## コンポーネント

`src/components/`

コンポーネントの `export` は `named export` を使うこと。

```ts
export function foo() {
  console.log("OK!");
}
```

> **Warning**
>
> `default export` は使わないこと！
>
> ```ts
> export default function foo() {
>   console.log("NG!");
> }
> ```

詳細は以下を参照すべし。

- [なぜ default export を使うべきではないのか？ - LINE Engineering](https://engineering.linecorp.com/ja/blog/you-dont-need-default-export)

## スタイル

共通するスタイル(色コードなど)は `src/styles/_variables.scss` にて定義している。

これらの値は、以下のように `@use` をすることで他のファイルで使用できる。

```scss
@use "variables" as var;

p {
  color: var.$primary;
}
```

## Prisma

#### `schema.prisma`に**変更を加える前**:

以下のコマンドを実行する

1. Sync fork & pull
2. `npx prisma migrate dev` //他の人が行った変更を反映

注意: `schema.prisma`を**編集しない場合でも**schemaに変更があった場合、影響範囲のある部分でコーディング/テストを行う際は**実行する必要**がある。

#### `schema.prisma`に**変更を加えた後**:

以下のコマンドを実行する

1. `npx prisma generate` //型生成
2. `npx prisma migrate dev --name XXX` //XXXには分かりやすいタイトルを入れる。 例:dish_added_field_xyz等
3. `npm run format` //zod-prisma-typesの自動生成ファイルにESLintのフォーマットをかける

注意：`migrate`で生成されたファイル(`日付_name/migration.sql`, `migration_lock.toml`)も**コミットに含める**
（[その理由: Prisma Docs, Team development with Prisma Migrate](https://www.prisma.io/docs/guides/migrate/developing-with-prisma-migrate/team-development)）

## Pull Request (PR)

PRをする前に以下のコマンドを実行し、体裁を整えること。

```bash
npm run format
```

> **Note**
>
> `Warning`, `Error` も確認できる。
