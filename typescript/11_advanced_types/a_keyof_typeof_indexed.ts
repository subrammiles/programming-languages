/*
Getting types FROM other types and values
 keyof T      union of T's property names
 typeof x     the type of a VALUE (in a type position)
 T["key"]     indexed access: the type of one property
 T[number]    the element type of an array/tuple
*/

const defaults = { theme: "dark", fontSize: 14, autosave: true };
type Settings = typeof defaults; // { theme: string; fontSize: number; autosave: boolean }
type SettingKey = keyof Settings; // "theme" | "fontSize" | "autosave"
type FontSize = Settings["fontSize"]; // number

function setting<K extends SettingKey>(key: K): Settings[K] {
  return defaults[key];
}
const size: FontSize = setting("fontSize");
console.log(size, setting("theme")); // 14 dark

const roles = ["admin", "editor", "viewer"] as const;
type Role = (typeof roles)[number]; // "admin" | "editor" | "viewer"
const r: Role = "editor";
console.log(r, roles.includes(r));
