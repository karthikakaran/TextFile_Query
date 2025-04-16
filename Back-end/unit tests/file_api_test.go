package main

import (
	"testing"
)

var testCases = []struct {
	input    string
	result   string
	expected string
}{
	{
		input:    "",
		result:   "Empty query",
		expected: "Empty query",
	},
	{
		input:    "Query",
		result:   "Here is your Query",
		expected: "Here is your Query",
	},
	{
		input:    "Search Query",
		result:   "Here is your",
		expected: "Here is your Query",
	},
}

func Test_first(t *testing.T) {

	for _, tc := range testCases {
		if tc.result != tc.expected {
			t.Error("Not matching !", tc.expected, "Got", tc.result)
		}
	}
}
