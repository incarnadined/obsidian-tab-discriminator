import { App, Editor, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting, View } from 'obsidian';

// Remember to rename these classes and interfaces!

interface MyPluginSettings {
	mySetting: string;
}

const DEFAULT_SETTINGS: MyPluginSettings = {
	mySetting: 'default'
}

function updateTitles(settings: unknown) {
	return () => {
		app.workspace.iterateAllLeaves(leaf => {
			let vs = leaf.getViewState()

			
			if (vs.state.file == null)
				return;

			let path = vs.state.file.split("/");
			let filename = path[path.length - 1];

			if (vs.type == "markdown")
				filename = filename.split(".")[0];

			if (!filename.startsWith(settings.prefix)) {
				leaf.tabHeaderInnerTitleEl.setText(filename);
				return;
			}

			let discriminator = path[path.length - settings.generations - 1];
			if (discriminator != undefined) {
				if (discriminator.startsWith("Programming in C"))
					discriminator = "C(++)";
				if (discriminator.startsWith("Introduction to Computer"))
					discriminator = "CompArch";
				if (discriminator.startsWith("Economics, Law, and Ethics"))
					discriminator = "ELE";
				if (discriminator.startsWith("Concurrent and Distributed Systems"))
					discriminator = "ConDisSys";
				if (discriminator.startsWith("Semantics of Programming Languages"))
					discriminator = "Semantics";
				
			}
			leaf.tabHeaderInnerTitleEl.setText(discriminator + "/" + filename);
		});
	};
}


export default class MyPlugin extends Plugin {
	settings: MyPluginSettings;

	async onload() {
		await this.loadSettings();

		this.registerEvent(
			this.app.workspace.on('file-open', updateTitles(this.settings)) 
			/*this.app.workspace.on('file-open', (file: TFile) => {
				app.workspace.iterateAllLeaves(leaf => {
					let vs = leaf.getViewState()

					if (vs.state.file == null)
						return;

					let path = vs.state.file.split("/");
					let filename = path[path.length - 1];

					if (!filename.startsWith(this.settings.prefix))
						return;

					if (vs.type == "markdown")
						filename = filename.split(".")[0];
					leaf.tabHeaderInnerTitleEl.setText(path[path.length - this.settings.generations - 1] + "/" + filename);
				})
			})*/
		);
		
		
		this.addSettingTab(new SampleSettingTab(this.app, this));

	}

	onunload() {

	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}

class SampleSettingTab extends PluginSettingTab {
	plugin: MyPlugin;

	constructor(app: App, plugin: MyPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const {containerEl} = this;

		containerEl.empty();

		new Setting(containerEl)
			.setName('Active file prefix')
			.setDesc('The prefix for files that should have their titles modified')
			.addText(text => text
				.setPlaceholder('Supervision')
				.setValue(this.plugin.settings.prefix)
				.onChange(async (value) => {
					this.plugin.settings.prefix = value;
					updateTitles(this.plugin.settings)();
					await this.plugin.saveSettings();
		}));
		new Setting(containerEl)
			.setName('Disriminator relationship')
			.setDesc('The number of generations to go back to get the discriminator')
			.addText(text => text
				.setPlaceholder('2')
				.setValue(this.plugin.settings.generations)
				.onChange(async (value) => {
					this.plugin.settings.generations = value;
					updateTitles(this.plugin.settings)();
					await this.plugin.saveSettings();
				}));
	}
}
