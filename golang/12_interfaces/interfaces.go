package main

import (
	"fmt"
	"math"
)

/*
An interface is a set of method signatures.
	type Geometry interface {
		Area() float64
		Perimeter() float64
	}
A type satisfies an interface IMPLICITLY, just by having those methods.
There is no "implements" keyword.
*/

type Geometry interface {
	Area() float64
	Perimeter() float64
}

type Rect struct{ Width, Height float64 }

func (r Rect) Area() float64      { return r.Width * r.Height }
func (r Rect) Perimeter() float64 { return 2*r.Width + 2*r.Height }

type Circle struct{ Radius float64 }

func (c Circle) Area() float64      { return math.Pi * c.Radius * c.Radius }
func (c Circle) Perimeter() float64 { return 2 * math.Pi * c.Radius }

func measure(g Geometry) {
	fmt.Printf("%v area=%.2f perimeter=%.2f\n", g, g.Area(), g.Perimeter())
}

func geometryInterface() {
	measure(Rect{Width: 3, Height: 4})
	measure(Circle{Radius: 5})

	shapes := []Geometry{Rect{1, 2}, Circle{1}, Rect{3, 3}}
	total := 0.0
	for _, s := range shapes {
		total += s.Area()
	}
	fmt.Printf("total area %.2f\n", total) // 14.14
}

// A compile-time check that Rect satisfies Geometry (fails to build if not)
var _ Geometry = Rect{}
