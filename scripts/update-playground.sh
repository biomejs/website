#!/bin/bash

# Fail fast
set -e

# Check if a new revision hash is provided
if [ "$#" -ne 1 ]; then
    echo "Usage: $0 new_rev_hash"
    exit 1
fi

new_rev=$1
short_rev=$(echo "$new_rev" | cut -c 1-7)

# Update the @biomejs/wasm-web dependency in package.json
jq ".devDependencies[\"@biomejs/wasm-web\"] = \"https://pkg.pr.new/@biomejs/wasm-web@$short_rev\"" package.json > package.json.tmp && mv package.json.tmp package.json

# Install dependencies
pnpm install --no-frozen-lockfile

echo "Playground updated to $new_rev."
