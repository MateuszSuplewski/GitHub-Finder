import nodeFetch from "node-fetch"
global.fetch = nodeFetch

it('Should check if true is true', () => {
    expect(true).toBe(true)
})