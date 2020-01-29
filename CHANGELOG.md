# CHANGE LOG #

## 1.3.1 ##

- Fix single lines with mutliple ejs tags. 
- Before: script would not capture inner tag causing " to be js not html. 

```html
<button class="<% ... %>"><% ... %></button>

```

## 1.3.0 ##

- Change ejs tag type so they stand out in html code.
- Note: Will only show difference in some themes.
- Add php blocking regex so valid php does not get triggered.
- EJS tags inside of block comments will show as regular ejs tags now.

```html
<% /* %> <-- Will be colored correctly
Anything here will be commented out
--> <% */ %>
```

## 1.2.1 ##

- Add support for comment sections
- Thanks to [@illz](https://github.com/illz) for verfication.

```html
<% /* %>
Anything here will be commented out
<% */ %>
```

## 1.2.0 ##

- Add Snippet support
- Thanks to [@theranbrig](https://github.com/theranbrig) for initial snippet support.
- If snippets are not working add the following to your setting.json file

```json
    "emmet.includeLanguages": {
        "ejs": "html",
    },
```

## 1.1.5 ##

- Fixed Block comment on line with ejs control variable
- Add support for ejs litteral `<%%`

## 1.1.4 ##

- Add support for conditional loops
- ReWrite to allow better html injection.

## 1.1.3 ##

- Prevent running under PHP.

## 1.1.2 ##

- Fixed support for JavaScript loops within EJS.

## 1.1.1 ##

- Fixed support for JavaScript comments using <kbd>ctrl+/</kbd> and <kbd>ctrl+shift+/</kbd> at EJS boundaries.

## 1.1.0 ##

- Added support for javascript comments using ctrl+/


## 1.0.0 ##

### Major UPDATE ###

#### NOTICE: If you are not seeing any style, set your file associations for "*.ejs" to html ####

##### file association #####

- Located in setting.json
- Should look like the following

```json
    {
        "files.associations": {
            "*.ejs": "html"
        }
    }
```

#### Updates ####

- Major bump
- Changing to an injected language.
- Injecting into "text.html"
- Setting configurationDefaults for file.association for ejs to html.
- Rewrite of ejs.json
- Created ejs-tag.

## Unpublished 0.5.1 ##

- Fixed surrounding a selection with JavaScript template literals.
- Fixed language configuration within EJS blocks inside JavaScript code blocks.

## 0.5.0 ##

- Fixed single-line JS comments not being terminated correctly by an EJS closing tag. ([#28](https://github.com/Digitalbrainstem/ejs-grammar/issues/28))
- Fixed broken EJS inside HTML `<script>` and `<style>` elements. ([#27](https://github.com/Digitalbrainstem/ejs-grammar/issues/27) and [#31](https://github.com/Digitalbrainstem/ejs-grammar/issues/31))
- Fixed incorrect comments in HTML and JavaScript portions. ([#22](https://github.com/Digitalbrainstem/ejs-grammar/issues/22))

## 0.4.4 ##

- Published Untested Code. Rolling back.

## 0.4.1 ##

- No Code changes. Correcting information so those who help get properly recognized

## 0.4.0 ##

- Fixing bugs and a major rewrite! Thanks to [@ExE-Boss](https://github.com/ExE-Boss).

- Fixes [#3](https://github.com/Digitalbrainstem/ejs-grammar/issues/3)
- Fixes [#7](https://github.com/Digitalbrainstem/ejs-grammar/issues/7)
- Fixes [#20](https://github.com/Digitalbrainstem/ejs-grammar/issues/20)

## 0.3.2 ##

- Fixing readme.

## 0.3.1 ##

- Fixing spelling mistake!

## 0.3.0 ##

- Thanks to [@meesfrensel](https://github.com/meesfrensel) Added new auto close pair and other various corrections.

## 0.2.3 ##

- Issue [#6](https://github/Digitalbrainstem/ejs-grammar/issues/6): Fix errornous indentation on new line.

## 0.2.2 ##

- Update ReadMe: Adding Resources
- Update ReadMe: Adding History
- Update ReadMe: Adding links to EJS Docs

## 0.2.1 ##

- Update ReadMe

## 0.2.0 ##

- Feature: Allows support for alternate tags of EJS `<??>` now work.
- Adding Changelog.

*Note: Technically, `<?%>` OR `<%?>` works with this version. I need to comb through the code and make sure only matching pairs work. That is an item for down the road though.*

## 0.1.2 ##

- Adding keywords
- Adding todo items

## 0.1.1 ##

- Correcting ReadMe

## 0.1.0 ##

- Removed unused code
- Update ReadMe file
- Update Description
- Add tmLanguage file

## 0.0.3 ##

- Update Name and display name

## 0.0.2 ##

- Cleanup old files

## 0.0.1 ##

- Initial Release
