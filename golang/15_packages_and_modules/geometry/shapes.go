// Package geometry is a small library package used by 15_packages_and_modules.
//
// A package is a folder of .go files that all start with the same
// "package name" line. Names starting with a CAPITAL letter are exported
// (usable from other packages); lowercase names are private to the package.
package geometry

import "math"

// Pi is exported: other packages can read geometry.Pi.
const Pi = math.Pi

// Circle is exported, and so are its fields Radius and its method Area.
type Circle struct {
	Radius float64
}

// Area returns the area of the circle.
func (c Circle) Area() float64 {
	return round2(Pi * c.Radius * c.Radius)
}

// round2 is NOT exported: only code inside package geometry can call it.
func round2(x float64) float64 {
	return math.Round(x*100) / 100
}
