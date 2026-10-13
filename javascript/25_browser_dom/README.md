# Browser and DOM

These examples run in the **browser**, not Node (Node has no `document` or `window`).
Open any `.html` file directly in your browser and open DevTools (F12) → Console.

| File | Topic |
|---|---|
| `1_selecting_and_changing.html` | `querySelector`, `textContent`, `classList`, `style`, creating and removing elements |
| `2_events.html` | `addEventListener`, the event object, `preventDefault`, forms, keyboard |
| `3_event_delegation.html` | bubbling, one listener for many children, `stopPropagation` |
| `4_local_storage.html` | `localStorage` / `sessionStorage`, saving JSON |
| `5_todo_app.html` | everything combined: a small to-do list |

Web Workers are in `../26_workers/web_workers`. Because of browser security,
they need a local server: `npx serve ../26_workers/web_workers`.
