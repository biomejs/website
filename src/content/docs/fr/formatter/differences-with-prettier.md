---
title: Différences par rapport à Prettier
description: Explication détaillée des différences par rapport à Prettier.
---

Dans certains cas, Biome a intentionnellement décidé de formater le code d’une manière qui ne correspond pas à la sortie de Prettier. Ces divergences sont expliquées ci-dessous.

## Prettier ne met pas entre guillemets certaines propriétés d’objet qui sont des identifiants JavaScript valides

Prettier et Biome ne mettent pas entre guillemets les propriétés d’objet et de classe qui sont des identifiants JavaScript valides.
Prettier [ne met pas de guillemets s’il s’agit seulement d’identifiants ES5 valides](https://github.com/prettier/prettier/blob/a5d502513e5de4819a41fd90b9be7247146effc7/src/language-js/utils/index.js#L646).

C’est une restriction ancienne dans un écosystème où ES2015 est, à présent, très répandu.
Ainsi, nous avons décidé de diverger ici, en ne mettant aucun identifiant JavaScript valide en ES2015+ entre guillemets.

Une possible solution de contournement serait d’introduire une configuration pour définir la version d’ECMAScript qu’un projet utilise.
Nous pourrions alors ajuster le comportement face à la suppression des guillemets en fonction de cette version.
Définir la version d’ECMAScript à `ES5` pourrait correspondre au comportement de Prettier.

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


## Prettier a un comportement incohérent pour l’assignation dans les clés calculées

Prettier et Biome entourent de parenthèses certaines expressions d’assignation, en particulier dans les expressions conditionnelles,
ce qui permet à Biome d’identifier une expression qui devrait être une comparaison.

Prettier a un comportement incohérent parce qu’il ajoute des parenthèses à une assignation dans une clé calculée d’une propriété d’objet et ne le fait pas pour celle d’une propriété de classe, comme le montre l’exemple suivant&nbsp;:

Entrée

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

[Lien vers le bac à sable](/playground?enabledLinting=false&code=YQAgAD0AIAB7AAoAIAAgAFsAeAAgAD0AIAAwAF0AOgAgADEALAAKAH0ACgAKAGMAbABhAHMAcwAgAEMAIAB7AAoAIAAgACAAIABbAHgAIAA9ACAAMABdACAAPQAgADEACgB9AAoA)

Pour être cohérents, nous avons décidé de diverger et d’omettre les parenthèses.
Ou bien nous pourrions entourer de parenthèses toute assignation dans une clé calculée d’un objet ou d’une classe.


## Prettier ajoute une virgule de fin aux paramètres de type des fonctions fléchées, même quand ce n’est pas obligatoire

Dans certains cas spécifiques, une liste de paramètres de type d’une fonction fléchée requiert une virgule de fin pour la distinguer d’un élément JSX.
Quand un type par défaut est fourni, cette virgule de fin n’est pas obligatoire.
Ici, nous divergeons de Prettier parce que nous pensons que cela respecte mieux l’intention originelle de Prettier, qui était de n’ajouter une virgule de fin que si c’était obligatoire.

Entrée

```tsx title="example.tsx"
<T = unknown>() => {};
```

Diff

```tsx title="example.tsx" del={1} ins={2}
<T = unknown,>() => {};
<T = unknown>() => {};
```


## Prettier a un comportement incohérent pour les chaînes facultatives non nulles entre parenthèses

En _TypeScript,_ l’opérateur d’assertion non nulle `!` permet d’affirmer qu’une valeur est non nulle.
Appliquée à une chaîne facultative, l’assertion s’applique à la chaîne entière, indépendamment de la présence de parenthèses,
faisant passer `(a.?.b)!` et `a.?.b!` pour équivalentes.

Les exemples de code précédents sont déjà bien formatés, selon Prettier.
Prettier a l’habitude d’imposer la présence ou l’absence de parenthèses.
Cela ressemble à une occasion ratée de normaliser le code.

En outre, Prettier ne supprime pas les parenthèses, même quand elles entourent l’assertion non nulle.
À la place, il déplace l’opérateur en-dehors des parenthèses.

Entrée

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


## Prettier formate des syntaxes invalides

L’analyseur de Prettier basé sur Babel pour JavaScript et TypeScript est très permissif et [permet à de multiples erreurs](https://github.com/prettier/prettier/blob/e4a74c05f4502dd4ec70495c3130ff08ab088e05/src/language-js/parse/babel.js#L177-L218) d’être ignorées.
L’analyseur de Biome est intentionnellement plus strict que celui de Prettier.
Il identifie correctement les erreurs de syntaxe suivantes&nbsp;:
- une fonction ne peut avoir de modificateurs en doublon,
- un ordre invalide des modificateurs de propriétés,
- les déclarations de fonction ne sont pas autorisées à avoir un corps,
- les classes non abstraites ne peuvent avoir de propriétés abstraites,
- une chaîne facultative ne peut être assignée,
- le modificateur `const` ne peut être défini dans un paramètre de type d’une interface,
- le retour de premier niveau,
- etc.

Dans Prettier, ces erreurs ne sont pas considérées comme des erreurs d’analyse et l’AST est toujours construit «&nbsp;correctement&nbsp;» avec les nœuds appropriés.
Au formatage, Prettier traite ces nœuds comme d’habitude et les formate en conséquence.

Dans Biome, les erreurs d’analyse génèrent des nœuds «&nbsp;Bogus&nbsp;», qui peuvent contenir n’importe quels nœuds valides, invalides et/ou de caractères bruts.
Au formatage, Biome traite les nœuds bogus comme du texte plein en réalité, les affichant mot pour mot dans le code qui en résulte sans aucun formatage, puisque tenter de les formater serait incorrect et causerait des changements sémantiques.

Pour les propriétés de classe, la stratégie actuelle d’analyse de Prettier utilise également des champs booléens pour les modificateurs, ce qui veut dire que, de chaque type de modificateur, un seul peut être présent (les modificateurs d’accessibilité sont stockés en tant que simple chaîne de caractères).
À l’affichage, Prettier regarde la liste des booléens et décide des modificateurs à afficher à nouveau. Biome, en revanche, maintient une liste de modificateurs, ce qui veut dire que les doublons sont conservés et peuvent être analysés (d’où les messages d’erreur d’analyse sur les modificateurs en doublon et l‘ordre).
À l’affichage des nœuds bogus, cette liste est gardée intacte et l’affichage du texte non formaté fait que ces modificateurs continuent à exister.

Biome peut y répondre de plusieurs manières.
Une possibilité est d’essayer d’interpréter les nœuds Bogus au formatage et de construire des nœuds valides à partir d’eux.
Si un nœud valide peut être construit, alors il formatera juste ce nœud comme d’habitude&nbsp;; sinon, il affiche le texte bogus mot pour mot, comme il le fait actuellement.
Cependant, c’est compliqué et cela introduit dans l’outil de formatage une forme de logique d’analyse qui n’a pas de sens.

Une autre option est d’introduire une certaine forme de «&nbsp;nœud bogus syntaxiquement valide&nbsp;» dans l’analyseur, qui accepte ces types d’erreur purement sémantique (modificateurs en doublon, propriétés abstraites dans des classes non abstraites).

Il continuerait à construire les nœuds comme d’habitude (en se conformant, en réalité, au comportement de Prettier), mais les stockerait dans un nouveau type de nœud bogus, y compris les diagnostics qui l’accompagnent.
Au formatage, ces nœuds bogus particuliers tenteraient juste de formater le nœud interne, puis se rabattraient sur une solution de repli en cas d’erreur (l’utilitaire existant `format_or_verbatim` le ferait déjà).
La logique d’analyse et la logique de formatage restent séparées l’une de l’autre&nbsp;; mais, cela introduit plus de complexité à l’analyseur, permettant à des états invalides d’être considérés comme semi-valides.

### Modificateurs en doublon dans les propriétés de classe

Entrée

```ts title="example.ts"
// Multiples modificateurs d’accessibilité
class Foo {
  private public a  = 1;
}

// Déclare une fonction avec un corps
declare function foo ( ) {  }

// Utilisation invalide d’abstract
class Bar {
  abstract  foo  ;
}

// Readonly en doublon
class Read {
  readonly readonly   x: number;
}
```

Diff

```ts title="example.ts" del={3, 8, 13, 19} ins={4, 9, 14, 20}
// Multiples modificateurs d’accessibilité
class Foo {
  private public a  = 1;
  private a = 1;
}

// Déclare une fonction avec un corps
declare function foo ( ) {  }
declare function foo() {};

// Utilisation invalide d’abstract
class Bar {
  abstract  foo  ;
  abstract foo;
}

// Readonly en doublon
class Read {
  readonly readonly   x: number;
  readonly x: number;
}
```

### Assignation à une chaîne facultative

Entrée

```js title="example.js"
(a?.b) = c;
```

Diff

```js title="example.js" del={1} ins={2}
a?.b = c;
(a?.b) = c;
```

### Modificateur incorrect pour les paramètres de type d’une interface

Entrée

```ts title="example.js"
interface L<in const T> {}
```

Diff

```ts title="example.js" del={1} ins={2}
interface L<const in T> {}
interface L<in const T> {}
```

### Retour de premier niveau

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

### Auto-incrémentation et auto-décrémentation erronées

Entrée

```js title="example.js"
(1)++;
```

```js title="example.js" del={1} add={2}
1++;
(1)++;
```

### Utilisation du modificateur `abstract` dans des classes non abstraites

Entrée

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

## Prettier a des incohérences entre l’analyse de TypeScript et Babel

Prettier prend en charge plusieurs analyseurs différents pour le code JavaScript et TypeScript, tous censés être compatibles avec la [spécification `estree`](https://github.com/estree/estree). La plupart du temps, Prettier utilise Babel comme analyseur par défaut pour le code JavaScript&nbsp;; mais, en analysant TypeScript, il essaiera d’utiliser d’abord l’analyseur propre à TypeScript, ne se repliant sur Babel avec activation de TypeScript qu’ensuite. Alors que l’analyseur de TypeScript est généralement compatible avec `estree`, il n’est pas exact, ce qui [peut mener à certaines incohérences](https://github.com/prettier/prettier/issues/15785) qui affectent la sortie que Prettier crée. En général, elles sont considérées comme des bugs dans Prettier lui-même, puisque la sortie devrait être la même, indépendamment de l’analyseur utilisé.

Biome implémente sa propre analyse, qui prend en charge toutes formes de code JavaScript et TypeScript, ce qui veut dire qu’il ne devrait pas y avoir d’incohérences entre les deux. Cependant, lors de la migration d’une base de code en TypeScript depuis Prettier vers Biome, il est possible que du formatage semble avoir changé à cause de ces différences entre analyseurs de la part de Prettier.

Ces cas ne sont pas considérés comme des bugs ou des incompatibilités dans Biome. Si le code formaté ne semble différent que par l’utilisation de l’analyseur `typescript` dans Prettier, mais correspond en utilisant `babel` et/ou `babel-ts`, alors Biome considère la sortie comme compatible.

Par exemple, considérez ce cas, formaté en utilisant Biome et Prettier 3.1.0 avec l’analyseur `typescript`&nbsp;:

Entrée

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

Prettier avec l’analyseur TypeScript choisit d’écrire l’appel `isEqual` sur une seule ligne, tandis que Biome se conforme à la sortie de Prettier avec les analyseurs `babel` et `babel-ts`. De ce fait, ce n’est _pas_ considéré comme une incompatibilité avec Biome et c’est, en revanche, considéré comme un bug dans Prettier.
