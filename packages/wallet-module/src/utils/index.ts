// 字符传转16进制
export const stringToHex = (
  str: string,
  withPrefix: boolean = true
): string => {
  const hex = Array.from(str)
    .map((char) => char.charCodeAt(0).toString(16).padStart(2, "0"))
    .join("");

  return withPrefix ? `0x${hex}` : hex;
};