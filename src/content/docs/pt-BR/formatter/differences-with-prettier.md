---
title: Diferenças com o Prettier
description: Explicação detalhada das diferenças com o Prettier.
---

Em alguns casos, o Biome decidiu intencionalmente formatar o código de uma maneira que não corresponde à saída do Prettier. Essas divergências são explicadas abaixo.

## O Prettier não retira as aspas de algumas propriedades de objetos que são identificadores JavaScript válidos

Prettier e Biome retiram as aspas de propriedades de objetos e classes que são identificadores JavaScript válidos.
O Prettier [retira as aspas apenas de identificadores ES5 válidos](https://github.com/prettier/prettier/blob/a5d502513e5de4819a41fd90b9be7247146effc7/src/language-js/utils/index.js#L646).

Isso é uma restrição legada em um ecossistema onde o ES2015 já é amplamente utilizado.
Por isso, decidimos divergir aqui, retirando as aspas de todos os identificadores JavaScript válidos para ES2015+.

Uma possível solução seria introduzir uma configuração para definir a versão ECMAScript que um projeto utiliza.
Poderíamos então ajustar o comportamento de retirada de aspas com base nessa versão.
Definir a versão ECMAScript para `ES5` poderia corresponder ao comportamento do Prettier.

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

## O Prettier tem um comportamento inconsistente para atribuição em chaves computadas

Prettier e Biome colocam algumas expressões de atribuição entre parênteses, particularmente em condicionais.
Isso permite que o Biome identifique uma expressão que deveria ser uma comparação.

O Prettier tem um comportamento inconsistente porque adiciona parênteses para uma atribuição em uma chave computada de uma propriedade de objeto e não para uma chave computada de uma propriedade de classe, como demonstrado pelo seguinte exemplo:

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

[Link para o playground](https://biomejs.dev/playground?enabledLinting=false&code=YQAgAD0AIAB7AAoAIAAgAFsAeAAgAD0AIAAwAF0AOgAgADEALAAKAH0ACgAKAGMAbABhAHMAcwAgAEMAIAB7AAoAIAAgACAAIABbAHgAIAA9ACAAMABdACAAPQAgADEACgB9AAoA)

Para ser consistente, decidimos divergir e omitir os parênteses.
Alternativamente, poderíamos colocar parênteses em qualquer atribuição em uma chave computada de um objeto ou de uma classe.

## O Prettier adiciona uma vírgula final aos parâmetros de tipo de funções arrow mesmo quando não é necessário

Em alguns casos específicos, uma lista de parâmetros de tipo de uma função arrow requer uma vírgula final para distingui-la de um elemento JSX.
Quando um tipo padrão é fornecido, essa vírgula final não é necessária.
Aqui, divergimos do Prettier porque achamos que respeita melhor a intenção original do Prettier, que era adicionar uma vírgula final apenas quando necessário.

Input

```tsx title="example.tsx"
<T = unknown>() => {};
```

Diff

```tsx title="example.tsx" del={1} ins={2}
<T = unknown,>() => {};
<T = unknown>() => {};
```

## O Prettier tem um comportamento inconsistente para cadeias opcionais com asserção de não nulo entre parênteses

Em _TypeScript_, o operador de asserção de não nulo `!` permite afirmar que um valor não é nulo.
Quando aplicado em uma cadeia opcional, a asserção se aplica a toda a cadeia, independentemente da presença de parênteses,
tornando equivalente `(a.?.b)!` e `a.?.b!`.

Os exemplos de código anteriores já estão bem formatados, de acordo com o Prettier.
O Prettier é usado para impor a presença ou a ausência de parênteses.
Isso parece uma oportunidade perdida para normalizar o código.

Além disso, o Prettier não remove os parênteses, mesmo quando eles envolvem a asserção de não nulo.
Em vez disso, move o operador para fora dos parênteses.

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
(a.?.b)!
a.?.b!
```

## O Prettier formata sintaxes inválidas

A análise do Prettier baseada em Babel para JavaScript e TypeScript é muito permissiva e [ignora vários erros](https://github.com/prettier/prettier/blob/e4a74c05f4502dd4ec70495c3130ff08ab088e05/src/language-js/parse/babel.js#L177-L218).
O analisador do Biome é intencionalmente mais rigoroso que o do Prettier.
Ele identifica corretamente os seguintes erros de sintaxe:
- Uma função não pode ter modificadores duplicados
- Ordem inválida de modificadores de propriedades
- Declarações de funções não são permitidas ter corpos
- Classes não abstratas não podem ter propriedades abstratas
- Uma cadeia opcional não pode ser atribuída
- O modificador `const` não pode ser definido em um parâmetro de tipo de uma interface
- return no nível superior
- etc.

No Prettier, esses erros não são considerados erros de análise, e a AST ainda é construída "corretamente" com os nós apropriados.
Quando formatando, o Prettier trata esses nós como normais e os formata de acordo.

No Biome, os erros de análise resultam em nós `Falsos`, que podem conter vários nós válidos, inválidos e/ou caracteres brutos.
Quando formatando, o Biome trata nós falsos como texto simples, imprimindo-os literalmente no código resultante sem qualquer formatação, já que tentar formatá-los poderia ser incorreto e causar mudanças semânticas.

Para propriedades de classe, a estratégia atual de análise do Prettier também usa campos booleanos para modificadores, significando que apenas um de cada tipo de modificador pode estar presente (modificadores de acessibilidade são armazenados como uma única string).
Quando imprimindo, o Prettier olha para a lista de booleanos e decide quais modificadores imprimir novamente. Biome, por outro lado, mantém uma lista de modificadores, significando que duplicatas são mantidas e podem ser analisadas (daí as mensagens de erro de análise sobre modificadores duplicados e ordenação).
Quando imprimindo os nós falsos, esta lista é mantida intacta, e imprimir o texto não formatado resulta na continuação da existência desses modificadores.

Existem maneiras de o Biome abordar isso.
Uma possibilidade é tentar interpretar os nós falsos ao formatar e construir nós válidos a partir deles.
Se um nó válido puder ser construído, então ele apenas formataria esse nó normalmente, caso contrário, ele imprime o texto falsos verbatim como faz atualmente.
No entanto, isso é confuso e introduz uma forma de lógica de análise no formatador que não é significativa.

Outra opção é introduzir algum tipo de "nó falsos sintaticamente válido" no analisador, que aceita esses tipos de erros puramente semânticos (modificadores duplicados, propriedades abstratas em classes não abstratas).

Ele continuaria a construir os nós normalmente (efetivamente correspondendo ao comportamento no Prettier) mas os armazenaria dentro de um novo tipo de nó falsos, incluindo os diagnósticos junto com ele.
Ao formatar, esses nós falsos específicos tentariam apenas formatar o nó interno e, em seguida, voltariam atrás se houvesse um erro (o método utilitário `format_or_verbatim` já faria isso).
Isso mantém a lógica de análise e formatação separadas uma da outra, mas introduz mais complexidade ao analisador, permitindo que estados inválidos sejam considerados semi-válidos.

### Modificadores duplicados em propriedades de classe

Entrada

```ts title="example.ts"
// Múltiplos modificadores de acessibilidade
class Foo {
  private public a  = 1;
}

// Declarar função com corpo
declare function foo ( ) {  }

// Uso inválido de abstract
class Bar {
  abstract  foo  ;
}

// Readonly Duplicado
class Read {
  readonly readonly   x: number;
}
```

Diferença

````ts title="example.ts" del={3, 8, 13, 19} ins={4, 9, 14, 20}
// Múltiplos modificadores de acessibilidade
class Foo {
  private a = 1;
  private public a  = 1;
}

// Declarar função com corpo
declare function foo() {};
declare function foo ( ) {  }

// Uso inválido de abstract
class Bar {
  abstract foo;
  abstract  foo  ;
}

// Readonly Duplicado
class Read {
  readonly x: number;
  readonly readonly   x: number;
}


### Atribuição a uma cadeia opcional

Entrada

```js title="example.js"
(a?.b) = c;
````

Diferença

```js title="example.js" del={1} ins={2}
a?.b = c;
(a?.b) = c;
```

### Modificador incorreto para os parâmetros de tipo de uma interface

Entrada

```ts title="example.js"
interface L<in const T> {}
```

Diferença

```ts title="example.js" del={1} ins={2}
interface L<const in T> {}
interface L<in const

 T> {}
```

### Retorno no nível superior

```js title="example.js"
return someVeryLongStringA && someVeryLongStringB && someVeryLongStringC && someVeryLongStringD
```

```js title="example.js" del={1, 2, 3, 4, 5, 6} ins={7}
return (
  someVeryLongStringA &&
  someVeryLongStringB &&
  someVeryLongStringC &&
  someVeryLongStringD
);
return someVeryLongStringA && someVeryLongStringB && someVeryLongStringC && someVeryLongStringD
```

### Autoincremento e autodecremento errôneos

Entrada

```js title="example.js"
(1)++;
```

```js title="example.js" del={1} add={2}
1++;
(1)++;
```

### Uso do modificador `abstract` em classes não abstratas

Entrada

```ts title="example.js"
class C {
  abstract f() : number;
}
```

Diferença

```ts title="example.js" del={2} add={3}
class C {
  abstract f(): number;
  abstract f() : number;
}
```

## Prettier tem inconsistências entre análise de TypeScript e Babel

O Prettier suporta vários analisadores diferentes para código JavaScript e TypeScript, todos destinados a serem compatíveis com a especificação [`estree`](https://github.com/estree/estree). Na maioria das vezes, o Prettier usa o Babel como o analisador padrão para código JavaScript, mas ao analisar TypeScript, tentará usar o próprio analisador do TypeScript primeiro e só recorrerá ao Babel com TypeScript habilitado depois. Embora o analisador TypeScript seja geralmente compatível com `estree`, não é exato, e [isso pode levar a algumas inconsistências](https://github.com/prettier/prettier/issues/15785) que afetam a saída que o Prettier cria. Em geral, esses são considerados bugs no próprio Prettier, já que a saída deve ser a mesma, independentemente de qual analisador é usado.

O Biome implementa sua própria análise que lida com todas as formas de código JavaScript e TypeScript, o que significa que não deve haver inconsistências entre os dois. No entanto, ao migrar um código TypeScript do Prettier para o Biome, é possível que alguma formatação pareça ter mudado por causa dessas discrepâncias entre os analisadores do Prettier.

Esses casos não são considerados bugs ou incompatibilidades no Biome. Se o código formatado parecer diferente usando a configuração de analisador `typescript` no Prettier, mas corresponder ao usar `babel` e/ou `babel-ts`, então o Biome considera a saída compatível.

Como exemplo, considere este caso, formatado usando Biome e Prettier 3.1.0 com o analisador `typescript`:

Entrada

```ts title="example.js"
function someFunctionName(
  someLongBreakingParameterName,
  anotherLongParameterName,
) {
  return isEqual(a?.map(([t, _]) => t?.id), b?.map(([t, _]) => t?.id));
}
```

Diferença

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

O Prettier com o analisador TypeScript escolhe escrever a chamada `isEqual` em uma única linha, enquanto o Biome corresponde à saída do Prettier com os analisadores `babel` e `babel-ts`. Assim, isso _não_ é considerado uma incompatibilidade com o Biome e é, em vez disso, considerado um bug no Prettier.
