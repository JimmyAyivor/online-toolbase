#!/usr/bin/env bash
set -e

# Base path for app router tools
BASE_DIR="src/app/tools"

# List of tool names
TOOLS=(
"Plagiarism Checker"
"Grammar & Spell Checker"
"Text Difference Checker"
"Word Frequency Counter"
"Reading Time Estimator"
"JSON Formatter & Validator"
"Base64 Encoder/Decoder"
"URL Encoder/Decoder"
"Hash Generator"
"Regex Tester"
"Image Cropper & Resizer"
"Favicon Generator"
"Color Palette Generator"
"Image Format Converter"
"Tip Calculator"
"Percentage Calculator"
"Compound Interest Calculator"
"Sales Tax Calculator"
"Discount Calculator"
"Email Validator"
"IP Address Lookup"
"Pomodoro Timer"
"Dice Roller"
"UUID/GUID Generator"
"Unit Converter"
"Word & Character Counter"
"Image Compressor"
"Password Generator"
"QR Code Generator"
"Loan & Mortgage Calculator"
"PDF Merger & Splitter"
"Text Case Converter"
"Background Remover"
"Invoice Generator"
"Calorie & Macro Calculator"
"Resume Builder"
"Meme Generator"
"GPA Calculator"
"Time Zone Converter"
"Paraphrasing Tool"
"Signature Generator"
"Lorem Ipsum Generator"
"Meta Tag Generator"
"Random Name Generator"
"Hex Color Code Generator"
"Markdown to HTML Converter"
"Age Calculator"
"Currency Converter"
"BMI Calculator"
)

# Loop over tools
for TOOL in "${TOOLS[@]}"; do
    # Convert to URL-friendly folder name (lowercase, hyphen-separated)
    FOLDER_NAME=$(echo "$TOOL" | tr '[:upper:]' '[:lower:]' | sed -E 's/[^a-z0-9]+/-/g' | sed -E 's/^-|-$//g')
    
    # Create folder
    DIR_PATH="$BASE_DIR/$FOLDER_NAME"
    mkdir -p "$DIR_PATH"
    
    # Create page.tsx if it doesn't exist
    FILE_PATH="$DIR_PATH/page.tsx"
    if [ ! -f "$FILE_PATH" ]; then
        cat > "$FILE_PATH" <<EOL
import React from "react";

export default function ${FOLDER_NAME//-/}Page() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-2xl font-bold mb-4">$TOOL</h1>
        <p className="text-gray-600">This is the $TOOL page. Implement your tool here.</p>
      </div>
    </div>
  );
}
EOL
        echo "Created $FILE_PATH"
    else
        echo "Skipped $FILE_PATH (already exists)"
    fi
done
