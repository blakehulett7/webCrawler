import { test, expect } from "@jest/globals";
import { normalizeURL } from "./crawl.js";

test('normalize s and /', () => {
  expect(normalizeURL('https://jesusislord.com/path/')).toBe('jesusislord.com/path')
});

test('normalize s only', () => {
  expect(normalizeURL('https://jesusislord.com/path')).toBe('jesusislord.com/path')
});

test('normalize / only', () => {
  expect(normalizeURL('http://jesusislord.com/path/')).toBe('jesusislord.com/path')
});

test('normalize uppercase', () => {
  expect(normalizeURL('http://JESUSislord.com/path')).toBe('jesusislord.com/path')
});

