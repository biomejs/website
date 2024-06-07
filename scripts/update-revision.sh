#!/bin/bash

# Fail fast
set -e

# Check if a new revision hash is provided
if [ "$#" -ne 1 ]; then
    echo "Usage: $0 new_rev_hash"
    exit 1
fi

new_rev=$1

# Update the @biomejs/wasm-web dependency
pnpm add -D https://pkg.pr.new/biomejs/biome/@biomejs/wasm-web@$(echo $new_rev | cut -c 1-7)

# Update the rev values for the biome dependencies
awk -v new_rev="$new_rev" '{gsub(/rev = "[^"]+"/, "rev = \"" new_rev "\""); print}' Cargo.toml >temp.toml && mv temp.toml Cargo.toml

echo "Revision updated to $new_rev."
