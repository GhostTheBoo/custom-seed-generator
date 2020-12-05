# Custom Seed Generator

This tool is used with the Garden of Assemblage mod to customize specific rewards and aspects of Kingdom Hearts 2 Final Mix.
It will create a custom pnach file that can be put in the cheat folder of PCSX2 alongside the GoA mod pnach, applying all of the customizations to the game.
This will let you make a planned out instance of a randomized seed (or a plando for short).

## How To Use

Each page has its own rules for how to customize and change rewards and equipment.
Checking rows and clicking replace will modify that reward in game.
Clicking vanilla instead will have the reward be exactly how it is in the regular game.
Anything that will end up being replaced in the game will be shown as a green row.
Anything that may cause crashes or issues in game will be shown as a red row.
Red rows will still be generated to use as described but use at your own risk.
After all rewards are modified to your liking, the save button will download a pnach file ready to be used.

## Pages

### Chest

Chests are seperated by the in game world they appear in.
After selecting a specific world, select what reward you wish to replace with.
When clicking replace, all checked rows will be replaced with whatever reward is in the reward selector.

#### Why am I red?

Chests can contain anything so they will never show up as red.

### Popup

Popups are seperated by the in game world they appear in.
After selecting a specific world, select what reward you wish to replace with.
When clicking replace, all checked rows will be replaced with whatever reward is in the reward selector.

#### Why am I red?

That specific popup is trying to reward the player with an ability.
Abilities do not always end up being given to the player so it would effectively be an empty reward.
The ability will still show up in the popup for the player though.


### Form

The form page has all drive form levels separated by drive forms.
Select the drive form to modify from the drive form selector.
Select the reward to replace with from the reward selector.
Then select the EXP to replace with.
The EXP multiplier can modify EXP relative to what the EXP is in the vanilla game.
If vanilla EXP is 100, and a x2 multiplier is selected, the level will be replaced with 50 EXP.
The custom EXP value is only read when the custom EXP multiplier value is selected.
It will replace the selected level with whatever custom EXP is provided.

#### Form EXP

EXP for form levels is how much EXP is required to reach that specific level from the previous level.
For example, Valor Level 3 is reached by gaining 160 experience AFTER Valor Level 2.
In other words, it takes a total of 240 EXP to reach Valor Level 3.

#### Why am I red?

Form levels will not turn red.
Their rewards can be anything and custom EXP is capped by the application between 0 and 99999999.

### Equipment

The equipment page displays all equipment of the specified category in the equipment type selector.
Equipment have many unique aspects that can be modified.

#### Ability

An equipment ability can be modified using the reward selector.
Only abilities truly function as expected but just about everything should work visually with no gameplay changes.
Only keyblades and ally weapons will show the ability even though all other equipment will still apply their ability.
Abilities do not count as a line being drawn to the screen as they do not show up when changing equipment.

#### Stats and Resistances

Strength, Magic, AP, and Defense can all be modified on equipment.
Because of how many lines can be drawn on screen in the menu, certain types of equipment will cause crashes if too many things are modified.

Resistances can also be modified on all equipment.
Physical, Light, and Universal resistances are all hidden stats and can be modified freely for all equipment without drawing lines to the screen.
Fire, Blizzard, Thunder, and Dark resistances will draw to the screen
All resistances can go from -150% to 100% damage resistance so certain attacks can do extra damage to the wearer if he has a negative resistance.

#### Why am I red?

Equipment have a limit of drawing 5 lines to the menu.
While that doesn't cause many issues while equipped, trying to change the equipment can often times draw more lines then already shown.
To prevent this, equipment types will turn red if they might draw too many lines.

Armor already draws 5 lines (Defense, Fire, Blizzard, Thunder, and Dark Resistances).
Modifying Strength, Magic, or AP on armor will turn the line red.

All other equipment draws 3 lines to the screen.
That means 1 extra line from the 4 resistances or Defense can be added as a stat.
There are technicalities where if only 1 piece of equipment has 2 extra lines it might be fine, however the tool assumes that anything over 1 additional line will crash the game.

### Bonus

The bonus page displays all bonus level rewards for each world and for each character.
Bonus levels can rewward up to 2 rewards, stat increases, or slot increases.
However only 2 individual rewards can be given to the player without causing any bugs.

#### Rewards

A bonus level can give 2 rewards.
The rewards can be of any type.
Selecting empty for either reward will result in no reward being given.

#### Stats and Slots

HP and MP can both increase on a bonus level.
The increases are based on standard mode.
Critical mode takes the stat values from standard mode and halves them.
So a standard mode HP increase of 10 will be 5 in critical mode.
Same applies for MP.
Slots do not have this half applied.
They can all increase by whatever value entered but the menu does not like having too many slots. (I believe the cap is 20 total slots)
The drive gauge is also capped at 9 no matter how many increases given.

#### Why am I red?

Bonus levels only visually show 2 rewards.
If more than 2 rewards are given, the bonus level may either secretly give the reward to the player or not give it to them at all.

### Level

The level page shows all of sora's levels, the exp required to reach them, and the rewards given based on dream weapon.
From left to right, sword, shield, and staff rewards can all be individually selected for each level.

#### EXP and Stats

Levels do not measure increases in stats or EXP like bonus levels or forms do.
Each row represents what Sora's status would look like at that sepcific level.
For example, at level 18 on critical mode, Sora would have 68 AP, 12 Defense, 14 Magic, and 12 Strength.
If all of those stats are set to 0 for level 18, then he will have 0 stats for that level.
However, if level 19 is unmodified, Sora will return to whatever his level 19 status should be.
This can lead to interesting results.
Additonaly, AP entered is based on standard mode.
The game does a specific calculation to give critical mode AP for each level.
The calculation is equivalent to Critical AP = ((Standard AP - 2) * 1.5) + 50 rounded down.
Experience also works in a similar way measuring the TOTAL amount of experience to reach the next level.
So while it takes 10618 TOTAL experience to reach level 19, only 1804 ADDITONAL EXP is required to level up after reaching level 18.

#### Why am I red?

Levels shouldn't turn red, just make sure everything is being submitted as expected.

### Critical Extra

The seven extra critical mode abilities can each be changed to give anything else.
Keep in mind these rewards are only provided in critical mode.

#### Why am I red?

Critical mode extras can be anything so they will never show up as red.

### Cheat

Select any number of cheats to apply to the game when generating the pncah file.
Click toggle include/exclude each cheat in the final file.

#### Why am I red?

Cheats are either included or not.
They cannot be red.

## Things to be Implemented

#### Save & Load Feature

After some bug fixing, I will come up with a glue and duct tape way of saving the current progress of the plando and loading it back in.
For now, save often and copy/paste the files together when finished.

#### General Requests

Is there a crucial element missing?
Let me know and I'll do my best to implement it or see any limitations.