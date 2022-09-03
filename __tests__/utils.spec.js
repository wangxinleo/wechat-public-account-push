import { toLowerLine, getColor, randomNum, sortBirthdayTime } from '../src/utils'
import MockDate from 'mockdate'

describe('utils', () => {
    test.concurrent.each([
        ['date', 'date'],
        ['minTemperature', 'min_temperature'],
        ['earthyLoveWords', 'earthy_love_words'],
        ['_earthyLoveWords', 'earthy_love_words']
    ])('%# toLowerLine %s', (src, expected) => {
        expect(toLowerLine(src)).toEqual(expected)
    })

    test.concurrent('getColor', () => {
        expect(getColor()).toMatch(/#[\dA-Fa-f]{6}/)
    })

    test.concurrent.each([
        [1, 5],
        [10, 20],
        [50, 80]
    ])('%# randomNum', (min, max) => {
        const random = randomNum(min, max)
        expect(random).toBeGreaterThanOrEqual(min)
        expect(random).toBeLessThanOrEqual(max)
    })

    test.concurrent('sortBirthdayTime', () => {
        MockDate.set('2022-02-09')
        expect(sortBirthdayTime([
            {
                date: '02-04'
            },
            {
                date: '03-06'
            },
            {
                date: '09-09'
            }
        ]).map((it) => ({ date: it.date }))).toEqual([
            {
                date: '03-06'
            },
            {
                date: '09-09'
            },
            {
                date: '02-04'
            }
        ])
        MockDate.reset()
    })
})
