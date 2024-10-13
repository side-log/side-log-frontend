interface CommonLoggingParams {
  referrer: string;
  os: string;
  locale: string;
  device_id: string;
  user_agent: string;
  params?: Record<string, unknown>;
}

export interface ScreenLoggingParams extends CommonLoggingParams {
  log_type: "screen";
}

export interface ClickLoggingParams extends CommonLoggingParams {
  log_type: "click";
}

export interface ImpressionLoggingParams extends CommonLoggingParams {
  log_type: "impression";
}

export type LoggingParams =
  | ScreenLoggingParams
  | ClickLoggingParams
  | ImpressionLoggingParams;

export function fetchLog(id: number, params: LoggingParams) {
  console.log(id, params);
}
