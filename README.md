# obsidian-tab-discriminator
### Summary
A plugin for Obsidian to change tab names to include part of the file path to help distinguish files of the same name at a glance. Tab titles are prefixed with the name of a folder in the path to that file (with a configurable depth)

With:
![image](https://github.com/incarnadined/obsidian-tab-discriminator/assets/51889539/bc4b65c9-1943-43bb-a57b-81a0be6d43c3)

Without:
![image](https://github.com/incarnadined/obsidian-tab-discriminator/assets/51889539/327e463a-4758-4b77-8224-5329b30851d3)

### Settings
The plugin has two settings:
- `Active file prefix` - used to specify the prefix required for a tab to be renamed e.g. by specifying "Supervision", only files begininning with that phrase have their title modified
- `Discriminator relationship` - changes how many generations to go back to find the folder name used in the title e.g. setting to 1 would use the parent folder name of the file
![image](https://github.com/incarnadined/obsidian-tab-discriminator/assets/51889539/bfd04d73-0956-4c39-b8fd-d3ebdb565636)


### Aliasing
For folder names that are too long to be displayed in the tab, causing an overrun and the actual file name to be hidden, you can specify an alias for that folder name. 

Currently, this is implemented with `if` statements as I haven't had time to make it an easily configurable setting yet, so to modify these you will need to edit the code.
