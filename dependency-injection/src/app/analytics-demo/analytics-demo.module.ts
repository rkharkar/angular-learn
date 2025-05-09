import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Metric, AnalyticsImplementation } from "./analytics-demo.interface";
import { AnalyticsService } from "../services/analytics.service";

// added this ->
import { HttpClient, provideHttpClient } from "@angular/common/http";

@NgModule({
  imports: [CommonModule],
  providers: [
    provideHttpClient(),
    // add our API_URL provider
    { provide: "API_URL", useValue: "http://devserver.com" },
    {
      provide: AnalyticsService,

      // add our `deps` to specify the factory depencies
      deps: [HttpClient, "API_URL"],

      // notice we've added arguments here
      // the order matches the deps order
      useFactory(_http: HttpClient, apiUrl: string) {
        // create an implementation that will log the event
        const loggingImplementation: AnalyticsImplementation = {
          recordEvent: (metric: Metric): void => {
            console.log("The metric is:", metric);
            console.log("Sending to: ", apiUrl);
            // ... You'd send the metric using http here ...
          }
        };

        // create our new `AnalyticsService` with the implementation
        return new AnalyticsService(loggingImplementation);
      }
    }
  ],
  declarations: []
})
export class AnalyticsDemoModule {}
