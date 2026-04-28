interface Props {
  data: Record<string, unknown>;
}

// Safe: content is always JSON.stringify of our own static schema objects, never user input.
export default function JsonLd({ data }: Props) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
