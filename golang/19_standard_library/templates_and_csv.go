package main

import (
	"encoding/csv"
	"fmt"
	htmltemplate "html/template"
	"os"
	"strings"
	"text/template"
)

/*
text/template, html/template and encoding/csv

Templates fill a text with data: {{.Field}}, {{range}}, {{if}}, {{with}}, pipelines with |, custom funcs.
  text/template -> any text (emails, config files, code generation)
  html/template -> the same syntax, but escapes values to prevent XSS. ALWAYS use it for HTML.

encoding/csv reads and writes CSV correctly (quotes, commas inside fields, newlines).
Do not split CSV lines with strings.Split.
*/

type invoice struct {
	Customer string
	Items    []lineItem
	Paid     bool
}

type lineItem struct {
	Name  string
	Qty   int
	Price float64
}

func (l lineItem) Total() float64 { return float64(l.Qty) * l.Price }

const invoiceTemplate = `Invoice for {{.Customer | upper}}
{{range $i, $item := .Items}}{{inc $i}}. {{printf "%-8s" .Name}} {{.Qty}} x {{printf "%.2f" .Price}} = {{printf "%.2f" .Total}}
{{end}}{{if .Paid}}Status: PAID{{else}}Status: DUE{{end}}
`

func textTemplates() {
	funcs := template.FuncMap{
		"upper": strings.ToUpper,
		"inc":   func(i int) int { return i + 1 },
	}
	t := template.Must(template.New("invoice").Funcs(funcs).Parse(invoiceTemplate))
	data := invoice{Customer: "Ann", Items: []lineItem{{"pen", 3, 1.5}, {"notebook", 2, 4}}}
	if err := t.Execute(os.Stdout, data); err != nil {
		fmt.Println(err)
	}
	// Invoice for ANN
	// 1. pen      3 x 1.50 = 4.50
	// 2. notebook 2 x 4.00 = 8.00
	// Status: DUE
}

func htmlTemplates() {
	comment := `<script>alert("hacked")</script>`
	page := `<p>{{.}}</p>`

	unsafe := template.Must(template.New("t").Parse(page))
	safe := htmltemplate.Must(htmltemplate.New("h").Parse(page))

	var a, b strings.Builder
	unsafe.Execute(&a, comment)
	safe.Execute(&b, comment)
	fmt.Println(a.String()) // <p><script>alert("hacked")</script></p>      <- dangerous
	fmt.Println(b.String()) // <p>&lt;script&gt;alert(&#34;hacked&#34;)&lt;/script&gt;</p>
}

func csvFiles() {
	// Reading: note the quoted field with a comma and the escaped quote
	input := `name,city,quote
Ann,"Paris, France","She said ""hi"""
Bo,Rome,plain
`
	records, err := csv.NewReader(strings.NewReader(input)).ReadAll()
	if err != nil {
		fmt.Println(err)
		return
	}
	for _, r := range records[1:] { // skip the header row
		fmt.Printf("%s | %s | %s\n", r[0], r[1], r[2])
	}
	// Ann | Paris, France | She said "hi"
	// Bo | Rome | plain

	// Writing: quoting is handled for you
	var out strings.Builder
	w := csv.NewWriter(&out)
	w.Write([]string{"product", "note"})
	w.Write([]string{"lamp", `has "LED", 2 bulbs`})
	w.Flush() // csv.Writer is buffered: always Flush and check w.Error()
	fmt.Print(out.String(), w.Error(), "\n")
	// product,note
	// lamp,"has ""LED"", 2 bulbs"
	// <nil>
}
