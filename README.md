# one-autotester
One autotester for all your AutoTester needs.

# Getting Started

## Requirements

- Node.js v0.12.7 (https://nodejs.org/en/)

## Setup

Install node.js dependencies
```shell
npm install
```
Configure one-config.json with proper file path to `AutoTester.exe` and `test cases`.

## Usage

```shell
grunt autotest:[your test cases]
```

Run all test cases for modifies e.g. `modifies-src-01.txt`
```shell
grunt autotest:modifies
```

Run all test cases for modifies and parent e.g. `modifies-src-01.txt` & `parent-src-01.txt`
```shell
grunt autotest:modifies:parent
```
