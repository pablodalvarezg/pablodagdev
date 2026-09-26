/**
 * Serialises a schema for a `<script type="application/ld+json">` body.
 *
 * `JSON.stringify` will happily emit a literal `</script>` if any value contains
 * one, which closes the element early and drops the rest of the document into
 * the page as markup — verified by building with a poisoned dictionary value.
 * Escaping `<` prevents it and still parses back to the same string, because
 * `<` is valid JSON.
 *
 * This lives in domain rather than beside the component on purpose: the test
 * config only sees `.ts`, so the same logic in a `.tsx` file is logic nothing
 * can check, which is how the broken version of it shipped.
 */
export function jsonLdScript(schema: object): string {
  return JSON.stringify(schema).replace(/</g, '\\u003c');
}
