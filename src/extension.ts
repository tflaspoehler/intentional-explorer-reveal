import * as vscode from 'vscode';

const CLOSE_COMMANDS = [
  'workbench.action.closeAllEditors',
  'workbench.action.closeEditorsInGroup',
  'workbench.action.closeOtherEditors',
  'workbench.action.closeEditorsToTheRight',
  'workbench.action.closeActiveEditor',
] as const;

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand(
      'intentionalExplorerReveal.closeAllEditors',
      () => closeWithoutReveal('workbench.action.closeAllEditors'),
    ),
    vscode.commands.registerCommand(
      'intentionalExplorerReveal.closeEditorsInGroup',
      () => closeWithoutReveal('workbench.action.closeEditorsInGroup'),
    ),
    vscode.commands.registerCommand(
      'intentionalExplorerReveal.closeOtherEditors',
      () => closeWithoutReveal('workbench.action.closeOtherEditors'),
    ),
    vscode.commands.registerCommand(
      'intentionalExplorerReveal.closeEditorsToTheRight',
      () => closeWithoutReveal('workbench.action.closeEditorsToTheRight'),
    ),
    vscode.commands.registerCommand(
      'intentionalExplorerReveal.closeActiveEditor',
      () => closeWithoutReveal('workbench.action.closeActiveEditor'),
    ),
  );
}

async function closeWithoutReveal(command: (typeof CLOSE_COMMANDS)[number]) {
  const config = vscode.workspace.getConfiguration('explorer');
  const inspected = config.inspect<boolean | string>('autoReveal');

  // Workspace scope overrides the user value for this window only, then is removed.
  await config.update('autoReveal', false, vscode.ConfigurationTarget.Workspace);
  try {
    await vscode.commands.executeCommand(command);
    // Let the Explorer handle the active-editor change while reveal is off.
    await new Promise((resolve) => setTimeout(resolve, 50));
  } finally {
    await config.update(
      'autoReveal',
      inspected?.workspaceValue,
      vscode.ConfigurationTarget.Workspace,
    );
  }
}

export function deactivate() {}