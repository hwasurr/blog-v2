import dayjs from 'dayjs';
import relative from 'dayjs/plugin/relativeTime';
import ko from 'dayjs/locale/ko';

dayjs.extend(relative);
dayjs.locale(ko);
export const formatDate = (dateStr: string, suffix = ''): string => {
  const oneYearAgo = dayjs().subtract(1, 'year');
  const day = dayjs(dateStr);
  if (day.isBefore(oneYearAgo)) return `${day.format('YYYY년 MM월 DD일')} ${suffix}`;
  return day.fromNow();
};
