import { Reward } from './rewardsData'

export class Level {
	constructor(level, exp, expAddress, ap, defense, magic, strength, sword, shield, staff) {
		this.level = level
		this.vanillaEXP = exp
		this.replacedEXP = exp
		this.expAddress = expAddress
		this.statAddress = this.expAddress + 4
		this.swordAddress = this.statAddress - 0xFFFFFFC
		this.shieldAddress = this.swordAddress + 2
		this.staffAddress = this.shieldAddress + 2
		this.vanillaAP = ap
		this.standardAP = ap
		this.criticalAP = this.criticalAP(ap)
		this.vanillaDefense = defense
		this.defense = defense
		this.vanillaMagic = magic
		this.magic = magic
		this.vanillaStrength = strength
		this.strength = strength
		this.vanillaSwordReward = sword
		this.replacementSwordReward = sword
		this.vanillaShieldReward = shield
		this.replacementShieldReward = shield
		this.vanillaStaffReward = staff
		this.replacementStaffReward = staff
		this.toBeReplaced = false
		this.isEXPReplaced = false
		this.isStatsReplaced = false
		this.isSwordReplaced = false
		this.isShieldReplaced = false
		this.isStaffReplaced = false
	}

	criticalAP(standardAP) {
		return Math.floor(((standardAP - 2) * 1.5) + 50)
	}
}

