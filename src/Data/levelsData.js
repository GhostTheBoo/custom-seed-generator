import { Reward } from './rewardsData'

export class Level {
	constructor(level, exp, expAddress, ap, defense, magic, strength, statAddress, sword, swordAddress, shield, shieldAddress, staff, staffAddress,) {
		this.level = level
		this.vanillaEXP = exp
		this.replacedEXP = exp
		this.expAddress = expAddress
		this.vanillaAP = ap
		this.standardAP = ap
		this.criticalAP = this.criticalAP(ap)
		this.vanillaDefense = defense
		this.defense = defense
		this.vanillaMagic = magic
		this.magic = magic
		this.vanillaStrength = strength
		this.strength = strength
		this.statAddress = statAddress
		this.vanillaSwordReward = sword
		this.replacementSwordReward = sword
		this.swordAddress = swordAddress
		this.vanillaShieldReward = shield
		this.replacementShieldReward = shield
		this.shieldAddress = shieldAddress
		this.vanillaStaffReward = staff
		this.replacementStaffReward = staff
		this.staffAddress = staffAddress
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
	new Level(1, 40, 0x21D0B6A8, 2, 2, 6, 2, 0x21D0B6AC, new Reward('EMPTY', 0x0000), 0x11D0B6B0, new Reward('EMPTY', 0x0000), 0x11D0B6B2, new Reward('EMPTY', 0x0000), 0x11D0B6B4),
	new Level(2, 100, 0x21D0B6B8, 2, 3, 6, 2, 0x21D0B6BC, new Reward('EMPTY', 0x0000), 0x11D0B6C0, new Reward('EMPTY', 0x0000), 0x11D0B6C2, new Reward('EMPTY', 0x0000), 0x11D0B6C4),
	new Level(3, 184, 0x21D0B6C8, 4, 3, 6, 4, 0x21D0B6CC, new Reward('EMPTY', 0x0000), 0x11D0B6D0, new Reward('EMPTY', 0x0000), 0x11D0B6D2, new Reward('EMPTY', 0x0000), 0x11D0B6D4),
	new Level(4, 296, 0x21D0B6D8, 4, 4, 6, 4, 0x21D0B6DC, new Reward('EMPTY', 0x0000), 0x11D0B6E0, new Reward('EMPTY', 0x0000), 0x11D0B6E2, new Reward('EMPTY', 0x0000), 0x11D0B6E4),
	new Level(5, 440, 0x21D0B6E8, 6, 5, 6, 4, 0x21D0B6EC, new Reward('EMPTY', 0x0000), 0x11D0B6F0, new Reward('EMPTY', 0x0000), 0x11D0B6F2, new Reward('EMPTY', 0x0000), 0x11D0B6F4),
	new Level(6, 620, 0x21D0B6F8, 6, 6, 6, 6, 0x21D0B6FC, new Reward('EMPTY', 0x0000), 0x11D0B700, new Reward('EMPTY', 0x0000), 0x11D0B702, new Reward('EMPTY', 0x0000), 0x11D0B704),
	new Level(7, 840, 0x21D0B708, 6, 7, 6, 6, 0x21D0B70C, new Reward('Combo Boost', 0x0186), 0x11D0B710, new Reward('Item Boost', 0x019B), 0x11D0B712, new Reward('Experience Boost', 0x0191), 0x11D0B714),
	new Level(8, 1128, 0x21D0B718, 8, 7, 8, 6, 0x21D0B71C, new Reward('EMPTY', 0x0000), 0x11D0B720, new Reward('EMPTY', 0x0000), 0x11D0B722, new Reward('EMPTY', 0x0000), 0x11D0B724),
	new Level(9, 1492, 0x21D0B728, 8, 8, 8, 6, 0x21D0B72C, new Reward('Experience Boost', 0x0191), 0x11D0B730, new Reward('Combo Boost', 0x0186), 0x11D0B732, new Reward('Item Boost', 0x019B), 0x11D0B734),
	new Level(10, 1940, 0x21D0B738, 8, 8, 8, 8, 0x21D0B73C, new Reward('EMPTY', 0x0000), 0x11D0B740, new Reward('EMPTY', 0x0000), 0x11D0B742, new Reward('EMPTY', 0x0000), 0x11D0B744),
	new Level(11, 2480, 0x21D0B748, 10, 9, 8, 8, 0x21D0B74C, new Reward('EMPTY', 0x0000), 0x11D0B750, new Reward('EMPTY', 0x0000), 0x11D0B752, new Reward('EMPTY', 0x0000), 0x11D0B754),
	new Level(12, 3120, 0x21D0B758, 10, 9, 10, 8, 0x21D0B75C, new Reward('Magic Lock-On', 0x0193), 0x11D0B760, new Reward('Magic Lock-On', 0x0193), 0x11D0B762, new Reward('Magic Lock-On', 0x0193), 0x11D0B764),
	new Level(13, 3902, 0x21D0B768, 12, 10, 10, 8, 0x21D0B76C, new Reward('EMPTY', 0x0000), 0x11D0B770, new Reward('EMPTY', 0x0000), 0x11D0B772, new Reward('EMPTY', 0x0000), 0x11D0B774),
	new Level(14, 4838, 0x21D0B778, 12, 10, 10, 10, 0x21D0B77C, new Reward('EMPTY', 0x0000), 0x11D0B780, new Reward('EMPTY', 0x0000), 0x11D0B782, new Reward('EMPTY', 0x0000), 0x11D0B784),
	new Level(15, 5940, 0x21D0B788, 12, 11, 10, 10, 0x21D0B78C, new Reward('Reaction Boost', 0x0188), 0x11D0B790, new Reward('Damage Drive', 0x018C), 0x11D0B792, new Reward('Fire Boost', 0x0198), 0x11D0B794),
	new Level(16, 7260, 0x21D0B798, 14, 11, 12, 10, 0x21D0B79C, new Reward('EMPTY', 0x0000), 0x11D0B7A0, new Reward('EMPTY', 0x0000), 0x11D0B7A2, new Reward('EMPTY', 0x0000), 0x11D0B7A4),
	new Level(17, 8814, 0x21D0B7A8, 14, 12, 12, 10, 0x21D0B7AC, new Reward('Item Boost', 0x019B), 0x11D0B7B0, new Reward('Experience Boost', 0x0191), 0x11D0B7B2, new Reward('Combo Boost', 0x0186), 0x11D0B7B4),
	new Level(18, 10618, 0x21D0B7B8, 14, 12, 14, 12, 0x21D0B7BC, new Reward('EMPTY', 0x0000), 0x11D0B7C0, new Reward('EMPTY', 0x0000), 0x11D0B7C2, new Reward('EMPTY', 0x0000), 0x11D0B7C4),
	new Level(19, 12688, 0x21D0B7C8, 16, 13, 14, 12, 0x21D0B7CC, new Reward('EMPTY', 0x0000), 0x11D0B7D0, new Reward('EMPTY', 0x0000), 0x11D0B7D2, new Reward('EMPTY', 0x0000), 0x11D0B7D4),
	new Level(20, 15088, 0x21D0B7D8, 16, 13, 16, 12, 0x21D0B7DC, new Reward('Leaf Bracer', 0x0192), 0x11D0B7E0, new Reward('Leaf Bracer', 0x0192), 0x11D0B7E2, new Reward('Leaf Bracer', 0x0192), 0x11D0B7E4),
	new Level(21, 17838, 0x21D0B7E8, 18, 14, 16, 12, 0x21D0B7EC, new Reward('EMPTY', 0x0000), 0x11D0B7F0, new Reward('EMPTY', 0x0000), 0x11D0B7F2, new Reward('EMPTY', 0x0000), 0x11D0B7F4),
	new Level(22, 20949, 0x21D0B7F8, 18, 14, 16, 14, 0x21D0B7FC, new Reward('EMPTY', 0x0000), 0x11D0B800, new Reward('EMPTY', 0x0000), 0x11D0B802, new Reward('EMPTY', 0x0000), 0x11D0B804),
	new Level(23, 24433, 0x21D0B808, 18, 15, 16, 14, 0x21D0B80C, new Reward('Fire Boost', 0x0198), 0x11D0B810, new Reward('Reaction Boost', 0x0188), 0x11D0B812, new Reward('Damage Drive', 0x018C), 0x11D0B814),
	new Level(24, 28302, 0x21D0B818, 20, 15, 18, 14, 0x21D0B81C, new Reward('EMPTY', 0x0000), 0x11D0B820, new Reward('EMPTY', 0x0000), 0x11D0B822, new Reward('EMPTY', 0x0000), 0x11D0B824),
	new Level(25, 32622, 0x21D0B828, 20, 16, 18, 14, 0x21D0B82C, new Reward('Drive Boost', 0x018D), 0x11D0B830, new Reward('Once More', 0x01A0), 0x11D0B832, new Reward('Draw', 0x0195), 0x11D0B834),
	new Level(26, 37407, 0x21D0B838, 20, 16, 18, 16, 0x21D0B83C, new Reward('EMPTY', 0x0000), 0x11D0B840, new Reward('EMPTY', 0x0000), 0x11D0B842, new Reward('EMPTY', 0x0000), 0x11D0B844),
	new Level(27, 42671, 0x21D0B848, 20, 17, 18, 16, 0x21D0B84C, new Reward('EMPTY', 0x0000), 0x11D0B850, new Reward('EMPTY', 0x0000), 0x11D0B852, new Reward('EMPTY', 0x0000), 0x11D0B854),
	new Level(28, 48485, 0x21D0B858, 20, 17, 20, 16, 0x21D0B85C, new Reward('Draw', 0x0195), 0x11D0B860, new Reward('Drive Boost', 0x018D), 0x11D0B862, new Reward('Once More', 0x01A0), 0x11D0B864),
	new Level(29, 54865, 0x21D0B868, 22, 18, 20, 16, 0x21D0B86C, new Reward('EMPTY', 0x0000), 0x11D0B870, new Reward('EMPTY', 0x0000), 0x11D0B872, new Reward('EMPTY', 0x0000), 0x11D0B874),
	new Level(30, 61886, 0x21D0B878, 22, 18, 20, 18, 0x21D0B87C, new Reward('EMPTY', 0x0000), 0x11D0B880, new Reward('EMPTY', 0x0000), 0x11D0B882, new Reward('EMPTY', 0x0000), 0x11D0B884),
	new Level(31, 69566, 0x21D0B888, 22, 19, 20, 18, 0x21D0B88C, new Reward('Combination Boost', 0x0190), 0x11D0B890, new Reward('Defender', 0x019E), 0x11D0B892, new Reward('Blizzard Boost', 0x0199), 0x11D0B894),
	new Level(32, 77984, 0x21D0B898, 22, 19, 22, 18, 0x21D0B89C, new Reward('EMPTY', 0x0000), 0x11D0B8A0, new Reward('EMPTY', 0x0000), 0x11D0B8A2, new Reward('EMPTY', 0x0000), 0x11D0B8A4),
	new Level(33, 87160, 0x21D0B8A8, 22, 20, 22, 18, 0x21D0B8AC, new Reward('Damage Drive', 0x018C), 0x11D0B8B0, new Reward('Fire Boost', 0x0198), 0x11D0B8B2, new Reward('Reaction Boost', 0x0188), 0x11D0B8B4),
	new Level(34, 97177, 0x21D0B8B8, 22, 20, 22, 20, 0x21D0B8BC, new Reward('EMPTY', 0x0000), 0x11D0B8C0, new Reward('EMPTY', 0x0000), 0x11D0B8C2, new Reward('EMPTY', 0x0000), 0x11D0B8C4),
	new Level(35, 108057, 0x21D0B8C8, 24, 21, 22, 20, 0x21D0B8CC, new Reward('EMPTY', 0x0000), 0x11D0B8D0, new Reward('EMPTY', 0x0000), 0x11D0B8D2, new Reward('EMPTY', 0x0000), 0x11D0B8D4),
	new Level(36, 119887, 0x21D0B8D8, 24, 21, 24, 20, 0x21D0B8DC, new Reward('Air Combo Boost', 0x0187), 0x11D0B8E0, new Reward('Jackpot', 0x0196), 0x11D0B8E2, new Reward('Negative Combo', 0x018A), 0x11D0B8E4),
	new Level(37, 132691, 0x21D0B8E8, 26, 22, 24, 20, 0x21D0B8EC, new Reward('EMPTY', 0x0000), 0x11D0B8F0, new Reward('EMPTY', 0x0000), 0x11D0B8F2, new Reward('EMPTY', 0x0000), 0x11D0B8F4),
	new Level(38, 146560, 0x21D0B8F8, 26, 22, 24, 22, 0x21D0B8FC, new Reward('EMPTY', 0x0000), 0x11D0B900, new Reward('EMPTY', 0x0000), 0x11D0B902, new Reward('EMPTY', 0x0000), 0x11D0B904),
	new Level(39, 161520, 0x21D0B908, 26, 23, 24, 22, 0x21D0B90C, new Reward('Blizzard Boost', 0x0199), 0x11D0B910, new Reward('Combination Boost', 0x0190), 0x11D0B912, new Reward('Defender', 0x019E), 0x11D0B914),
	new Level(40, 177666, 0x21D0B918, 28, 23, 26, 22, 0x21D0B91C, new Reward('EMPTY', 0x0000), 0x11D0B920, new Reward('EMPTY', 0x0000), 0x11D0B922, new Reward('EMPTY', 0x0000), 0x11D0B924),
	new Level(41, 195026, 0x21D0B928, 28, 24, 26, 22, 0x21D0B92C, new Reward('Drive Converter', 0x021C), 0x11D0B930, new Reward('Damage Control', 0x021E), 0x11D0B932, new Reward('Thunder Boost', 0x019A), 0x11D0B934),
	new Level(42, 213699, 0x21D0B938, 28, 24, 26, 24, 0x21D0B93C, new Reward('EMPTY', 0x0000), 0x11D0B940, new Reward('EMPTY', 0x0000), 0x11D0B942, new Reward('EMPTY', 0x0000), 0x11D0B944),
	new Level(43, 233715, 0x21D0B948, 28, 25, 26, 24, 0x21D0B94C, new Reward('EMPTY', 0x0000), 0x11D0B950, new Reward('EMPTY', 0x0000), 0x11D0B952, new Reward('EMPTY', 0x0000), 0x11D0B954),
	new Level(44, 255177, 0x21D0B958, 28, 25, 28, 24, 0x21D0B95C, new Reward('Negative Combo', 0x018A), 0x11D0B960, new Reward('Air Combo Boost', 0x0187), 0x11D0B962, new Reward('Jackpot', 0x0196), 0x11D0B964),
	new Level(45, 278117, 0x21D0B968, 30, 26, 28, 24, 0x21D0B96C, new Reward('EMPTY', 0x0000), 0x11D0B970, new Reward('EMPTY', 0x0000), 0x11D0B972, new Reward('EMPTY', 0x0000), 0x11D0B974),
	new Level(46, 302642, 0x21D0B978, 30, 26, 28, 26, 0x21D0B97C, new Reward('EMPTY', 0x0000), 0x11D0B980, new Reward('EMPTY', 0x0000), 0x11D0B982, new Reward('EMPTY', 0x0000), 0x11D0B984),
	new Level(47, 328786, 0x21D0B988, 30, 27, 28, 26, 0x21D0B98C, new Reward('Once More', 0x01A0), 0x11D0B990, new Reward('Draw', 0x0195), 0x11D0B992, new Reward('Drive Boost', 0x018D), 0x11D0B994),
	new Level(48, 356660, 0x21D0B998, 30, 27, 30, 26, 0x21D0B99C, new Reward('EMPTY', 0x0000), 0x11D0B9A0, new Reward('EMPTY', 0x0000), 0x11D0B9A2, new Reward('EMPTY', 0x0000), 0x11D0B9A4),
	new Level(49, 386660, 0x21D0B9A8, 30, 28, 30, 26, 0x21D0B9AC, new Reward('Finishing Plus', 0x0189), 0x11D0B9B0, new Reward('Second Chance', 0x019F), 0x11D0B9B2, new Reward('Berserk Charge', 0x018B), 0x11D0B9B4),
	new Level(50, 417978, 0x21D0B9B8, 30, 28, 30, 28, 0x21D0B9BC, new Reward('EMPTY', 0x0000), 0x11D0B9C0, new Reward('EMPTY', 0x0000), 0x11D0B9C2, new Reward('EMPTY', 0x0000), 0x11D0B9C4),
	new Level(51, 450378, 0x21D0B9C8, 32, 29, 30, 28, 0x21D0B9CC, new Reward('EMPTY', 0x0000), 0x11D0B9D0, new Reward('EMPTY', 0x0000), 0x11D0B9D2, new Reward('EMPTY', 0x0000), 0x11D0B9D4),
	new Level(52, 483578, 0x21D0B9D8, 32, 29, 32, 28, 0x21D0B9DC, new Reward('EMPTY', 0x0000), 0x11D0B9E0, new Reward('EMPTY', 0x0000), 0x11D0B9E2, new Reward('EMPTY', 0x0000), 0x11D0B9E4),
	new Level(53, 517578, 0x21D0B9E8, 32, 30, 32, 28, 0x21D0B9EC, new Reward('Thunder Boost', 0x019A), 0x11D0B9F0, new Reward('Drive Converter', 0x021C), 0x11D0B9F2, new Reward('Damage Control', 0x021E), 0x11D0B9F4),
	new Level(54, 552378, 0x21D0B9F8, 32, 30, 32, 30, 0x21D0B9FC, new Reward('EMPTY', 0x0000), 0x11D0BA00, new Reward('EMPTY', 0x0000), 0x11D0BA02, new Reward('EMPTY', 0x0000), 0x11D0BA04),
	new Level(55, 587978, 0x21D0BA08, 34, 31, 32, 30, 0x21D0BA0C, new Reward('EMPTY', 0x0000), 0x11D0BA10, new Reward('EMPTY', 0x0000), 0x11D0BA12, new Reward('EMPTY', 0x0000), 0x11D0BA14),
	new Level(56, 624378, 0x21D0BA18, 34, 31, 34, 30, 0x21D0BA1C, new Reward('EMPTY', 0x0000), 0x11D0BA20, new Reward('EMPTY', 0x0000), 0x11D0BA22, new Reward('EMPTY', 0x0000), 0x11D0BA24),
	new Level(57, 661578, 0x21D0BA28, 36, 32, 34, 30, 0x21D0BA2C, new Reward('EMPTY', 0x0000), 0x11D0BA30, new Reward('EMPTY', 0x0000), 0x11D0BA32, new Reward('EMPTY', 0x0000), 0x11D0BA34),
	new Level(58, 699578, 0x21D0BA38, 36, 32, 34, 32, 0x21D0BA3C, new Reward('EMPTY', 0x0000), 0x11D0BA40, new Reward('EMPTY', 0x0000), 0x11D0BA42, new Reward('EMPTY', 0x0000), 0x11D0BA44),
	new Level(59, 738378, 0x21D0BA48, 36, 33, 34, 32, 0x21D0BA4C, new Reward('Defender', 0x019E), 0x11D0BA50, new Reward('Blizzard Boost', 0x0199), 0x11D0BA52, new Reward('Combination Boost', 0x0190), 0x11D0BA54),
	new Level(60, 777978, 0x21D0BA58, 36, 33, 36, 32, 0x21D0BA5C, new Reward('EMPTY', 0x0000), 0x11D0BA60, new Reward('EMPTY', 0x0000), 0x11D0BA62, new Reward('EMPTY', 0x0000), 0x11D0BA64),
	new Level(61, 818378, 0x21D0BA68, 38, 34, 36, 32, 0x21D0BA6C, new Reward('EMPTY', 0x0000), 0x11D0BA70, new Reward('EMPTY', 0x0000), 0x11D0BA72, new Reward('EMPTY', 0x0000), 0x11D0BA74),
	new Level(62, 859578, 0x21D0BA78, 38, 34, 36, 34, 0x21D0BA7C, new Reward('EMPTY', 0x0000), 0x11D0BA80, new Reward('EMPTY', 0x0000), 0x11D0BA82, new Reward('EMPTY', 0x0000), 0x11D0BA84),
	new Level(63, 901578, 0x21D0BA88, 40, 35, 36, 34, 0x21D0BA8C, new Reward('EMPTY', 0x0000), 0x11D0BA90, new Reward('EMPTY', 0x0000), 0x11D0BA92, new Reward('EMPTY', 0x0000), 0x11D0BA94),
	new Level(64, 944378, 0x21D0BA98, 40, 35, 38, 34, 0x21D0BA9C, new Reward('EMPTY', 0x0000), 0x11D0BAA0, new Reward('EMPTY', 0x0000), 0x11D0BAA2, new Reward('EMPTY', 0x0000), 0x11D0BAA4),
	new Level(65, 987987, 0x21D0BAA8, 40, 36, 38, 34, 0x21D0BAAC, new Reward('Berserk Charge', 0x018B), 0x11D0BAB0, new Reward('Finishing Plus', 0x0189), 0x11D0BAB2, new Reward('Second Chance', 0x019F), 0x11D0BAB4),
	new Level(66, 1032378, 0x21D0BAB8, 40, 36, 38, 36, 0x21D0BABC, new Reward('EMPTY', 0x0000), 0x11D0BAC0, new Reward('EMPTY', 0x0000), 0x11D0BAC2, new Reward('EMPTY', 0x0000), 0x11D0BAC4),
	new Level(67, 1077578, 0x21D0BAC8, 42, 37, 38, 36, 0x21D0BACC, new Reward('EMPTY', 0x0000), 0x11D0BAD0, new Reward('EMPTY', 0x0000), 0x11D0BAD2, new Reward('EMPTY', 0x0000), 0x11D0BAD4),
	new Level(68, 1123578, 0x21D0BAD8, 42, 37, 40, 36, 0x21D0BADC, new Reward('EMPTY', 0x0000), 0x11D0BAE0, new Reward('EMPTY', 0x0000), 0x11D0BAE2, new Reward('EMPTY', 0x0000), 0x11D0BAE4),
	new Level(69, 1170378, 0x21D0BAE8, 44, 38, 40, 36, 0x21D0BAEC, new Reward('EMPTY', 0x0000), 0x11D0BAF0, new Reward('EMPTY', 0x0000), 0x11D0BAF2, new Reward('EMPTY', 0x0000), 0x11D0BAF4),
	new Level(70, 1217978, 0x21D0BAF8, 44, 38, 40, 38, 0x21D0BAFC, new Reward('EMPTY', 0x0000), 0x11D0BB00, new Reward('EMPTY', 0x0000), 0x11D0BB02, new Reward('EMPTY', 0x0000), 0x11D0BB04),
	new Level(71, 1266378, 0x21D0BB08, 46, 39, 40, 38, 0x21D0BB0C, new Reward('EMPTY', 0x0000), 0x11D0BB10, new Reward('EMPTY', 0x0000), 0x11D0BB12, new Reward('EMPTY', 0x0000), 0x11D0BB14),
	new Level(72, 1315578, 0x21D0BB18, 46, 39, 42, 38, 0x21D0BB1C, new Reward('EMPTY', 0x0000), 0x11D0BB20, new Reward('EMPTY', 0x0000), 0x11D0BB22, new Reward('EMPTY', 0x0000), 0x11D0BB24),
	new Level(73, 1365578, 0x21D0BB28, 46, 40, 42, 38, 0x21D0BB2C, new Reward('Jackpot', 0x0196), 0x11D0BB30, new Reward('Negative Combo', 0x018A), 0x11D0BB32, new Reward('Air Combo Boost', 0x0187), 0x11D0BB34),
	new Level(74, 1416378, 0x21D0BB38, 46, 40, 42, 40, 0x21D0BB3C, new Reward('EMPTY', 0x0000), 0x11D0BB40, new Reward('EMPTY', 0x0000), 0x11D0BB42, new Reward('EMPTY', 0x0000), 0x11D0BB44),
	new Level(75, 1467978, 0x21D0BB48, 48, 41, 42, 40, 0x21D0BB4C, new Reward('EMPTY', 0x0000), 0x11D0BB50, new Reward('EMPTY', 0x0000), 0x11D0BB52, new Reward('EMPTY', 0x0000), 0x11D0BB54),
	new Level(76, 1520378, 0x21D0BB58, 48, 41, 44, 40, 0x21D0BB5C, new Reward('EMPTY', 0x0000), 0x11D0BB60, new Reward('EMPTY', 0x0000), 0x11D0BB62, new Reward('EMPTY', 0x0000), 0x11D0BB64),
	new Level(77, 1573578, 0x21D0BB68, 50, 42, 44, 40, 0x21D0BB6C, new Reward('EMPTY', 0x0000), 0x11D0BB70, new Reward('EMPTY', 0x0000), 0x11D0BB72, new Reward('EMPTY', 0x0000), 0x11D0BB74),
	new Level(78, 1627578, 0x21D0BB78, 50, 42, 44, 42, 0x21D0BB7C, new Reward('EMPTY', 0x0000), 0x11D0BB80, new Reward('EMPTY', 0x0000), 0x11D0BB82, new Reward('EMPTY', 0x0000), 0x11D0BB84),
	new Level(79, 1682378, 0x21D0BB88, 52, 43, 44, 42, 0x21D0BB8C, new Reward('EMPTY', 0x0000), 0x11D0BB90, new Reward('EMPTY', 0x0000), 0x11D0BB92, new Reward('EMPTY', 0x0000), 0x11D0BB94),
	new Level(80, 1737978, 0x21D0BB98, 52, 43, 46, 42, 0x21D0BB9C, new Reward('EMPTY', 0x0000), 0x11D0BBA0, new Reward('EMPTY', 0x0000), 0x11D0BBA2, new Reward('EMPTY', 0x0000), 0x11D0BBA4),
	new Level(81, 1794378, 0x21D0BBA8, 54, 44, 46, 42, 0x21D0BBAC, new Reward('EMPTY', 0x0000), 0x11D0BBB0, new Reward('EMPTY', 0x0000), 0x11D0BBB2, new Reward('EMPTY', 0x0000), 0x11D0BBB4),
	new Level(82, 1851578, 0x21D0BBB8, 54, 44, 46, 44, 0x21D0BBBC, new Reward('EMPTY', 0x0000), 0x11D0BBC0, new Reward('EMPTY', 0x0000), 0x11D0BBC2, new Reward('EMPTY', 0x0000), 0x11D0BBC4),
	new Level(83, 1909578, 0x21D0BBC8, 56, 45, 46, 44, 0x21D0BBCC, new Reward('EMPTY', 0x0000), 0x11D0BBD0, new Reward('EMPTY', 0x0000), 0x11D0BBD2, new Reward('EMPTY', 0x0000), 0x11D0BBD4),
	new Level(84, 1968378, 0x21D0BBD8, 56, 45, 48, 44, 0x21D0BBDC, new Reward('EMPTY', 0x0000), 0x11D0BBE0, new Reward('EMPTY', 0x0000), 0x11D0BBE2, new Reward('EMPTY', 0x0000), 0x11D0BBE4),
	new Level(85, 2027978, 0x21D0BBE8, 56, 46, 48, 44, 0x21D0BBEC, new Reward('Second Chance', 0x019F), 0x11D0BBF0, new Reward('Berserk Charge', 0x018B), 0x11D0BBF2, new Reward('Finishing Plus', 0x0189), 0x11D0BBF4),
	new Level(86, 2088378, 0x21D0BBF8, 56, 46, 48, 46, 0x21D0BBFC, new Reward('EMPTY', 0x0000), 0x11D0BC00, new Reward('EMPTY', 0x0000), 0x11D0BC02, new Reward('EMPTY', 0x0000), 0x11D0BC04),
	new Level(87, 2149578, 0x21D0BC08, 58, 47, 48, 46, 0x21D0BC0C, new Reward('EMPTY', 0x0000), 0x11D0BC10, new Reward('EMPTY', 0x0000), 0x11D0BC12, new Reward('EMPTY', 0x0000), 0x11D0BC14),
	new Level(88, 2211578, 0x21D0BC18, 58, 47, 50, 46, 0x21D0BC1C, new Reward('EMPTY', 0x0000), 0x11D0BC20, new Reward('EMPTY', 0x0000), 0x11D0BC22, new Reward('EMPTY', 0x0000), 0x11D0BC24),
	new Level(89, 2274378, 0x21D0BC28, 60, 48, 50, 46, 0x21D0BC2C, new Reward('EMPTY', 0x0000), 0x11D0BC30, new Reward('EMPTY', 0x0000), 0x11D0BC32, new Reward('EMPTY', 0x0000), 0x11D0BC34),
	new Level(90, 2337978, 0x21D0BC38, 60, 48, 50, 48, 0x21D0BC3C, new Reward('EMPTY', 0x0000), 0x11D0BC40, new Reward('EMPTY', 0x0000), 0x11D0BC42, new Reward('EMPTY', 0x0000), 0x11D0BC44),
	new Level(91, 2402378, 0x21D0BC48, 62, 49, 50, 48, 0x21D0BC4C, new Reward('EMPTY', 0x0000), 0x11D0BC50, new Reward('EMPTY', 0x0000), 0x11D0BC52, new Reward('EMPTY', 0x0000), 0x11D0BC54),
	new Level(92, 2467578, 0x21D0BC58, 62, 49, 52, 48, 0x21D0BC5C, new Reward('EMPTY', 0x0000), 0x11D0BC60, new Reward('EMPTY', 0x0000), 0x11D0BC62, new Reward('EMPTY', 0x0000), 0x11D0BC64),
	new Level(93, 2553578, 0x21D0BC68, 64, 50, 52, 48, 0x21D0BC6C, new Reward('EMPTY', 0x0000), 0x11D0BC70, new Reward('EMPTY', 0x0000), 0x11D0BC72, new Reward('EMPTY', 0x0000), 0x11D0BC74),
	new Level(94, 2600378, 0x21D0BC78, 64, 50, 52, 50, 0x21D0BC7C, new Reward('EMPTY', 0x0000), 0x11D0BC80, new Reward('EMPTY', 0x0000), 0x11D0BC82, new Reward('EMPTY', 0x0000), 0x11D0BC84),
	new Level(95, 2667978, 0x21D0BC88, 66, 51, 52, 50, 0x21D0BC8C, new Reward('EMPTY', 0x0000), 0x11D0BC90, new Reward('EMPTY', 0x0000), 0x11D0BC92, new Reward('EMPTY', 0x0000), 0x11D0BC94),
	new Level(96, 2736378, 0x21D0BC98, 66, 51, 54, 50, 0x21D0BC9C, new Reward('EMPTY', 0x0000), 0x11D0BCA0, new Reward('EMPTY', 0x0000), 0x11D0BCA2, new Reward('EMPTY', 0x0000), 0x11D0BCA4),
	new Level(97, 2805578, 0x21D0BCA8, 68, 52, 54, 50, 0x21D0BCAC, new Reward('EMPTY', 0x0000), 0x11D0BCB0, new Reward('EMPTY', 0x0000), 0x11D0BCB2, new Reward('EMPTY', 0x0000), 0x11D0BCB4),
	new Level(98, 2875578, 0x21D0BCB8, 68, 52, 54, 52, 0x21D0BCBC, new Reward('EMPTY', 0x0000), 0x11D0BCC0, new Reward('EMPTY', 0x0000), 0x11D0BCC2, new Reward('EMPTY', 0x0000), 0x11D0BCC4),
	new Level(99, 0, 0x21D0BCC8, 68, 53, 54, 52, 0x21D0BCCC, new Reward('Damage Control', 0x021E), 0x11D0BCD0, new Reward('Thunder Boost', 0x019A), 0x11D0BCD2, new Reward('Drive Converter', 0x021C), 0x11D0BCD4)
]