// Package secret lives under an internal/ folder.
//
// Go only allows packages rooted at the PARENT of internal/ to import it.
// Here that means code inside 15_packages_and_modules/; other modules cannot use it.
package secret

// Greeting is exported, but only to allowed importers.
func Greeting() string { return "hello from an internal package" }
