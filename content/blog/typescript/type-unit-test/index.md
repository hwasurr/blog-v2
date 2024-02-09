---
title: TypeScript 커스텀 유틸 타입을 유닛테스트하는 방법
date: "2024-01-27"
tags: [TypeScript, UnitTest]
description: TypeScript에서 타입 수준 동등 검사를 구현하는 방법과, 이를 이용한 커스텀 유틸 타입 유닛 테스트를 구성하는 방법을 알아봅니다.
---

TypeScript에서는 유용한 빌트인 유틸리티 타입을 제공합니다. `ReadOnly`, `Omit`, `Pick`, `Parameters`, `ReturnType` 등이 그 예시입니다. 이러한 타입들은 매우 유용하게 사용됩니다. 그러나 우리는 작업 중 나만의 새로운 유틸리티 타입을 정의해 사용해야 할 상황을 많이 맞닥뜨립니다. 특히 라이브러리 또는 SDK와 같이 코드 자체가 상품/제품이 되는 경우에는 좋은 DX를 제공하는 동시에 안정적인 품질의 결과물을 제공하기 위해 Type-Safety가 더더욱 중요해지므로, 상황에 맞는 유틸리티 타입을 정의하는 것은 매우 중요합니다.

프로그래밍에서 유닛 테스트는 좋은 품질의 코드를 작성하는 데에 있어 큰 역할을 합니다. 유닛 테스트를 통해 개발자는 기능 단위/모듈별 버그를 쉽게 식별할 수 있으며, 테스트 구성 자체를 유즈케이스 또는 문서화의 한 형태로 사용할 수 있습니다.

TypeScript에서 단위 코드에 대한 유닛 테스트를 어떻게 작성하는 지에 대한 내용은 많이 유통되고 있으며, 표준으로 자리잡았다고 일컫을 만한 형식이 존재합니다. (`beforeEach`, `describe`, `it`, `expect(result).toEqual()`, ...) 그러나 새롭게 정의한 유틸리티 타입에 대한 유닛 테스트는 어떻게 구성할 수 있을까요?

# Equality Check in Type System

테스트는 대개 Arrange, Act, Assert 나 Given, When, Then 과 같은 패턴 아래에서 이루어 집니다. 이 패턴들은 아래의 내용들을 필요로 합니다.

- 테스트에 사용할 기능과 그 입력
- 기능의 실행
- 결과에 대한 검증

TypeScript 에서 타입 수준에서 결과에 대한 검증을 어떻게 할 수 있을까요? 일반적인 프로그래밍 언어에서의 유닛 테스트와 다르게, 컴파일을 위한 superset언어인 타입스크립트에서는 **검증해야할 대상이 '값'이 아닌 '타입'입니다.** 유틸리티 타입에 의해 반환된 타입이 원하는 타입인지 아닌지를 어떻게 체크할 수 있을까요?

이를 위해 우리는 타입 수준에서 동일한 지 아닌 지를 확인할 수 있어야 합니다. 그러나 이는 생각보다 단순하지는 않습니다.

## Equals #1

간단히 생각해 보았을 때, 두 타입이 동일한 지 검사하기 위해서는 아래와 같이 구현할 수 있을 것 같습니다.

```ts
type Equals1<T,U> = T extends U ? U extends T ? true : false : false;
```

그러나 Union Type의 예에서 위 타입은 동등성을 올바르게 검사하지 못합니다. Union Type이 Conditional Type을 만났을 때 분배되기 때문입니다.

```ts
type Test = Equals1<1, 1 | 2> // true

// 분배 풀이
// type Test = Equals1<1, 1> | Equals1<1, 2>
// type Test = (1 extends 1 ? 1 extends 1 ? true : false : false) | (1 extends 2 ? 2 extends 1 ? true : false : false)
// type Test = true | false
// type Test = true
```

## Equals #2

타입 수준에서 동일 검사에 대한 논의는 ([TypeScript Github issue](https://github.com/microsoft/TypeScript/issues/27024#issuecomment-421529650))에서 이루어졌습니다. 이 논의에 따르면, Equals 타입은 다음과 같이 구성할 수 있습니다.

```ts
type Equals<X, Y> =
    (<T>() => (T extends X ? 1 : 2)) extends
    (<T>() => (T extends Y ? 1 : 2)) ? true : false;
```

Conditional Type은 T를 알지 못할 때 지연됩니다. 지연된 Conditional Type에 대한 할당 가능성은 `isTypeIdenticalTo` 검사에 의존하고, 이는 다음 두 사례에 대해서만 `true`를 반환합니다.

- 두 Conditional Type이 동일한 constraint를 가질 때
- 두 Conditional Type의 참, 거짓 분기가 동일한 타입일 때

더 자세한 내용은 ([TypeScript Github issue](https://github.com/microsoft/TypeScript/issues/27024#issuecomment-421529650))와 이에 대한 [해설 stackoverflow 답변](https://stackoverflow.com/questions/68961864/how-does-the-equals-work-in-typescript)을 확인하시기 바랍니다.

# 유틸 타입 단위 테스트 구성하기

구성한 유틸리티 타입에 대한 단위테스트를 작성할 때, 에러가 발생한 경우 더 자세한 타입에러 로그를 위해 `Equals` 타입을 다음과 같이 변경할 수 있습니다.

```ts
type Equals<X, Y> =
    (<T>() => (T extends X ? 1 : 2)) extends
    (<T>() => (T extends Y ? 1 : 2)) ? true :
        { errMessage: "Failed to check equality"; type1: X; type2: Y };
```

이후, `Equals` 로부터 반환된 값이 `true`인지 검사하기 위한 `ExpectTrue` 유틸리티 타입을 구성합니다.

```ts
type ExpectTrue<Value extends true> = Value
```

이제 준비는 완료되었습니다.
간단하게 Array에서 마지막 요소를 꺼낸 Array를 반환하는 `Pop` 타입을 구성하고 이에 대한 유닛 테스트를 다음과 같이 작성할 수 있습니다.

```ts
type Pop<T extends any[]> = T extends [...infer Arr, infer __Last] ? Arr : T;

/* _____________ Test Cases _____________ */
// 마지막 값을 제외한 나머지 배열을 반환한다.
type case_1 = {
  Input: [3, 2, 1];
  Expected: [3, 2];
  Assert: ExpectTrue<Equals<Pop<case_1['Input']>, case_1['Expected']>>;
}

// 빈 배열인 경우 빈 배열을 그대로 반환한다
type case_2 = {
  Input: [];
  Expected: [];
  Assert: ExpectTrue<Equals<Pop<case_2['Input']>, case_2['Expected']>>;
}
// 배열이 아닌 타입파라미터 전달시 에러
type case_3 = {
  Input: string;
  Expected: [];
  // @ts-expect-error
  Assert: ExpectTrue<Equals<Pop<case_3['Input']>, case_3['Expected']>>;
}
```

> ❕ **@ts-expect-error**
> 
> [3.9버전에 소개](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-9.html#-ts-expect-error-comments)된 TypeScript 주석 지시어 중 하나로, 다음 라인에서 발생하는 오류를 일부러 무시하도록 합니다. `@ts-ignore`와 다른 점은, 다음 라인에서 오류가 발생하지 않으면 되려 컴파일시 오류를 발생시킵니다.


# 참고 문서

- https://github.com/type-challenges/type-challenges
- https://github.com/microsoft/TypeScript/issues/27024#issuecomment-421529650
- https://stackoverflow.com/questions/68961864/how-does-the-equals-work-in-typescript
