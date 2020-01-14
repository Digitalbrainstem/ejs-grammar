[![Visual&nbsp;Studio Marketplace](https://img.shields.io/visual-studio-marketplace/v/DigitalBrainstem.javascript-ejs-support.svg?label=Visual%20Studio%20Marketplace)](https://marketplace.visualstudio.com/items?itemName=DigitalBrainstem.javascript-ejs-support)
[![License](https://img.shields.io/github/license/Digitalbrainstem/ejs-grammar.svg)](https://github.com/Digitalbrainstem/ejs-grammar/blob/master/LICENSE)

# EJS Language Support #

### NOTICE: If you are not seeing any style, set your file associations for "*.ejs" to html ###

- See CHANGELOG if you have issues with setting file.association

Syntax highlighting for EJS, Javascript, and HTML tags. Includes javascript autocompletion.

Please rate this and provide feedback for 2 reasons:

1. It helps me know what I need to improve. *Can't fix what I don't know*
2. It will help other know that this version is out there and that it is a newer version of the top ranked EJS language file. *Old one has not had an update in 7 years (as of 2018)*

If there is anything that I missed or features you would like this to include. [Let me know](https://github.com/Digitalbrainstem/ejs-grammar/issues)

*NOTE: This is in early development; however, it does provide greater functionality than the other ejs language supports.*

## Features

***If snippets do not show up, add the following to your settings file***

```json
    "emmet.includeLanguages": {
        "ejs": "html",
    },
```

**Snippets are found below.**

→ Denotes the `TAB` key.

| Snippet→   | Alternate  | Output                                                                                                  |
| ---------- | --------   | ------------------------------------------------------------------------------------------------------- |
| `ejs→`     | `<%`       | `<% %>` - No output tag                                                                                 |
| `ejsout→`  | `<%=`      | `<%= %>` - Outputs HTML value                                                                           |
| `ejsesc→`  | `<%-`      | `<%- %>` - Outputs unescaped                                                                            |
| `ejscom→`  | `<%#`      | `<%# %>` - Comment tag                                                                                  |
| `ejslit→`  | `<%%`      | `<%% %>` - Outputs Literal <%                                                                           |
| `ejsinc→`  | `<%`       | `include` statement                                                                                       |
| `ejsfor→`  | `<%`       | `for` Javascript Loop                                                                                             |
| `ejseach→` | `<%`       | `forEach` Javascript Loop                                                                                     |
| `ejsif→`   | `<%`       | `if` Statement with condition                                                                                     |
| `ejselif→` | `<%`       | `else if` Statement - *Middle section only.* Assumes you have already written the first `if` statement. |
| `ejselse→` | `<%`       | `else` Statement - *Middle section only.* Assumes you have already written the first `if` statement.    |

## EJS docs ##

If you need documention on how to use EJS:

[EJS Github](https://github.com/mde/ejs)
[EJS Website](https://ejs.co/)

## For Devs ##

If you need the tmLanguage file please visit my repo. It is located in syntaxes.

If you want to see support on other platforms let me know.

### Resources ###

I know Textmate/tmLanguage documention is not well recorded. If anyone reading this needs some good reading material on how to write one, these are the resources I used to help me write this.

+ [sublime Text](https://www.sublimetext.com/docs/3/scope_naming.html)
+ [Lessons Learned](https://www.apeth.com/nonblog/stories/textmatebundle.html)
+ [Textmate Manual](https://macromates.com/manual/en/language_grammars#language_grammars)
+ [Textmate Blog](https://blog.macromates.com/2005/language-grammars/)
+ [Atom Discussion 1](https://discuss.atom.io/t/first-steps-to-build-a-language-highlight/12047/5)
+ [Atom Discussion 2](https://discuss.atom.io/t/syntax-theme-nested-elements-recursivity-for-pattern/36536/5)

#### History ####

I wanted to start by utilizing other tmLanguage files that did things close to what EJS did. I tried starting with razor and PHP tmLanguage files from vscode. However, this ended up being more problimatic, as it would not do the things I wanted it to do. So I just started to write it from scratch to get it to work properly. The one thing I knew I did not want to do is have to write the others grammars definitions in this if I did not have to. I wanted to be able to utilize each of the embedded languages that were already created. This is more of a pain because you have to really have to think about the order things run and how regex and the tags work together. ALso recursion is huge to make it work properly. I am still learning, so if anyone has tips and tricks either let me know on twitter or github. I would love to here others that utilize this.

## Contributors ##

+ [@meesfrensel](https://github.com/meesfrensel)
+ [@ExE-Boss](https://github.com/ExE-Boss)
+ Orginal Snippet Library [@theranbrig](https://github.com/theranbrig) [Code](https://github.com/theranbrig/ejs-snippets

## Contact ##

Twitter: [@digibrainstem](https://twitter.com/digibrainstem)

[github](https://github.com/DigitalBrainstem/ejs-grammar)
