import MockDate from 'mockdate'
import { jest } from '@jest/globals'
import {
  toLowerLine, getColor, randomNum, sortBirthdayTime, getConstellation,
} from '../src/utils'
import { config } from '../config'

jest.mock('../config')
describe('utils', () => {
  test.each([
    ['date', 'date'],
    ['minTemperature', 'min_temperature'],
    ['earthyLoveWords', 'earthy_love_words'],
    ['_earthyLoveWords', 'earthy_love_words'],
  ])('%# toLowerLine %s', (src, expected) => {
    expect(toLowerLine(src)).toEqual(expected)
  })

  test('getColor', () => {
    config.isShowColor = true
    expect(getColor()).toMatch(/#[\dA-Fa-f]{6}/)
    config.isShowColor = false
    expect(getColor()).toBeUndefined()
  })

  test.each([
    [1, 5],
    [10, 20],
    [50, 80],
  ])('%# randomNum', (min, max) => {
    const random = randomNum(min, max)
    expect(random).toBeGreaterThanOrEqual(min)
    expect(random).toBeLessThanOrEqual(max)
  })

  test('sortBirthdayTime', () => {
    MockDate.set('2022-02-09')
    expect(sortBirthdayTime([
      {
        date: '02-04',
      },
      {
        date: '03-06',
      },
      {
        date: '09-09',
      },
    ]).map((it) => ({ date: it.date }))).toEqual([
      {
        date: '03-06',
      },
      {
        date: '09-09',
      },
      {
        date: '02-04',
      },
    ])
    MockDate.reset()
  })
  test('getConstellation', () => {
    expect(getConstellation('09-22')).toEqual({ cn: '处女', en: 'virgo' })
    expect(getConstellation('09-23')).toEqual({ cn: '天秤', en: 'libra' })
  })
})
