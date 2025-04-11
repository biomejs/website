_default:
    just --list -u

alias f := format
alias l := lint

just help:
    cargo

format:
    cargo fmt
    taplo fmt

lint:
    cargo clippy
