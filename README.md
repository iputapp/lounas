# IMAP

Bootstrapped with `create-next-app@13.4.6`.

## Conventions

`/_docs`

- [コーディング規約](./_docs/CODING.md)

- [ディレクトリ構成](./_docs/DIRECTORY.md)

> **Warning**
>
> `コーディング規約`の`環境変数`には特に注意すること。

### Pull request (PR)

PR を行う際は、体裁を統一するため、`Create pull request`を押した後、`URL`に`?template=task-feature.md` (もしくは`&template=task-feature.md`) を追加して、テンプレートにアクセスする。

`コピー用`

```
template=task-feature.md
```

> **Note**
>
> 通常の PR とテンプレート付き PR の例
>
> `feature/main-app-ui` → `develop`
>
> - PR の`URL`
>
> ```
> https://github.com/wiyco/imap/compare/develop...feature/main-app-ui
> ```
>
> - テンプレート付き PR の`URL`
>
> ```
> https://github.com/wiyco/imap/compare/develop...feature/main-app-ui?template=task-feature.md
> ```
>
> or
>
> ```
> https://github.com/wiyco/imap/compare/develop...feature/main-app-ui?expand=1&template=task-feature.md
> ```
>
> 詳細は[GitHub Docs](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/using-query-parameters-to-create-a-pull-request)を参照。

## Development

Install environment packages.

```bash
npm i
```

### Environment variables

The below file and variables must be created in the root directory.

#### `.env.local`

```bash
# supabase
NEXT_PUBLIC_SUPABASE_URL=https://yourprojecturl.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YourApiKey

# postgres
DATABASE_URL=postgresql://postgres:[pw]@db.[url].supabase.co:6543/postgres?pgbouncer=true
DIRECT_URL=postgresql://postgres:[pw]@db.[url].supabase.co:5432/postgres
```

### Code formatter

You have to run `npm run format` before PR.

#### VS Code Extentions

- [TypeScript](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-typescript-next)
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Stylelint](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint)
- [Tailwind CSS](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)
- [PostCSS](https://marketplace.visualstudio.com/items?itemName=csstools.postcss)

## Tailwind CSS

[Docs](https://tailwindcss.com/docs/installation)

### `tailwind.config.js`

Support iOS 15.4 or later.

```js
module.exports = {
  theme: {
    extend: {
      height: {
        screen: ["100vh", "100dvh"],
      },
      minHeight: {
        screen: ["100vh", "100dvh"],
      },
      maxHeight: {
        screen: ["100vh", "100dvh"],
      },
    },
  },
};
```

## Next.js

[Docs](https://nextjs.org/docs)

## Material UI

[Docs](https://mui.com/material-ui/getting-started/overview/)

## Framer Motion

[Docs](https://www.framer.com/motion/)

## Prisma

[Docs](https://www.prisma.io/docs)

## Zod

- [Docs - Zod](https://zod.dev/)

- [ Docs - zod-prisma-types](https://github.com/chrishoermann/zod-prisma-types)

## Supabase

[Docs](https://supabase.com/docs/reference/javascript/)

---

🐧
