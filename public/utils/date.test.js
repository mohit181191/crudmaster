import { getDateObjectByFormat } from "./date.js";

describe("Testing date js util", function() {
    it("should return null supported format is not passed", function() {
        expect(getDateObjectByFormat("", "DD-MM-YYYY")).toBe(null);
    });
    it("checks if the date conversion is fine", function() {
        const date = getDateObjectByFormat("12/12/1980", "DD/MM/YYYY");
        expect(date.getFullYear()).toBe(1980);
        expect(date.getMonth()).toBe(11);
        expect(date.getDate()).toBe(12);
    });
});
