import { Reward } from './rewardsData'

export class Equipment {
	constructor(name, vanilla, strength, magic, ap, defense, fire, blizzard, thunder, dark, physical, light, universal, abilityAddress, statAddress, eResistAddress, oResistAddress) {
		this.name = name
		this.vanillaAbility = vanilla
		this.replacementAbility = vanilla
		this.strength = strength
		this.vanillaStrength = strength
		this.magic = magic
		this.vanillaMagic = magic
		this.ap = ap
		this.vanillaAP = ap
		this.defense = defense
		this.vanillaDefense = defense
		this.fireResistance = fire
		this.vanillaFireResistance = fire
		this.blizzardResistance = blizzard
		this.vanillaBlizzardResistance = blizzard
		this.thunderResistance = thunder
		this.vanillaThunderResistance = thunder
		this.darkResistance = dark
		this.vanillaDarkResistance = dark
		this.physicalResistance = physical
		this.vanillaPhysicalResistance = physical
		this.lightResistance = light
		this.vanillaLightResistance = light
		this.universalResistance = universal
		this.vanillaUniversalResistance = universal
		this.abilityAddress = abilityAddress
		this.statAddress = statAddress
		this.elementalResistanceAddress = eResistAddress
		this.otherResistanceAddress = oResistAddress
		this.toBeReplaced = false
		this.additionalLineCount = 0
		this.isAbilityReplaced = false
		this.isStatsReplaced = false
		this.isElementalResistanceChanged = false
		this.isOtherResistanceChanged = false
	}
}

