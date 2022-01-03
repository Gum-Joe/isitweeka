import {
  inject,
  /* inject, Application, CoreBindings, */
  lifeCycleObserver, // The decorator
  LifeCycleObserver, // The interface
} from '@loopback/core';
import { LoggingBindings, WinstonLogger } from '@loopback/logging';


const KECHB_ICAL_URL = "https://calendar.google.com/calendar/ical/calendar%40camphillboys.bham.sch.uk/public/basic.ics";
const KECHG_ICAL_URL = "https://calendar.google.com/calendar/ical/calendar%40kechg.org.uk/public/basic.ics"
/**
 * This class will be bound to the application as a `LifeCycleObserver` during
 * `boot`
 */
@lifeCycleObserver('')
export class GetWeekObserver implements LifeCycleObserver {
  /*
  constructor(
    @inject(CoreBindings.APPLICATION_INSTANCE) private app: Application,
  ) {}
  */

  // Inject a winston logger
  @inject(LoggingBindings.WINSTON_LOGGER)
  private logger: WinstonLogger;
  
  /**
   * This method will be invoked when the application initializes. It will be
   * called at most once for a given application instance.
   */
  async init(): Promise<void> {
    // Add your logic for init
    console.log("Initializing GetWeekObserver");
  }

  /**
   * This method will be invoked when the application starts.
   */
  async start(): Promise<void> {
    // Add your logic for start
    //this.logger.info("Initializing GetWeekObserver");
  }

  /**
   * This method will be invoked when the application stops.
   */
  async stop(): Promise<void> {
    // Add your logic for stop
  }
}
