---
title: Różnice z Prettier
description: Szczegółowe wyjaśnienie różnic z Prettier.
---

W niektórych przypadkach Biome celowo zdecydowało się formatować kod w sposób, który nie odpowiada wynikom Prettier. Te rozbieżności są wyjaśnione poniżej.

## Prettier nie usuwa cudzysłowów z niektórych właściwości obiektów, które są poprawnymi identyfikatorami JavaScript.

Prettier i Biome usuwają cudzysłowy z właściwości obiektów i klas, które są poprawnymi identyfikatorami JavaScript.
Prettier [usuwa cudzysłowy tylko z poprawnych identyfikatorów ES5](https://github.com/prettier/prettier/blob/a5d502513e5de4819a41fd90b9be7247146effc7/src/language-js/utils/index.js#L646).

To jest starsze ograniczenie w ekosystemie, gdzie ES2015 jest teraz powszechnie stosowany.
Dlatego zdecydowaliśmy się tutaj rozejść, usuwając cudzysłowy ze wszystkich poprawnych identyfikatorów JavaScript w ES2015+.

Możliwym obejściem byłoby wprowadzenie konfiguracji do ustawienia wersji ECMAScript używanej przez projekt.
Moglibyśmy wtedy dostosować zachowanie usuwania cudzysłowów na podstawie tej wersji.
Ustawienie wersji ECMAScript na `ES5` mogłoby odpowiadać zachowaniu Prettier.

```js title="example.js"
const obj = {
 'a': true,
 b: true,
 "𐊧": true,
}
```

Różnica

```js title="example.js" del={4} ins={5}
const obj = {
  a: true,
  b: true,
  "𐊧": true,
  𐊧: true,
};
```


## Prettier ma niespójne zachowanie dla przypisań w obliczanych kluczach.

Prettier i Biome otaczają niektóre wyrażenia przypisania nawiasami, szczególnie w warunkach.
Pozwala to Biome zidentyfikować wyrażenie, które powinno być porównaniem.

Prettier ma niespójne zachowanie, ponieważ dodaje nawiasy dla przypisania w obliczanym kluczu właściwości obiektu, ale nie robi tego dla obliczanego klucza właściwości klasy, jak pokazuje poniższy przykład:

Dane wejściowe

```js title="example.js"
a = {
  [x = 0]: 1,
}

class C {
  [x = 0] = 1
}
```

Różnica

```js title="example.js" del={2} ins={3}
a = {
  [(x = 0)]: 1,
  [x = 0]: 1,
};

class C {
  [x = 0] = 1;
}
```

[Link do placu zabaw](/playground?enabledLinting=false&code=YQAgAD0AIAB7AAoAIAAgAFsAeAAgAD0AIAAwAF0AOgAgADEALAAKAH0ACgAKAGMAbABhAHMAcwAgAEMAIAB7AAoAIAAgACAAIABbAHgAIAA9ACAAMABdACAAPQAgADEACgB9AAoA)

Aby być spójnymi, zdecydowaliśmy się rozejść i pominąć nawiasy.
Alternatywnie moglibyśmy otoczyć dowolne przypisanie w obliczanym kluczu obiektu lub klasy.


## Prettier dodaje końcowy przecinek do parametrów typu funkcji strzałkowych, nawet gdy nie jest to wymagane.

W niektórych szczególnych przypadkach lista parametrów typu funkcji strzałkowej wymaga końcowego przecinka, aby odróżnić ją od elementu JSX.
Gdy podany jest domyślny typ, ten końcowy przecinek nie jest wymagany.
Tutaj rozbiegamy się z Prettier, ponieważ uważamy, że lepiej respektuje to pierwotny zamiar Prettier, który polegał na dodawaniu końcowego przecinka tylko wtedy, gdy jest to wymagane.

Dane wejściowe

```tsx title="example.tsx"
<T = unknown>() => {};
```

Różnica

```tsx title="example.tsx" del={1} ins={2}
<T = unknown,>() => {};
<T = unknown>() => {};
```


## Prettier ma niespójne zachowanie dla nawiasowanych łańcuchów opcjonalnych z asercją nie-null

W _TypeScript_ operator asercji nie-null `!` pozwala na stwierdzenie, że wartość nie jest null.
Gdy jest stosowany na łańcuchu opcjonalnym, asercja dotyczy całego łańcucha niezależnie od obecności nawiasów,
czyniąc równoważnymi `(a.?.b)!` i `a.?.b!`.

Poprzednie przykłady kodu są już dobrze sformatowane, według Prettier.
Prettier jest używany do wymuszenia obecności lub braku nawiasów.
Wygląda to na utraconą okazję do normalizacji kodu.

Ponadto Prettier nie usuwa nawiasów nawet wtedy, gdy otaczają one asercję nie-null.
Zamiast tego przenosi operator na zewnątrz nawiasów.

Dane wejściowe:

```ts title="example.ts"
a.?.b!
(a.?.b)!
(a.?.b!)
```

Różnica

```ts title="example.ts" del={2, 4} ins={3, 5}
a.?.b!
(a.?.b)!
a.?.b!
(a.?.b!)
a.?.b!
```


## Prettier formatuje nieprawidłowe składnie

Parsowanie oparte na Babel w Prettier dla JavaScript i TypeScript jest bardzo luźne i [pozwala ignorować wiele błędów](https://github.com/prettier/prettier/blob/e4a74c05f4502dd4ec70495c3130ff08ab088e05/src/language-js/parse/babel.js#L177-L218).
Parser Biome jest celowo bardziej restrykcyjny niż parser Prettier.
Poprawnie identyfikuje następujące błędy składniowe:

- Funkcja nie może mieć duplikatów modyfikatorów
- nieprawidłowa kolejność modyfikatorów właściwości
- Deklaracje funkcji nie mogą mieć ciał
- klasy nie-abstrakcyjne nie mogą mieć właściwości abstrakcyjnych
- Łańcuch opcjonalny nie może być przypisany
- Modyfikator `const` nie może być ustawiony na parametrze typu interfejsu
- return na najwyższym poziomie
- itp.

W Prettier te błędy nie są uważane za błędy parsowania, a AST jest nadal budowane "poprawnie" z odpowiednimi węzłami.
Podczas formatowania Prettier traktuje te węzły jako normalne i formatuje je odpowiednio.

W Biome błędy parsowania skutkują węzłami `Bogus`, które mogą zawierać dowolną liczbę poprawnych węzłów, nieprawidłowych węzłów i/lub surowych znaków.
Podczas formatowania Biome traktuje węzły bogus jako faktycznie zwykły tekst, drukując je dosłownie do wynikowego kodu bez żadnego formatowania, ponieważ próba ich sformatowania mogłaby być nieprawidłowa i spowodować zmiany semantyczne.

Dla właściwości klas obecna strategia parsowania Prettier również używa pól logicznych dla modyfikatorów, co oznacza, że tylko jeden z każdego rodzaju modyfikatora może być kiedykolwiek obecny (modyfikatory dostępności są przechowywane jako pojedynczy ciąg znaków).
Podczas drukowania Prettier patrzy na listę wartości logicznych i decyduje, które modyfikatory wydrukować ponownie. Biome zamiast tego przechowuje listę modyfikatorów, co oznacza, że duplikaty są zachowywane i mogą być analizowane (stąd komunikaty o błędach parsowania dotyczące duplikatów modyfikatorów i kolejności).
Podczas drukowania węzłów bogus ta lista jest zachowywana nienaruszona, a drukowanie niesformatowanego tekstu powoduje, że te modyfikatory nadal istnieją.

Istnieją sposoby, w jakie Biome może to rozwiązać.
Jedną z możliwości jest próba interpretacji węzłów Bogus podczas formatowania i konstruowania z nich poprawnych węzłów.
Jeśli można zbudować poprawny węzeł, to po prostu sformatowałby ten węzeł jak normalnie, w przeciwnym razie drukuje tekst bogus dosłownie, jak robi to obecnie.
Jednak jest to nieuporządkowane i wprowadza formę logiki parsowania do formatera, która nie jest znacząca.

Inną opcją jest wprowadzenie jakiejś formy "składniowo poprawnego węzła bogus" do parsera, który akceptuje tego rodzaju czysto semantyczne błędy (duplikaty modyfikatorów, właściwości abstrakcyjne w klasach nie-abstrakcyjnych).

Kontynuowałby budowanie węzłów jak normalnie (efektywnie dopasowując zachowanie w Prettier), ale przechowywałby je wewnątrz nowego rodzaju węzła bogus, wraz z diagnostyką.
Podczas formatowania te szczególne węzły bogus po prostu próbowałyby sformatować wewnętrzny węzeł, a następnie wrócić do poprzedniego stanu, jeśli wystąpi błąd (istniejące narzędzie `format_or_verbatim` już by to robiło).
To utrzymuje logikę parsowania i formatowania oddzielnie od siebie, ale wprowadza więcej złożoności do parsera, pozwalając na uznanie nieprawidłowych stanów za częściowo prawidłowe.

### Duplikaty modyfikatorów we właściwościach klas

Dane wejściowe

```ts title="example.ts"
// Multiple accessibility modifiers
class Foo {
  private public a  = 1;
}

// Declare function with body
declare function foo ( ) {  }

// Invalid use of abstract
class Bar {
  abstract  foo  ;
}

// Duplicate Readonly
class Read {
  readonly readonly   x: number;
}
```

Różnica

```ts title="example.ts" del={3, 8, 13, 19} ins={4, 9, 14, 20}
// Wiele modyfikatorów dostępności
class Foo {
  private public a  = 1;
  private a = 1;
}

// Deklaracja funkcji z ciałem
declare function foo ( ) {  }
declare function foo() {};

// Nieprawidłowe użycie abstract
class Bar {
  abstract  foo  ;
  abstract foo;
}

// Duplikat Readonly
class Read {
  readonly readonly   x: number;
  readonly x: number;
}
```

### Przypisanie do łańcucha opcjonalnego

Dane wejściowe

```js title="example.js"
(a?.b) = c;
```

Różnica

```js title="example.js" del={1} ins={2}
a?.b = c;
(a?.b) = c;
```

### Nieprawidłowy modyfikator dla parametrów typu interfejsu

Dane wejściowe

```ts title="example.js"
interface L<in const T> {}
```

Różnica

```ts title="example.js" del={1} ins={2}
interface L<const in T> {}
interface L<in const T> {}
```

### Return na najwyższym poziomie

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

### Błędne auto-inkrementacja i auto-dekrementacja

Dane wejściowe

```js title="example.js"
(1)++;
```

```js title="example.js" del={1} add={2}
1++;
(1)++;
```

### Użycie modyfikatora `abstract` w klasach nie-abstrakcyjnych

Dane wejściowe

```ts title="example.js"
class C {
  abstract f() : number;
}
```

Różnica


```ts title="example.js" del={2} add={3}
class C {
  abstract f(): number;
  abstract f() : number;
}
```

## Prettier ma niespójności między parsowaniem TypeScript i Babel

Prettier wspiera wiele różnych parserów dla kodu JavaScript i TypeScript, z których wszystkie mają być kompatybilne ze [specyfikacją `estree`](https://github.com/estree/estree). W większości przypadków Prettier używa Babel jako domyślnego parsera dla kodu JavaScript, ale podczas parsowania TypeScript najpierw próbuje użyć własnego parsera TypeScript i dopiero potem wraca do Babel z włączonym TypeScript. Chociaż parser TypeScript jest ogólnie kompatybilny z `estree`, nie jest dokładny, i [może to prowadzić do pewnych niespójności](https://github.com/prettier/prettier/issues/15785), które wpływają na wynik tworzony przez Prettier. Ogólnie rzecz biorąc, są to uważane za błędy w samym Prettier, ponieważ wynik powinien być taki sam niezależnie od użytego parsera.

Biome implementuje własne parsowanie, które obsługuje wszystkie formy kodu JavaScript i TypeScript, co oznacza, że nie powinno być żadnych niespójności między nimi. Jednak podczas migracji bazy kodu TypeScript z Prettier do Biome możliwe jest, że niektóre formatowanie będzie wydawać się zmienione z powodu tych rozbieżności między parserami z Prettier.

Te przypadki nie są uważane za błędy lub niezgodności w Biome. Jeśli sformatowany kod wygląda inaczej tylko przy użyciu ustawienia parsera `typescript` w Prettier, ale pasuje przy użyciu `babel` i/lub `babel-ts`, to Biome uważa wynik za kompatybilny.

Jako przykład, rozważ ten przypadek, sformatowany przy użyciu Biome i Prettier 3.1.0 z parserem `typescript`:

Dane wejściowe

```ts title="example.js"
function someFunctionName(
  someLongBreakingParameterName,
  anotherLongParameterName,
) {
  return isEqual(a?.map(([t, _]) => t?.id), b?.map(([t, _]) => t?.id));
}
```

Różnica


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

Prettier z parserem TypeScript wybiera zapisanie wywołania `isEqual` w jednej linii, podczas gdy Biome dopasowuje wynik Prettier z parserami `babel` i `babel-ts`. W związku z tym _nie_ jest to uważane za niezgodność z Biome, lecz za błąd w Prettier.
