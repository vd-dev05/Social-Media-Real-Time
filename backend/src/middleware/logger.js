import dayjs from 'dayjs'
import chalk from 'chalk'

export const logger = (req, res, next) => {
  const start = Date.now()

  res.on('finish', () => {
    const duration = Date.now() - start
    const time = dayjs().format('YYYY-MM-DD HH:mm:ss')
    const method = req.method
    const url = req.originalUrl
    const status = res.statusCode
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress
    const ua = req.headers['user-agent']?.split(') ')[0] || 'Unknown'

    const colorStatus = status >= 500
      ? chalk.red(status)
      : status >= 400
      ? chalk.yellow(status)
      : chalk.green(status)

    console.log(
      `[${chalk.gray(time)}] ${chalk.cyan(method)} ${chalk.yellow(url)} ${colorStatus} ${duration}ms - ${chalk.magenta(ip)} - ${chalk.blue(ua)}`
    )
  })

  next()
}
