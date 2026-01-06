_default:
    just --list -u

alias f := format
alias l := lint

format:
    cargo fmt
    pnpm tombi format

lint:
    cargo clippy
