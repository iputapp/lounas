# コーディング規約

この規約に遵守すること。

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

## Pull Request

**Pull Request**をする前に以下のコマンドを実行し、体裁を整えること。

```bash
npm run format
```

> **Note**
>
> `Warning`, `Error`も表示される。
