/*
A tiny reactivity system with Proxy
This is the idea behind Vue 3, MobX and Solid:
when a property changes, everything that depends on it updates automatically.
*/
function reactive(obj, onChange) {
  return new Proxy(obj, {
    set(target, prop, value, receiver) {
      const old = target[prop];
      const ok = Reflect.set(target, prop, value, receiver);
      if (old !== value) onChange(prop, old, value);
      return ok;
    }
  });
}

function render(state) {
  console.log(`[render] ${state.name} has ${state.items} items in the cart`);
}

const state = reactive({ name: "Asha", items: 0 }, (prop, oldVal, newVal) => {
  console.log(`  ${prop}: ${oldVal} -> ${newVal}`);
  render(state);
});

render(state);
state.items++;
state.items++;
state.name = "Ravi";
state.items = 2;// same value -> no re-render
// [render] Asha has 0 items in the cart
//   items: 0 -> 1
// [render] Asha has 1 items in the cart
//   items: 1 -> 2
// [render] Asha has 2 items in the cart
//   name: Asha -> Ravi
// [render] Ravi has 2 items in the cart
