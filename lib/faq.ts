export type Faq = {
  question: string;
  answer: string;
};

export const FAQS: Faq[] = [
  {
    question: "What is an aspect ratio?",
    answer:
      "An aspect ratio is the proportional relationship between width and height. A 16:9 frame is 16 units wide for every 9 units tall. The units can be pixels or a CSS length. 1920×1080 and 1280×720 are different sizes with the same 16:9 shape.",
  },
  {
    question: "How does this aspect ratio calculator simplify a ratio?",
    answer:
      "KeepRatio divides the width and the height by their greatest common divisor, the largest whole number that fits both. 1920 and 1080 share a divisor of 120, so the simplified ratio is 16:9. 1080 and 1350 share a divisor of 270, so the ratio is 4:5.",
  },
  {
    question: "What is 16:9 in pixels?",
    answer:
      "16:9 does not lock you to one pixel size. Common 16:9 frames are 1280×720 (720p), 1920×1080 (HD), and 3840×2160 (4K UHD). Multiply a width by 9 and divide by 16 to get the matching height.",
  },
  {
    question: "What size is 9:16 for TikTok, Reels, and Shorts?",
    answer:
      "9:16 is the vertical video ratio. A common full-HD vertical frame is 1080×1920, used for TikTok, Instagram Reels, and YouTube Shorts. Start from that preset, or lock 9:16 and solve a different width.",
  },
  {
    question: "What aspect ratio should an Instagram portrait use?",
    answer:
      "A common Instagram feed portrait is 4:5, often exported at 1080×1350. Square posts are 1:1, often 1080×1080. Stories and Reels use 9:16, often 1080×1920. Landscape feed images are often near 1.91:1; enter the pixels you were given and KeepRatio will simplify them.",
  },
  {
    question: "How do I use the CSS aspect-ratio property?",
    answer:
      "Copy the declaration from the result, for example aspect-ratio: 16 / 9;. Put it on a container so the box keeps that proportion as the layout reflows. The two numbers match the simplified W:H ratio.",
  },
  {
    question: "Can I lock a ratio and calculate only one side?",
    answer:
      "Yes. Choose Lock ratio, enter a ratio such as 16:9 or 9:16, and type the width or the height you already know. KeepRatio fills the other side. A 16:9 frame that is 1280 pixels wide is 720 pixels tall.",
  },
  {
    question: "Are 1280×720 and 3840×2160 the same ratio as 1920×1080?",
    answer:
      "Yes. 1280×720, 1920×1080, and 3840×2160 all simplify to 16:9. They differ in resolution, not in shape. 1080×1920 is the same pixel count as HD turned on its side, and it simplifies to 9:16.",
  },
  {
    question: "Does KeepRatio upload images or batch crop?",
    answer:
      "No. This version does not upload files and does not crop a batch of images. You type the dimensions you already have. The math runs in your browser on keepratio.com.",
  },
];
