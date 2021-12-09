/* eslint-disable eqeqeq */
class StatisticsService {
    static buildStatistics(calendar) {
        const workedDays = this.workedDaysCalculator(calendar)
        const incongruousDays = this.incongruousDaysCalculator(calendar)
        const BankHours = this.BankHoursCalculator(incongruousDays, calendar)
        return { workedDays, incongruousDays, BankHours }
    }

    static workedDaysCalculator(calendar) {
        const instance = JSON.parse(JSON.stringify(calendar))

        Object.keys(instance).forEach(year => {
            let workedDaysInYear = 0
            Object.keys(instance[year]).forEach(month => {
                const workedDaysInMonth = Object.keys(instance[year][month])
                instance[year][month] = { workedDaysInMonth }
                workedDaysInYear += workedDaysInMonth.length
            })
            instance[year].workedDaysInYear = workedDaysInYear
        })
        return instance
    }

    static incongruousDaysCalculator(calendar) {
        const instance = JSON.parse(JSON.stringify(calendar))

        Object.keys(instance).forEach(year => {
            let incongruousDaysInYear = 0
            Object.keys(instance[year]).forEach(month => {
                const incongruousDaysInMonth = []
                Object.keys(instance[year][month]).forEach(day => {
                    if (Object.keys(instance[year][month][day]).toString() !== '1,2,3,4')
                        incongruousDaysInMonth.push(day)
                })
                instance[year][month] = { incongruousDaysInMonth }
                incongruousDaysInYear += incongruousDaysInMonth.length
            })
            instance[year].incongruousDaysInYear = incongruousDaysInYear
        })
        return instance
    }

    static BankHoursCalculator(incongruousDays, calendar) {
        const instance = JSON.parse(JSON.stringify(calendar))
        const workDay = 8 * 60 * 60 * 1000 + 48 * 60 * 1000
        const marginTime = 10 * 60 * 1000

        Object.keys(instance).forEach(year => {
            let bankHoursInYear = 0
            Object.keys(instance[year]).forEach(month => {
                let bankHoursInMonth = 0
                Object.keys(instance[year][month]).forEach(day => {
                    let bankHoursInDay = 0
                    let lunchTimeInDay = 0
                    if (incongruousDays[year][month].incongruousDaysInMonth.indexOf(day) === -1) {
                        Object.keys(instance[year][month][day]).forEach(point => {
                            const pointTime = parseInt(instance[year][month][day][point], 10)
                            instance[year][month][day][point] = pointTime
                            if (point === '1') bankHoursInDay -= pointTime
                            else if (point === '2') {
                                bankHoursInDay += pointTime
                                lunchTimeInDay -= pointTime
                            } else if (point === '3') {
                                bankHoursInDay -= pointTime
                                lunchTimeInDay += pointTime
                            } else if (point === '4') bankHoursInDay += pointTime
                        })
                        bankHoursInDay -= workDay
                    } else {
                        bankHoursInDay = null
                        lunchTimeInDay = null
                    }

                    instance[year][month][day].bankHoursInDay = bankHoursInDay
                    instance[year][month][day].lunchTimeInDay = lunchTimeInDay
                    if (bankHoursInDay > 0 && bankHoursInDay < marginTime) bankHoursInDay = 0
                    else if (bankHoursInDay < 0 && bankHoursInDay * -1 < marginTime) bankHoursInDay = 0
                    bankHoursInMonth += bankHoursInDay
                })
                instance[year][month].bankHoursInMonth = bankHoursInMonth
                bankHoursInYear += bankHoursInMonth
            })
            instance[year].bankHoursInYear = bankHoursInYear
        })

        return instance
    }
}
module.exports = StatisticsService
