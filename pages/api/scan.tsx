import type { NextApiRequest, NextApiResponse } from "next";

import puppeteer, { Browser, Page } from "puppeteer";
import * as cheerio from "cheerio";
// import prettier from "prettier";

interface DataIssueList {
  total: number;
  inspectedCode: { id: number; line: string; desc: string }[];
}
interface DataIssue<T> {
  id: number;
  type: "high" | "medium" | "low";
  message: string;
  desc: string;
  data?: T;
}
interface SEOScanResult {
  message?: string;
  data?: {
    highLevel: DataIssue<DataIssueList>[];
  };
}

interface DataResult {
  message?: string;
  data?: {
    seo: Promise<SEOScanResult>;
  };
}

async function highLevelScan(html: string) {
  const $ = await cheerio.load(html);

  const highLevelData: DataIssue<DataIssueList>[] = [];

  // inspect H1
  const h1Count = $("h1").length;

  if (h1Count === 0) {
    highLevelData.push({
      id: 1,
      type: "high",
      message: "Missing H1 Tag Requirement Violation",
      desc: `The webpage violates the missing H1 tag requirement.
        A webpage should contain <h1> tag to ensure clarity & consistency in its heading structure. 
        Having more than one <h1> tag or duplicate <h1> tags can negatively impact the SEO performance 
        & user experience. Please ensure that the webpage has a single unique <h1> tag.`,
      data: {
        total: h1Count,
        inspectedCode: [],
      },
    });
  }

  if (h1Count > 1) {
    highLevelData.push({
      id: 1,
      type: "high",
      message: "Single H1 Tag Requirement Violation",
      desc: `violates the single H1 tag requirement.
        A webpage should contain only one <h1> tag to ensure clarity & consistency in its heading structure. 
        Having more than one <h1> tag or duplicate <h1> tags can negatively impact the SEO performance 
        & user experience. Please ensure that the webpage has a single unique <h1> tag.`,
      data: {
        total: h1Count,
        inspectedCode: [],
      },
    });
  }

  return highLevelData;
}

async function SEOScan(url: string): Promise<SEOScanResult> {
  const browser: Browser = await puppeteer.launch({ ignoreHTTPSErrors: true });

  const page: Page = await browser.newPage();

  await page.goto(url, { waitUntil: "networkidle2" });

  // get HTML from the page target
  const html: string = await page.evaluate(
    () => document.documentElement.outerHTML
  );

  const $ = await cheerio.load(html);

  // const prettyHtml: string = await prettier.format($.html(), {
  //   parser: "html",
  //   // printWidth: 10000,
  // });

  const highLevel = await highLevelScan(html);
  // const mediumLevel = await highLevelScan(html);
  // const lowLevel = await highLevelScan(html);

  // Memperindah HTML menggunakan Cheerio
  // const h1Count = $("h1").length;

  await browser.close();

  return {
    message: "success",
    data: {
      highLevel,
    },
  };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<DataResult>
) {
  const { url } = req.query;

  const seoScanResult = await SEOScan(url as string);

  res.status(200).json({
    message: "success",
    data: {
      seo: seoScanResult as Promise<SEOScanResult>,
    },
  });
}
