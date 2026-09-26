/**
 * Renders a structured data block.
 *
 * `<` is escaped because JSON.stringify happily emits a literal `</script>` if
 * any value ever contains one, which ends the element early and drops the rest
 * of the document into the page as text. Today every value comes from our own
 * files; this keeps it correct the day one does not.
 */
export function JsonLd({ schema }: { schema: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\u003c') }}
    />
  );
}
