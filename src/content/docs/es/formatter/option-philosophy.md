---
title: Filosofia de las Opciones de Formato
description: Configuración de un formateador de opinión.
---

> 💡 Biome sigue la misma [filosofía de opciones de Prettier](https://prettier.io/docs/en/option-philosophy). El conjunto actual de opciones de formato se considera estable y no es probable que se planteen nuevas opciones.
>
> Este documento explica algo de historia sobre cómo y por qué Biome ha llegado a donde está hoy, y una perspectiva para el futuro.

Biome es un _formateador opinante_. En un mundo ideal, esto significa que Biome asume que sólo hay una forma correcta de formatear las cosas y aplicará ese estilo en todo momento. No importa el proyecto, no importa la configuración, el código formateado por Biome siempre tendrá el mismo aspecto. Desde otra perspectiva, Biome es su propia _guía de estilo automática_, no una herramienta para aplicar otras guías de estilo.

Tener una opinión tan firme sobre el formato puede parecer pesado, pero las ventajas quedan claras rápidamente tras la adopción. Todas las discusiones sobre dónde deben ir los espacios, si una línea debe separarse, si una línea debe tener sangría, y tantas otras, simplemente _desaparecen_. [Discusiones triviales](https://en.wikipedia.org/wiki/Law_of_triviality) ya no distraen el enfoque de lo que realmente importa. Las revisiones del código se liberan de peticiones de reformateo y debates cíclicos. Todo lo que hace falta es confiar en que Biome hace todo lo posible por formatear el código de forma limpia, legible y coherente.

Más allá de los beneficios dentro de los equipos y organizaciones individuales, la adopción de formateadores coherentes en todo el ecosistema web beneficia a todos, ya que facilita mantener la familiaridad al pasar de un proyecto a otro y ayuda a los recién llegados a aprender y reconocer patrones de forma más intuitiva y sin distracciones.

En el ecosistema web actual, Prettier es, con diferencia, el formateador de código más popular, y también está fuertemente orientado a la opinión, con una [filosofía estricta sobre la adición de opciones](https://prettier.io/docs/en/option-philosophy). Biome pretende ser [en gran medida compatible con Prettier](/blog/biome-wins-prettier-challenge) y, como tal, ha adoptado muchas de las opiniones que aplica Prettier, y la configuración no es una excepción.

Biome se enorgullece de haber alcanzado una compatibilidad tan alta con Prettier y de hacer que el camino de migración para los usuarios sea lo menos doloroso posible, pero esto también viene con advertencias similares.

## Opciones Existentes

Biome comenzó con un estricto subconjunto de opciones de configuración, centradas en las directrices de estilo más comunes y polémicas del ecosistema JavaScript: estilos de sangría (tabuladores vs. espacios), anchos de sangría (2 espacios para igualar un tabulador, o ¿4?) y puntos y comas obligatorioss. Se consideró que añadir opciones para estos puntos era suficiente para satisfacer las necesidades de la mayoría de la gente, y no se planteó añadir ninguna otra.

Apoyándose en la [filosofía de opciones de Prettier](https://prettier.io/docs/en/option-philosophy), Biome tenía la oportunidad de empezar de cero y evitar las trampas en las que Prettier había caído con sus otras opciones existentes, como `--bracket-same-line` y `--arrow-parens`:

> …[estas] no son el tipo de opciones que nos complace tener. Provocan muchas discusiones en los equipos, y lo lamentamos. Difíciles de eliminar ahora, estas opciones existen como artefacto histórico y no deberían motivar la adición de más opciones ("Si _esas_ opciones existen, ¿por qué no puede existir ésta?").

Sin embargo, cuando el [desafío de Prettier](https://console.algora.io/challenges/prettier) fue anunciado, Biome decidió aceptar el reto, lo que exigía aplicar todas las opciones de configuración que tenía Prettier para lograr una compatibilidad total.

Biome sigue compartiendo la filosofía de Prettier sobre estas opciones y las considera una característica heredada por compatibilidad más que un conjunto de características básicas. Su existencia no indica que vayan a añadirse más opciones, ni deben utilizarse como justificación para apoyar la existencia de otras opciones en el futuro.

## Nuevas Opciones

Al igual que Prettier, Biome considera que el conjunto actual de opciones es estable, suficiente y no está abierto a adiciones u otros cambios. No es probable que se tengan en cuenta las solicitudes de opciones de configuración adicionales y pueden cerrarse sin discusión.

Dicho esto, aunque Biome se ha consolidado como una herramienta de formateo capaz y robusta, también es relativamente nueva, lo que significa que hay muchas oportunidades para allanar el camino a nuevos avances e ideas que de otro modo no parecerían factibles.

El estilo de formato de Biome también se considera relativamente estable, y sigue coincidiendo con Prettier en la medida de lo posible, con [pocas desviaciones intencionadas](https://github.com/biomejs/biome/issues/739). Se pueden considerar e implementar cambios en el estilo de Biome. Aun así, es poco probable que se conviertan en opciones configurables y, en su lugar, se aplicarían de forma universal a todas las versiones futuras de Biome.
