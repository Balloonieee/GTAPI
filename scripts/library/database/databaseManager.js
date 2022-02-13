import { table } from './table.js'

class Database {
	table(table) {
		return new Table(table)
	}
}

export const database = new Database()
