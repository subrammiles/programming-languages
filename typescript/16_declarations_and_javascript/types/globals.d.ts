/*
Ambient declarations and augmentation
 declare global { ... }   add to the global scope (e.g. a variable injected by a script tag)
 interface merging         add fields to an existing interface, like ProcessEnv
*/

declare global {
  // A value some other script sets on globalThis
  var APP_VERSION: string | undefined;

  namespace NodeJS {
    interface ProcessEnv {
      // now process.env.APP_MODE is typed and autocompleted
      APP_MODE?: "development" | "production";
    }
  }
}

export {}; // makes this file a module so "declare global" is allowed
