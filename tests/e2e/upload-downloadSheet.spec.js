const ExcelJs = require("exceljs");
// import { ExcelJs } from "exceljs";
import { test, expect } from "@playwright/test";

let output = { row: -1, column: -1 };
async function writeExcelTest(searchText, replaceText, change, filePath) {
  const workbook2 = new ExcelJs.Workbook();
  await workbook2.xlsx.readFile(filePath);
  const worksheet2 = workbook2.getWorksheet("Sheet1");
  await readExcel(worksheet2, searchText);
  //   write/modify into cell --> enable it if want to write/modify in file
  const cell2 = worksheet2.getCell(
    output.row,
    output.column + change.colChange,
  );
  cell2.value = replaceText;
  await workbook2.xlsx.writeFile(filePath);
}

async function readExcel(worksheet2, searchText) {
  worksheet2.eachRow((row2, rowNumber2) => {
    row2.eachCell((cell2, colNumber2) => {
      console.log(cell2.value);
      if (cell2.value === searchText) {
        //  console.log(rowNumber2, colNumber2);
        output.row = rowNumber2;
        output.column = colNumber2;
      }
    });
  });
}

test("Excel sheet upload & download validations", async ({ page }) => {
  const textSearch = "Mango";
  const updatevalue = "350";
  await page.goto("https://rahulshettyacademy.com/upload-download-test/");
  const downloadPromise = page.waitForEvent("download");
  await page.getByRole("button", { name: "Download" }).click();
  await downloadPromise;
  await writeExcelTest(
    "Mango",
    updatevalue,
    { rowChange: 0, colChange: 2 },
    "C:/Users/poong/Downloads/download.xlsx",
  );

  await page
    .locator("#fileinput")
    .setInputFiles("C:/Users/poong/Downloads/download.xlsx");
  const textLocator = page.getByText(textSearch);
  const desiredRow = await page.getByRole("row").filter({ has: textLocator });
  console.log(await desiredRow.locator("#cell-4-undefined").textContent());
  await expect(desiredRow.locator("#cell-4-undefined")).toContainText(
    updatevalue,
  );
});
