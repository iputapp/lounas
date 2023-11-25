# lounas

The lunch recommendation app. 🍽️

## Conventions

- [コーディング規約](.docs/CODING.md)
- [ディレクトリ構成](.docs/DIRECTORY.md)
- [Contribution Guidelines](.github/CONTRIBUTING.md)
- [Code of Conduct](.github/CODE_OF_CONDUCT.md)
- [Security Policy](.github/SECURITY.md)

> **Warning**
>
> `コーディング規約`の`環境変数`には特に注意すること。

### Pull request (PR)

PR を行う際は、体裁を統一するため`Create pull request`を押した後、`URL`に`?template=task-feature.md` (もしくは`&template=task-feature.md`) を追加してテンプレートにアクセスする。

`コピー用`

```
template=develop.md
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
> https://github.com/PROJECT-PIPLUP/lounas/compare/develop...feature/main-app-ui
> ```
>
> - テンプレート付き PR の`URL`
>
> ```
> https://github.com/PROJECT-PIPLUP/lounas/compare/develop...feature/main-app-ui?template=task-feature.md
> ```
>
> or
>
> ```
> https://github.com/PROJECT-PIPLUP/lounas/compare/develop...feature/main-app-ui?expand=1&template=task-feature.md
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

# https://supabase.com/partners/integrations/prisma
# postgres connection string used for migrations
DIRECT_URL=postgresql://postgres:[pw]@db.[url].supabase.co:5432/postgres
# postgres connection string with Supavisor config - used by Prisma Client
DATABASE_URL=postgres://postgres.[url]:[pw]@[region].pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1

# cdn
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=YourId
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

## Next.js

[Docs](https://nextjs.org/docs)

## Material UI

[Docs](https://mui.com/material-ui/getting-started/overview/)

## Framer Motion

[Docs](https://www.framer.com/motion/)

## Prisma

[Docs](https://www.prisma.io/docs)

## Zod

[Docs](https://zod.dev/)

### zod-prisma-types

[Docs](https://github.com/chrishoermann/zod-prisma-types)

## Supabase

[Docs](https://supabase.com/docs/reference/javascript/)

---

🐧
