import * as vscode from 'vscode';
import { OpenAIIntegration } from './ai-integration';
import { getInstruction } from './instructions';

const openAiService = new OpenAIIntegration();

export function activate(context: vscode.ExtensionContext) {
  let ariaDisposable = vscode.commands.registerCommand('viewAriaSuggestions.view', async () => {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      return;
    }

    const selection = editor.selection;
    const selectedHtml = editor.document.getText(selection);

    if (!selectedHtml) {
      vscode.window.showInformationMessage('No HTML selected');
      return;
    }

    const ariaSuggestions = await analyzeHtmlForAria(selectedHtml);
    if (ariaSuggestions.length > 0) {
      showSuggestionsInWebViewPanel(ariaSuggestions, selection, editor.document.uri);

    } else {
      vscode.window.showInformationMessage('No ARIA suggestions');
    }
  });

  context.subscriptions.push(
    vscode.commands.registerCommand('commentThis.tsdoc', async () => {
      await addComments('tsdoc');
    }),

    vscode.commands.registerCommand('commentThis.general', async () => {
      await addComments('general');
    })
  );


  context.subscriptions.push(ariaDisposable);
}

export function deactivate() { }

async function addComments(lang?: string) {
  const editor = vscode.window.activeTextEditor;
    if (!editor) {
      return;
    }

    const selection = editor.selection;
    const selectedText = editor.document.getText(selection);

    if (!selectedText) {
      vscode.window.showInformationMessage('No Code Selected');
      return;
    }

    const instruction = getInstruction(lang);

    const updatedWithComments = await openAiService.addCommentsChat(instruction, selectedText);
    const edit = new vscode.WorkspaceEdit();
    edit.replace(editor.document.uri, selection, updatedWithComments);
    await vscode.workspace.applyEdit(edit);
}

async function analyzeHtmlForAria(html: string): Promise<string[]> {
  const suggestions = await openAiService.getAriaSuggestions(html);
  console.log(suggestions);
  return suggestions;
}

function showSuggestionsInWebViewPanel(suggestions: string[], selection: vscode.Selection, uri: vscode.Uri): void {
  const panel = vscode.window.createWebviewPanel(
    'suggestionDetails',
    'Suggestion Details',
    vscode.ViewColumn.One,
    {
      enableScripts: true,
    }
  );

  panel.webview.html = getWebViewContent(suggestions);

  panel.webview.onDidReceiveMessage(async message => {
    if (message.command === 'applySuggestion') {
      const edit = new vscode.WorkspaceEdit();
      edit.replace(uri, selection, message.suggestion);
      await vscode.workspace.applyEdit(edit);
      panel.dispose();
    }
  }, undefined);
}

function getWebViewContent(suggestions: string[]): string {

  const suggestionHtml = suggestions.map((suggestion, index) => {
    return  `
    <textarea style="width: 400px; height: auto">${suggestion}</textarea>
    <br>
    <button type="button" onclick="applySuggestion('${index}')">Apply Suggestion</button>`;
  });

 const html = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Suggestion Details</title>
            <script>
                const vscode = acquireVsCodeApi();
                const suggestions = ${JSON.stringify(suggestions)};
                function applySuggestion(suggestionIndex) {
                    vscode.postMessage({
                        command: 'applySuggestion',
                        suggestion: suggestions[suggestionIndex],
                    });
                }

                console.log(suggestions);

            </script>
        </head>
        <body>
            ${suggestionHtml.join('<hr>')}

        </body>
        </html>
    `;

  return html;
}
