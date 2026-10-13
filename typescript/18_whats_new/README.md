# What's new in TypeScript

| Version | Released | Highlights | Learn it in |
|---|---|---|---|
| 4.9 | Nov 2022 | `satisfies`, `in` narrowing for unlisted properties | 05 |
| 5.0 | Mar 2023 | **standard decorators**, `const` type parameters, `--verbatimModuleSyntax` | 14, 09, 12 |
| 5.2 | Aug 2023 | `using` / `await using` (explicit resource management) | 15 |
| 5.4 | Mar 2024 | `NoInfer<T>`, better narrowing in closures | 09 |
| 5.5 | Jun 2024 | inferred type predicates (`.filter(x => x != null)`), regex syntax checking | 05 |
| 5.6 | Sep 2024 | iterator helper types, errors for always-truthy checks | `whats_new.ts` |
| 5.7 | Nov 2024 | `--rewriteRelativeImportExtensions`, checks for never-initialised variables | 12 |
| 5.8 | Feb 2025 | `--erasableSyntaxOnly` for Node's built-in type stripping | 00, 07 |
| 6.0 | 2026 | last JavaScript-based version: removes old options (`target: ES5`, `baseUrl`, `outFile`, `moduleResolution: node`), stricter defaults | `tsconfig.json` |
| 7.0 | 2026 | **native compiler written in Go**: ~10× faster type checking, same language as 6.0 | — |

Run the examples: `node 18_whats_new/whats_new.ts`

Alongside TypeScript, **Node.js 22.18+ runs `.ts` files directly** (type stripping),
so small projects no longer need a build step. Full notes: [typescriptlang.org/docs/handbook/release-notes](https://www.typescriptlang.org/docs/handbook/release-notes/overview.html).
