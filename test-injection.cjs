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

// Minimal HTML grammar
const htmlGrammar = {
    scopeName: 'text.html.basic',
    patterns: [
        {
            begin: '<(script)\\b[^>]*>',
            beginCaptures: { 1: { name: 'entity.name.tag.html' } },
            end: '</(script)>',
            endCaptures: { 1: { name: 'entity.name.tag.html' } },
            name: 'meta.embedded.block.javascript',
            contentName: 'source.js',
            patterns: [{ include: 'source.js' }]
        },
        {
            match: '</?[a-zA-Z][^>]*>',
            name: 'meta.tag.html'
        }
    ]
};

async function main() {
    const registry = new vsctm.Registry({
        onigLib: vscodeOnigurumaLib,
        loadGrammar: async (scopeName) => {
            console.log('Loading grammar:', scopeName);
            if (scopeName === 'text.html.basic') {
                return htmlGrammar;
            }
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
                        { match: '\\bvar\\b', name: 'storage.type.js' },
                        { match: '\\bconsole\\b', name: 'support.class.console.js' },
                    ]
                };
            }
            return null;
        }
    });

    // Load HTML grammar with EJS injection
    const htmlG = await registry.loadGrammar('text.html.basic');
    const ejsG = await registry.loadGrammar('text.html.ejs');
    
    // Add injection
    registry.addGrammar(ejsG);
    
    // Test the full case from the issue
    const testCode = `<li>
<% entries.forEach(p => {
    var x = p.number + 1;
%>
<p><%= p.title %></p>
<% }); %>
</li>
<script>
  console.log("hello");
</script>`;

    console.log("\nTesting with HTML + EJS injection:\n");
    console.log(testCode);
    console.log("\n--- Tokenization Results ---\n");
    
    let ruleStack = vsctm.INITIAL;
    for (const line of testCode.split('\n')) {
        const lineTokens = htmlG.tokenizeLine(line, ruleStack);
        console.log(`Line: "${line}"`);
        for (const token of lineTokens.tokens) {
            const text = line.substring(token.startIndex, token.endIndex);
            const scopes = token.scopes.join(' ');
            console.log(`  [${token.startIndex}-${token.endIndex}] "${text}" -> ${scopes}`);
        }
        ruleStack = lineTokens.ruleStack;
        console.log(`  RuleStack depth: ${ruleStack.depth}`);
        console.log();
    }
}

main().catch(console.error);
