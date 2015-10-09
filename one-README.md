# one-autotester
One autotester for all your AutoTester needs.

This program was inspired by CS3202 lecturer's perl script to automatically execute all test cases for AutoTester.
Written to help my group to run bulk/selected test cases with ease without messing with batch or Powershell files.
Feel free to fork and issue pull requests to further improve this script. 

Do keep the LICENSE :)

# Getting Started

Let's get started to make running AutoTester on multiple files or test cases an ease.

## Requirements

- node.js v0.12.7 (https://nodejs.org/en/)
- grunt-cli (optional but recommended)

## Setup

Install node.js dependencies and grunt-cli as global dependency
```shell
npm install
npm install -g grunt-cli
```
Configure one-config.json with proper file path to `AutoTester.exe` and `test cases`.

## Usage

### With grunt-cli installed.
--
Run all test cases within your directory.
```shell
grunt autotest
```
Run specific test cases within your directory.
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

### Without grunt-cli installed.
--
Run all test cases within your directory.
```shell
node -e "require('grunt').tasks(['autotest']);"
```
Run specific test cases within your directory.
```shell
node -e "require('grunt').tasks(['autotest:<your test cases>']);"
```

Run all test cases for modifies e.g. `modifies-src-01.txt`
```shell
node -e "require('grunt').tasks(['autotest:modifies']);"
```

Run all test cases for modifies and parent e.g. `modifies-src-01.txt` & `parent-src-01.txt`
```shell
node -e "require('grunt').tasks(['autotest:modifies:parent']);"
```
