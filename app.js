require('dotenv').config()
const CalendarService = require('./src/services/calendar-service')
const StatisticsService = require('./src/services/statistics-service')
const PrintService = require('./src/services/print-service')

async function main() {
    const path = process.env.COMPROVANTES_PATH
    const calendar = await CalendarService.buildCalendar(path)
    const statistics = StatisticsService.buildStatistics(calendar)
    PrintService.showStatistics(statistics)
}

main()
