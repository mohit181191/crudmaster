import { getEnabledItems } from "./base.js";

describe("Testing base js util", function() {
    it("should return null when null is passed", function() {
        expect(getEnabledItems(null)).toBe(null);
    });
    it("should give have length 1", function() {
        let list = [
            { name: "mohit", enabled: true },
            { name: "john", enabled: false }
        ];
        const newList = getEnabledItems(list);
        expect(newList.length).toBe(1);
    });
});
