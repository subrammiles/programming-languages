
Node.js's original module system is CommonJs (which uses require and module.exports).

Since Node.js was created, the ECMAScript module system (which uses import and export) has become standard and Node.js has added support for it.

Node.js will treat .cjs files as CommonJS modules and .mjs files as ECMAScript modules. It will treat .js files as whatever the default module system for the project is (which is CommonJS unless package.json says "type": "module",).

# Common Js Default:
module.exports = <class or function>
# Common Js multiple Exports:
module.exports = {<class or function>,<class or function>}

# ES6 default
export default <class or function>

# ES6 default multiple exports
export class MyClass1 {
}
export class MyClass2 {
}
