/*
Template literal types build string types from other string types.
 `${A}-${B}`
Built-in helpers: Uppercase, Lowercase, Capitalize, Uncapitalize
*/

type Size = "sm" | "md" | "lg";
type Color = "red" | "blue";
type ClassName = `btn-${Size}-${Color}`; // 6 combinations, e.g. "btn-sm-red"

const cls: ClassName = "btn-lg-blue";
// const bad: ClassName = "btn-xl-red"; // error TS2322

type EventName<T extends string> = `on${Capitalize<T>}`;
type Handlers = { [E in "click" | "hover" as EventName<E>]: () => void }; // onClick, onHover

const handlers: Handlers = {
  onClick: () => console.log("clicked"),
  onHover: () => console.log("hovered"),
};
handlers.onClick();

type Route = `/users/${number}`;
const route: Route = "/users/42";
console.log(cls, route);
