import path from "path";

const rootFolder = path.resolve(__dirname, "..", "..");

const vacationImagesFolder = path.join(rootFolder, "src", "assets", "images");

export const notFoundImageFile = path.join(
  rootFolder,
  "src",
  "assets",
  "images",
  "not-found.jpg"
);

export function getVacationImageFile(imageName: string) {
  if (!imageName) return null;
  return path.join(vacationImagesFolder, imageName);
}
