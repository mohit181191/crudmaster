import { filterDataById } from "./filter.js";

describe("Testing filter js util", function() {
    it("should return null when data passed is null", function() {
        const filteredData = filterDataById(null, "tom", { fieldName: "preferredFullName", id: "FULL_NAME" });
        expect(filteredData).toBe(null);
    });
    it("should work fine", function() {
        const FAKE_DATA = [
            {
                id: 1,
                jobTitleName: "Developer",
                firstName: "Romin",
                lastName: "Irani",
                preferredFullName: "Romin Irani",
                employeeCode: "E1",
                region: "CA",
                dob: "01/10/1993",
                phoneNumber: "408-1234567",
                emailAddress: "romin.k.irani@gmail.com"
            },
            {
                id: 2,
                jobTitleName: "Developer",
                firstName: "Neil",
                lastName: "Irani",
                preferredFullName: "Neil Irani",
                employeeCode: "E2",
                region: "CA",
                dob: "01/10/1992",
                phoneNumber: "408-1111111",
                emailAddress: "neilrirani@gmail.com"
            },
            {
                id: 3,
                jobTitleName: "Program Directory",
                firstName: "Tom",
                lastName: "Hanks",
                dob: "05/12/1995",
                preferredFullName: "Tom Hanks",
                employeeCode: "E3",
                region: "CA",
                phoneNumber: "408-2222222",
                emailAddress: "tomhanks@gmail.com"
            }
        ];
        const filteredData = filterDataById(FAKE_DATA, "tom", { fieldName: "preferredFullName", id: "FULL_NAME" });
        expect(filteredData.length).toBe(1);
    });
});
