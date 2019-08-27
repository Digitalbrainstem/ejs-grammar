/* --------------------------------------------------------------------------------------------
 * Copyright (c) DigitalBrainstem
 * Licensed under the MIT License. See LICENSE in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
'use strict';

import { CompletionItem, CompletionItemKind } from 'vscode-languageserver';

export class CodeCompletion {
    static getCodeCompletions(): CompletionItem[] {
        return COMPLETIONS;
    }

    static getItemResolveInfo(item: CompletionItem): CompletionItem {
        for (let compl of COMPLETIONS) {
            if (compl.data === item.data) {
                item.detail = compl.detail || 'No documentation found.';
                return item;
            }
        }

        item.detail = item.detail || 'No documentation found.';
        return item;
    }
}

const COMPLETIONS: CompletionItem[] = [
    {	// These are probably better used as snippets.
        label: '<%',
        kind: CompletionItemKind.Property,
        commitCharacters: [' '],
        data: 1,
        detail: 'Scriptlet opening tag',
        documentation: '\'Scriptlet\' tag, for control-flow, no output.'
    },
    {
        label: '<%=',
        kind: CompletionItemKind.Property,
        commitCharacters: [' '],
        data: 2,
        detail: 'Scriptlet output opening tag',
        documentation: 'Outputs the value into the template (HTML escaped)'
    },
    {
        label: '<%_',
        kind: CompletionItemKind.Property,
        commitCharacters: [' '],
        data: 3
    }
];
