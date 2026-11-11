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

# Point each biome crate to the new revision
update_biome_crates() {
  # shellcheck disable=SC2086
  cargo add \
    --git https://github.com/biomejs/biome.git \
    --rev "$new_rev" \
    $biome_crates
}

if [ -n "$biome_crates" ]; then
  if ! update_biome_crates; then
    # The new revision may require newer versions of crates than the ones
    # locked in Cargo.lock Refresh the lockfile to the latest
    # semver-compatible versions and try again.
    echo "Failed to update the biome crates, refreshing Cargo.lock and retrying..."
    cargo update

    if ! update_biome_crates; then
      echo "Failed to update the biome crates even after refreshing Cargo.lock."
      echo "A dependency in Cargo.toml is probably pinned to a version that is incompatible with $new_rev."
      exit 1
    fi
  fi
fi

# Update the biome-revision file
echo "$new_rev" > biome-revision

echo "Revision updated to $new_rev."
