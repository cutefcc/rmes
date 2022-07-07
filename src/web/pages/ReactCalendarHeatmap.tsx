import CalendarHeatmap from 'react-calendar-heatmap';
import ReactTooltip from 'react-tooltip';
const today = new Date();

const ReactCalendarHeatmap = () => {
  const shiftDate = (date, numDays) => {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + numDays);
    return newDate;
  };

  const getRange = count => {
    return Array.from({ length: count }, (_, i) => i);
  };

  const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  const randomValues = getRange(200).map(index => {
    return {
      date: shiftDate(today, -index),
      count: getRandomInt(1, 3),
    };
  });
  return (
    <>
      <div>react-calendar-heatmap</div>
      <div>一个基于 SVG 的日历热图组件，灵感来自 github 的提交日历图。</div>
      <div>
        <h1>react-calendar-heatmap demos</h1>
        <p>Random values with onClick and react-tooltip</p>
        <CalendarHeatmap
          startDate={shiftDate(today, -150)}
          endDate={today}
          values={randomValues}
          classForValue={value => {
            if (!value) {
              return 'color-empty';
            }
            return `color-github-${value.count}`;
          }}
          tooltipDataAttrs={value => {
            return {
              'data-tip': `${value.date.toISOString().slice(0, 10)} has count: ${value.count}`,
            };
          }}
          showWeekdayLabels={true}
          onClick={value => alert(`Clicked on value with count: ${value.count}`)}
        />
        <ReactTooltip />
      </div>
    </>
  );
};
export default ReactCalendarHeatmap;
