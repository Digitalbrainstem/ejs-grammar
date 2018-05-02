/* --------------------------------------------------------------------------------------------
 * Copyright (c) DigitalBrainstem
 * Licensed under the MIT License. See LICENSE in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
'use strict';

import { CodeCompletion } from './code-completion';
import {
	IPCMessageReader, IPCMessageWriter, createConnection, IConnection, TextDocuments, TextDocument,
	Diagnostic, DiagnosticSeverity, InitializeResult, TextDocumentPositionParams, CompletionItem
} from 'vscode-languageserver';

/**
 * The `Settings` interface describe the part that is relevant to the server.
 */
interface Settings {
	'ejs-support': EjsSettings;
}

/**
 * The `EjsSettings` should be the same as defined in the `package.json` file.
 */
interface EjsSettings {
	enable: boolean;
	maxNumberOfProblems: number;
}

// Constants
const DEFAULT_MAX_NUMBER_OF_PROBLEMS: number = 100;
// Create a simple text document manager. The text document manager supports full document sync only
const documents: TextDocuments = new TextDocuments();
const connection: IConnection = createConnection(new IPCMessageReader(process), new IPCMessageWriter(process));

let maxNumberOfProblems: number = DEFAULT_MAX_NUMBER_OF_PROBLEMS;

// After the server has started the client sends an initialize request. The server receives
// in the passed params the `workspaceFolders` of the workspace plus the client `capabilities`.
connection.onInitialize((_params): InitializeResult => {
	return {
		capabilities: {
			// Tell the client that the server works in FULL text document sync mode
			textDocumentSync: documents.syncKind,
			// Tell the client that the server supports code completion
			// TODO: Trigger characters should preferably be loaded automatically
			completionProvider: { resolveProvider: true, triggerCharacters: ['<'] }
		}
	}
});

// The settings have changed. Is sent on server activation as well.
connection.onDidChangeConfiguration((change) => {
	const settings = <Settings>change.settings;

	if (settings['ejs-support'].enable === false) {
		//connection.dispose();
		// Do something that stops the server but restarts it when re-enabled
		return;
	}

	maxNumberOfProblems = settings['ejs-support'].maxNumberOfProblems || DEFAULT_MAX_NUMBER_OF_PROBLEMS;

	documents.all().forEach(validateTextDocument);
});

// The content of a text document has changed. This event is emitted
// when the text document first opened or when its content has changed.
documents.onDidChangeContent(change => validateTextDocument(change.document));

/**
 * This example function finds appearances of 'typescript' and suggests that
 * it should be spelled 'TypeScript'.
 * @param document document to validate
 */
function validateTextDocument(document: TextDocument): void {
	let diagnostics: Diagnostic[] = [];
	const lines = document.getText().split(/\r?\n/g); // Support both LF and CRLF end-of-line

	// Loop over all lines
	for (let i = 0, problems = 0; i < lines.length && problems < maxNumberOfProblems; i++) {
		let line = lines[i];

		// Find index of 'typescript', if present, and add diagnostic
		let index = line.indexOf('typescript');
		if (index >= 0) {
			problems++;

			let diagnostic: Diagnostic = {
				severity: DiagnosticSeverity.Warning,
				range: {
					start: { line: i, character: index },
					end: { line: i, character: index + 'typescript'.length }
				},
				message: `${line.substr(index, 'typescript'.length)} should be spelled TypeScript`,
				source: 'EJS language support'
			};

			diagnostics.push(diagnostic);
		}
	}
	// Send the computed diagnostics to VSCode.
	connection.sendDiagnostics({ uri: document.uri, diagnostics });
}

// Provide completion items
connection.onCompletion((_textDocumentPosition: TextDocumentPositionParams): CompletionItem[] => {
	// The pass parameter contains the position of the text document in
	// which code complete got requested. For the example we ignore this
	// info and always provide the same completion items.
	return CodeCompletion.getCodeCompletions();
});

// This handler resolves additional information for the item selected in
// the completion list. Can be done using a separate file (cleaner, easier to maintain)
connection.onCompletionResolve(item => CodeCompletion.getItemResolveInfo(item));

/* Also available, but with a different type of api (and you can't use both `connection.` and `documents.`):
connection.onDidOpenTextDocument((params) => { });
connection.onDidChangeTextDocument((params) => { });
connection.onDidChangeWatchedFiles((change) => { });
connection.onDidCloseTextDocument((params) => { });
 * See https://code.visualstudio.com/docs/extensions/example-language-server#_incremental-text-document-synchronization
 * for more on this
 */

documents.listen(connection);
connection.listen();
