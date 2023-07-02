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

セキュアにする必要のない定数は `src/constants.ts` で定義している。

[環境変数](#環境変数)にするか、否かは慎重に判断する必要がある。

## 安全性

セキュアにしたい処理は必ず `server` に近いコンポーネントで行うこと。

リダイレクトは `src/middleware.ts` にて行う。`middleware` にて行えないリダイレクトは極力避けるべきである。

### `use server` と `use client`

脆弱性となり得るため、安易に `use client` を使わず、必ず[Next.JS Docs](https://nextjs.org/docs/getting-started/react-essentials)を確認し、理解してから使用すること。

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

- [なぜ default export を使うべきではないのか？ | LINE Engineering](https://engineering.linecorp.com/ja/blog/you-dont-need-default-export)

## スタイル

共通するスタイル(色コードなど)は `src/styles/_variables.scss` で定義されている。

これらの値は、以下のように `@use` をすることで他のファイルで使用できる。

```scss
@use "variables" as var;

p {
  color: var.$primary;
}
```

## Pull Request

**Pull Request**をする前に以下のコマンドを実行し、体裁を整えること。

```bash
npm run format
```

> **Note**
>
> `Warning`, `Error` も確認できる。
