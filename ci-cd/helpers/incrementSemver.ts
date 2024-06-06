export function incrementSemver(
  version: string,
  type: "major" | "minor" | "patch" | string,
): string {
  const [majorStr, minorStr, patchStr] = version.split(".");
  console.log([majorStr, minorStr, patchStr]);
  let major = parseInt(majorStr);
  let minor = parseInt(minorStr);
  let patch = parseInt(patchStr);

  switch (type) {
    case "major":
      major++;
      minor = 0;
      patch = 0;
      break;
    case "minor":
      minor++;
      patch = 0;
      break;
    case "patch":
      patch++;
      break;
  }

  return `${major}.${minor}.${patch}`;
}
