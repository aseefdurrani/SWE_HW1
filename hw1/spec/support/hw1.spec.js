const { parseInput, createDate, formatDate, validInput } = require('../../hw1');

//one big decribe and the rest of the decribes nested in it becuase better for scalabiloty purpose
//not useful for this hw but may be useful when we get to our main project and testing
describe("HW1", function() {
    describe("parseInput function", function() {
        it("should correctly parse a valid input string", function() {
            const input = "19980118T230000";
            const result = parseInput(input);
            expect(result).toEqual({
                year: 1998,
                month: 0, // this because months are 0 indexed in JS
                day: 18,
                hour: 23,
                minute: 0,
                second: 0
            });
        });

        it("should fail to parse an input string with an incorrect month", function() {
            const input = "19981318T230000"; // Month 13 doesn't exist
            const result = parseInput(input);
            expect(validInput(result)).toBe(false);
        });

        it("should fail to parse an input string with wrong number of days", function() {
            const input = "19980230T230000"; // February does not have 30 days
            const result = parseInput(input);
            expect(validInput(result)).toBe(false);
        });

        it("should recognize a leap year", function() {
            const input = "20200229T230000"; // 2020 is a leap year, February has 29 days
            const result = parseInput(input);
            expect(validInput(result)).toBe(true);
        });

        it("should fail for a non-leap year February 29th", function() {
            const input = "20210229T230000"; // 2021 is not a leap year
            const result = parseInput(input);
            expect(validInput(result)).toBe(false);
        });

        it("should fail to parse an input string with an incorrect hour", function() {
            const input = "19980118T250000"; // Hour 25 does not exist
            const result = parseInput(input);
            expect(validInput(result)).toBe(false);
        });

        it("should fail to parse an input string with an incorrect minute", function() {
            const input = "19980118T236000"; // Minute 60 does not exist
            const result = parseInput(input);
            expect(validInput(result)).toBe(false);
        });

        it("should fail to parse an input string with an incorrect second", function() {
            const input = "19980118T230060"; // Second 60 does not exist
            const result = parseInput(input);
            expect(validInput(result)).toBe(false);
        });

        it("should fail for input with invalid characters in the year part", function() {
            const input = "199t0118T230000"; 
            const result = parseInput(input);
            expect(validInput(result)).toBe(false);
        });

        it("should fail for input with invalid characters in the month part", function() {
            const input = "19961t18T230000";
            const result = parseInput(input);
            expect(validInput(result)).toBe(false);
        });

        it("should fail for input with invalid characters in the day part", function() {
            const input = "1996011tT230000";
            const result = parseInput(input);
            expect(validInput(result)).toBe(false);
        });

        it("should fail for input with invalid characters in the time part", function() {
            const inputs = ["19980118T23000g", "19980118T2t0000", "19980118T230t00"];
            inputs.forEach(input => {
                const result = parseInput(input);
                expect(validInput(result)).toBe(false);
            });
        });

        it("should fail for input missing the 'T' character", function() {
            const input = "19980118230000";
            const result = parseInput(input);
            expect(validInput(result)).toBe(false);
        });

        it("should fail for input other than the 'T' character", function() {
            const input = "199801189230000";
            const result = parseInput(input);
            expect(validInput(result)).toBe(false);
        });

        it("should fail for input that is just a space", function() {
            const input = " ";
            const result = parseInput(input);
            expect(validInput(result)).toBe(false);
        });

        it("should fail for completely empty input", function() {
            const input = "";
            const result = parseInput(input);
            expect(validInput(result)).toBe(false);
        });
        
    });

    describe("createDate function", function() {
        it("should create a date object with correct input", function() {
            const components = { year: 1998, month: 0, day: 18, hour: 23, minute: 0, second: 0 };
            const date = createDate(components);
            expect(date instanceof Date).toBe(true);
            expect(date.getFullYear()).toBe(1998);
            
        });

    });

    describe("formatDate function", function() {
        it("should format a date correctly at midnight without minutes and seconds", function() {
            const date = new Date(1998, 0, 18, 0, 0, 0);
            const formattedDate = formatDate(date);
            expect(formattedDate).toBe("January 18, 1998, at 12 AM");
        });
        

    });

});


