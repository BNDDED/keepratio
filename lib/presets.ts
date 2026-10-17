export type Preset = {
  id: string;
  name: string;
  width: number;
  height: number;
  ratioWidth: number;
  ratioHeight: number;
  usedFor: string;
};

export const PRESETS: Preset[] = [
  {
    id: "hd-1080",
    name: "HD 1080p",
    width: 1920,
    height: 1080,
    ratioWidth: 16,
    ratioHeight: 9,
    usedFor: "YouTube and landscape video",
  },
  {
    id: "vertical-hd",
    name: "Vertical HD",
    width: 1080,
    height: 1920,
    ratioWidth: 9,
    ratioHeight: 16,
    usedFor: "TikTok, Instagram Reels, YouTube Shorts",
  },
  {
    id: "square",
    name: "Square",
    width: 1080,
    height: 1080,
    ratioWidth: 1,
    ratioHeight: 1,
    usedFor: "Instagram square and profile crops",
  },
  {
    id: "portrait",
    name: "Portrait",
    width: 1080,
    height: 1350,
    ratioWidth: 4,
    ratioHeight: 5,
    usedFor: "Instagram feed portrait",
  },
  {
    id: "hd-720",
    name: "HD 720p",
    width: 1280,
    height: 720,
    ratioWidth: 16,
    ratioHeight: 9,
    usedFor: "720p video and lighter exports",
  },
  {
    id: "uhd-4k",
    name: "4K UHD",
    width: 3840,
    height: 2160,
    ratioWidth: 16,
    ratioHeight: 9,
    usedFor: "4K masters and large screens",
  },
];

export function presetMatches(
  width: number,
  height: number,
): Preset | undefined {
  return PRESETS.find(
    (preset) =>
      Math.abs(preset.width - width) < 0.001 &&
      Math.abs(preset.height - height) < 0.001,
  );
}
