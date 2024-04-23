import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
  message: string;
  data: {
    seo: { code: string; title: string; level: string; description: string }[];
    security: {
      code: string;
      title: string;
      level: string;
      description: string;
    }[];
    stack: {
      code: string;
      title: string;
      description: string;
    }[];
  };
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  res.status(200).json({
    message: "success",
    data: {
      seo: [
        {
          code: "1",
          title: "missing h1",
          level: "hight",
          description: "h1 is missing",
        },
        {
          code: "2",
          title: "missing cannonical",
          level: "hight",
          description: "cannonical is missing",
        },
      ],
      security: [
        {
          code: "1",
          title: "Missing SSL",
          level: "hight",
          description: "SSL is missing",
        },
        {
          code: "2",
          title: "Missing Cors",
          level: "hight",
          description: "SSL is missing",
        },
      ],
      stack: [
        {
          code: "1",
          title: "Nextjs",
          description: "Frontend Framework lorem ipsum",
        },
        {
          code: "2",
          title: "Clounfare",
          description: "lorem ipusym",
        },
      ],
    },
  });
}
