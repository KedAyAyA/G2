import { Chart } from '@antv/g2';

fetch('https://gw.alipayobjects.com/os/antfincdn/C34i0tIT1U/linedata.json')
  .then((data) => data.json())
  .then((data) => {
    const chart = new Chart({
      container: 'container',
      autoFit: true,
      height: 500,
    });

    chart.data(data);
    chart.scale('year', {
      type: 'linear',
      tickInterval: 50,
    });
    chart.scale('value', {
      nice: true,
    });

    chart.tooltip({
      showCrosshairs: true,
      shared: true,
    });

    chart.area().adjust('stack').position('year*value').color('country');
    chart.line().adjust('stack').position('year*value').color('country');

    chart.interaction('element-highlight');
    chart.interaction('legend-filter', {
      start: [
        { trigger: 'legend-item-name:click', action: ['list-unchecked:toggle', 'data-filter:filter'] },
        { trigger: 'legend-item-marker:click', action: ['list-checked:checked', 'data-filter:filter'] },
      ],
      end: [{ trigger: 'legend-item-marker:dblclick', action: ['list-checked:reset', 'data-filter:filter'] }],
    });
    chart.render();
  });
