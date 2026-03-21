// src/app/blog/content/json-to-csv-when-and-how-to-convert.tsx
export default function Post() {
  return (
    <>
      <p>
        JSON and CSV are the two most common data interchange formats you'll
        encounter in web development, APIs, and data work and they serve
        different purposes. JSON is structured, hierarchical, and suited for
        complex data with nested objects. CSV is flat, tabular, and suited for
        spreadsheets and data analysis. Knowing when to use each format and how
        to convert between them cleanly is a practical skill that saves time
        regularly.
      </p>

      <h2>When JSON is the right format</h2>
      <p>
        JSON handles data that has hierarchy, nesting, or mixed data types
        naturally. An API response describing a user with nested address fields,
        an array of orders each with line items, or configuration data with
        varied value types these are naturally JSON-shaped. Most web APIs return
        JSON because it maps directly to how web applications consume data.
      </p>

      <h2>When CSV is the right format</h2>
      <p>
        CSV (Comma-Separated Values) is the native format for spreadsheet
        applications, data analytics tools, SQL import operations, and most
        reporting workflows. It's human-readable without tooling, opens directly
        in Excel and Google Sheets, and is the expected input format for machine
        learning datasets and many business intelligence tools.
      </p>
      <p>
        If someone asks you to "export the data", they almost certainly want a
        CSV.
      </p>

      <h2>Converting JSON to CSV: what works and what doesn't</h2>
      <p>
        Our <a href='/tools/json-to-csv-converter'>JSON to CSV Converter</a>{" "}
        handles conversion for JSON arrays of objects the most common API
        response format.
      </p>
      <p>A JSON array like this converts cleanly:</p>
      <pre>
        <code>{`[
  {"name": "Alice", "age": 30, "city": "London"},
  {"name": "Bob", "age": 25, "city": "Manchester"}
]`}</code>
      </pre>
      <p>Output:</p>
      <pre>
        <code>{`name,age,city
Alice,30,London
Bob,25,Manchester`}</code>
      </pre>
      <p>
        Where conversion gets complicated: nested objects and arrays. CSV is
        flat it has no concept of nested data. A JSON object with a nested
        address field can be flattened (address.street, address.city become
        separate columns) or serialised (the nested object becomes a JSON string
        in the cell). The right approach depends on what you're doing with the
        CSV.
      </p>

      <h2>Converting CSV to JSON</h2>
      <p>
        The reverse conversion CSV to JSON is simpler. Each row becomes an
        object; column headers become keys. The main decisions are whether to
        infer data types (treating "30" as a number rather than a string) and
        how to handle empty cells (null, empty string, or omit the key).
      </p>
      <p>
        Use case: you've received data in a spreadsheet and need to import it
        into a JSON-consuming application. Convert CSV to JSON as the first
        step.
      </p>

      <h2>Data type considerations</h2>
      <p>
        CSV stores everything as strings there's no native concept of numbers,
        booleans, or null values. "true", "30", and "null" are all just strings
        in CSV. When you import CSV to a typed system, you need to handle type
        conversion explicitly.
      </p>
      <p>
        JSON preserves types: <code>30</code> is a number, <code>true</code> is
        a boolean, <code>null</code> is null. When converting JSON to CSV, type
        information is lost all values become strings. This is fine for display
        and analysis but worth knowing if you're converting back.
      </p>

      <h2>Handling special characters in CSV</h2>
      <p>
        CSV has quoting rules for values that contain commas, newlines, or
        double quotes:
      </p>
      <ul>
        <li>
          Values containing commas must be wrapped in double quotes:{" "}
          <code>"London, UK"</code>
        </li>
        <li>
          Values containing double quotes must escape the quotes:{" "}
          <code>"She said ""hello"""</code>
        </li>
        <li>Values containing newlines must be wrapped in double quotes</li>
      </ul>
      <p>
        A well-implemented converter handles all of these automatically. Manual
        CSV construction (concatenating values with commas) almost always breaks
        on edge cases.
      </p>

      <h2>FAQ</h2>

      <h3>What delimiter should I use comma or semicolon?</h3>
      <p>
        Comma is the standard CSV delimiter. However, European locales often use
        semicolons because commas are used as decimal separators in those
        regions (1.000,00 rather than 1,000.00). If your data will be opened in
        Excel by European users, semicolons may be more reliable. Check your
        target application's requirements.
      </p>

      <h3>Can CSV handle unicode characters?</h3>
      <p>
        CSV files can store Unicode text, but encoding matters. UTF-8 is the
        standard and handles any Unicode character. UTF-8 with BOM (Byte Order
        Mark) is sometimes needed for correct Excel handling of non-ASCII
        characters. If your CSV shows garbled characters in Excel, try saving
        with UTF-8 BOM encoding.
      </p>

      <h3>
        How do I handle JSON arrays within objects when converting to CSV?
      </h3>
      <p>
        You have three options: flatten the array into multiple columns (if the
        array has fixed length), join the array values into a single delimited
        cell (e.g. pipe-separated), or serialise the array as a JSON string
        within the CSV cell. Choose based on how the CSV will be consumed.
      </p>

      <h2>Conclusion</h2>
      <p>
        JSON to CSV conversion is a daily task in data-heavy workflows. Use the{" "}
        <a href='/tools/json-to-csv-converter'>JSON to CSV Converter</a> for
        clean, correctly quoted output without manual formatting. Understand the
        flattening decisions required for nested JSON and the type conversion
        implications before exporting data for analysis or spreadsheet use.
      </p>
    </>
  );
}
