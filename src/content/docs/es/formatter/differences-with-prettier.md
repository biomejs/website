---
title: Diferencias con Prettier
description: Explicación detallada de las diferencias con Prettier.
---

En algunos casos, Biome ha decidido intencionadamente formatear el código de una manera que no coincide con la salida de Prettier. Estas divergencias se explican a continuación.

## Prettier no retira las comillas de algunas propriedades de objetos que son identificadores validos de JavaScript

Prettier y Biome retiran las comillas de propriedades de objetos y classes que son identificadores validos de JavaScript.
Prettier [solo retira comillas validas de identificadores de ES5](https://github.com/prettier/prettier/blob/a5d502513e5de4819a41fd90b9be7247146effc7/src/language-js/utils/index.js#L646).

Se trata de una restricción antigua en un ecosistema en el que ES2015 está ya ampliamente utilizada.
Por lo tanto, hemos decidido divergir en este punto, retirando las comillas en todos los identificadores válidos de JavaScript para ES2015+.

Una posible solución sería introducir una configuración para establecer la versión de ECMAScript que utiliza un proyecto.
Entonces podríamos ajustar el comportamiento de la retirada de comillas basada en esa version.
Configurando la versión de ECMAScript a `ES5` podría coincidir con el comportamiento de Prettier.

```js title="example.js"
const obj = {
 'a': true,
 b: true,
 "𐊧": true,
}
```

Diff

```js title="example.js" del={4} ins={5}
const obj = {
  a: true,
  b: true,
  "𐊧": true,
  𐊧: true,
};
```


## Prettier tiene un comportamiento inconsistente para la asignación en claves computadas

Prettier y Biome encierran algunas expresiones de asignación entre paréntesis, particularmente en condicionales.
Esto permite a Biome identificar una expresión que debe ser una comparación.

Prettier tiene un comportamiento incoherente porque añade paréntesis para una asignación en una clave computada de una propiedad de objeto y no lo hace para una clave computada de una propiedad de clase, como demuestra el siguiente ejemplo:

Input

```js title="example.js"
a = {
  [x = 0]: 1,
}

class C {
  [x = 0] = 1
}
```

Diff

```js title="example.js" del={2} ins={3}
a = {
  [(x = 0)]: 1,
  [x = 0]: 1,
};

class C {
  [x = 0] = 1;
}
```

[Link de playground](/playground?enabledLinting=false&code=YQAgAD0AIAB7AAoAIAAgAFsAeAAgAD0AIAAwAF0AOgAgADEALAAKAH0ACgAKAGMAbABhAHMAcwAgAEMAIAB7AAoAIAAgACAAIABbAHgAIAA9ACAAMABdACAAPQAgADEACgB9AAoA)

Para ser coherentes, hemos decidido divergir y omitir los paréntesis.
Alternativamente, podríamos encerrar cualquier asignación en una clave computada de un objeto o de una clase.


## Prettier añade una coma final a los parámetros de tipo de las funciones de flecha incluso cuando no es necesario

En algunos casos específicos, una lista de parámetros de tipo de una función de flecha requiere una coma final para distinguirla de un elemento JSX.
Cuando se proporciona un tipo por defecto, esta coma final no es necesaria.
En este caso, nos apartamos de Prettier porque creemos que respeta mejor la intención original de Prettier, que era añadir una coma final sólo cuando fuera necesario.

Input

```tsx title="example.tsx"
<T = unknown>() => {};
```

Diff

```tsx title="example.tsx" del={1} ins={2}
<T = unknown,>() => {};
<T = unknown>() => {};
```


## Prettier tiene un comportamiento incoherente con las cadenas opcionales entre paréntesis no declaradas nulas

En _TypeScript_, tel operador de aserción no nulo `!` permite afirmar que un valor no es nulo.
Cuando se aplica sobre una cadena opcional, la aserción se aplica a toda la cadena independientemente de la presencia de paréntesis, haciendo equivalente  `(a.?.b)!` y `a.?.b!`.

Los ejemplos de código anteriores ya están bien formateados, según Prettier.
Prettier se utiliza para imponer la presencia o ausencia de paréntesis.
Esto parece una oportunidad perdida para normalizar el código.

Además, Prettier no elimina los paréntesis aunque encierren la aserción no nula.
En su lugar, mueve el operador fuera de los paréntesis.

Input:

```ts title="example.ts"
a.?.b!
(a.?.b)!
(a.?.b!)
```

Diff

```ts title="example.ts" del={2, 4} ins={3, 5}
a.?.b!
(a.?.b)!
a.?.b!
(a.?.b!)
a.?.b!
```


## Prettier formatea sintaxis inválidas

El análisis sintáctico basado en Babel de Prettier para JavaScript y TypeScript es muy laxo y [permite múltiples errores](https://github.com/prettier/prettier/blob/e4a74c05f4502dd4ec70495c3130ff08ab088e05/src/language-js/parse/babel.js#L177-L218) que sean ignorados.
El analizador sintáctico de Biome es intencionadamente más estricto que el de Prettier.
Identifica correctamente los siguientes errores de sintaxis:

- Una función no puede tener modificadores duplicados
- orden no válido de los modificadores de las propiedades
- Las declaraciones de funciones no pueden tener cuerpos
- las clases no abstractas no pueden tener propiedades abstractas
- No se puede asignar una cadena opcional
- El modificador `const` no puede establecerse en un parámetro de tipo de una interfaz
- retorno de nivel superior
- etc.

En Prettier, estos errores no se consideran errores de análisis, y el AST se sigue construyendo "correctamente" con los nodos apropiados.
Al formatear, Prettier trata estos nodos como normales y los formatea en consecuencia.

En Biome, los errores de análisis sintáctico dan lugar a nodos `Bogus`, que pueden contener cualquier número de nodos válidos, nodos no válidos y/o caracteres sin procesar.
Al formatear, Biome trata los nodos falsos como texto sin formato, imprimiéndolos literalmente en el código final sin ningún tipo de formato, ya que intentar formatearlos podría ser incorrecto y provocar cambios semánticos

Para las propiedades de clase, la estrategia actual de análisis sintáctico de Prettier también utiliza campos booleanos para los modificadores, lo que significa que sólo puede haber uno de cada tipo de modificador (los modificadores de accesibilidad se almacenan como una única cadena).
Al imprimir, Prettier mira la lista de booleanos y decide qué modificadores imprimir de nuevo. Biome, en cambio, mantiene una lista de modificadores, lo que significa que los duplicados se conservan y pueden analizarse (de ahí los mensajes de error de análisis sintáctico sobre modificadores duplicados y ordenación).
Al imprimir los nodos falsos, esta lista se mantiene intacta, y al imprimir el texto sin formato, esos modificadores siguen existiendo.

Biome puede abordar esta cuestión de varias maneras.
Una posibilidad es intentar interpretar los nodos falsos al formatearlos y construir nodos válidos a partir de ellos..
Si se puede construir un nodo válido, entonces se formatearía ese nodo de manera normal, de lo contrario, imprime el texto falso textualmente como lo hace actualmente.
Sin embargo, esto es desordenado e introduce una forma de lógica de análisis en el formateador que no tiene sentido.

Otra opción es introducir algún tipo de "nodo falso sintácticamente válido" en el analizador sintáctico, que acepte este tipo de errores puramente semánticos (modificadores duplicados, propiedades abstractas en clases no abstractas).

Continuaría construyendo los nodos de forma normal (igualando efectivamente el comportamiento en Prettier) pero los almacenaría dentro de un nuevo tipo de nodo falso, incluyendo los diagnósticos junto con él.
Al formatear, estos nodos falsos en particular sólo intentarían formatear el nodo interior y volverían atrás si se produjera un error (la utilidad existente `format_or_verbatim` ya haría esto).
Esto mantiene separadas la lógica de análisis sintáctico y la de formateo, pero introduce más complejidad en el analizador sintáctico, ya que permite que los estados no válidos se consideren semiválidos.

### Modificadores duplicados en propiedades de clase

Entrada

```ts title="example.ts"
// Múltiples modificadores de accesibilidad
class Foo {
  private public a  = 1;
}

// Declarar función con cuerpo
declare function foo ( ) {  }

// Uso no válido de abstract
class Bar {
  abstract  foo  ;
}

// Readonly Duplicado
class Read {
  readonly readonly   x: number;
}
```

Diff

```ts title="example.ts" del={3, 8, 13, 19} ins={4, 9, 14, 20}
// Múltiples modificadores de accesibilidad
class Foo {
  private public a  = 1;
  private a = 1;
}

// Declarar función con cuerpo
declare function foo ( ) {  }
declare function foo() {};

// Uso no válido de abstract
class Bar {
  abstract  foo  ;
  abstract foo;
}

// Readonly Duplicado
class Read {
  readonly readonly   x: number;
  readonly x: number;
}
```

### Asignación a una cadena opcional

Entrada

```js title="example.js"
(a?.b) = c;
```

Diff

```js title="example.js" del={1} ins={2}
a?.b = c;
(a?.b) = c;
```

### Modificador incorrecto para los parámetros de tipo de una interfaz

Entrada

```ts title="example.js"
interface L<in const T> {}
```

Diff

```ts title="example.js" del={1} ins={2}
interface L<const in T> {}
interface L<in const T> {}
```

### Retorno de nivel superior

```js title="example.js"
return someVeryLongStringA && someVeryLongStringB && someVeryLongStringC && someVeryLongStringD
```

```js title="example.js" del={2, 3, 4, 5, 6, 7} ins={1}
return someVeryLongStringA && someVeryLongStringB && someVeryLongStringC && someVeryLongStringD
return (
  someVeryLongStringA &&
  someVeryLongStringB &&
  someVeryLongStringC &&
  someVeryLongStringD
);
```

### Autoincremento y autodecremento erróneos

Entrada

```js title="example.js"
(1)++;
```

```js title="example.js" del={1} add={2}
1++;
(1)++;
```

### Uso del modificador `abstract` en clases no abstractas

Entrada

```ts title="example.js"
class C {
  abstract f() : number;
}
```

Diff


```ts title="example.js" del={2} add={3}
class C {
  abstract f(): number;
  abstract f() : number;
}
```

## Prettier presenta incoherencias entre el análisis sintáctico de TypeScript y Babel

Prettier admite distintos analizadores sintácticos de código JavaScript y TypeScript, todos ellos compatibles con el lenguaje de programación  [`estree` spec](https://github.com/estree/estree). La mayor parte del tiempo, Prettier utiliza Babel como analizador por defecto para el código JavaScript, pero cuando analiza TypeScript, intentará utilizar primero el analizador propio de TypeScript y sólo volverá a Babel con TypeScript activado después. Aunque el analizador sintáctico de TypeScript es generalmente compatible con `estree`, no es exacto, y [esto puede llevar a algunas inconsistencias](https://github.com/prettier/prettier/issues/15785) que afectan a la salida que Prettier crea. En general, estos se consideran fallos en el propio Prettier, ya que la salida debería ser la misma independientemente del analizador sintáctico que se utilice.

Biome implementa su propio análisis sintáctico que maneja todas las formas de código JavaScript y TypeScript, lo que significa que no debería haber ninguna incoherencia entre los dos. Sin embargo, al migrar una base de código TypeScript de Prettier a Biome, es posible que algunos formatos parezcan haber cambiado debido a esas discrepancias entre los analizadores sintácticos de Prettier.

Estos casos no se consideran errores o incompatibilidades en Biome. Si el código formateado sólo parece diferente utilizando la configuración del analizador `typescript` en Prettier, pero coincide cuando se utiliza `babel` y/o `babel-ts`, entonces Biome considera que la salida es compatible.

Como ejemplo, considera este caso, formateado usando Biome y Prettier 3.1.0 con el analizador `typescript`:

Entrada

```ts title="example.js"
function someFunctionName(
  someLongBreakingParameterName,
  anotherLongParameterName,
) {
  return isEqual(a?.map(([t, _]) => t?.id), b?.map(([t, _]) => t?.id));
}
```

Diff


```ts title="example.js" del={5} ins={6,7,8,9}
function someFunctionName(
  someLongBreakingParameterName,
  anotherLongParameterName,
) {
  return isEqual(a?.map(([t, _]) => t?.id), b?.map(([t, _]) => t?.id));
  return isEqual(
    a?.map(([t, _]) => t?.id),
    b?.map(([t, _]) => t?.id),
  );
}
```

Prettier con el analizador TypeScript opta por escribir la llamada `isEqual` en una sola línea, mientras que Biome hace coincidir la salida de Prettier con los analizadores `babel` y `babel-ts`. Por lo tanto, esto _no_ se considera una incompatibilidad con Biome, sino un error de Prettier.