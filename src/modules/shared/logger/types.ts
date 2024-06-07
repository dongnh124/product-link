interface InfoContext {
  working?: boolean;
  mobileVersion?: string;
}

export interface CommonInfo extends Record<string, unknown> {
  correlationId?: string;
  context?: InfoContext;
}

export interface RequestInfo<T = Record<string, unknown>> extends CommonInfo {
  serviceName?: string;
  fromIp?: string;
  receivedAt?: number;
  method?: string;
  durations?: number;
  data?: T;
}

export interface EventInfo extends CommonInfo {
  serviceName?: string;
  receivedAt?: string;
  eventName?: string;
  data?: Record<string, unknown>;
}
