import { Inject, Injectable, InjectionToken } from "@angular/core";
import { AnalyticsImplementation, Metric } from "../analytics-demo/analytics-demo.interface";

export const ANALYTICS_IMPLEMENTATION = new InjectionToken<AnalyticsImplementation>(
  'AnalyticsImplementation'
);

@Injectable({
  providedIn: "root"
})
export class AnalyticsService {
  constructor (@Inject(ANALYTICS_IMPLEMENTATION) private implementation: AnalyticsImplementation) {}

  record(metric: Metric) {
    this.implementation.recordEvent(metric);
  }
}
