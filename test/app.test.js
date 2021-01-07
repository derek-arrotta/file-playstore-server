const { expect } = require("chai");
const supertest = require("supertest");
const app = require("../app");

describe("GET /apps", () => {
  it("should include all required keys", () => {
    return supertest(app)
      .get("/apps")
      .expect(200)
      .expect("Content-Type", /json/)
      .then((res) => {
        expect(res.body).to.be.an("array");
        expect(res.body).to.have.lengthOf.at.least(1);
        const app = res.body[0];
        expect(app).to.include.all.keys(
          "App",
          "Category",
          "Rating",
          "Reviews",
          "Size",
          "Installs",
          "Type",
          "Price",
          "Content Rating",
          "Genres",
          "Last Updated",
          "Current Ver",
          "Android Ver"
        );
      });
  });

  it("should be 400 if sort is incorrect", () => {
    return supertest(app)
      .get("/apps")
      .query({ sort: "MISTAKE" })
      .expect(400, "Sort must be one of Rating or App");
  });

  it("should be 400 if genre is incorrect", () => {
    return supertest(app)
      .get("/apps")
      .query({ genre: "MISTAKE" })
      .expect(400, "Genre must be one of Action, Puzzle, Strategy, Casual, Arcade, or Card");
  });

  it("should sort by app title (A-Z)", () => {
    return supertest(app)
      .get("/apps")
      .query({ sort: "App" })
      .expect(200)
      .expect("Content-Type", /json/)
      .then((res) => {
        expect(res.body).to.be.an("array");
        let sorted = true;

        let i = 0;
        // iterate once less than the length of the array
        // because we're comparing 2 items in the array at a time
        while (i < res.body.length - 1) {
          // compare book at `i` with next book at `i + 1`
          const bookAtI = res.body[i];
          const bookAtIPlus1 = res.body[i + 1];
          // if the next book is less than the book at i,
          if (bookAtIPlus1.title < bookAtI.title) {
            // the books were not sorted correctly
            sorted = false;
            break; // exit the loop
          }
          i++;
        }
        expect(sorted).to.be.true;
      });
  });

  it("should sort by genre", () => {
    return supertest(app)
      .get("/apps")
      .query({ genre: "Action" })
      .expect(200)
      .expect("Content-Type", /json/)
      .then((res) => {
        expect(res.body).to.be.an("array");
        let sorted = true;

        let i = 0;
        // iterate once less than the length of the array
        // because we're comparing 2 items in the array at a time
        while (i < res.body.length - 1) {
          // compare book at `i` with next book at `i + 1`
          const bookAtI = res.body[i];
          const bookAtIPlus1 = res.body[i + 1];
          // if the next book is less than the book at i,
          if (bookAtIPlus1.title < bookAtI.title) {
            // the books were not sorted correctly
            sorted = false;
            break; // exit the loop
          }
          i++;
        }
        expect(sorted).to.be.true;
      });
  });

});
