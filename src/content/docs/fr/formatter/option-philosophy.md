---
title: Philosophie d’option de formatage
description: Configurer un outil de formatage opiniâtre.
---

>💡 Biome suit la même [philosophie d’option que Prettier](https://prettier.io/docs/en/option-philosophy). L’ensemble d’options existant pour le formatage est considéré comme stable et de nouvelles options ne sont probablement pas envisageables.
>
>Ce document explique un peu l’histoire sur la manière dont Biome en est arrivé là où il est aujourd’hui et pourquoi, ainsi que des perspectives pour l’avenir.

Biome est un *outil de formatage
opiniâtre.* Dans un monde idéal, cela veut dire que Biome part du principe qu’il n’y a qu’une seule manière de formater les choses et imposera ce style tout le temps. Peu importe le projet, peu importe l’installation, le code formaté par Biome sera toujours pareil. D’un autre point de vue, Biome est son propre
*guide de style automatique,* non un outil pour implémenter d’autres guides de style.

Avoir pareille opinion tranchée sur le formatage peut paraître sévère, mais les avantages deviennent vite clairs après son adoption. Toutes les discussions sur l’endroit où les espaces devraient aller, une ligne devant être découpée ou non, une ligne devant être indentée ou non, et tant d’autres,
*disparaissent* simplement. Les [discussions futiles sur les abris à vélo](https://fr.wikipedia.org/wiki/Loi_de_futilité_de_Parkinson) ne détournent plus l’attention sur ce qui importe. Les revues de code deviennent libres de demandes de reformatage et de débats cycliques. Tout ce qu’il faut, c’est la confiance que Biome fait de son mieux pour formater le code proprement, lisiblement et de façon cohérente.

Par-delà les avantages au sein des équipes individuelles et des organisations, l’adoption d’outils de formatage cohérents dans tout l’écosystème du web profite à tout le monde, facilitant le maintien de la familiarité lors du passage d’un projet à un autre et aidant les nouveaux venus à apprendre et reconnaître des modèles de manière plus intuitive sans distractions.

Dans l’écosystème du web d’aujourd’hui, Prettier est, de loin, l’outil de formatage le plus populaire et il est également fortement opiniâtre, avec une [philosophie stricte sur l’ajout d’options](https://prettier.io/docs/en/option-philosophy). Biome tend à être [largement compatible avec Prettier](/blog/biome-wins-prettier-challenge) et, en tant que tel, a adopté la plupart des opinions que Prettier implémente, et la configuration n’y fait pas exception.

Biome est fier d’avoir atteint pareil degré de compatibilité avec Prettier et rend le chemin de la migration pour les utilisateurs aussi aisé que possible, ce qui s’accompagne aussi de mises en garde.

## Options existantes

Biome a commencé avec un sous-ensemble strict d’options de configuration, ciblant les guides de style les plus courants et les plus discutés dans l’écosystème JavaScript&nbsp;: styles d’indentation (tabulations contre espaces), largeurs de l’indentation (2 espaces pour égaler une tabulation ou 4&nbsp;?) et points-virgules imposés. L’ajout d’options pour ces points était considéré comme suffisant pour répondre aux besoins de la plupart des gens et il n’était pas fortement envisagé d’en ajouter d’autres.

En s’appuyant sur la [philosophie d’option de Prettier](https://prettier.io/docs/en/option-philosophy), Biome a eu la chance de prendre un nouveau départ et d’éviter les écueils dans lesquels Prettier est tombé avec ses autres options existantes, comme
`--bracket-same-line` et `--arrow-parens`&nbsp;:

> …[ce] ne sont pas le type d’options que nous sommes contents d’avoir. Ils provoquent beaucoup de discussions futiles dans les équipes et nous nous en excusons. Difficiles à enlever à présent, ces options existent en tant qu’artefact historique et ne devraient pas inciter à en ajouter davantage («&nbsp;Si
*ces* options existent, pourquoi pas celle-ci&nbsp;?&nbsp;»).

Cependant, quand le [Challenge Prettier a été annoncé](https://twitter.com/Vjeux/status/1722733472522142022), Biome a décidé de relever le défi, qui demandait d’implémenter toutes les options de configuration que Prettier avait pour atteindre une compatibilité totale.

Biome partage encore la philosophie de Prettier sur ces options et les considère comme une fonctionnalité ancienne pour des raisons de compatibilité plutôt que comme un ensemble de fonctionnalités de base. Leur existence n’indique pas que plus d’options seront ajoutées ni qu’elles devraient être utilisées comme une raison de prendre en charge l’existence d’autres options à l’avenir.

## Nouvelles options

Tout comme Prettier, Biome croit que l’ensemble d’options actuel est stable, suffisant et non ouvert à des ajouts ou autres changements. Les demandes d’options de configuration supplémentaires ne sont probablement pas envisageables et peuvent être closes sans discussion.

Cela dit, même si Biome s’est établi comme un outil de formatage compétent et robuste, il est encore relativement nouveau, ce qui veut dire qu’il y a assez d’occasions pour tracer le chemin pour de nouvelles avancées et des idées qui ne semblent pas faisables autrement.

Le style de formatage de Biome est également considéré comme relativement stable, continuant à se conformer à Prettier autant que possible, avec [quelques déviations intentionnelles](https://github.com/biomejs/biome/issues/739). Des changements au style de Biome peuvent être envisagés et implémentés. Pourtant, il est également improbable que ces derniers deviennent des options configurables et, à la place, ils s’appliqueraient partout pour toutes les futures versions de Biome.