export const levelsData = [
	new Level(1, 40, 0x21D0B6A8, 2, 2, 6, 2, new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000)),
	new Level(2, 100, 0x21D0B6B8, 2, 3, 6, 2, new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000)),
	new Level(3, 184, 0x21D0B6C8, 4, 3, 6, 4, new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000)),
	new Level(4, 296, 0x21D0B6D8, 4, 4, 6, 4, new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000)),
	new Level(5, 440, 0x21D0B6E8, 6, 5, 6, 4, new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000)),
	new Level(6, 620, 0x21D0B6F8, 6, 6, 6, 6, new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000)),
	new Level(7, 840, 0x21D0B708, 6, 7, 6, 6, new Reward('Combo Boost', 0x0186), new Reward('Item Boost', 0x019B), new Reward('Experience Boost', 0x0191)),
	new Level(8, 1128, 0x21D0B718, 8, 7, 8, 6, new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000)),
	new Level(9, 1492, 0x21D0B728, 8, 8, 8, 6, new Reward('Experience Boost', 0x0191), new Reward('Combo Boost', 0x0186), new Reward('Item Boost', 0x019B)),
	new Level(10, 1940, 0x21D0B738, 8, 8, 8, 8, new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000)),
	new Level(11, 2480, 0x21D0B748, 10, 9, 8, 8, new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000)),
	new Level(12, 3120, 0x21D0B758, 10, 9, 10, 8, new Reward('Magic Lock-On', 0x0193), new Reward('Magic Lock-On', 0x0193), new Reward('Magic Lock-On', 0x0193)),
	new Level(13, 3902, 0x21D0B768, 12, 10, 10, 8, new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000)),
	new Level(14, 4838, 0x21D0B778, 12, 10, 10, 10, new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000)),
	new Level(15, 5940, 0x21D0B788, 12, 11, 10, 10, new Reward('Reaction Boost', 0x0188), new Reward('Damage Drive', 0x018C), new Reward('Fire Boost', 0x0198)),
	new Level(16, 7260, 0x21D0B798, 14, 11, 12, 10, new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000)),
	new Level(17, 8814, 0x21D0B7A8, 14, 12, 12, 10, new Reward('Item Boost', 0x019B), new Reward('Experience Boost', 0x0191), new Reward('Combo Boost', 0x0186)),
	new Level(18, 10618, 0x21D0B7B8, 14, 12, 14, 12, new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000)),
	new Level(19, 12688, 0x21D0B7C8, 16, 13, 14, 12, new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000)),
	new Level(20, 15088, 0x21D0B7D8, 16, 13, 16, 12, new Reward('Leaf Bracer', 0x0192), new Reward('Leaf Bracer', 0x0192), new Reward('Leaf Bracer', 0x0192)),
	new Level(21, 17838, 0x21D0B7E8, 18, 14, 16, 12, new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000)),
	new Level(22, 20949, 0x21D0B7F8, 18, 14, 16, 14, new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000)),
	new Level(23, 24433, 0x21D0B808, 18, 15, 16, 14, new Reward('Fire Boost', 0x0198), new Reward('Reaction Boost', 0x0188), new Reward('Damage Drive', 0x018C)),
	new Level(24, 28302, 0x21D0B818, 20, 15, 18, 14, new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000)),
	new Level(25, 32622, 0x21D0B828, 20, 16, 18, 14, new Reward('Drive Boost', 0x018D), new Reward('Once More', 0x01A0), new Reward('Draw', 0x0195)),
	new Level(26, 37407, 0x21D0B838, 20, 16, 18, 16, new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000)),
	new Level(27, 42671, 0x21D0B848, 20, 17, 18, 16, new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000)),
	new Level(28, 48485, 0x21D0B858, 20, 17, 20, 16, new Reward('Draw', 0x0195), new Reward('Drive Boost', 0x018D), new Reward('Once More', 0x01A0)),
	new Level(29, 54865, 0x21D0B868, 22, 18, 20, 16, new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000)),
	new Level(30, 61886, 0x21D0B878, 22, 18, 20, 18, new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000)),
	new Level(31, 69566, 0x21D0B888, 22, 19, 20, 18, new Reward('Combination Boost', 0x0190), new Reward('Defender', 0x019E), new Reward('Blizzard Boost', 0x0199)),
	new Level(32, 77984, 0x21D0B898, 22, 19, 22, 18, new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000)),
	new Level(33, 87160, 0x21D0B8A8, 22, 20, 22, 18, new Reward('Damage Drive', 0x018C), new Reward('Fire Boost', 0x0198), new Reward('Reaction Boost', 0x0188)),
	new Level(34, 97177, 0x21D0B8B8, 22, 20, 22, 20, new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000)),
	new Level(35, 108057, 0x21D0B8C8, 24, 21, 22, 20, new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000)),
	new Level(36, 119887, 0x21D0B8D8, 24, 21, 24, 20, new Reward('Air Combo Boost', 0x0187), new Reward('Jackpot', 0x0196), new Reward('Negative Combo', 0x018A)),
	new Level(37, 132691, 0x21D0B8E8, 26, 22, 24, 20, new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000)),
	new Level(38, 146560, 0x21D0B8F8, 26, 22, 24, 22, new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000)),
	new Level(39, 161520, 0x21D0B908, 26, 23, 24, 22, new Reward('Blizzard Boost', 0x0199), new Reward('Combination Boost', 0x0190), new Reward('Defender', 0x019E)),
	new Level(40, 177666, 0x21D0B918, 28, 23, 26, 22, new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000)),
	new Level(41, 195026, 0x21D0B928, 28, 24, 26, 22, new Reward('Drive Converter', 0x021C), new Reward('Damage Control', 0x021E), new Reward('Thunder Boost', 0x019A)),
	new Level(42, 213699, 0x21D0B938, 28, 24, 26, 24, new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000)),
	new Level(43, 233715, 0x21D0B948, 28, 25, 26, 24, new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000)),
	new Level(44, 255177, 0x21D0B958, 28, 25, 28, 24, new Reward('Negative Combo', 0x018A), new Reward('Air Combo Boost', 0x0187), new Reward('Jackpot', 0x0196)),
	new Level(45, 278117, 0x21D0B968, 30, 26, 28, 24, new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000)),
	new Level(46, 302642, 0x21D0B978, 30, 26, 28, 26, new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000)),
	new Level(47, 328786, 0x21D0B988, 30, 27, 28, 26, new Reward('Once More', 0x01A0), new Reward('Draw', 0x0195), new Reward('Drive Boost', 0x018D)),
	new Level(48, 356660, 0x21D0B998, 30, 27, 30, 26, new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000)),
	new Level(49, 386660, 0x21D0B9A8, 30, 28, 30, 26, new Reward('Finishing Plus', 0x0189), new Reward('Second Chance', 0x019F), new Reward('Berserk Charge', 0x018B)),
	new Level(50, 417978, 0x21D0B9B8, 30, 28, 30, 28, new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000)),
	new Level(51, 450378, 0x21D0B9C8, 32, 29, 30, 28, new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000)),
	new Level(52, 483578, 0x21D0B9D8, 32, 29, 32, 28, new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000)),
	new Level(53, 517578, 0x21D0B9E8, 32, 30, 32, 28, new Reward('Thunder Boost', 0x019A), new Reward('Drive Converter', 0x021C), new Reward('Damage Control', 0x021E)),
	new Level(54, 552378, 0x21D0B9F8, 32, 30, 32, 30, new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000)),
	new Level(55, 587978, 0x21D0BA08, 34, 31, 32, 30, new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000)),
	new Level(56, 624378, 0x21D0BA18, 34, 31, 34, 30, new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000)),
	new Level(57, 661578, 0x21D0BA28, 36, 32, 34, 30, new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000)),
	new Level(58, 699578, 0x21D0BA38, 36, 32, 34, 32, new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000)),
	new Level(59, 738378, 0x21D0BA48, 36, 33, 34, 32, new Reward('Defender', 0x019E), new Reward('Blizzard Boost', 0x0199), new Reward('Combination Boost', 0x0190)),
	new Level(60, 777978, 0x21D0BA58, 36, 33, 36, 32, new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000)),
	new Level(61, 818378, 0x21D0BA68, 38, 34, 36, 32, new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000)),
	new Level(62, 859578, 0x21D0BA78, 38, 34, 36, 34, new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000)),
	new Level(63, 901578, 0x21D0BA88, 40, 35, 36, 34, new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000)),
	new Level(64, 944378, 0x21D0BA98, 40, 35, 38, 34, new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000)),
	new Level(65, 987987, 0x21D0BAA8, 40, 36, 38, 34, new Reward('Berserk Charge', 0x018B), new Reward('Finishing Plus', 0x0189), new Reward('Second Chance', 0x019F)),
	new Level(66, 1032378, 0x21D0BAB8, 40, 36, 38, 36, new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000)),
	new Level(67, 1077578, 0x21D0BAC8, 42, 37, 38, 36, new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000)),
	new Level(68, 1123578, 0x21D0BAD8, 42, 37, 40, 36, new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000)),
	new Level(69, 1170378, 0x21D0BAE8, 44, 38, 40, 36, new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000)),
	new Level(70, 1217978, 0x21D0BAF8, 44, 38, 40, 38, new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000)),
	new Level(71, 1266378, 0x21D0BB08, 46, 39, 40, 38, new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000)),
	new Level(72, 1315578, 0x21D0BB18, 46, 39, 42, 38, new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000)),
	new Level(73, 1365578, 0x21D0BB28, 46, 40, 42, 38, new Reward('Jackpot', 0x0196), new Reward('Negative Combo', 0x018A), new Reward('Air Combo Boost', 0x0187)),
	new Level(74, 1416378, 0x21D0BB38, 46, 40, 42, 40, new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000)),
	new Level(75, 1467978, 0x21D0BB48, 48, 41, 42, 40, new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000)),
	new Level(76, 1520378, 0x21D0BB58, 48, 41, 44, 40, new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000)),
	new Level(77, 1573578, 0x21D0BB68, 50, 42, 44, 40, new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000)),
	new Level(78, 1627578, 0x21D0BB78, 50, 42, 44, 42, new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000)),
	new Level(79, 1682378, 0x21D0BB88, 52, 43, 44, 42, new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000)),
	new Level(80, 1737978, 0x21D0BB98, 52, 43, 46, 42, new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000)),
	new Level(81, 1794378, 0x21D0BBA8, 54, 44, 46, 42, new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000)),
	new Level(82, 1851578, 0x21D0BBB8, 54, 44, 46, 44, new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000)),
	new Level(83, 1909578, 0x21D0BBC8, 56, 45, 46, 44, new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000)),
	new Level(84, 1968378, 0x21D0BBD8, 56, 45, 48, 44, new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000)),
	new Level(85, 2027978, 0x21D0BBE8, 56, 46, 48, 44, new Reward('Second Chance', 0x019F), new Reward('Berserk Charge', 0x018B), new Reward('Finishing Plus', 0x0189)),
	new Level(86, 2088378, 0x21D0BBF8, 56, 46, 48, 46, new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000)),
	new Level(87, 2149578, 0x21D0BC08, 58, 47, 48, 46, new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000)),
	new Level(88, 2211578, 0x21D0BC18, 58, 47, 50, 46, new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000)),
	new Level(89, 2274378, 0x21D0BC28, 60, 48, 50, 46, new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000)),
	new Level(90, 2337978, 0x21D0BC38, 60, 48, 50, 48, new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000)),
	new Level(91, 2402378, 0x21D0BC48, 62, 49, 50, 48, new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000)),
	new Level(92, 2467578, 0x21D0BC58, 62, 49, 52, 48, new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000)),
	new Level(93, 2553578, 0x21D0BC68, 64, 50, 52, 48, new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000)),
	new Level(94, 2600378, 0x21D0BC78, 64, 50, 52, 50, new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000)),
	new Level(95, 2667978, 0x21D0BC88, 66, 51, 52, 50, new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000)),
	new Level(96, 2736378, 0x21D0BC98, 66, 51, 54, 50, new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000)),
	new Level(97, 2805578, 0x21D0BCA8, 68, 52, 54, 50, new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000)),
	new Level(98, 2875578, 0x21D0BCB8, 68, 52, 54, 52, new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000), new Reward('EMPTY', 0x0000)),
	new Level(99, 0, 0x21D0BCC8, 68, 53, 54, 52, new Reward('Damage Control', 0x021E), new Reward('Thunder Boost', 0x019A), new Reward('Drive Converter', 0x021C4))
]