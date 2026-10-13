# Index signatures

Index signatures describe objects whose property names you don't know in advance,
but whose values all have the same type:

```ts
{ [key: string]: number }      // any string key, number values
Record<string, number>         // the same, written with a utility type (chapter 10)
```

1. `a_without_index_signatures.ts` – the problem: the function has to accept `any`
2. `b_with_index_signatures.ts` – the fix: describe the shape with an index signature
