/* eslint-disable react/no-array-index-key */
import { JSX, useMemo } from 'react';

const timeToCoffee = 5;
const timeToPizza = timeToCoffee * 2;
const timeToBeer = timeToPizza * 2;

const coffee = '☕️';
const pizza = '🍕';
const beer = '🍻';

const calculateTimeItem = (time: number): { item: string; restTime: number; end?: boolean } => {
  if (time >= timeToBeer) return { item: beer, restTime: time - timeToBeer };
  if (time >= timeToPizza) return { item: pizza, restTime: time - timeToPizza };
  if (time > timeToCoffee) return { item: coffee, restTime: time - timeToCoffee };
  return { item: coffee, restTime: time, end: true };
};
const getTimeItems = (time: number): string[] => {
  let _time = time;
  let endFlag = false;
  const arr = [];
  do {
    const { item, restTime, end } = calculateTimeItem(_time);
    _time = restTime;
    arr.push(item);
    endFlag = end || false;
  } while (!endFlag);
  return arr;
};
interface TimeToReadTextProps {
  timeToRead: number | null;
}
export default function TimeToReadText({ timeToRead = 0 }: TimeToReadTextProps): JSX.Element | null {
  const items = useMemo(() => {
    if (!timeToRead) return [];
    return getTimeItems(timeToRead);
  }, [timeToRead]);

  if (!timeToRead) return null;
  return (
    <span>
      <span>
        {items.map((i, idx) => (
          <span role="img" key={`${i}-${idx}`} aria-label="readtime-coffee">
            {i}
          </span>
        ))}
      </span>
      {' 읽는 데 '}
      {timeToRead}
      {' 분'}
    </span>
  );
}
