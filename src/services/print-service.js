/* eslint-disable no-lonely-if */
/* eslint-disable no-undef */
/* eslint-disable class-methods-use-this */
/* eslint-disable prettier/prettier */
/* eslint-disable no-console */


class Print {
    constructor() {
        this.RED = '\x1b[31m'
        this.GREEN = '\x1b[32m'
        this.YELLOW = '\x1b[33m'
        this.MAGENTA = '\x1b[35m'
        this.CYAN = '\x1b[36m'
        this.WHITE = '\x1b[37m'
        this.RESET_COLOR = '\x1b[0m'
        this.BRIGHT = '\x1b[1m'

        this.title = `           ------------------------------------------${this.CYAN}  BANK HOURS  ${this.RESET_COLOR}-------------------------------------------`
        this.tableLine =
            '           +-------------------------------------------------------------------------------------------------+'
        this.tableLineWorkedDays =
            '           +--------------+--------------------------------------------------------------------+-------------+'
        this.tableLineHours =
            '           +--------------+----------+-----------+-----------+-----------+-----------+-----------+-----------+'
        this.tableLineHoursYears =
            '           +--------------+----------------------------------------------------------------------------------+'
        this.tableLineHoursMeio =
            '           |              +----------+-----------+-----------+-----------+-----------+-----------+-----------+'
        this.tableColumn = '           |'
        this.days = [
            'DOM',
            'SEG',
            'TER',
            'QUA',
            'QUI',
            'SEX',
            'SAB'
        ]
        this.months = [
            'Janeiro',
            'Fevereiro',
            'Março',
            'Abril',
            'Maio',
            'Junho',
            'Julho',
            'Agosto',
            'Setembro',
            'Outubro',
            'Novembro',
            'Dezembro'
        ]
    }

    showStatistics(statistics) {
        const years = Object.keys(statistics.workedDays)
        console.log()
        console.log()
        console.log(this.title)
        years.forEach(year => {
            console.log()
            console.log()
            console.log(
                `                                                          ${this.CYAN}${year}${this.RESET_COLOR}`
            )
            console.log()
            this.showWorkedDays(statistics.workedDays[year], statistics.incongruousDays[year])
            console.log()
            console.log()
            this.showHours(statistics.BankHours[year], year)
            console.log()
        })
    }

    showWorkedDays(statistics, errors) {
        console.log(this.tableLine)
        console.log(
            this.tableColumn,
            `                                       Dias Trabalhados                                         |`
        )
        console.log(this.tableLineWorkedDays)
        console.log(
            this.tableColumn,
            `    ${this.CYAN}Mês${this.RESET_COLOR}      |                               ${this.CYAN}Dias${this.RESET_COLOR}                                 |    ${this.CYAN}Total${this.RESET_COLOR}    |`
        )
        console.log(this.tableLineWorkedDays)
        this.months.forEach(month => {
            if (statistics[month]) {
                const numMonth = 9 - month.length
                let spaceMonth = ''
                for (let i = 0; i < numMonth; i++) {
                    spaceMonth += ' '
                }
                const days = statistics[month].workedDaysInMonth.toString()
                const numDay = 65 - days.length
                let spaceDay = ''
                for (let i = 0; i < numDay; i++) {
                    spaceDay += ' '
                }
                let daysToPrint = ''
                let j = 0
                for (let i = 0; i <= 31; i++) {
                    let day = i.toString()
                    day = day.length === 1 ? `0${day}` : day
                    if (statistics[month].workedDaysInMonth.indexOf(day) !== -1) {
                        if (errors[month].incongruousDaysInMonth.indexOf(day) === -1) daysToPrint += `${this.GREEN}${day}`
                        else daysToPrint += `${this.RED}${day}`
                        if (j !== statistics[month].workedDaysInMonth.length - 1) daysToPrint += `${this.RESET_COLOR},`
                        j++
                    }
                }

                daysToPrint += `${this.RESET_COLOR}`
                const total = statistics[month].workedDaysInMonth.length.toString()
                const numTotal = 8 - total.length
                let spaceTotal = ''
                for (let i = 0; i < numTotal; i++) {
                    spaceTotal += ' '
                }
                if (errors[month].incongruousDaysInMonth.length > 0) {
                    console.log(
                        this.tableColumn,
                        this.RED,
                        month,
                        spaceMonth,
                        this.RESET_COLOR,
                        '|',
                        daysToPrint,
                        spaceDay,
                        '|',
                        this.RED,
                        total,
                        this.RESET_COLOR,
                        spaceTotal,
                        '|'
                    )
                    console.log(this.tableLineWorkedDays)
                } else {
                    console.log(
                        this.tableColumn,
                        this.GREEN,
                        month,
                        spaceMonth,
                        this.RESET_COLOR,
                        '|',
                        daysToPrint,
                        spaceDay,
                        '|',
                        this.GREEN,
                        total,
                        this.RESET_COLOR,
                        spaceTotal,
                        '|'
                    )
                    console.log(this.tableLineWorkedDays)
                }
            }
        })
    }

