import { table } from './table.js'

class Database {
	table(table) {
		return new Table(table)
	}
}
