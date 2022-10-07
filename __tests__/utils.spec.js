import MockDate from 'mockdate'
import { jest } from '@jest/globals'
import {
  toLowerLine, getColor, randomNum, sortBirthdayTime, getConstellation, getWeatherCityInfo,
} from '../src/utils'
import config from '../config/exp-config.js'

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
    config.IS_SHOW_COLOR = false
    expect(getColor()).toBeUndefined()
    config.IS_SHOW_COLOR = true
    expect(getColor()).toMatch(/#[\dA-Fa-f]{6}/)
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
  test('getWeatherCityInfo', () => {
    expect(getWeatherCityInfo('北京', '顺义')).toEqual({
      area_code: '010',
      city_code: '101010400',
      city_name: '顺义区',
      ctime: '2019-07-11 16:56:44',
      id: 510,
      pid: 1,
      post_code: '101300',
    })
    expect(getWeatherCityInfo('咸阳', '长武')).toEqual({
      id: 2673,
      pid: 317,
      city_code: '101110209',
      city_name: '长武县',
      post_code: null,
      area_code: null,
      ctime: '2019-07-11 16:33:41',
    })
    expect(getWeatherCityInfo('', '长武县')).toEqual({
      id: 2673,
      pid: 317,
      city_code: '101110209',
      city_name: '长武县',
      post_code: null,
      area_code: null,
      ctime: '2019-07-11 16:33:41',
    })
    expect(getWeatherCityInfo('咸阳市', '长武县')).toEqual({
      id: 2673,
      pid: 317,
      city_code: '101110209',
      city_name: '长武县',
      post_code: null,
      area_code: null,
      ctime: '2019-07-11 16:33:41',
    })
    expect(getWeatherCityInfo('北京市', '顺义区')).toEqual({
      area_code: '010',
      city_code: '101010400',
      city_name: '顺义区',
      ctime: '2019-07-11 16:56:44',
      id: 510,
      pid: 1,
      post_code: '101300',
    })
    expect(getWeatherCityInfo('河南', '周口')).toEqual({
      area_code: '0394',
      city_code: '101181401',
      city_name: '周口',
      ctime: '2019-07-11 17:31:01',
      id: 162,
      pid: 10,
      post_code: '466000',
    })
    expect(getWeatherCityInfo('未知', '未知')).toBeNull()
    expect(getWeatherCityInfo('北京', '未知')).toEqual({
      area_code: '010',
      city_code: '101010100',
      city_name: '北京',
      ctime: '2019-07-11 17:30:06',
      id: 1,
      pid: 0,
      post_code: '100000',
    })
    expect(getWeatherCityInfo('安徽', '未知')).toBeNull()
  })
})
