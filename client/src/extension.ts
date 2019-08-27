/* --------------------------------------------------------------------------------------------
 * Copyright (c) DigitalBrainstem
 * Licensed under the MIT License. See LICENSE in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
'use strict';

import * as path from 'path';

import { workspace, commands, window, ExtensionContext } from 'vscode';
import { LanguageClient, LanguageClientOptions, ServerOptions, TransportKind } from 'vscode-languageclient';

export function activate(context: ExtensionContext) {
	// Get path to server.js (using path.join for platform-specific delimiters, e.g. / or \)
	const serverModule = context.asAbsolutePath(path.join('server'));

	// Server options used in debug mode
	const debugOptions = { execArgv: ["--nolazy", "--inspect=6009"] };

	// Server uses 'run' options in normal mode, 'debug' options in debug mode
	const serverOptions: ServerOptions = {
		run: { module: serverModule, transport: TransportKind.ipc },
		debug: { module: serverModule, transport: TransportKind.ipc, options: debugOptions }
	}

	const clientOptions: LanguageClientOptions = {
		// Register the server for ejs files
		documentSelector: [{ language: 'ejs', scheme: 'file' }],
		synchronize: {
			// Synchronize the setting section 'ejs-support' to the server
			configurationSection: 'ejs-support',
			// Notify the server about file changes to '.clientrc' files contain in the workspace
			// TODO: find out if this is useful at all
			fileEvents: workspace.createFileSystemWatcher('**/.clientrc')
		}
	}

	// Create the language client and start the client.
	const disposable =
		new LanguageClient('ejs-support-client', 'EJS language support extension', serverOptions, clientOptions)
			.start();

	// Push the disposable to the context's subscriptions so that the
	// client will be deactivated on extension deactivation
	context.subscriptions.push(disposable);

	// TEMP, for debugging
	const disposable2 = commands.registerCommand('extension.sayHello', () => {
		// Display a message box to the user
		window.showInformationMessage('Hello World!');
	});

	context.subscriptions.push(disposable2);
}
