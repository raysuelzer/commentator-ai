import * as vscode from 'vscode';
import { OpenAIIntegration } from './ai-integration';
import { getInstruction } from './instructions';

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand('commentatorAI.tsdoc', async () => {
      await addComments('tsdoc');
    }),

    vscode.commands.registerCommand('commentatorAI.rdoc', async () => {
      await addComments('rdoc');
    }),

    vscode.commands.registerCommand('commentatorAI.general', async () => {
      await addComments('general');
    }),

    vscode.commands.registerCommand('commentatorAI.custom', async () => {
      await addComments('custom');
    })
  );

}

export function deactivate() { }

async function addComments(lang?: string) {
  const openAiKey = vscode.workspace.getConfiguration('commentatorAI').get<string>('openAIKey', '');

  if (!openAiKey) {
    vscode.window.showErrorMessage('OpenAI API Key not set. Please set the key in the settings.');
    return;
  }

  const openAiService = new OpenAIIntegration(openAiKey);

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

  const config = vscode.workspace.getConfiguration('commentatorAI');
  const formatAfterEdit = config.get<boolean>('formatAfterEdit', true);

  await vscode.window.withProgress(
    {
      location: vscode.ProgressLocation.Notification,
      title: 'Getting comments... Do not unselect the code.',
      cancellable: false,
    },
    async (progress) => {
      const updatedWithComments = await openAiService.addCommentsChat(instruction, selectedText);
      const edit = new vscode.WorkspaceEdit();
      edit.replace(editor.document.uri, selection, updatedWithComments);
      await vscode.workspace.applyEdit(edit);
      if (formatAfterEdit) {
        await vscode.commands.executeCommand('editor.action.formatDocument');
      }
    }
  );
}
