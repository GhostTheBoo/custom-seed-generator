import React from 'react'

export const helpData = [
	{
		key: 'chest',
		page: 'Chest Page',
		help: (
			<div id='chestPageHelp'>
				<div>
					The <strong>Chest Page</strong> includes details for every chest in the game.
					Use the <strong>World Selector</strong> to select a world.
					Each card represents a chest in that world, including a picture of the chest and the name of the room it's in.
					<hr />
					<div>
						<div>
							<img
								className='editIcon btn btn-primary'
								src='./images/extra/edit.svg'
								alt='edit'
								width='100%'
								height='auto'
							/> Pick a replacement reward for that chest.
						</div>
						<hr />
						<div>
							<img
								className='editIcon btn btn-secondary'
								src='./images/extra/undo.svg'
								alt='edit'
								width='100%'
								height='auto'
							/> Revert the chest to its default reward.
						</div>
						<hr />
						<div>
							<img
								className='editIcon btn btn-dark'
								src='./images/extra/trash.svg'
								alt='edit'
								width='100%'
								height='auto'
							/> Mark the chest as <strong>EMPTY</strong>.
						</div>
						<hr />
						<div>
							<img
								className='editIcon btn btn-dark'
								src='./images/extra/fill.svg'
								alt='edit'
								width='100%'
								height='auto'
							/> Fill all <strong>EMPTY</strong> chests on the current page.
						</div>
						<hr />
						All chests left <strong>EMPTY</strong> will be replaced with Decoy Presents to avoid crashes.
					</div>
				</div>
			</div>
		)
	},
	{
		key: 'popup',
		page: 'Popup Page',
		help: (
			<div id='popupPageHelp'>
				<div>
					The <strong>Popup Page</strong> includes details for every popup in the game.
					Use the <strong>World Selector</strong> to select a world.
					Each card represents a popup in that world, including a picture of the cutscene and the name of the cutscene before receiving the popup.
				</div>
				<hr />
				<div>
					<div>
						<img
							className='editIcon btn btn-primary'
							src='./images/extra/edit.svg'
							alt='edit'
							width='100%'
							height='auto'
						/> Pick a replacement reward for that popup.
					</div>
					<hr />
					<div>
						<img
							className='editIcon btn btn-secondary'
							src='./images/extra/undo.svg'
							alt='edit'
							width='100%'
							height='auto'
						/> Revert the popup to its default reward.
					</div>
					<hr />
					<div>
						<img
							className='editIcon btn btn-dark'
							src='./images/extra/trash.svg'
							alt='edit'
							width='100%'
							height='auto'
						/> Mark the popup as <strong>EMPTY</strong>.
					</div>
					<hr />
					<div>
						<img
							className='editIcon btn btn-dark'
							src='./images/extra/fill.svg'
							alt='edit'
							width='100%'
							height='auto'
						/> Fill all <strong>EMPTY</strong> popups on the current page.
					</div>
					<hr />
					All popups left <strong>EMPTY</strong> will be replaced with Decoy Presents to avoid crashes.
				</div>
				<hr />
				<h5>Warning</h5>
				<p>
					If a popup reward is an ability, there is a chance the reward won't actually be given to Sora.
					Be mindful of rewarding abilities in popups.
				</p>
			</div>
		)
	},
	{
		key: 'bonus',
		page: 'Bonus Page',
		help: (
			<div id='bonusPageHelp'>
				<div>
					The bonus page displays all fights that give a <strong>Bonus Level</strong> for each world.
					<strong>Bonus Levels</strong> can reward:
					<ul>
						<li>Up to 2 rewards</li>
						<li>HP and MP increases</li>
						<li>Armor, Accessory, or Item slot increases</li>
						<li>Drive Gauge increases</li>
					</ul>
					If you do not want to give a reward, be sure to set both rewards as <strong>EMPTY</strong>.
					On <strong>Critical Mode</strong>, only half of the HP and MP increase value is given upon level up.
					So if Abu Escort gives Sora 10 HP and 20 MP, on <strong>Critical Mode</strong> he will only get 5 HP and 10 MP.
					Additionally, each slot for a <strong>Bonus Level</strong> can be given to any character.
				</div>
				<h5>Edit Bonus Levels</h5>
				<p>
					Use the <strong>World Selector</strong> to select a world.
					Click the fight name to edit its <strong>Bonus Levels</strong>.
					Click <strong>EDIT BONUS!</strong> and choose values in the provided form.
					Click <strong>Confirm</strong> to apply your changes to the <strong>Bonus Levels</strong>.
					Click <strong>Vanilla</strong> to revert the <strong>Bonus Levels</strong> to its default state.
				</p>
				<h5>Warning</h5>
				<p>
					Only 2 individual rewards(actual reward or stat increase) can be given in a single <strong>Bonus Level</strong>.
					If more than 2 lines are drawn in the <strong>Bonus Level</strong>, the game will crash.
					Be mindful of handing out too many rewards in a <strong>Bonus Level</strong>.
				</p>
			</div>
		)
	},
	{
		key: 'form',
		page: 'Forms & Summons Page',
		help: (
			<div id='formPageHelp'>
				<p>
					The Form Page has all drive form levels separated by drive forms.
					Select the drive form to modify.
					Select the reward to receive upon reaching that drive level.
					Select the amount of EXP to reach the currently selected level from the level before.

					Summon modifications work the same way.
					However, summon rewards do not pop up on screen on level up.
					They will still be given to Sora.
				</p>
				<h5>EXP</h5>
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
		key: 'equipment',
		page: 'Equipment Page',
		help: (
			<div id='equipmentPageHelp'>
				<p>
					The <strong>Equipment Page</strong> includes details for every equipment in the game.
					Use the <strong>Equipment Type Selector</strong> to select an equipment type.
					Each card represents a piece of equipment and displays it's stats.
				</p>
				<div>
					<img
						className='editIcon btn btn-primary'
						src='./images/extra/edit.svg'
						alt='edit'
						width='100%'
						height='auto'
					/> Edit the stats of that equipment.
				</div>
				<hr />
				<h5>Ability</h5>
				<p>
					Click the ability name to edit the ability of that equipment.
					Only keyblades and ally weapons will show the ability even though all other equipment will still apply their ability.
					Abilities do not count as a line being drawn to the screen as they do not show up when changing equipment.
				</p>
				<h5>Stats and Resistances</h5>
				<p>
					Strength, Magic, AP, and Defense can all be modified on equipment.
					Elemental resistances can also be modified on all equipment.

					Physical, Light, and Universal resistances are all hidden stats and can be modified freely for all equipment without drawing lines to the screen.
					Strength, Magic, AP, and Defense stats as well as Fire, Blizzard, Thunder, and Dark resistances will draw a line to the screen.
					All resistances can go from -150% to 100% damage resistance so certain attacks can do extra damage to the wearer if they have a negative resistance.
				</p>
				<h5>Warning</h5>
				<p>
					Equipment have a limit of drawing 5 lines to the menu.
					While that doesn't cause many issues while equipped, trying to change the equipment can often times draw more lines then already shown.

					Armor already draws 5 lines (Defense, Fire, Blizzard, Thunder, and Dark Resistances).
					Modifying Strength, Magic, or AP on armor will display a warning.

					All other equipment draw 3 lines to the screen by default.
					That means 1 extra line from the 4 resistances or Defense can be added as a stat.
					If only 1 piece of equipment has 2 extra lines it might be fine, however the tool assumes that anything over 1 additional line will crash the game.
				</p>
				<p><strong>I recommend thoroughly testing your equipment if anything shows as a warning!</strong></p>
			</div>
		)
	},
	{
		key: 'level',
		page: 'Level Page',
		help: (
			<div id='levelPageHelp'>
				<p>
					The level page shows all of Sora's levels, his stats upon reaching that level, the exp required to reach them, and the rewards given based on dream weapon.
				</p>
				<h5>EXP and Stats</h5>
				<div>
					The application allows Level EXP to be edited the same way as Form EXP.
					The EXP for each level represents the EXP required to go from the previous level to the current level.
					For example, it takes 60 EXP to level up from Level 2 to Level 3.
					You would then have a total of 100 EXP upon reaching Level 3.
					<hr />
					The stats for each level represents what Sora's status would look like at that sepcific level, ignoring any stat boosting items.
					For example, at level 18 on critical mode, Sora would have 68 AP, 12 Defense, 14 Magic, and 12 Strength.
					If all of those stats are set to 0 for level 18, then he will have 0 in each stat for that level.
					However, if level 19 is left vanilla, Sora will return to what his level 19 status should be, which is 71 AP, 13 Defense, 14 Magic, and 12 Strength.
					This can lead to interesting results.
					<hr />
					Additonaly, AP entered is based on standard mode.
					The game does a specific calculation to give critical mode AP for each level.
					The calculation is Critical AP = ((Standard AP - 2) * 1.5) + your starting AP count, rounded down.
					Your starting AP can be chosen in the Starting Status Page.
					<hr />
					The application only allows you to edit the stats Sora has at each level.
					The incresae/decrease of each stat is also represented in blue/red next to the level stat.
				</div>
				<hr />
				<h5>Edit All Levels</h5>
				<p>
					When editing all levels, you can choose to individually edit 1 aspect of every level.
					This means you can edit only the Sword Reward for each level without touching any stats.
					You can either select individual levels to apply changes to or select <strong>All</strong> in the dropdown to change every level at once.
					You can also view all level stats as a curve to monitor stat changes throughout the game.
				</p>
			</div>
		)
	},
	{
		key: 'cost',
		page: 'Ability Costs Page',
		help: (
			<div id='costPageHelp'>
				<div>
					The ability cost page allows for customization of the mp cost of magic spells, party limits, and limit form limits.
					Click on the cost value to start editing the cost for that ability.
					<hr />
					<div>
						<img
							className='editIcon btn btn-secondary'
							src='./images/extra/undo.svg'
							alt='edit'
							width='100%'
							height='auto'
						/> Revert the ability cost to its default value.
					</div>
				</div>
			</div>
		)
	},
	{
		key: 'startingStatus',
		page: 'Starting Status Page',
		help: (
			<div id='startingPageHelp'>
				<p>
					Sora, Donald, and Goofy can all have their starting equipment modified.
					Select the desired character and then replace each reward with whatever you choose.
					Each character can have up to 32 different starting items.
					For in game purposes, Base Sora and Critical Mode Sora count as 2 separate characters.
					Additionally, each characters starting hp, mp, ap, armor slots, accessory slots, and item slots can be customized.
				</p>
			</div>
		)
	},
	{
		key: 'cheat',
		page: 'Cheat Page',
		help: (
			<div id='cheatPageHelp'>
				<p>
					Select any number of cheats to apply to the game when generating the seed.
					All toggled cheats will be included in the final export.
					Zip seeds currently do not support cheats.
				</p>
			</div>
		)
	}
]