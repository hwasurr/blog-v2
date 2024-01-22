const READING_SPEED_PER_ONE_MINUTE = 1000; // 1분에 1000단어
export function getTimeToRead(contents: string): number {
  return Math.ceil(contents.length / READING_SPEED_PER_ONE_MINUTE);
}