    showHours(statistics, year) {
        console.log(this.tableLine)
        console.log(
            this.tableColumn,
            `                                            Horários                                            |`
        )
        console.log(this.tableLineHours)
        console.log(
            this.tableColumn,
            `     ${this.CYAN}Mês${this.RESET_COLOR}     |   ${this.CYAN}Dia${this.RESET_COLOR}    |     ${this.CYAN}1${this.RESET_COLOR}     |     ${this.CYAN}2${this.RESET_COLOR}     |     ${this.CYAN}3${this.RESET_COLOR}     |     ${this.CYAN}4${this.RESET_COLOR}     |   ${this.CYAN}Almoço${this.RESET_COLOR}  |   ${this.CYAN}Total${this.RESET_COLOR}   |`
        )
        const margin = 10 * 60 * 1000
        let totalYear = statistics.bankHoursInYear
        if (totalYear > 0) {
            if (totalYear > margin) totalYear = `${this.GREEN}${this.parseHour(totalYear)}${this.RESET_COLOR}`
            else totalYear = this.parseHour(totalYear)
        }
        else {
            if (totalYear * -1 > margin) totalYear = `${this.RED}${this.parseHour(totalYear)}${this.RESET_COLOR}`
            else totalYear = this.parseHour(totalYear)
        }
        this.months.forEach((month, index) => {

            if (statistics[month]) {
                console.log(this.tableLineHours)
                let totalMonth = statistics[month].bankHoursInMonth
                if (totalMonth > 0) {
                    if (totalMonth > margin) totalMonth = `${this.GREEN}${this.parseHour(totalMonth)}${this.RESET_COLOR}`
                    else totalMonth = this.parseHour(totalMonth)
                }
                else {
                    if (totalMonth * -1 > margin) totalMonth = `${this.RED}${this.parseHour(totalMonth)}${this.RESET_COLOR}`
                    else totalMonth = this.parseHour(totalMonth)
                }
                const numMonth = 9 - month.length
                let spaceMonth = ''
                let invisibleMonth = ''
                for (let i = 0; i < numMonth; i++) {
                    spaceMonth += ' '
                }
                for (let i = 0; i < month.length; i++) {
                    invisibleMonth += ' '
                }
                const days = Object.keys(statistics[month])
                const logMonth = parseInt(days.length / 2, 10)
                let daysPrinted = 0
                for (let i = 0; i <= 31; i++) {
                    let day = i.toString()
                    day = day.length === 1 ? `0${day}` : day
                    let monthToCompare = (index + 1).toString()
                    monthToCompare = monthToCompare.length === 1 ? `0${monthToCompare}` : monthToCompare
                    if (statistics[month][day]) {
                        const workDay = 8 * 60 * 60 * 1000 + 48 * 60 * 1000
                        const dayOfWeek = this.days[new Date(`${index + 1}/${day}/${year}`).getDay()]
                        const lunchMax = 1 * 60 * 60 * 1000 + 30 * 60 * 1000
                        const nulo = `${this.RED}*****${this.RESET_COLOR}`
                        const turn = 4 * 60 * 60 * 1000 + 24 * 60 * 1000
                        const lunchMin = 1 * 60 * 60 * 1000 + 15 * 60 * 1000
                        const point1 = statistics[month][day][1] ? this.parseHour(statistics[month][day][1]) : nulo
                        let point2 = statistics[month][day][2] ? this.parseHour(statistics[month][day][2]) : nulo
                        let point3 = statistics[month][day][3] ? this.parseHour(statistics[month][day][3]) : nulo
                        let point4 = statistics[month][day][4] ? this.parseHour(statistics[month][day][4]) : nulo
                        let toDay = new Date()
                        let dayA = toDay.getDate().toString()
                        dayA = dayA.length === 1 ? `0${dayA}` : dayA
                        let monthA = (toDay.getMonth() + 1).toString()
                        monthA = monthA.length === 1 ? `0${monthA}` : monthA
                        const yearA = toDay.getFullYear()
                        toDay = `${monthA}/${dayA}/${yearA}`
                        const dayToCompare = `${monthToCompare}/${day}/${year}`
                        let dayToPrint = `${this.GREEN}${day}${this.RESET_COLOR}`
                        let bank = statistics[month][day].bankHoursInDay
                        let lunch

                        if (toDay === dayToCompare) {
                            if (point1 !== nulo && point2 === nulo && point3 === nulo && point4 === nulo) {
                                statistics[month][day][2] = statistics[month][day][1] + turn
                                point2 = this.parseHour(statistics[month][day][2])
                                point2 = `${this.CYAN}${point2}${this.RESET_COLOR}`
                            }

                            if (point1 !== nulo && point2 !== nulo && point3 === nulo && point4 === nulo) {
                                statistics[month][day][3] = statistics[month][day][2] + lunchMin
                                point3 = this.parseHour(statistics[month][day][3])
                                point3 = `${this.CYAN}${point3}${this.RESET_COLOR}`
                            }

                            if (point1 !== nulo && point2 !== nulo && point3 !== nulo && point4 === nulo) {
                                point4 = statistics[month][day][3] + workDay + statistics[month][day][1] - statistics[month][day][2]
                                bank = - statistics[month][day][1] + statistics[month][day][2] - statistics[month][day][3] + point4 - workDay
                                point4 = this.parseHour(point4)
                                point4 = `${this.CYAN}${point4}${this.RESET_COLOR}`
                                statistics[month][day].lunchTimeInDay = statistics[month][day][3] - statistics[month][day][2]
                            }
                        }
                        if (point1 === nulo || point2 === nulo || point3 === nulo || point4 === nulo)
                            dayToPrint = `${this.RED}${day}${this.RESET_COLOR}`
                        if (bank > 0) {
                            if (bank > margin) bank = `${this.GREEN}${this.parseHour(bank)}${this.RESET_COLOR}`
                            else bank = this.parseHour(bank)
                        }
                        else {
                            if (bank * -1 > margin) {
                                bank = `${this.RED}${this.parseHour(bank)}${this.RESET_COLOR}`
                                dayToPrint = `${this.RED}${day}${this.RESET_COLOR}`
                            }
                            else bank = this.parseHour(bank)
                        }
                        if (statistics[month][day].lunchTimeInDay > lunchMax)
                            lunch = `${this.YELLOW}${this.parseHour(statistics[month][day].lunchTimeInDay)}${this.RESET_COLOR}`
                        else
                            lunch = `${this.GREEN}${this.parseHour(statistics[month][day].lunchTimeInDay)}${this.RESET_COLOR}`

                        if (daysPrinted === logMonth) {
                            console.log(
                                this.tableColumn,
                                ' ',
                                `${this.CYAN}${month}${this.RESET_COLOR}`,
                                spaceMonth,
                                '| ',
                                `${dayToPrint} ${dayOfWeek}`,
                                ' |  ',
                                point1,
                                '  |  ',
                                point2,
                                '  |  ',
                                point3,
                                '  |  ',
                                point4,
                                '  |',
                                this.RESET_COLOR,
                                lunch,
                                '  | ',
                                bank,
                                '  |'
                            )
                        }
                        else {
                            console.log(
                                this.tableColumn,
                                ' ',
                                invisibleMonth,
                                spaceMonth,
                                '| ',
                                `${dayToPrint} ${dayOfWeek}`,
                                ' |  ',
                                point1,
                                '  |  ',
                                point2,
                                '  |  ',
                                point3,
                                '  |  ',
                                point4,
                                '  |',
                                this.RESET_COLOR,
                                lunch,
                                '  | ',
                                bank,
                                '  |'
                            )
                        }
                        daysPrinted++
                    }
                }
                console.log(this.tableLineHoursMeio)
                console.log(
                    this.tableColumn,
                    `             |                               ${totalMonth}                                             |`
                )
            }
        })
        console.log(this.tableLineHours)
        console.log(
            this.tableColumn,
            `             |                                                                                  |`
        )
        console.log(
            this.tableColumn,
            `   ${this.CYAN}Total:${this.RESET_COLOR}    |                               ${totalYear}                                             |`
        )
        console.log(
            this.tableColumn,
            `             |                                                                                  |`
        )
        console.log(this.tableLineHoursYears)
    }

    parseHour(time) {
        if (Math.abs(time) < 1000 && time !== null) return ' 00:00'
        if (!time) return `${this.RED} *****${this.RESET_COLOR}`
        if (time > 9999999999) {
            const date = new Date(time)
            let hours = (date.getHours()).toString()
            let minutes = (date.getMinutes()).toString()
            if (hours.length === 1) hours = `0${hours}`
            if (minutes.length === 1) minutes = `0${minutes}`
            return `${hours}:${minutes}`
        }
        const signal = time > 0 ? ' ' : '-'
        let hours = parseInt(Math.abs(time) / 1000 / 60 / 60, 10).toString()
        let minutes = parseInt((Math.abs(time) - hours * 60 * 60 * 1000) / 1000 / 60, 10).toString()
        if (hours.length === 1) hours = `0${hours}`
        if (minutes.length === 1) minutes = `0${minutes}`
        const temp = `${signal}${hours}:${minutes}`
        if (temp === '-00:00') return ' 00:00'
        return temp
    }
}

module.exports = new Print()