export const equipmentsData = [{
	equipmentType: 'Keyblade',
	equipments: [
		new Equipment('Kingdom Key', new Reward('Damage Control', 0x021E), 3, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF1D6, 0x21CDF1D8, 0x21CDF1DC, 0x21CDF1E0),
		new Equipment('Oathkeeper', new Reward('Form Boost', 0x018E), 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF1E6, 0x21CDF1E8, 0x21CDF1EC, 0x21CDF1F0),
		new Equipment('Oblivion', new Reward('Drive Boost', 0x018D), 6, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF1F6, 0x21CDF1F8, 0x21CDF1FC, 0x21CDF200),
		new Equipment('Star Seeker', new Reward('Air Combo Plus', 0x00A3), 3, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF466, 0x21CDF468, 0x21CDF46C, 0x21CDF470),
		new Equipment('Hidden Dragon', new Reward('MP Rage', 0x019C), 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF476, 0x21CDF478, 0x21CDF47C, 0x21CDF480),
		new Equipment('Hero\'s Crest', new Reward('Air Combo Boost', 0x0187), 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF4A6, 0x21CDF4A8, 0x21CDF4AC, 0x21CDF4B0),
		new Equipment('Monochrome', new Reward('Item Boost', 0x019B), 3, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF4B6, 0x21CDF4B8, 0x21CDF4BC, 0x21CDF4C0),
		new Equipment('Follow the Wind', new Reward('Draw', 0x0195), 3, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF4C6, 0x21CDF4C8, 0x21CDF4CC, 0x21CDF4D0),
		new Equipment('Circle of Life', new Reward('MP Haste', 0x019D), 4, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF4D6, 0x21CDF4D8, 0x21CDF4DC, 0x21CDF4E0),
		new Equipment('Photon Debugger', new Reward('Thunder Boost', 0x019A), 3, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF4E6, 0x21CDF4E8, 0x21CDF4EC, 0x21CDF4F0),
		new Equipment('Gull Wing', new Reward('Experience Boost', 0x0191), 2, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF4F6, 0x21CDF4F8, 0x21CDF4FC, 0x21CDF500),
		new Equipment('Rumbling Rose', new Reward('Finishing Plus', 0x0189), 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF506, 0x21CDF508, 0x21CDF50C, 0x21CDF510),
		new Equipment('Guardian Soul', new Reward('Reaction Boost', 0x0188), 5, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF516, 0x21CDF518, 0x21CDF51C, 0x21CDF520),
		new Equipment('Wishing Lamp', new Reward('Jackpot', 0x0196), 4, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF526, 0x21CDF528, 0x21CDF52C, 0x21CDF530),
		new Equipment('Decisive Pumpkin', new Reward('Combo Boost', 0x0186), 6, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF536, 0x21CDF538, 0x21CDF53C, 0x21CDF540),
		new Equipment('Sweet Memories', new Reward('Drive Converter', 0x021C), 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF556, 0x21CDF558, 0x21CDF55C, 0x21CDF560),
		new Equipment('Mysterious Abyss', new Reward('Blizzard Boost', 0x0199), 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF566, 0x21CDF568, 0x21CDF56C, 0x21CDF570),
		new Equipment('Sleeping Lion', new Reward('Combo Plus', 0x00A2), 5, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF546, 0x21CDF548, 0x21CDF54C, 0x21CDF550),
		new Equipment('Bond of Flame', new Reward('Fire Boost', 0x0198), 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF586, 0x21CDF588, 0x21CDF58C, 0x21CDF590),
		new Equipment('Fatal Crest', new Reward('Berserk Charge', 0x018B), 3, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF576, 0x21CDF578, 0x21CDF57C, 0x21CDF580),
		new Equipment('Two Become One', new Reward('Light & Darkness', 0x021D), 5, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF5F6, 0x21CDF5F8, 0x21CDF5FC, 0x21CDF600),
		new Equipment('Fenrir', new Reward('Negative Combo', 0x018A), 7, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF596, 0x21CDF598, 0x21CDF59C, 0x21CDF5A0),
		new Equipment('Ultima Weapon', new Reward('MP Hastega', 0x01A6), 6, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF5A6, 0x21CDF5A8, 0x21CDF5AC, 0x21CDF5B0),
		new Equipment('Winner\'s Proof', new Reward('No Experience', 0x0194), 5, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF606, 0x21CDF608, 0x21CDF60C, 0x21CDF610),
		new Equipment('FAKE', new Reward('Defender', 0x019E), 3, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF3F6, 0x21CDF3F8, 0x21CDF3FC, 0x21CDF300),
		new Equipment('Detection Saber', new Reward('Scan', 0x008A), 4, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF206, 0x21CDF208, 0x21CDF20C, 0x21CDF210),
		new Equipment('Edge of Ultima', new Reward('MP Hastera', 0x01A5), 5, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF216, 0x21CDF218, 0x21CDF21C, 0x21CDF220)
	]
}, {
	equipmentType: 'Donald Staff',
	equipments: [
		new Equipment('Mage\'s Staff', new Reward('EMPTY', 0x0000), 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF236, 0x21CDF238, 0x21CDF23C, 0x21CDF240),
		new Equipment('Hammer Staff', new Reward('EMPTY', 0x0000), 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF246, 0x21CDF248, 0x21CDF24C, 0x21CDF250),
		new Equipment('Victory Bell', new Reward('EMPTY', 0x0000), 3, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF256, 0x21CDF258, 0x21CDF25C, 0x21CDF260),
		new Equipment('Comet Staff', new Reward('EMPTY', 0x0000), 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF276, 0x21CDF278, 0x21CDF27C, 0x21CDF280),
		new Equipment('Lord\'s Broom', new Reward('EMPTY', 0x0000), 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF286, 0x21CDF288, 0x21CDF28C, 0x21CDF290),
		new Equipment('Wisdom Wand', new Reward('EMPTY', 0x0000), 4, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF296, 0x21CDF298, 0x21CDF29C, 0x21CDF2A0),
		new Equipment('Meteor Staff', new Reward('Thunder Boost', 0x019A), 4, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF266, 0x21CDF268, 0x21CDF26C, 0x21CDF270),
		new Equipment('Rising Dragon', new Reward('Fire Boost', 0x0198), 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF2A6, 0x21CDF2A8, 0x21CDF2AC, 0x21CDF2B0),
		new Equipment('Shaman\'s Relic', new Reward('Blizzard Boost', 0x0199), 4, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF2C6, 0x21CDF2C8, 0x21CDF2CC, 0x21CDF2D0),
		new Equipment('Shaman\'s Relic+', new Reward('Defender', 0x019E), 4, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF706, 0x21CDF708, 0x21CDF70C, 0x21CDF710),
		new Equipment('Nobody Lance', new Reward('Item Boost', 0x019B), 5, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF2B6, 0x21CDF2B8, 0x21CDF2BC, 0x21CDF2C0),
		new Equipment('Centurion', new Reward('EMPTY', 0x0000), 13, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF616, 0x21CDF618, 0x21CDF61C, 0x21CDF620),
		new Equipment('Centurion+', new Reward('Damage Control', 0x021E), 13, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF626, 0x21CDF628, 0x21CDF62C, 0x21CDF630),
		new Equipment('Save the Queen', new Reward('Hyper Healing', 0x01A3), 5, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF486, 0x21CDF488, 0x21CDF48C, 0x21CDF490),
		new Equipment('Save the Queen+', new Reward('MP Rage', 0x019C), 5, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF5D6, 0x21CDF5D8, 0x21CDF5DC, 0x21CDF5E0),
		new Equipment('Plain Mushroom', new Reward('EMPTY', 0x0000), 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF636, 0x21CDF638, 0x21CDF63C, 0x21CDF640),
		new Equipment('Plain Mushroom+', new Reward('EMPTY', 0x0000), 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF646, 0x21CDF648, 0x21CDF64C, 0x21CDF650),
		new Equipment('Precious Mushroom', new Reward('MP Haste', 0x019D), 1, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF656, 0x21CDF658, 0x21CDF65C, 0x21CDF660),
		new Equipment('Precious Mushroom+', new Reward('MP Hastera', 0x01A5), 2, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF666, 0x21CDF668, 0x21CDF66C, 0x21CDF670),
		new Equipment('Premium Mushroom', new Reward('MP Hastega', 0x01A6), 3, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF676, 0x21CDF678, 0x21CDF67C, 0x21CDF680)
	]
}, {
	equipmentType: 'Goofy Shield',
	equipments: [
		new Equipment('Knight\'s Shield', new Reward('EMPTY', 0x0000), 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF2E6, 0x21CDF2E8, 0x21CDF2EC, 0x21CDF2F0),
		new Equipment('Adamant Shield', new Reward('EMPTY', 0x0000), 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF2F6, 0x21CDF2F8, 0x21CDF2FC, 0x21CDF300),
		new Equipment('Chain Gear', new Reward('EMPTY', 0x0000), 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF306, 0x21CDF308, 0x21CDF30C, 0x21CDF310),
		new Equipment('Falling Star', new Reward('EMPTY', 0x0000), 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF326, 0x21CDF328, 0x21CDF32C, 0x21CDF330),
		new Equipment('Dream Cloud', new Reward('EMPTY', 0x0000), 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF336, 0x21CDF338, 0x21CDF33C, 0x21CDF340),
		new Equipment('Knight Defender', new Reward('EMPTY', 0x0000), 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF346, 0x21CDF348, 0x21CDF34C, 0x21CDF350),
		new Equipment('Ogre Shield', new Reward('Defender', 0x019E), 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF316, 0x21CDF318, 0x21CDF31C, 0x21CDF320),
		new Equipment('Genji Shield', new Reward('Hyper Healing', 0x01A3), 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF356, 0x21CDF358, 0x21CDF35C, 0x21CDF360),
		new Equipment('Akashic Record', new Reward('MP Haste', 0x019D), 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF366, 0x21CDF368, 0x21CDF36C, 0x21CDF370),
		new Equipment('Akashic Record+', new Reward('MP Hastera', 0x01A5), 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF716, 0x21CDF718, 0x21CDF71C, 0x21CDF720),
		new Equipment('Nobody Guard', new Reward('MP Rage', 0x019C), 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF376, 0x21CDF378, 0x21CDF37C, 0x21CDF380),
		new Equipment('Frozen Pride', new Reward('EMPTY', 0x0000), 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF686, 0x21CDF688, 0x21CDF68C, 0x21CDF690),
		new Equipment('Frozen Pride+', new Reward('MP Hastega', 0x01A6), 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF696, 0x21CDF698, 0x21CDF69C, 0x21CDF6A0),
		new Equipment('Save the King', new Reward('Item Boost', 0x019B), 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF496, 0x21CDF498, 0x21CDF49C, 0x21CDF4A0),
		new Equipment('Save the King+', new Reward('Damage Control', 0x021E), 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF5E6, 0x21CDF5E8, 0x21CDF5EC, 0x21CDF5F0),
		new Equipment('Joyous Mushroom', new Reward('EMPTY', 0x0000), 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF6A6, 0x21CDF6A8, 0x21CDF6AC, 0x21CDF6B0),
		new Equipment('Joyous Mushroom+', new Reward('EMPTY', 0x0000), 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF6B6, 0x21CDF6B8, 0x21CDF6BC, 0x21CDF6C0),
		new Equipment('Majestic Mushroom', new Reward('Protect', 0x0254), 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF6C6, 0x21CDF6C8, 0x21CDF6CC, 0x21CDF6D0),
		new Equipment('Majestic Mushroom+', new Reward('Protectra', 0x0255), 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF6D6, 0x21CDF6D8, 0x21CDF6DC, 0x21CDF6E0),
		new Equipment('Ultimate Mushroom', new Reward('Protectga', 0x0256), 9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF6E6, 0x21CDF6E8, 0x21CDF6EC, 0x21CDF6F0)
	]
}, {
	equipmentType: 'Ally Weapon',
	equipments: [
		new Equipment('Sword of Ancestors (Ping/Mulan)', new Reward('EMPTY', 0x0000), 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF3C6, 0x21CDF3C8, 0x21CDF3CC, 0x21CDF3D0),
		new Equipment('Beast\'s Claw (Beast)', new Reward('EMPTY', 0x0000), 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF406, 0x21CDF408, 0x21CDF40C, 0x21CDF410),
		new Equipment('Battlefields of War (Auron)', new Reward('EMPTY', 0x0000), 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF3B6, 0x21CDF3B8, 0x21CDF3BC, 0x21CDF3C0),
		new Equipment('Skill and Crossbones (Jack Sparrow)', new Reward('EMPTY', 0x0000), 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF436, 0x21CDF438, 0x21CDF43C, 0x21CDF440),
		new Equipment('Scimitar (Aladdin)', new Reward('EMPTY', 0x0000), 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF3A6, 0x21CDF3A8, 0x21CDF3AC, 0x21CDF3B0),
		new Equipment('Bone Fist (Jack)', new Reward('EMPTY', 0x0000), 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF416, 0x21CDF418, 0x21CDF41C, 0x21CDF420),
		new Equipment('Proud Fang (Simba)', new Reward('EMPTY', 0x0000), 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF426, 0x21CDF428, 0x21CDF42C, 0x21CDF430),
		new Equipment('Identity Disk (Tron)', new Reward('EMPTY', 0x0000), 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF3E6, 0x21CDF3E8, 0x21CDF3EC, 0x21CDF3F0),
		new Equipment('Way to the Dawn (Riku)', new Reward('EMPTY', 0x0000), 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF446, 0x21CDF448, 0x21CDF44C, 0x21CDF450)
	]
}, {
	equipmentType: 'Armor',
	equipments: [
		new Equipment('Elven Bandana', new Reward('EMPTY', 0x0000), 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0x11CDEDB6, 0x21CDEDB8, 0x21CDEDBC, 0x21CDEDC0),
		new Equipment('Divine Bandana', new Reward('EMPTY', 0x0000), 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0x11CDEDC6, 0x21CDEDC8, 0x21CDEDCC, 0x21CDEDD0),
		new Equipment('Champion Belt', new Reward('EMPTY', 0x0000), 0, 0, 0, 0, 20, 20, 20, 0, 0, 0, 0, 0x11CDEF96, 0x21CDEF98, 0x21CDEF9C, 0x21CDEFA0),
		new Equipment('Protect Belt', new Reward('EMPTY', 0x0000), 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0x11CDEDF6, 0x21CDEDF8, 0x21CDEDFC, 0x21CDEE00),
		new Equipment('Gaia Belt', new Reward('EMPTY', 0x0000), 0, 0, 0, 3, 0, 0, 20, 20, 0, 0, 0, 0x11CDEE06, 0x21CDEE08, 0x21CDEE0C, 0x21CDEE10),
		new Equipment('Power Band', new Reward('EMPTY', 0x0000), 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0x11CDEDD6, 0x21CDEDD8, 0x21CDEDDC, 0x21CDEDE0),
		new Equipment('Buster Band', new Reward('EMPTY', 0x0000), 0, 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0x11CDEDE6, 0x21CDEDE8, 0x21CDEDEC, 0x21CDEDF0),
		new Equipment('Cosmic Belt', new Reward('EMPTY', 0x0000), 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0x11CDEE16, 0x21CDEE18, 0x21CDEE1C, 0x21CDEE20),
		new Equipment('Fire Bangle', new Reward('EMPTY', 0x0000), 0, 0, 0, 1, 20, 0, 0, 0, 0, 0, 0, 0x11CDEE56, 0x21CDEE58, 0x21CDEE5C, 0x21CDEE60),
		new Equipment('Fira Bangle', new Reward('EMPTY', 0x0000), 0, 0, 0, 2, 20, 0, 0, 0, 0, 0, 0, 0x11CDEE66, 0x21CDEE68, 0x21CDEE6C, 0x21CDEE70),
		new Equipment('Firaga Bangle', new Reward('EMPTY', 0x0000), 0, 0, 0, 3, 20, 0, 0, 0, 0, 0, 0, 0x11CDEE76, 0x21CDEE78, 0x21CDEE7C, 0x21CDEE80),
		new Equipment('Firagun Bangle', new Reward('EMPTY', 0x0000), 0, 0, 0, 3, 25, 0, 0, 0, 0, 0, 0, 0x11CDEE86, 0x21CDEE88, 0x21CDEE8C, 0x21CDEE90),
		new Equipment('Blizzard Armlet', new Reward('EMPTY', 0x0000), 0, 0, 0, 1, 0, 20, 0, 0, 0, 0, 0, 0x11CDEE96, 0x21CDEE98, 0x21CDEE9C, 0x21CDEEA0),
		new Equipment('Blizzara Armlet', new Reward('EMPTY', 0x0000), 0, 0, 0, 2, 0, 20, 0, 0, 0, 0, 0, 0x11CDEEA6, 0x21CDEEA8, 0x21CDEEAC, 0x21CDEEB0),
		new Equipment('Blizzaga Armlet', new Reward('EMPTY', 0x0000), 0, 0, 0, 3, 0, 20, 0, 0, 0, 0, 0, 0x11CDEEB6, 0x21CDEEB8, 0x21CDEEBC, 0x21CDEEC0),
		new Equipment('Blizzagun Armlet', new Reward('EMPTY', 0x0000), 0, 0, 0, 3, 0, 25, 0, 0, 0, 0, 0, 0x11CDEEC6, 0x21CDEEC8, 0x21CDEECC, 0x21CDEED0),
		new Equipment('Thunder Trinket', new Reward('EMPTY', 0x0000), 0, 0, 0, 1, 0, 0, 20, 0, 0, 0, 0, 0x11CDEED6, 0x21CDEED8, 0x21CDEEDC, 0x21CDEEE0),
		new Equipment('Thundara Trinket', new Reward('EMPTY', 0x0000), 0, 0, 0, 2, 0, 0, 20, 0, 0, 0, 0, 0x11CDEEE6, 0x21CDEEE8, 0x21CDEEEC, 0x21CDEEF0),
		new Equipment('Thundaga Trinket', new Reward('EMPTY', 0x0000), 0, 0, 0, 3, 0, 0, 20, 0, 0, 0, 0, 0x11CDEEF6, 0x21CDEEF8, 0x21CDEEFC, 0x21CDEF00),
		new Equipment('Thundagun Trinket', new Reward('EMPTY', 0x0000), 0, 0, 0, 3, 0, 0, 25, 0, 0, 0, 0, 0x11CDEF06, 0x21CDEF08, 0x21CDEF0C, 0x21CDEF10),
		new Equipment('Shock Charm', new Reward('EMPTY', 0x0000), 0, 0, 0, 3, 0, 0, 40, 0, 0, 0, 0, 0x11CDEE26, 0x21CDEE28, 0x21CDEE2C, 0x21CDEE30),
		new Equipment('Shock Charm+', new Reward('Thunder Boost', 0x019A), 0, 0, 0, 3, 0, 0, 40, 0, 0, 0, 0, 0x11CDEE36, 0x21CDEE38, 0x21CDEE3C, 0x21CDEE40),
		new Equipment('Shadow Anklet', new Reward('EMPTY', 0x0000), 0, 0, 0, 1, 0, 0, 0, 20, 0, 0, 0, 0x11CDEF16, 0x21CDEF18, 0x21CDEF1C, 0x21CDEF20),
		new Equipment('Dark Anklet', new Reward('EMPTY', 0x0000), 0, 0, 0, 2, 0, 0, 0, 20, 0, 0, 0, 0x11CDEF26, 0x21CDEF28, 0x21CDEF2C, 0x21CDEF30),
		new Equipment('Midnight Anklet', new Reward('EMPTY', 0x0000), 0, 0, 0, 3, 0, 0, 0, 20, 0, 0, 0, 0x11CDEF36, 0x21CDEF38, 0x21CDEF3C, 0x21CDEF40),
		new Equipment('Chaos Anklet', new Reward('EMPTY', 0x0000), 0, 0, 0, 3, 0, 0, 0, 25, 0, 0, 0, 0x11CDEF46, 0x21CDEF48, 0x21CDEF4C, 0x21CDEF50),
		new Equipment('Abas Chain', new Reward('EMPTY', 0x0000), 0, 0, 0, 1, 20, 20, 20, 0, 0, 0, 0, 0x11CDEF56, 0x21CDEF58, 0x21CDEF5C, 0x21CDEF60),
		new Equipment('Aegis Chain', new Reward('EMPTY', 0x0000), 0, 0, 0, 2, 20, 20, 20, 0, 0, 0, 0, 0x11CDEF66, 0x21CDEF68, 0x21CDEF6C, 0x21CDEF70),
		new Equipment('Acrisius', new Reward('EMPTY', 0x0000), 0, 0, 0, 3, 20, 20, 20, 0, 0, 0, 0, 0x11CDEF76, 0x21CDEF78, 0x21CDEF7C, 0x21CDEF80),
		new Equipment('Acrisius+', new Reward('EMPTY', 0x0000), 0, 0, 0, 3, 25, 25, 25, 0, 0, 0, 0, 0x11CDEFB6, 0x21CDEFB8, 0x21CDEFBC, 0x21CDEFC0),
		new Equipment('Cosmic Chain', new Reward('EMPTY', 0x0000), 0, 0, 0, 3, 30, 30, 30, 0, 0, 0, 0, 0x11CDEFC6, 0x21CDEFC8, 0x21CDEFCC, 0x21CDEFD0),
		new Equipment('Petit Ribbon', new Reward('EMPTY', 0x0000), 0, 0, 0, 4, 10, 10, 10, 10, 0, 0, 10, 0x11CDEFA6, 0x21CDEFA8, 0x21CDEFAC, 0x21CDEFB0),
		new Equipment('Ribbon', new Reward('EMPTY', 0x0000), 0, 0, 0, 4, 15, 15, 15, 15, 0, 0, 15, 0x11CDEF86, 0x21CDEF88, 0x21CDEF8C, 0x21CDEF90),
		new Equipment('Grand Ribbon', new Reward('EMPTY', 0x0000), 0, 0, 0, 4, 25, 25, 25, 25, 0, 0, 25, 0x11CDEE46, 0x21CDEE48, 0x21CDEE4C, 0x21CDEE50)
	]
}, {
	equipmentType: 'Accessory',
	equipments: [
		new Equipment('Ability Ring', new Reward('EMPTY', 0x0000), 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDEFD6, 0x21CDEFD8, 0x21CDEFDC, 0x21CDEFE0),
		new Equipment('Engineer\'s Ring', new Reward('EMPTY', 0x0000), 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDEFE6, 0x21CDEFE8, 0x21CDEFEC, 0x21CDEFF0),
		new Equipment('Technician\'s Ring', new Reward('EMPTY', 0x0000), 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDEFF6, 0x21CDEFF8, 0x21CDEFFC, 0x21CDF000),
		new Equipment('Skill Ring', new Reward('EMPTY', 0x0000), 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF0E6, 0x21CDF0E8, 0x21CDF0EC, 0x21CDF0F0),
		new Equipment('Skillful Ring', new Reward('EMPTY', 0x0000), 0, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF0F6, 0x21CDF0F8, 0x21CDF0FC, 0x21CDF100),
		new Equipment('Expert\'s Ring', new Reward('EMPTY', 0x0000), 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF006, 0x21CDF008, 0x21CDF00C, 0x21CDF010),
		new Equipment('Master\'s Ring', new Reward('EMPTY', 0x0000), 0, 0, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF0B6, 0x21CDF0B8, 0x21CDF0BC, 0x21CDF0C0),
		new Equipment('Cosmic Ring', new Reward('EMPTY', 0x0000), 0, 0, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF146, 0x21CDF148, 0x21CDF14C, 0x21CDF150),
		new Equipment('Executive\'s Ring', new Reward('EMPTY', 0x0000), 0, 0, 30, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF6F6, 0x21CDF6F8, 0x21CDF6FC, 0x21CDF700),
		new Equipment('Sardonyx Ring', new Reward('EMPTY', 0x0000), 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF016, 0x21CDF018, 0x21CDF01C, 0x21CDF020),
		new Equipment('Tourmaline Ring', new Reward('EMPTY', 0x0000), 1, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF026, 0x21CDF028, 0x21CDF02C, 0x21CDF030),
		new Equipment('Aquamarine Ring', new Reward('EMPTY', 0x0000), 1, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF036, 0x21CDF038, 0x21CDF03C, 0x21CDF040),
		new Equipment('Garnet Ring', new Reward('EMPTY', 0x0000), 1, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF046, 0x21CDF048, 0x21CDF04C, 0x21CDF050),
		new Equipment('Diamond Ring', new Reward('EMPTY', 0x0000), 1, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF056, 0x21CDF058, 0x21CDF05C, 0x21CDF060),
		new Equipment('Silver Ring', new Reward('EMPTY', 0x0000), 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF066, 0x21CDF068, 0x21CDF06C, 0x21CDF070),
		new Equipment('Gold Ring', new Reward('EMPTY', 0x0000), 0, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF076, 0x21CDF078, 0x21CDF07C, 0x21CDF080),
		new Equipment('Platinum Ring', new Reward('EMPTY', 0x0000), 0, 1, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF086, 0x21CDF088, 0x21CDF08C, 0x21CDF090),
		new Equipment('Mythril Ring', new Reward('EMPTY', 0x0000), 0, 1, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF096, 0x21CDF098, 0x21CDF09C, 0x21CDF0A0),
		new Equipment('Orichalcum Ring', new Reward('EMPTY', 0x0000), 0, 1, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF0A6, 0x21CDF0A8, 0x21CDF0AC, 0x21CDF0B0),
		new Equipment('Soldier Earring', new Reward('EMPTY', 0x0000), 2, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF106, 0x21CDF108, 0x21CDF10C, 0x21CDF110),
		new Equipment('Fencer Earring', new Reward('EMPTY', 0x0000), 2, 1, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF116, 0x21CDF118, 0x21CDF11C, 0x21CDF120),
		new Equipment('Mage Earring', new Reward('EMPTY', 0x0000), 0, 2, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF126, 0x21CDF128, 0x21CDF12C, 0x21CDF130),
		new Equipment('Slayer Earring', new Reward('EMPTY', 0x0000), 1, 2, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF136, 0x21CDF138, 0x21CDF13C, 0x21CDF140),
		new Equipment('Medal', new Reward('EMPTY', 0x0000), 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF156, 0x21CDF158, 0x21CDF15C, 0x21CDF160),
		new Equipment('Moon Amulet', new Reward('EMPTY', 0x0000), 2, 2, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF0C6, 0x21CDF0C8, 0x21CDF0CC, 0x21CDF0D0),
		new Equipment('Star Charm', new Reward('EMPTY', 0x0000), 2, 2, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF0D6, 0x21CDF0D8, 0x21CDF0DC, 0x21CDF0E0),
		new Equipment('Cosmic Arts', new Reward('EMPTY', 0x0000), 2, 2, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF166, 0x21CDF168, 0x21CDF16C, 0x21CDF170),
		new Equipment('Shadow Archive', new Reward('EMPTY', 0x0000), 0, 3, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF176, 0x21CDF178, 0x21CDF17C, 0x21CDF180),
		new Equipment('Shadow Archive+', new Reward('MP Rage', 0x019C), 0, 3, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF186, 0x21CDF188, 0x21CDF18C, 0x21CDF190),
		new Equipment('Full Bloom', new Reward('EMPTY', 0x0000), 3, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF1A6, 0x21CDF1A8, 0x21CDF1AC, 0x21CDF1B0),
		new Equipment('Full Bloom+', new Reward('MP Haste', 0x019D), 3, 0, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF1C6, 0x21CDF1C8, 0x21CDF1CC, 0x21CDF1D0),
		new Equipment('Draw Ring', new Reward('Draw', 0x0195), 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF1B6, 0x21CDF1B8, 0x21CDF1BC, 0x21CDF1C0),
		new Equipment('Lucky Ring', new Reward('Lucky Lucky', 0x0197), 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x11CDF196, 0x21CDF198, 0x21CDF19C, 0x21CDF1A0)
	]
}]