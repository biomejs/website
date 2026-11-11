#!/bin/bash

# Fail fast
set -e

# Check if a new revision hash is provided
if [ "$#" -ne 1 ]; then
    echo "Usage: $0 new_rev_hash"
    exit 1
fi

new_rev=$1

# Identify all top-level biome crates
biome_crates=$(
  cargo tree --prefix none --depth 1 --format '{p}' \
    | grep '^biome_' \
    | awk '{print $1}'
)

# Cargo ignores the lockfile of git dependencies, so start from Biome's own
# Cargo.lock at the new revision. Cargo keeps the entries we still need and
# resolves only what is missing, which keeps us on the versions Biome uses.
curl --fail --silent --show-error --location \
  --output Cargo.lock \
  "https://raw.githubusercontent.com/biomejs/biome/$new_rev/Cargo.lock"

# Point each biome crate to the new revision
if [ -n "$biome_crates" ]; then
  # shellcheck disable=SC2086
  cargo add \
    --git https://github.com/biomejs/biome.git \
    --rev "$new_rev" \
    $biome_crates
fi

# Update the biome-revision file
echo "$new_rev" > biome-revision

echo "Revision updated to $new_rev."
