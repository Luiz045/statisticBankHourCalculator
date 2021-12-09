const fs = require('fs/promises')

class CalendarBuilder {
    static async buildCalendar(path) {
        const calendar = {}

        const years = await this.listYears(path)
        for (let i = 0; i < years.length; i++) {
            const months = await this.listMonths(path, years[i])
            calendar[years[i]] = {}
            for (let j = 0; j < months.length; j++) {
                const days = await this.listDays(path, years[i], months[j])
                calendar[years[i]][months[j]] = days
            }
        }
        return calendar
    }

    static async listYears(path) {
        return fs.readdir(path, 'utf-8')
    }

    static async listMonths(path, year) {
        const pathMonths = `${path}/${year}`
        return fs.readdir(pathMonths, 'utf-8')
    }

    static async listDays(path, year, month) {
        const pathDays = `${path}/${year}/${month}`
        const files = await fs.readdir(pathDays, 'utf-8')
        const days = {}

        for (let i = 0; i < files.length; i++) {
            const pathFile = `${path}/${year}/${month}/${files[i]}`
            const [, day, number] = files[i].split('-')
            if (!days[day]) days[day] = {}
            days[day][number[0]] = (await fs.stat(pathFile, 'utf-8')).mtimeMs
        }
        return days
    }
}

module.exports = CalendarBuilder
