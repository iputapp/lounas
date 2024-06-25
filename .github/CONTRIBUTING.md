# Contributing

日本語版は[最後](#コントリビューション)にあります。

First off, thanks for taking the time to contribute! 🎉

The following is a set of guidelines for contributing to [lounas][github-repo], which is hosted in the [App Dev. Co. @ IPUT][github-org] on GitHub. These are mostly guidelines, not rules. Use your best judgment, and feel free to propose changes to this document in a pull request.

## How to Contribute

### Reporting Bugs

If you find a bug, please report it by opening an issue in the repository. Be sure to include the following details:
- A clear and descriptive title.
- A detailed description of the issue.
- Steps to reproduce the issue.
- Any relevant logs, screenshots, or code snippets.

> [!IMPORTANT]
>
> Please use [this form][github-bug-report-form] to report bugs.

### Suggesting Enhancements

If you have an idea for a new feature or an enhancement to an existing one, we'd love to hear about it! Open an issue and include:
- A clear and descriptive title.
- A detailed description of the proposed enhancement.
- Why you believe this enhancement would be useful.

### Code Contributions

1. Fork the repository.
2. Create a new branch from `develop` for your changes:
   ```bash
   git switch -c <type>/x-y-z
   ```
3. Make your changes.
4. Ensure your changes adhere to the project's coding style and conventions.
5. Commit your changes with a clear and descriptive commit message:
   ```bash
   git commit -m "<type>(<scope>): <short summary>"
   ```
> [!IMPORTANT]
>
> `<type>` must be as follows:
> ```
> <type>(<scope>): <short summary>
>   │       │             │
>   │       │             └─⫸ Summary in present tense. Not capitalized. No period at the end.
>   │       │
>   │       └─⫸ Commit Scope: e.g. card|button|dish
>   │
>   └─⫸ Commit Type: build|ci|docs|feat|fix|perf|refactor|test
> ```
>
> `<type>` must be as follows:
> - build: Changes that affect the build system or external dependencies (example scopes: npm)
> - ci: Changes to our CI configuration files and scripts (examples: GitHub Actions)
> - docs: Documentation only changes
> - feat: A new feature
> - fix: A bug fix
> - perf: A code change that improves performance
> - refactor: A code change that neither fixes a bug nor adds a feature
> - test: Adding missing tests or correcting existing tests
>
> These `<type>`s are taken from [Angular's docs][angular-develop-docs].
6. Push your branch to your fork:
   ```bash
   git push origin <type>/x-y-z
   ```
7. Open a pull request in the repository.
> [!WARNING]
>
> Please make a pull request in **Draft Status** while you are working.

> [!NOTE]
>
> You can use the template by adding the following query parameters to the URL:
> ```
> template=develop.md
> ```

### Coding Standards

- Follow the coding style guidelines defined in the project (e.g., use Prettier for code formatting).
> [!TIP]
>
> The respective commands for Lint and format are as follows:
> - lint: `npm run lint`
> - format: `npm run format`
- Write clear, concise comments where necessary.
- Include tests for new features and bug fixes where applicable.
- Ensure that your code does not introduce new linting issues or warnings.

### Running Tests

> [!WARNING]
>
> Under construction 🚧

The command to run the test is:
```bash
npm test
```

### Reviewing and Merging Pull Requests

All pull requests will be reviewed by one of the project maintainers. The review process may involve feedback and requests for changes. Please be responsive and update your pull request as needed.

## Community

### Code of Conduct

This project and everyone participating in it is governed by the [lounas][github-repo] Code of Conduct. By participating, you are expected to uphold this code. See [CODE_OF_CONDUCT.md][github-code-of-conduct] for details.

### Getting Help

> [!WARNING]
>
> Under construction 🚧

If you have questions or need further assistance, feel free to join our [Slack/Discord] channel, or open an [discussion][github-discussions].

---

Thank you for your contributions! 🐧

# コントリビューション

まず初めに、コントリビューションしていただきありがとうございます！🎉

以下は、GitHubの[App Dev. Co. @ IPUT][github-org]組織の[lounas][github-repo]へのコントリビューションに関するガイドラインです。これはあくまでガイドラインであり、規則ではありません。最良の判断を行い、このドキュメントに変更を提案したい場合はプルリクエストを送ってください。

## コントリビューション方法

### バグの報告

バグを発見した場合は、リポジトリにissueを作成して報告してください。以下の詳細を含めてください:
- 明確で簡潔なタイトル。
- 問題の詳細な説明。
- 問題を再現する手順。
- 関連するログ、スクリーンショット、コードスニペット。

> [!IMPORTANT]
>
> バグを報告するには[このフォーム][github-bug-report-form]を使用してください。

### 改善提案

新機能や既存の機能の改善アイデアがある場合、ぜひお知らせください！ issueを作成し、以下を含めてください:
- 明確で簡潔なタイトル。
- 提案する改善の詳細な説明。
- なぜこの改善が有用であると思うか。

### コードのコントリビューション

1. リポジトリをフォークします。
2. `develop`ブランチから新しいブランチを作成します:
   ```bash
   git switch -c <type>/x-y-z
   ```
3. 変更を行います。
4. 変更がプロジェクトのコーディングスタイルと規約に従っていることを確認します。
5. 明確で簡潔なコミットメッセージで変更をコミットします:
   ```bash
   git commit -m "<type>(<scope>): <subject>"
   ```
> [!IMPORTANT]
>
> `<type>`は次の形式でなければなりません:
> ```
> <type>(<scope>): <short summary>
>   │       │             │
>   │       │             └─⫸ 短い説明を現在形で記述。先頭は小文字。最後に句点は付けない。
>   │       │
>   │       └─⫸ コミットのスコープ: 例）card|button|dish
>   │
>   └─⫸ コミットのタイプ: build|ci|docs|feat|fix|perf|refactor|test
> ```
>
> `<type>`は次のいずれかでなければなりません：
> - build: ビルドシステムまたは外部依存関係に影響を与える変更（例: npm）
> - ci: CI設定ファイルとスクリプトへの変更（例: GitHub Actions）
> - docs: ドキュメントのみの変更
> - feat: 新機能
> - fix: バグ修正
> - perf: パフォーマンスを向上させるコード変更
> - refactor: バグ修正でも機能追加でもないコード変更
> - test: 不足しているテストの追加または既存テストの修正
>
> これらの`<type>`は[Angular のドキュメント][angular-develop-docs]から引用しています。
6. フォークしたリポジトリにブランチをプッシュします:
   ```bash
   git push origin <type>/x-y-z
   ```
7. リポジトリにプルリクエストを作成します。
> [!WARNING]
>
> 作業中はプルリクエストを**Draft Status**で作成してください。

> [!NOTE]
>
> URLに以下のクエリパラメータを追加することでテンプレートを使用できます:
> ```
> template=develop.md
> ```

### コーディングスタンダード

- プロジェクトで定義されたコーディングスタイルガイドラインに従います（例: コードフォーマットに Prettier を使用）。
> [!TIP]
>
> Lint とフォーマットの各コマンドは以下の通りです:
> - lint: `npm run lint`
> - format: `npm run format`
- 必要に応じて、明確で簡潔なコメントを書いてください。
- 新しい機能やバグ修正にはテストを含めてください。
- コードが新たなLintの問題や警告を引き起こさないようにしてください。

### テストの実行

> [!WARNING]
>
> 工事中 🚧

テストを実行するコマンドは以下の通りです:
```bash
npm test
```

### プルリクエストのレビューとマージ

すべてのプルリクエストはプロジェクトメンテナによってレビューされます。レビューにはフィードバックや変更依頼が含まれることがあります。適宜応答し、プルリクエストを更新してください。

## コミュニティ

### 行動規範

このプロジェクトおよび参加するすべての人は[lounas][github-repo]の行動規範に従っています。参加することで、この行動規範を守ることが期待されます。詳細は[CODE_OF_CONDUCT.md][github-code-of-conduct]を参照してください。

### ヘルプを得る

> [!WARNING]
>
> 工事中 🚧

質問やさらにサポートが必要な場合は、[Slack/Discord]チャンネルに参加するか、[ディスカッション][github-discussions]を開いてください。

---

貢献に感謝します！ 🐧

[github-org]: https://github.com/iputapp
[github-repo]: https://github.com/iputapp/lounas
[github-discussions]: https://github.com/iputapp/lounas/discussions
[github-bug-report-form]: https://github.com/iputapp/lounas/issues/new?template=form-bug.yml&title=%5BBug%5D+&labels=report
[github-code-of-conduct]: https://github.com/iputapp/lounas/blob/develop/.github/CODE_OF_CONDUCT.md
[angular-develop-docs]: https://github.com/angular/angular/blob/main/CONTRIBUTING.md
