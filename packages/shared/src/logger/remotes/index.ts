interface CommonLoggingParams {
  referrer: string;
  os: string;
  locale: string;
  device_id: string;
  user_agent: string;
  params?: Record<string, unknown>;
}

export interface ScreenLoggingParams extends CommonLoggingParams {
  log_type: 'screen';
}

export interface ClickLoggingParams extends CommonLoggingParams {
  log_type: 'click';
}

export interface ImpressionLoggingParams extends CommonLoggingParams {
  log_type: 'impression';
}

export type LoggingParams = ScreenLoggingParams | ClickLoggingParams | ImpressionLoggingParams;

export function fetchLog(id: number, params: LoggingParams) {
  fetch(`http://ec2-13-124-223-164.ap-northeast-2.compute.amazonaws.com:8080/api/log/v1/log/${id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json', // Set the content type to JSON
    },
    body: JSON.stringify(params),
  });
}
