export const helpData = [
	{
		key: 'bonus',
		page: 'Bonus',
		help: (
			<div id='bonusPageHelp'>
				<h6>Bonus</h6>
				<p>
					The bonus page displays all bonus level rewards for each world and for each character.
					Bonus levels can reward up to 2 rewards, stat increases, or slot increases.
					However only 2 individual rewards can be given to the player without causing any bugs.
					Additionally, the character a bonus is given to can be modified.
				</p>
				<h6>Characters</h6>
				<p>
					A fight that gives a bonus reward can give up to 4 rewards to the characters in the party.
					The person who receives a reward can be modified.
					This means that in a fight like Abu Escort, Sora can obtain up to 4 bonus levels each with different rewards.
					Keep in mind, each character has an in game cap to their bonus level.
					If a character earns too many bonus levels, the game will not be happy.
				</p>
				<h6>Rewards</h6>
				<p>
					A bonus level can give 2 rewards.
					The rewards can be of any type.
					Selecting empty for either reward will result in no reward being given.
				</p>
				<h6>Stats and Slots</h6>
				<p>
					HP and MP can both increase on a bonus level.
					The increases are based on standard mode.
					Critical mode takes the stat values from standard mode and halves them.
					So a standard mode HP increase of 10 will be 5 in critical mode.
					Same applies for MP.
					Slots do not have this half applied.
					They can all increase by whatever value entered but the menu does not like having too many slots. (I believe the cap is 20 total slots)
					The drive gauge is also capped at 9 no matter how many increases given.
				</p>
				<h6>Why Am I Red?</h6>
				<p>
					Bonus levels only visually show 2 rewards.
					If more than 2 rewards are given, the bonus level may either secretly give the reward to the player or not give it to them at all.
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
					Click toggle include/exclude each cheat in the final file.
				</p>
				<h6>Why Am I Red?</h6>
				<p>
					Cheats are either included or not.
					They cannot be red.
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
					Chests are seperated by the in game world they appear in.
					After selecting a specific world, select what reward you wish to replace with.
					When clicking replace, all checked rows will be replaced with whatever reward is in the reward selector.
			</p>
				<h6>Why Am I Red?</h6>
				<p>
					Chests can contain anything so they will never show up as red.
			</p>
			</div>
		)
	},
	{
		key: 'critical',
		page: 'Critical Extra',
		help: (
			<div id='criticalPageHelp'>
				<h6>Critical Extra</h6>
				<p>
					The seven extra critical mode abilities can each be changed to give anything else.
					Keep in mind these rewards are only provided in critical mode.
				</p>
				<h6>Why Am I Red?</h6>
				<p>
					Critical mode extras can be anything so they will never show up as red.
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
					The equipment page displays all equipment of the specified category in the equipment type selector.
					Equipment have many unique aspects that can be modified.
				</p>
				<h6>Ability</h6>
				<p>
					An equipment ability can be modified using the reward selector.
					Only abilities truly function as expected but just about everything should work visually with no gameplay changes.
					Only keyblades and ally weapons will show the ability even though all other equipment will still apply their ability.
					Abilities do not count as a line being drawn to the screen as they do not show up when changing equipment.
				</p>
				<h6>Stats and Resistances</h6>
				<p>
					Strength, Magic, AP, and Defense can all be modified on equipment.
					Because of how many lines can be drawn on screen in the menu, certain types of equipment will cause crashes if too many things are modified.
					
					Resistances can also be modified on all equipment.
					Physical, Light, and Universal resistances are all hidden stats and can be modified freely for all equipment without drawing lines to the screen.
					Fire, Blizzard, Thunder, and Dark resistances will draw to the screen
					All resistances can go from -150% to 100% damage resistance so certain attacks can do extra damage to the wearer if he has a negative resistance.
				</p>
				<h6>Why Am I Red?</h6>
				<p>
					Equipment have a limit of drawing 5 lines to the menu.
					While that doesn't cause many issues while equipped, trying to change the equipment can often times draw more lines then already shown.
					To prevent this, equipment types will turn red if they might draw too many lines.
					
					Armor already draws 5 lines (Defense, Fire, Blizzard, Thunder, and Dark Resistances).
					Modifying Strength, Magic, or AP on armor will turn the line red.
					
					All other equipment draws 3 lines to the screen.
					That means 1 extra line from the 4 resistances or Defense can be added as a stat.
					There are technicalities where if only 1 piece of equipment has 2 extra lines it might be fine, however the tool assumes that anything over 1 additional line will crash the game.
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
					The form page has all drive form levels separated by drive forms.
					Select the drive form to modify from the drive form selector.
					Select the reward to replace with from the reward selector.
					Then select the EXP to replace with.
					The EXP multiplier can modify EXP relative to what the EXP is in the vanilla game.
					If vanilla EXP is 100, and a x2 multiplier is selected, the level will be replaced with 50 EXP.
					The custom EXP value is only read when the custom EXP multiplier value is selected.
					It will replace the selected level with whatever custom EXP is provided.
					
					Summon modifications work the same way.
					However summon rewards do not pop up on screen on level up.
					They will show up in menus though.
				</p>
				<h6>EXP</h6>
				<p>
					EXP for form levels is how much EXP is required to reach that specific level from the previous level.
					For example, Valor Level 3 is reached by gaining 160 experience AFTER Valor Level 2.
					In other words, it takes a total of 240 EXP to reach Valor Level 3.
					Summon EXP works the same way.
				</p>
				<h6>Why Am I Red?</h6>
				<p>
					Form levels will not turn red.
					Their rewards can be anything and custom EXP is capped by the application between 0 and 99999999.
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
					The level page shows all of sora's levels, the exp required to reach them, and the rewards given based on dream weapon.
					From left to right, sword, shield, and staff rewards can all be individually selected for each level.
				</p>
				<h6>EXP and Stats</h6>
				<p>
					Levels do not measure increases in stats or EXP like bonus levels or forms do.
					Each row represents what Sora's status would look like at that sepcific level.
					For example, at level 18 on critical mode, Sora would have 68 AP, 12 Defense, 14 Magic, and 12 Strength.
					If all of those stats are set to 0 for level 18, then he will have 0 stats for that level.
					However, if level 19 is unmodified, Sora will return to what his level 19 status should be, which is 71 AP, 13 Defense, 14 Magic, and 12 Strength.
					This can lead to interesting results.
					Additonaly, AP entered is based on standard mode.
					The game does a specific calculation to give critical mode AP for each level.
					The calculation is equivalent to Critical AP = ((Standard AP - 2) * 1.5) + 50 rounded down.
					Experience also works in a similar way measuring the TOTAL amount of experience to reach the next level.
					So while it takes 10618 TOTAL experience to reach level 19, only 1804 ADDITONAL EXP is required to level up after reaching level 18.
				</p>
				<h6>Why Am I Red?</h6>
				<p>
					Levels shouldn't turn red, just make sure everything is being submitted as expected.
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
					Select all abilities to change, select the desired cost, and click replace.
					Clicking vanilla will return all selected abilities to their vanilla costs.
				</p>
				<h6>Why Am I Red?</h6>
				<p>
					Magic abilities can either have their cost changed or remain the same.
					They cannot be red.
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
					Popups are seperated by the in game world they appear in.
					After selecting a specific world, select what reward you wish to replace with.
					When clicking replace, all checked rows will be replaced with whatever reward is in the reward selector.
				</p>
				<h6>Why Am I Red?</h6>
				<p>
					That specific popup is trying to reward the player with an ability.
					Abilities do not always end up being given to the player so it would effectively be an empty reward.
					The ability will still show up in the popup for the player though.
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
					Select a starting equipment from the dropdowns for keyblade, armor, and accessory.
					There is no starting armor or accessory in the vanilla game so their default is just EMPTY.
					Select the values for Munny, HP, and MP.
					Defaults are 0, 20, and 100.
					Select Apply to use the inputted starting status.
					Select Vanilla to not change any starting status.
				</p>
				<h6>Why Am I Red?</h6>
				<p>
					Starting status is either changed or left Vanilla.
					Nothing can be red.
				</p>
			</div>
		)
	}
]