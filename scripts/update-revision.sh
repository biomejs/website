#!/bin/bash

# Fail fast
set -e

# Check if a new revision hash is provided
if [ "$#" -ne 1 ]; then
    echo "Usage: $0 new_rev_hash"
    exit 1
fi

new_rev=$1
short_rev=$(echo $new_rev | cut -c 1-7)

# Update the @biomejs/wasm-web dependency in package.json
jq ".devDependencies[\"@biomejs/wasm-web\"] = \"https://pkg.pr.new/biomejs/biome/@biomejs/wasm-web@$short_rev\"" package.json > package.json.tmp && mv package.json.tmp package.json

# Install dependencies
pnpm install --no-frozen-lockfile

# Update the rev values for the biome dependencies
awk -v new_rev="$new_rev" '{gsub(/rev = "[^"]+"/, "rev = \"" new_rev "\""); print}' Cargo.toml >temp.toml && mv temp.toml Cargo.toml

# Identify all top-level biome crates
biome_crates=$(
  cargo tree --prefix none --depth 1 --format '{p}' \
    | grep '^biome_' \
    | awk '{print $1}' \
    | sort -u
)

# Update each biome crate to point to the new revision
if [ -n "$biome_crates" ]; then
  # shellcheck disable=SC2086
  set -- $biome_crates
  cargo add \
    --git https://github.com/biomejs/biome.git \
    --rev "$new_rev" \
    "$@"
fi

echo "Revision updated to $new_rev."
