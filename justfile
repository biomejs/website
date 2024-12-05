_default:
    just --list -u

alias f := format
alias l := lint

format:
    cargo fmt
    taplo fmt

lint:
    cargo clippy
