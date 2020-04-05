const fs = require("fs");
const logUpdate = require("log-update");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const input = process.argv[2] || "index.html";
const output = input.replace("html", "json");

logUpdate(`Reading ${input}`);

JSDOM.fromFile(input)
  .then((dom) => {
    const {
      window: { document },
    } = dom;
    const areas = document.querySelectorAll("span.cls_012");
    const dateRange = document.querySelectorAll("span.cls_011");
    const country = document.querySelector("span.cls_003");

    logUpdate(`Parsing ${input}`);
    const data = Array.from(areas).reduce((obj, area, index) => {
      const name = area.innerHTML;
      const rawValues = document.querySelectorAll("span.cls_013,span.cls_016");

      const values = Array.from(rawValues)
        .slice(index * 6, (index + 1) * 6)
        .map((sector) => sector.innerHTML);

      const value = {
        "Retail & recreation": values[0],
        "Grocery & pharmacy": values[1],
        Parks: values[2],
        "Transit stations": values[3],
        Workplace: values[4],
        Residential: values[5],
      };

      return {
        ...obj,
        [name]: value,
      };
    }, {});

    const result = {
      country: country.innerHTML.trim(),
      startDate: dateRange[0].innerHTML,
      endDate: dateRange[2].innerHTML,
      numberOfAreas: areas.length,
      data,
    };

    try {
      logUpdate(`Done! Data saved as ${output}`);
      fs.writeFileSync(output, JSON.stringify(result, null, 2));
    } catch (err) {
      console.error(err);
    }
  })
  .catch(console.error);
