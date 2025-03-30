export default class Tracker {
	constructor() {
		this.fire = 0
		this.blizzard = 0
		this.thunder = 0
		this.cure = 0
		this.reflect = 0
		this.magnet = 0
		this.pages = 0
		this.proofs = [0, 0, 0]
		this.reports = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
		this.drives = [0, 0, 0, 0, 0]
		this.summons = [0, 0, 0, 0]

		this.copy = () => {
			let ret = new Tracker()
			ret.fire = this.fire
			ret.blizzard = this.blizzard
			ret.thunder = this.thunder
			ret.cure = this.cure
			ret.reflect = this.reflect
			ret.magnet = this.magnet
			ret.pages = this.pages
			ret.proofs = [...this.proofs]
			ret.reports = [...this.reports]
			ret.drives = [...this.drives]
			ret.summons = [...this.summons]
			return ret
		}
		this.update = (newRewardIndex) => {
			let ret = this.copy()

			if (newRewardIndex === 0x15)
				ret.fire++
			else if (newRewardIndex === 0x16)
				ret.blizzard++
			else if (newRewardIndex === 0x17)
				ret.thunder++
			else if (newRewardIndex === 0x18)
				ret.cure++
			else if (newRewardIndex === 0x57)
				ret.reflect++
			else if (newRewardIndex === 0x58)
				ret.magnet++
			else if (newRewardIndex === 0x20)
				ret.pages++
			else if (newRewardIndex >= 0x251 && newRewardIndex <= 0x253)
				ret.proofs[newRewardIndex - 0x251]++
			else if (newRewardIndex >= 0xE2 && newRewardIndex <= 0xEE)
				ret.reports[newRewardIndex - 0xE2]++
			else if (newRewardIndex === 0x1A)
				//Valor
				ret.drives[0]++
			else if (newRewardIndex === 0x1B)
				//Wisdom
				ret.drives[1]++
			else if (newRewardIndex === 0x233)
				//Limit
				ret.drives[2]++
			else if (newRewardIndex === 0x1F)
				//Master
				ret.drives[3]++
			else if (newRewardIndex === 0x1D)
				//Final
				ret.drives[4]++
			else if (newRewardIndex === 0x17F)
				//Chicken Little
				ret.summons[0]++
			else if (newRewardIndex === 0x19)
				//Stitch
				ret.summons[1]++
			else if (newRewardIndex === 0x9F)
				//Genie
				ret.summons[2]++
			else if (newRewardIndex === 0xA0)
				//Peter Pan
				ret.summons[3]++

			return ret
		}
		this.saveToPnach = (pageName) => {
			let ret = '//' + pageName + ' TALLY\n'
			ret += this.fire !== 0 ? '// ' + this.fire + ' Fire spell(s)\n' : ''
			ret += this.blizzard !== 0 ? '// ' + this.blizzard + ' Blizzard spell(s)\n' : ''
			ret += this.thunder !== 0 ? '// ' + this.thunder + ' Thunder spell(s)\n' : ''
			ret += this.cure !== 0 ? '// ' + this.cure + ' Cure spell(s)\n' : ''
			ret += this.reflect !== 0 ? '// ' + this.reflect + ' Reflect spell(s)\n' : ''
			ret += this.magnet !== 0 ? '// ' + this.magnet + ' Magnet spell(s)\n' : ''
			ret += this.pages !== 0 ? '// ' + this.pages + ' Torn Page(s)\n' : ''
			ret += this.proofs[0] !== 0 ? '// ' + this.proofs[0] + ' Proof(s) of Connection\n' : ''
			ret += this.proofs[1] !== 0 ? '// ' + this.proofs[1] + ' Proof(s) of Nonexistence\n' : ''
			ret += this.proofs[2] !== 0 ? '// ' + this.proofs[2] + ' Proof(s) of Peace\n' : ''

			this.reports.forEach((report, index) => {
				ret += report !== 0 ? '// ' + report + ' Secret Ansem\'s Report(s) ' + (index + 1) + '\n' : ''
			})
			ret += this.drives[0] !== 0 ? '// ' + this.drives[0] + ' Valor Form(s)\n' : ''
			ret += this.drives[1] !== 0 ? '// ' + this.drives[1] + ' Wisdom Form(s)\n' : ''
			ret += this.drives[2] !== 0 ? '// ' + this.drives[2] + ' Limit Form(s)\n' : ''
			ret += this.drives[3] !== 0 ? '// ' + this.drives[3] + ' Master Form(s)\n' : ''
			ret += this.drives[4] !== 0 ? '// ' + this.drives[4] + ' Final Form(s)\n' : ''
			ret += this.summons[0] !== 0 ? '// ' + this.summons[0] + ' Baseball Charm(s)\n' : ''
			ret += this.summons[1] !== 0 ? '// ' + this.summons[1] + ' Ukulele Charm(s)\n' : ''
			ret += this.summons[2] !== 0 ? '// ' + this.summons[2] + ' Lamp Charm(s)\n' : ''
			ret += this.summons[3] !== 0 ? '// ' + this.summons[3] + ' Feather Charm(s)\n' : ''

			return ret
		}
		this.saveToLua = (pageName) => {
			let ret = '--' + pageName + ' TALLY\n'
			ret += this.fire !== 0 ? '-- ' + this.fire + ' Fire spell(s)\n' : ''
			ret += this.blizzard !== 0 ? '-- ' + this.blizzard + ' Blizzard spell(s)\n' : ''
			ret += this.thunder !== 0 ? '-- ' + this.thunder + ' Thunder spell(s)\n' : ''
			ret += this.cure !== 0 ? '-- ' + this.cure + ' Cure spell(s)\n' : ''
			ret += this.reflect !== 0 ? '-- ' + this.reflect + ' Reflect spell(s)\n' : ''
			ret += this.magnet !== 0 ? '-- ' + this.magnet + ' Magnet spell(s)\n' : ''
			ret += this.pages !== 0 ? '-- ' + this.pages + ' Torn Page(s)\n' : ''
			ret += this.proofs[0] !== 0 ? '-- ' + this.proofs[0] + ' Proof(s) of Connection\n' : ''
			ret += this.proofs[1] !== 0 ? '-- ' + this.proofs[1] + ' Proof(s) of Nonexistence\n' : ''
			ret += this.proofs[2] !== 0 ? '-- ' + this.proofs[2] + ' Proof(s) of Peace\n' : ''

			this.reports.forEach((report, index) => {
				ret += report !== 0 ? '-- ' + report + ' Secret Ansem\'s Report(s) ' + (index + 1) + '\n' : ''
			})
			ret += this.drives[0] !== 0 ? '-- ' + this.drives[0] + ' Valor Form(s)\n' : ''
			ret += this.drives[1] !== 0 ? '-- ' + this.drives[1] + ' Wisdom Form(s)\n' : ''
			ret += this.drives[2] !== 0 ? '-- ' + this.drives[2] + ' Limit Form(s)\n' : ''
			ret += this.drives[3] !== 0 ? '-- ' + this.drives[3] + ' Master Form(s)\n' : ''
			ret += this.drives[4] !== 0 ? '-- ' + this.drives[4] + ' Final Form(s)\n' : ''
			ret += this.summons[0] !== 0 ? '-- ' + this.summons[0] + ' Baseball Charm(s)\n' : ''
			ret += this.summons[1] !== 0 ? '-- ' + this.summons[1] + ' Ukulele Charm(s)\n' : ''
			ret += this.summons[2] !== 0 ? '-- ' + this.summons[2] + ' Lamp Charm(s)\n' : ''
			ret += this.summons[3] !== 0 ? '-- ' + this.summons[3] + ' Feather Charm(s)\n' : ''

			return ret
		}
	}
}