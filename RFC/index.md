아래는 **RFC 스펙을 처음부터 체계적으로 공부할 수 있는 로드맵**입니다.
각 단계마다 *학습 목표*, *추천 RFC*, *참고 URL*을 함께 정리했습니다.
(※ 모든 링크는 공식·권위 있는 출처 위주로 구성했습니다.)

---

# 🚀 RFC 스펙 개념 학습 로드맵

**목표: RFC가 무엇인지 이해 → 문서 구조 읽는 법 → 주요 네트워크 프로토콜 RFC → 심화 규약 및 최신 표준까지 학습**

---

# 1️⃣ RFC 기본 개념 이해 단계

### 🎯 학습 목표

* RFC가 무엇인지 이해
* RFC 문서가 어떻게 만들어지는지, 표준화 절차는 무엇인지 파악
* RFC Status, Category, Obsoleted/Updated 개념 이해

### 📘 학습 내용

| 주제                    | 설명                                                          |
| --------------------- | ----------------------------------------------------------- |
| IETF란?                | RFC를 만드는 국제 기구                                              |
| IETF Standard Process | Internet-Draft → RFC → STD로 가는 과정                           |
| RFC 문서 구조             | Abstract, Intro, Terminology, Security Consideration 등      |
| RFC 상태                | Draft, Experimental, Proposed Standard, Internet Standard 등 |

### 🔗 참고 URL

