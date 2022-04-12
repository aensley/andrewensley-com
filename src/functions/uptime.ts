/* global Response, fetch */

export const onRequestGet = async function (context) {
  let uptimeString = 'unknown'; // Default uptime
  let color = 'lightgray'; // Default color
  try {
    const pageId = await context.env.default.get('STATUSPAGE_PAGE_ID');
    const componentId = await context.env.default.get(
      'STATUSPAGE_COMPONENT_ID'
    );
    const apiKey = await context.env.default.get('STATUSPAGE_API_KEY');
    const uptimeResponse = await fetch(
      // https://developer.statuspage.io/#operation/getPagesPageIdComponentsComponentIdUptime
      `https://api.statuspage.io/v1/pages/${pageId}/components/${componentId}/uptime`,
      {
        headers: { Authorization: `OAuth ${apiKey}` },
        method: 'GET',
      }
    );

    if (uptimeResponse.status === 200) {
      const uptimeResponseJson: UptimeResponse = await uptimeResponse.json();
      let uptime = uptimeResponseJson.uptime_percentage;
      uptimeString = uptime + '%25'; // urlencoded '%'
      if (uptime >= 98.0) {
        color = 'brightgreen';
      } else if (uptime >= 95.0) {
        color = 'green';
      } else if (uptime >= 90.0) {
        color = 'yellowgreen';
      } else if (uptime >= 85.0) {
        color = 'yellow';
      } else if (uptime >= 80.0) {
        color = 'orange';
      } else {
        color = 'red';
      }
    }
  } catch (e) {}

  return new Response('', {
    status: 302, // Temporary redirect
    headers: {
      // https://shields.io/#your-badge
      Location: `https://img.shields.io/badge/uptime-${uptimeString}-${color}?style=flat-square`,
    },
  });
};

interface UptimeResponse {
  range_start: string;
  range_end: string;
  uptime_percentage: number;
  major_outage: number;
  partial_outage: number;
  warnings: string;
  id: string;
  name: string;
  related_events: object;
}
