const fs = require('fs');
const path = require('path');
const vsctm = require('vscode-textmate');
const oniguruma = require('vscode-oniguruma');

// Read the oniguruma WASM file
const wasmBin = fs.readFileSync(path.join(__dirname, 'node_modules/vscode-oniguruma/release/onig.wasm')).buffer;
const vscodeOnigurumaLib = oniguruma.loadWASM(wasmBin).then(() => {
    return {
        createOnigScanner(patterns) { return new oniguruma.OnigScanner(patterns); },
        createOnigString(s) { return new oniguruma.OnigString(s); }
    };
});

async function main() {
    const registry = new vsctm.Registry({
        onigLib: vscodeOnigurumaLib,
        loadGrammar: async (scopeName) => {
            if (scopeName === 'text.html.ejs') {
                const grammarPath = path.join(__dirname, 'syntaxes/ejs.json');
                const grammar = JSON.parse(fs.readFileSync(grammarPath, 'utf8'));
                return grammar;
            }
            if (scopeName === 'source.js') {
                return {
                    scopeName: 'source.js',
                    patterns: [
                        { match: '\\bfor\\b', name: 'keyword.control.js' },
                        { match: '\\bconst\\b', name: 'storage.type.js' },
                        { match: '\\blet\\b', name: 'storage.type.js' },
                    ]
                };
            }
            return null;
        }
    });

    const grammar = await registry.loadGrammar('text.html.ejs');
    
    // Test the full case from the issue
    const testCode = `<li>
<%
for (let i = 0; i < arr.length; i++) {
    const val = arr[i];
%>
    <%= val %>
<% } %>
</li>
<script>
  console.log("hello");
</script>`;

    console.log("\nTesting EJS grammar with the issue example:\n");
    console.log(testCode);
    console.log("\n--- Tokenization Results ---\n");
    
    let ruleStack = vsctm.INITIAL;
    for (const line of testCode.split('\n')) {
        const lineTokens = grammar.tokenizeLine(line, ruleStack);
        console.log(`Line: "${line}"`);
        for (const token of lineTokens.tokens) {
            const text = line.substring(token.startIndex, token.endIndex);
            const scopes = token.scopes.join(' ');
            // Highlight if something seems wrong (e.g., EJS scope appearing where it shouldn't)
            console.log(`  [${token.startIndex}-${token.endIndex}] "${text}" -> ${scopes}`);
        }
        ruleStack = lineTokens.ruleStack;
        console.log(`  RuleStack depth: ${ruleStack.depth}`);
        console.log();
    }
}

main().catch(console.error);
