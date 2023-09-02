# ディレクトリ構成

この構成に遵守すること。

## コンポーネント

コンポーネントは `src/components/{グループ}/{コンポーネント名}/` 以下に作ること。(スタイルも含める)

> **Note**
>
> 例）`Footer`
>
> - `src/components/navigations/Footer/index.tsx`
> - `src/components/navigations/Footer/styles.module.scss`

## **Client** のスクリプト

Client のスクリプトは `src/hooks/` 以下に作ること。

> **Note**
>
> 例）`function getPosts()`
>
> - `src/hooks/fetch.ts`

### `fetch.ts`

```ts
async function getPosts(): Promise<Post[]> {
  const res = await fetch(`localhost:3000/api/v0/posts`, { cache: "no-store" });
  if (!res.ok) throw new Error(`${res.status}`);

  return res.json();
}
```

## **Server** と `DB` の接続など

**Supabase** や **Prisma** の接続などの処理は `src/lib/` 以下に作ること。(サーバクライアント生成、初期化処理など)

> **Note**
>
> 例）`createClient`, `PrismaClient`
>
> - `src/lib/supabase.ts`
> - `src/lib/prisma.ts`

```ts
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

export { supabase };
```

## **Server** の処理

Server の処理全般は `src/utils/` 以下に作ること。(サーバで頻繫に使う処理)

> **Note**
>
> 例）`cookies.ts`
>
> - `src/utils/cookies.ts`

## とても頻繁に使われるスタイル

とても頻繁に使われるスタイルは `src/styles/` 以下にまとめる。(`Tailwind CSS`と同等かそれ以上の汎用的なスタイル)

`SCSS` の変数は `src/styles/_variables.scss` に定義している。

変数の使い方は[コーディング規約](./CODING.md#スタイル)を参照すること。
