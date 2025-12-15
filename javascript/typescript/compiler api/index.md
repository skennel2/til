# TypeScript 컴파일러 API
[https://github.com/Microsoft/TypeScript/wiki/Using-the-Compiler-API]

# 필요한 패키지
    "typescript": "^5.5.4"
    "ts-node": "^10.9.2",
    "@types/node": "^22.5.0",

# 간단한 예시 
먼저 Program 객체를 createProgram 함수를 이용해 만들어야한다. 인자로는 ts파일들의 절대경로들과 (내 경우는 타겟 프로젝트 src 하위의 모든 ts파일을 스캔해 넘겨주었다.)
tsconfig.json 내용에 해당하는 config 정보를 넘긴다. 이로써 기본적인 CompilerHost가 생성된다.

```typescript
import * as ts from 'typescript';

this.tsProgram = ts.createProgram(tsFiles, this.DEFALUT_TSCONFIG);

for (const sourceFile of this.tsProgram.getSourceFiles()) {
    // 모든 소스파일의 순회
}
```

# ts 코드 문자열을 실행하기 
```typescript 
import * as ts from "typescript";

const source = "let x: string  = 'string'";
let result = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS }});\
console.log(JSON.stringify(result));
```

# Node
추상구문트리(AST)에서의 하나의 노드를 나타낸다. 변수 선언, 함수 호출, 제어 구조(예: if, for 등) 같은 것들이 각각 노드로 표현된다.  
코드 자체의 구조와 문법을 표현한다. ts.Node는 여러 하위 타입(예: ts.Expression, ts.Statement, ts.Declaration)으로 구체화된다.

1. kind: 노드의 종류를 나타내는 ts.SyntaxKind 값. (예: 변수 선언, 함수 호출, 표현식 등)
1. flags
1. parent: 상위 노드. AST 구조에서 부모 노드와의 연결
1. getSourceFile()
1. getChildren(sourceFile?: SourceFile)
1. getText(sourceFile?: SourceFile)
1. forEachChild()

# Declaration 
ts.Node의 하위 타입
코드에서 이름을 가지는 식별자나 타입을 정의하는 모든 노드

아래처럼 typescipt 루트위치에 특정 Declaration을 체크할수 있는 함수를 제공한다. 

```typescript
ts.isMethodDeclaration(node)
ts.isEnumDeclaration(node)
ts.isEnumMember(node)
ts.isFunctionDeclaration(node)
ts.isClassDeclaration(node)
```

# Symbol 
ts.Symbol은 심볼 테이블에서 추적하는 식별자나 선언에 대한 정보를 표현합니다. 
코드 내에서 특정 이름(예: 변수명, 함수명, 클래스명 등)에 대한 메타데이터를 저장하고, 타입 정보, 선언 위치 등의 정보를 제공하는 데 사용.
코드의 의미적 정보를 추적하며, 특히 식별자와 그 선언에 대한 정보를 저장

1. name: 코드상에 선언된 식별자의 이름 
1. declarations: 심볼이 선언된 위치에 대한 정보 
1. flags: 변수, 함수, 클래스등 어떤 종류인지
1. getType(): 심볼의 타입정보리턴
