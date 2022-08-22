export const helpData = [
	{
		key: 'bonus',
		page: 'Bonus',
		help: (
			<div id='bonusPageHelp'>
				<h6>Bonus</h6>
				<p>
					The bonus page displays all fights that give a <strong>Bonus Level</strong> for each world.
					<strong>Bonus Levels</strong> can reward:
					<ul>
						<li>Up to 2 rewards</li>
						<li>HP and MP increases</li>
						<li>Armor, Accessory, and Item slot increases</li>
						<li>Drive Gauge Increase</li>
					</ul>
					If you do not want to give a reward, be sure to set both rewards as <strong>EMPTY</strong>.
					On <strong>Critical Mode</strong>, only half of the HP and MP increase value is given upon level up.
					So if Abu Escort gives Sora 10 HP and 20 MP, on <strong>Critical Mode</strong> he will only get 5 HP and 10 MP.
					Additionally, each slot for a <strong>Bonus Level</strong> can be given to any character.
				</p>
				<h6>Edit Bonus Levels</h6>
				<p>
					Use the <strong>World Selector</strong> to select a world.
					Click the fight name to edit its <strong>Bonus Levels</strong>.
					Click <strong>EDIT BONUS!</strong> and choose values in the provided form.
					Click <strong>Confirm</strong> to apply your changes to the <strong>Bonus Levels</strong>.
					Click <strong>Vanilla</strong> to revert the <strong>Bonus Levels</strong> to its default state.
				</p>
				<h6>Warning</h6>
				<p>
					Only 2 individual rewards(actual reward or stat increase) can be given in a single <strong>Bonus Level</strong>.
					If more than 2 lines are drawn in the <strong>Bonus Level</strong>, the game will crash.
					Be mindful of handing out too many rewards in a <strong>Bonus Level</strong>.
				</p>
			</div>
		)
	},
	{
		key: 'cheat',
		page: 'Cheat',
		help: (
			<div id='cheatPageHelp'>
				<h6>Cheat</h6>
				<p>
					Select any number of cheats to apply to the game when generating the pncah file.
					If the cheat is toggled, then it will be included in the final file.
				</p>
			</div>
		)
	},
	{
		key: 'chest',
		page: 'Chest',
		help: (
			<div id='chestPageHelp'>
				<h6>Chest</h6>
				<p>
					The <strong>Chest Page</strong> includes details for every chest in the game.
					Use the <strong>World Selector</strong> to select a world.
					Each card represents a chest in that world, including a picture of the chest and the name of the room it's in.
					Click <strong>Select a Reward!</strong> to pick a replacement reward for that chest.
					Click <strong>Vanilla</strong> to revert the chest to its default reward.
				</p>
			</div>
		)
	},
	{
		key: 'equipment',
		page: 'Equipment',
		help: (
			<div id='equipmentPageHelp'>
				<h6>Equipment</h6>
				<p>
					The <strong>Equipment Page</strong> includes details for every equipment in the game.
					Use the <strong>Equipment Type Selector</strong> to select an equipment type.
					Each card represents a piece of equipment, including a picture of the equipment and its stats.
					Click <strong>EDIT</strong> to edit the stats of that equipment.
				</p>
				<h6>Ability</h6>
				<p>
					Click <strong>Select a Reward!</strong> to edit the ability of that equipment.
					Only keyblades and ally weapons will show the ability even though all other equipment will still apply their ability.
					Abilities do not count as a line being drawn to the screen as they do not show up when changing equipment.
				</p>
				<h6>Stats and Resistances</h6>
				<p>
					Strength, Magic, AP, and Defense can all be modified on equipment.
					Elemental resistances can also be modified on all equipment.
					There is a limit on the number of lines the menu can draw for equipment, so be mindful of how many edits are made.

					Physical, Light, and Universal resistances are all hidden stats and can be modified freely for all equipment without drawing lines to the screen.
					Strength, Magic, AP, and Defense stats as well as Fire, Blizzard, Thunder, and Dark resistances will draw a line to the screen.
					All resistances can go from -150% to 100% damage resistance so certain attacks can do extra damage to the wearer if they have a negative resistance.
				</p>
				<h6>Warning</h6>
				<p>
					Equipment have a limit of drawing 5 lines to the menu.
					While that doesn't cause many issues while equipped, trying to change the equipment can often times draw more lines then already shown.
					To prevent this, equipment types will turn red if they might draw too many lines.

					Armor already draws 5 lines (Defense, Fire, Blizzard, Thunder, and Dark Resistances).
					Modifying Strength, Magic, or AP on armor will turn the line red.

					All other equipment draw 3 lines to the screen.
					That means 1 extra line from the 4 resistances or Defense can be added as a stat.
					If only 1 piece of equipment has 2 extra lines it might be fine, however the tool assumes that anything over 1 additional line will crash the game.
					I recommend thoroughly testing your equipment if anything shows as a warning.
				</p>
			</div>
		)
	},
	{
		key: 'form',
		page: 'Forms & Summons',
		help: (
			<div id='formPageHelp'>
				<h6>Forms & Summons</h6>
				<p>
					The Form Page has all drive form levels separated by drive forms.
					Select the drive form to modify.
					Select the reward to receive upon reaching that drive level.
					Select the amount of EXP to reach the currently selected level from the level before.

					Summon modifications work the same way.
					However, summon rewards do not pop up on screen on level up.
					They will still be given to Sora.
				</p>
				<h6>EXP</h6>
				<p>
					EXP for form levels is how much EXP is required to reach that specific level from the previous level.
					For example, Valor Level 3 is reached by gaining 160 experience AFTER Valor Level 2.
					In other words, it takes a total of 240 EXP to reach Valor Level 3.
					Summon EXP works the same way.
				</p>
			</div>
		)
	},
	{
		key: 'level',
		page: 'Level',
		help: (
			<div id='levelPageHelp'>
				<h6>Level</h6>
				<p>
					The level page shows all of Sora's levels, his stats upon reaching that level, the exp required to reach them, and the rewards given based on dream weapon.
				</p>
				<h6>EXP and Stats</h6>
				<p>
					Levels do not measure increases in stats or EXP like bonus levels or forms do.
					Each level represents what Sora's status would look like at that sepcific level, ignoring any stat boosting items.
					For example, at level 18 on critical mode, Sora would have 68 AP, 12 Defense, 14 Magic, and 12 Strength.
					If all of those stats are set to 0 for level 18, then he will have 0 stats for that level.
					However, if level 19 is unmodified, Sora will return to what his level 19 status should be, which is 71 AP, 13 Defense, 14 Magic, and 12 Strength.
					This can lead to interesting results.
					Additonaly, AP entered is based on standard mode.
					The game does a specific calculation to give critical mode AP for each level.
					The calculation is Critical AP = ((Standard AP - 2) * 1.5) + your starting AP count, rounded down.
					Your starting AP can be chosen in the Starting Status Page.
					Experience also works in a similar way, measuring the TOTAL amount of experience to reach the next level.
					So while it takes 10618 TOTAL experience to reach level 19, only 1804 ADDITONAL EXP is required to level up after reaching level 18.

					The application only allows you to edit the stats Sora has at each level.
					However, the colored text next to each value represents the change in the stat between the previous level and currently selected level.
					Seeing a blue plus means the stat increases by that amount.
					A red minus means the stat decreases by that amount.
					The yellow value is the exact amount of experience to reach the next level from the currently selected level.
				</p>
				<h6>Edit All Levels</h6>
				<p>
					When editing all levels, you can choose to only edit 1 aspect of every level.
					This means you can edit only the Sword Reward for each level without touching any stats.
					You can also creat a simple level curve by applying the change in a pattern based on level count.
					For example, you can make every tenth level give you a combo plus only when choosing sword, and leave all other levels alone.
				</p>
			</div>
		)
	},
	{
		key: 'magic',
		page: 'Magic & Limits',
		help: (
			<div id='magicPageHelp'>
				<h6>Magic & Limits</h6>
				<p>
					The magic and limits page allows for customization of the mp cost of magic spells, party limits, and limit form limits.
					Click on <strong>EDIT</strong> for the ability you wish to modify to open the editing form.
					Change the cost for any specific abilities.
					Click <strong>EDIT</strong> to modify the value to what you have entered.
					Click <strong>Vanilla</strong> to return all costs to their default value.
				</p>
			</div>
		)
	},
	{
		key: 'popup',
		page: 'Popup',
		help: (
			<div id='popupPageHelp'>
				<h6>Popup</h6>
				<p>
					The <strong>Popup Page</strong> includes details for every popup in the game.
					Use the <strong>World Selector</strong> to select a world.
					Each card represents a popup in that world, including a picture of the popup and the name of the room it's in.
					Click <strong>Select a Reward!</strong> to pick a replacement reward for that popup.
					Click <strong>Vanilla</strong> to revert the popup to its default reward.
				</p>
				<h6>Warning</h6>
				<p>
					If a popup reward is an ability, there is a chance the reward won't actually be given to Sora.
					Be mindful of rewarding abilities in popups.
				</p>
			</div>
		)
	},
	{
		key: 'startingStatus',
		page: 'Starting Status',
		help: (
			<div id='startingPageHelp'>
				<h6>Starting Status</h6>
				<p>
					Sora, Donald, and Goofy can all have their starting equipment modified.
					Select the desired character and then replace each reward with whatever you choose.
					Each character can have up to 32 different starting items.
					For in game purposes, Base Sora and Critical Mode Sora count as 2 separate characters.
					Additionally, each characters starting hp, mp, ap, armor slots, accessory slots, and item slots can be customized.
				</p>
			</div>
		)
	}
]