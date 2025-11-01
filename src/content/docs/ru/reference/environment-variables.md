---
# Не изменяйте этот файл. Этот файл автоматически генерируется `codegen/src/env_variables.rs`

title: Переменные окружения
description: Список переменных окружения, доступных в Biome
---
### `BIOME_LOG_PREFIX_NAME`

 Префикс, добавляемый к имени лога. По умолчанию: `server.log.`

### `BIOME_LOG_PATH`

 Директория, в которой будут сохранены логи Daemon.

### `BIOME_CONFIG_PATH`

 Путь к файлу конфигурации


### `BIOME_BINARY`

Переопределяет используемый бинарный файл Biome. Это позволяет, например, использовать системный бинарный файл Biome.

Если вы не определите эту переменную, Biome автоматически определит правильный бинарный файл для вашей платформы.

```
# Пример Nix derivation; путь к бинарному файлу берется из "${pkgs.biome}/bin/biome"
BIOME_BINARY=/nix/store/68fyfw1hidsqkal1839whi3nzgvqv4pa-biome-1.0.0/bin/biome npx @biomejs/biome format .
```
