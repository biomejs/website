---
title: Filosofia das Opções de Formatação
description: Configuração de um formatador com convicções fortes.
---

> 💡 O Biome segue a mesma [filosofia de opções do Prettier](https://prettier.io/docs/en/option-philosophy). O conjunto existente de opções para formatação é considerado estável, e não é provável que novas opções sejam consideradas.
>
> Este documento explica um pouco da história sobre como e por que o Biome chegou onde está hoje e uma perspectiva para o futuro.

O Biome é um _formatador com convicções fortes_. Em um mundo ideal, isso significa que o Biome assume que existe apenas uma maneira correta de formatar as coisas e aplicará esse estilo em todos os momentos. Não importa o projeto, não importa a configuração, o código formatado pelo Biome sempre terá a mesma aparência. Falando de outra forma, o Biome é o seu próprio _guia de estilo automático_, não uma ferramenta para implementar outros guias de estilo.

Ter uma opinião tão forte sobre a formatação pode parecer severo demais, mas os benefícios rapidamente se tornam claros após a adoção. Todas as discussões sobre onde os espaços devem ir, se uma linha deve ser quebrada, se uma linha deve ser recuada e muitas outras simplesmente _desaparecem_. [Discussões triviais e desgastantes](https://pt.wikipedia.org/wiki/Lei_da_trivialidade) não tiram mais o foco do que realmente importa. As revisões de código ficam livres de solicitações de reformatação e debates cíclicos. Basta confiar que o Biome faz o melhor possível para formatar o código de forma limpa, legível e consistente.

Além dos benefícios dentro de organizações e equipes individuais, a adoção de formatadores consistentes em todo o ecossistema web beneficia a todos, preservando a familiaridade ao alternar entre projetos e ajudando os recém-chegados a aprender e reconhecer padrões de forma mais intuitiva, sem distrações.

Atualmente, no ecossistema web, o Prettier é, de longe, o formatador de código mais popular, além de também ter convicções fortes, com uma [filosofia rígida sobre adicionar novas opções](https://prettier.io/docs/en/option-philosophy). O Biome tem a intenção de ser [amplamente compatível com o Prettier](https://biomejs.dev/blog/biome-wins-prettier-challenge) e, como tal, adotou muitas das convicções que o Prettier implementa, e a configuração não é exceção a isso.

O Biome se orgulha de ter alcançado uma compatibilidade tão alta com o Prettier, e de fazer com que a migração seja o mais simples possível, mas isso também vem com ressalvas semelhantes.

## Opções Existentes

O Biome começou com um subconjunto restrito de opções de configuração, visando às diretrizes de estilo mais comuns e controversas no ecossistema JavaScript: tipo de identação (tabulações vs. espaços), larguras da identação (2 espaços para igualar uma tabulação ou 4?) e pontos-e-vírgulas obrigatórios. Adicionar opções para esses pontos foi considerado suficiente para atender às necessidades da maioria das pessoas, e não houve nenhuma consideração forte para adicionar mais outros.

Tomando por base [a filosofia de opções do Prettier](https://prettier.io/docs/en/option-philosophy), Biome tinha a oportunidade de começar do zero e evitar as armadilhas nas quais o Prettier havia caído com algumas de suas opções existentes, como `--bracket-same-line` e `--arrow-parens`:

> …[essas] não são opções que gostamos de oferecer. Elas causam muitas discussões inúteis nas equipes, e lamentamos por isso. Difíceis de remover agora, essas opções existem como um artefato histórico e não devem motivar a adição de mais opções ("Se _essas_ opções existem, por que esta não pode existir também?").

No entanto, quando o [Desafio do Prettier foi anunciado](https://console.algora.io/challenges/prettier), o Biome decidiu aceitar o desafio, o que exigia a implementação de todas as opções de configuração que o Prettier já oferecia para obter compatibilidade total.

O Biome ainda compartilha a filosofia do Prettier sobre essas opções e as considera um recurso legado para compatibilidade, em vez de um conjunto de recursos de primeira classe. Sua existência não indica que mais opções serão adicionadas, nem devem ser usadas como justificativa para apoiar a existência de outras opções no futuro.

## Novas Opções

Assim como o Prettier, o Biome acredita que o conjunto atual de opções é estável, suficiente e não está aberto a adições ou outras alterações. Solicitações por opções de configuração adicionais provavelmente não serão consideradas e poderão ser fechadas sem discussão.

Dito isso, mesmo que o Biome tenha se estabelecido como uma ferramenta de formatação capaz e robusta, ele ainda é relativamente novo, o que significa que há muitas oportunidades para abrir caminho para novos avanços e ideias que podem não parecer viáveis de outra forma.

O estilo de formatação do Biome também é considerado relativamente estável, continuando a corresponder ao Prettier tanto quanto possível, com [poucos desvios intencionais](https://github.com/biomejs/biome/issues/739). Alterações no estilo do Biome podem ser consideradas e implementadas. Ainda assim, também é improvável que elas se tornem opções configuráveis e, em vez disso, seriam aplicadas universalmente a todas as versões futuras do Biome.
