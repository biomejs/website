---
title: Filozofia opcji formatera
description: Konfigurowanie formatera z określoną opinią.
---

>💡 Biome podąża za tą samą [filozofią opcji co Prettier](https://prettier.io/docs/en/option-philosophy). Istniejący zestaw opcji formatowania jest uważany za stabilny, a nowe opcje raczej nie będą brane pod uwagę.
>
>Ten dokument wyjaśnia historię tego, jak i dlaczego Biome doszedł do miejsca, w którym jest dzisiaj, oraz perspektywę na przyszłość.

Biome to *formater z określoną opinią*. W idealnym świecie oznacza to, że Biome zakłada, że istnieje tylko jeden prawidłowy sposób formatowania rzeczy i będzie egzekwował ten styl przez cały czas. Bez względu na projekt, bez względu na konfigurację, kod sformatowany przez Biome zawsze będzie wyglądał tak samo. Z innej perspektywy, Biome jest swoim własnym *automatycznym przewodnikiem stylu*, a nie narzędziem do implementowania innych przewodników stylu.

Posiadanie tak silnej opinii na temat formatowania może wydawać się zbyt restrykcyjne, ale korzyści szybko stają się jasne po przyjęciu. Wszystkie dyskusje o tym, gdzie powinny znajdować się spacje, czy linia powinna być rozbita, czy linia powinna być wcięta i wiele więcej po prostu *znikają*. [Trywialne dyskusje o błahych sprawach](https://en.wikipedia.org/wiki/Law_of_triviality) nie odwracają już uwagi od skupienia się na tym, co się liczy. Przeglądy kodu stają się wolne od próśb o przeformatowanie i cyklicznych debat. Wystarczy zaufanie, że Biome robi co w jego mocy, aby formatować kod czysto, czytelnie i spójnie.

Poza korzyściami w obrębie poszczególnych zespołów i organizacji, przyjęcie spójnych formaterów w całym ekosystemie webowym przynosi korzyści wszystkim, ułatwiając zachowanie znajomości podczas przechodzenia między projektami i pomagając nowicjuszom uczyć się i rozpoznawać wzorce bardziej intuicyjnie, bez rozpraszania uwagi.

W dzisiejszym ekosystemie webowym Prettier jest zdecydowanie najpopularniejszym formaterem kodu i ma również silną opinię, ze [ścisłą filozofią dotyczącą dodawania opcji](https://prettier.io/docs/en/option-philosophy). Biome ma na celu być [w dużej mierze kompatybilny z Prettier](/blog/biome-wins-prettier-challenge) i jako taki przyjął wiele opinii, które implementuje Prettier, a konfiguracja nie jest wyjątkiem.

Biome jest dumny z osiągnięcia tak wysokiej kompatybilności z Prettier i uczynienia ścieżki migracji dla użytkowników jak najbardziej bezbolesną, ale wiąże się to również z podobnymi zastrzeżeniami.

## Istniejące opcje

Biome rozpoczął od ścisłego podzbioru opcji konfiguracyjnych, celując w najczęstsze i najbardziej kontrowersyjne wytyczne stylu w ekosystemie JavaScript: style wcięć (tabulatory vs spacje), szerokości wcięć (2 spacje równe tabulatorowi, czy 4?), oraz wymuszane średniki. Dodanie opcji dla tych punktów uznano za wystarczające, aby zaspokoić potrzeby większości ludzi, i nie było silnego rozważania dodania jakichkolwiek innych.

Opierając się na [filozofii opcji Prettier](https://prettier.io/docs/en/option-philosophy), Biome miał szansę zacząć od nowa i uniknąć pułapek, w które wpadł Prettier ze swoimi innymi istniejącymi opcjami, takimi jak `--bracket-same-line` i `--arrow-parens`:

> …[te] nie są typem opcji, z których jesteśmy szczęśliwi. Powodują wiele dyskusji o błahych sprawach w zespołach i jesteśmy z tego powodu przykro. Trudne do usunięcia teraz, te opcje istnieją jako historyczny artefakt i nie powinny motywować do dodawania większej liczby opcji ("Jeśli *te* opcje istnieją, dlaczego ta nie może?").

Jednak gdy ogłoszono [wyzwanie Prettier](https://console.algora.io/challenges/prettier), Biome postanowił przyjąć wyzwanie, które wymagało zaimplementowania wszystkich opcji konfiguracyjnych, które miał Prettier, aby osiągnąć pełną kompatybilność.

Biome nadal podziela filozofię Prettier dotyczącą tych opcji i uważa je za funkcję odziedziczoną dla kompatybilności, a nie za podstawowy zestaw funkcji. Ich istnienie nie wskazuje, że zostanie dodanych więcej opcji, ani nie powinny być używane jako uzasadnienie dla wspierania istnienia innych opcji w przyszłości.

## Nowe opcje

Podobnie jak Prettier, Biome uważa, że obecny zestaw opcji jest stabilny, wystarczający i nie jest otwarty na dodatki lub inne zmiany. Prośby o dodatkowe opcje konfiguracyjne raczej nie będą rozważane i mogą zostać zamknięte bez dyskusji.

Biorąc to pod uwagę, nawet gdy Biome ugruntował się jako zdolne i solidne narzędzie do formatowania, jest również wciąż stosunkowo nowy, co oznacza, że istnieje wiele możliwości utorowania drogi dla nowych postępów i pomysłów, które w innym przypadku mogą nie wydawać się wykonalne.

Styl formatowania Biome jest również uważany za względnie stabilny, kontynuując dopasowanie do Prettier tak bardzo, jak to możliwe, z [kilkoma celowymi odchyleniami](https://github.com/biomejs/biome/issues/739). Zmiany w stylu Biome mogą być rozważane i implementowane. Niemniej jednak prawdopodobnie nie staną się one konfigurowalnymi opcjami i zamiast tego byłyby stosowane uniwersalnie dla wszystkich przyszłych wersji Biome.
