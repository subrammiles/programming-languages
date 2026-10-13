package geometry

// A package can be split across many files; they all share the same names.

// Rectangle is an axis-aligned rectangle.
type Rectangle struct {
	Width, Height float64
}

// Area returns width times height.
func (r Rectangle) Area() float64 { return round2(r.Width * r.Height) }

// NewSquare is a constructor function: Go's convention instead of constructors.
func NewSquare(side float64) Rectangle {
	return Rectangle{Width: side, Height: side}
}