* IETF 공식 홈페이지
  [https://www.ietf.org](https://www.ietf.org)
* RFC Editor
  [https://www.rfc-editor.org](https://www.rfc-editor.org)
* IETF Standards Process (STD 1)
  [https://www.rfc-editor.org/rfc/rfc2026](https://www.rfc-editor.org/rfc/rfc2026)
* RFC Style Guide
  [https://www.rfc-editor.org/rfc/rfc7322](https://www.rfc-editor.org/rfc/rfc7322)

---

# 2️⃣ RFC 읽는 법 익히기

### 🎯 학습 목표

* RFC의 구성과 기술적 문장을 읽는 방법 습득
* MUST / SHOULD / MAY 같은 requirement level 이해

### 📘 핵심 RFC

* **RFC 2119 – Key words for requirement levels**
  [https://www.rfc-editor.org/rfc/rfc2119](https://www.rfc-editor.org/rfc/rfc2119)
* **RFC 8174 – Requirement words 보완**
  [https://www.rfc-editor.org/rfc/rfc8174](https://www.rfc-editor.org/rfc/rfc8174)

### 📘 학습 포인트

* MUST는 필수, SHOULD는 권장
* RFC는 항상 “추상 → 정의 → 데이터 구조 → 동작 → 보안 → 부록” 흐름

---

# 3️⃣ 기본 네트워킹 프로토콜 기반 다지기

### 🎯 학습 목표

* 네트워크 기본 구조를 RFC 기반으로 학습
* 현대 인터넷의 기반 프로토콜 이해

### 📘 필수 RFC 목록

#### 🧱 **IP 프로토콜**

* RFC 791 — IPv4
  [https://www.rfc-editor.org/rfc/rfc791](https://www.rfc-editor.org/rfc/rfc791)
* RFC 2460 — IPv6
  [https://www.rfc-editor.org/rfc/rfc2460](https://www.rfc-editor.org/rfc/rfc2460)

#### 🔀 **Routing & ICMP**

* RFC 792 — ICMP
  [https://www.rfc-editor.org/rfc/rfc792](https://www.rfc-editor.org/rfc/rfc792)
* RFC 4861 — IPv6 Neighbor Discovery
  [https://www.rfc-editor.org/rfc/rfc4861](https://www.rfc-editor.org/rfc/rfc4861)

#### 📦 **전송 계층**

* RFC 793 — TCP
  [https://www.rfc-editor.org/rfc/rfc793](https://www.rfc-editor.org/rfc/rfc793)
* RFC 768 — UDP
  [https://www.rfc-editor.org/rfc/rfc768](https://www.rfc-editor.org/rfc/rfc768)

#### 🌐 **DNS**

* RFC 1034 — DNS Concepts
  [https://www.rfc-editor.org/rfc/rfc1034](https://www.rfc-editor.org/rfc/rfc1034)
* RFC 1035 — DNS Implementation
  [https://www.rfc-editor.org/rfc/rfc1035](https://www.rfc-editor.org/rfc/rfc1035)

### 🔗 참고 자료

* TCP/IP Guide (비공식이지만 매우 잘 정리됨)
  [http://www.tcpipguide.com/free/](http://www.tcpipguide.com/free/)

---

# 4️⃣ 웹·애플리케이션 레이어 프로토콜 학습

### 🎯 학습 목표

* HTTP, SMTP, JSON, OAuth 같은 애플리케이션 레벨 규약 이해

### 📘 필수 RFC

#### 🌐 **HTTP**

* RFC 7230~7235 — HTTP/1.1 기본
  [https://www.rfc-editor.org/rfc/rfc7230](https://www.rfc-editor.org/rfc/rfc7230)
* RFC 7540 — HTTP/2
  [https://www.rfc-editor.org/rfc/rfc7540](https://www.rfc-editor.org/rfc/rfc7540)
* RFC 9110~9114 (최신 HTTP/1.1 & HTTP/2/3 명세)
  [https://www.rfc-editor.org/rfc/rfc9110](https://www.rfc-editor.org/rfc/rfc9110)

#### 🔐 **TLS(HTTPS 기반)**

* RFC 5246 — TLS 1.2
  [https://www.rfc-editor.org/rfc/rfc5246](https://www.rfc-editor.org/rfc/rfc5246)
* RFC 8446 — TLS 1.3
  [https://www.rfc-editor.org/rfc/rfc8446](https://www.rfc-editor.org/rfc/rfc8446)

#### 📧 **Email**

* RFC 5321 — SMTP
  [https://www.rfc-editor.org/rfc/rfc5321](https://www.rfc-editor.org/rfc/rfc5321)
* RFC 5322 — 이메일 형식
  [https://www.rfc-editor.org/rfc/rfc5322](https://www.rfc-editor.org/rfc/rfc5322)

#### 🪪 **OAuth / 인증**

* RFC 6749 — OAuth 2.0
  [https://www.rfc-editor.org/rfc/rfc6749](https://www.rfc-editor.org/rfc/rfc6749)

---

# 5️⃣ 고급 및 최신 기술 RFC 탐색

### 🎯 학습 목표

* 최신 인터넷 기술 동향 이해
* 안전성·보안·성능 관련 RFC 접하기

### ⭐ 추천 항목

#### 🔐 보안 / 암호화

* RFC 8555 — ACME (Let’s Encrypt)
  [https://www.rfc-editor.org/rfc/rfc8555](https://www.rfc-editor.org/rfc/rfc8555)
* RFC 8441 — WebSockets over HTTP/2
  [https://www.rfc-editor.org/rfc/rfc8441](https://www.rfc-editor.org/rfc/rfc8441)

#### ⚡ 성능·현대 프로토콜

* RFC 9000 — QUIC
  [https://www.rfc-editor.org/rfc/rfc9000](https://www.rfc-editor.org/rfc/rfc9000)
* RFC 9114 — HTTP/3
  [https://www.rfc-editor.org/rfc/rfc9114](https://www.rfc-editor.org/rfc/rfc9114)

#### 🧩 JSON / Data Format

* RFC 8259 — JSON 표준
  [https://www.rfc-editor.org/rfc/rfc8259](https://www.rfc-editor.org/rfc/rfc8259)
* RFC 7493 — I-JSON
  [https://www.rfc-editor.org/rfc/rfc7493](https://www.rfc-editor.org/rfc/rfc7493)

---

# 6️⃣ RFC 스펙 읽는 연습 & 실전 활용

### 🎯 학습 목표

* 실제로 RFC 스펙을 기반으로 구현 분석
* 오픈소스 프로토콜 코드 분석

### 📝 스터디 방식 추천

1. RFC 2616(구 HTTP 1.1) → RFC 723x → RFC 911x 비교해보기
2. curl, nginx, Node.js http 모듈 코드 분석
3. Wireshark 패킷을 보면서 RFC 내용과 매칭하기
4. 자신만의 RFC 요약 문서 작성해보기

---

# 7️⃣ 지속적 학습 경로

### 🔗 최신 문서 탐색 경로

* RFC 전체 목록
  [https://www.rfc-editor.org/rfc/](https://www.rfc-editor.org/rfc/)
* IETF Datatracker (Internet-Drafts 포함)
  [https://datatracker.ietf.org/](https://datatracker.ietf.org/)
* IETF Working Groups
  [https://www.ietf.org/standards/process/wg/](https://www.ietf.org/standards/process/wg/)

---

# 📚 전체 요약 로드맵

### 📌 초급

* RFC란 무엇인가?
* RFC 읽는 법 (RFC 2119, 8174)
* RFC 작성 구조 이해

### 📌 중급

* TCP/IP 기반 프로토콜 RFC
* DNS, HTTP/1.1, SMTP 등

### 📌 상급

* HTTP/2·HTTP/3, QUIC, TLS 1.3
* 인증·보안 관련 RFC
* JSON, WebSockets 등 최신 기술

### 📌 전문가

* 여러 RFC 세대간 차이 비교
* 소스코드 분석/Wireshark 기반 동작 분석
* 직접 프로토콜 구현

---
