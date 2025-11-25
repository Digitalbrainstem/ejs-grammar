import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import * as vsctm from 'vscode-textmate';
import * as oniguruma from 'vscode-oniguruma';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Read the oniguruma WASM file
const wasmBin = fs.readFileSync(path.join(__dirname, 'node_modules/vscode-oniguruma/release/onig.wasm')).buffer;

async function main() {
    await oniguruma.loadWASM(wasmBin);
    
    const registry = new vsctm.Registry({
        onigLib: Promise.resolve({
            createOnigScanner: (patterns) => new oniguruma.OnigScanner(patterns),
            createOnigString: (s) => new oniguruma.OnigString(s)
        }),
        loadGrammar: async (scopeName) => {
            if (scopeName === 'text.html.ejs') {
                const grammarPath = path.join(__dirname, 'syntaxes/ejs.json');
                const grammar = JSON.parse(fs.readFileSync(grammarPath, 'utf8'));
                return grammar;
            }
            return null;
        }
    });

    const grammar = await registry.loadGrammar('text.html.ejs');
    
    const testCode = `<html>
<body>
<li>
<%
for (let i = 0; i < arr.length; i++) {
    const val = arr[i];
%>
    <%= val %>
<% } %>
</li>
</body>
</html>`;

    console.log("Testing EJS grammar with multi-line code:\n");
    console.log(testCode);
    console.log("\n--- Tokenization Results ---\n");
    
    let ruleStack = vsctm.INITIAL;
    for (const line of testCode.split('\n')) {
        const lineTokens = grammar.tokenizeLine(line, ruleStack);
        console.log(`Line: "${line}"`);
        for (const token of lineTokens.tokens) {
            const text = line.substring(token.startIndex, token.endIndex);
            console.log(`  [${token.startIndex}-${token.endIndex}] "${text}" -> ${token.scopes.join(' ')}`);
        }
        ruleStack = lineTokens.ruleStack;
        console.log();
    }
}

main().catch(console.error);
