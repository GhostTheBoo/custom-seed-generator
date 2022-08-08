export class Cheat {
	constructor(name, pnachCode, luaCode) {
		this.name = name
		this.pnachCode = [...pnachCode]
		this.luaCode = [...luaCode]
		this.toBeReplaced = false
		this.isActive = false

		this.copy = () => {
			let ret = new Cheat(this.name, [...this.pnachCode], [...this.luaCode])
			ret.toBeReplaced = this.toBeReplaced
			ret.isActive = this.isActive
			return ret
		}
		this.toggle = () => {
			let ret = this.markForReplacement(false)
			ret.isActive = !this.isActive
			return ret
		}
		this.markForReplacement = (toBeReplaced) => {
			let ret = this.copy()
			ret.toBeReplaced = toBeReplaced
			return ret
		}
		this.saveToJSON = () => {
			return this.isActive ? JSON.stringify(this, ['name', 'isActive']) + ',' : ''
		}
		this.loadFromJSON = () => {
			let ret = this.copy()
			ret.isActive = true
			ret.toBeReplaced = false
			return ret
		}
		this.saveToPnach = () => {
			return this.isActive ? '//' + this.name + '\n' + this.pnachCode.join('\n') + '\n' : ''
		}
		this.saveToLua = () => {
			return this.isActive ? '\t--' + this.name + '\n' + this.luaCode.join('\n') + '\n\n' : ''
		}
	}
}

export const zipCheatsData = []