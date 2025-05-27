// Importing the Injectable decorator from Angular core to mark the class as a service
import { Injectable } from '@angular/core';

// Using @Injectable to define metadata that allows this service to be injected where needed
@Injectable({
  providedIn: 'root' // Makes the service available application-wide (singleton)
})
export class TimezoneService {

  // A private object mapping country names to IANA timezone strings
  private timezones: Record<string, string> = {
    'USA': 'America/New_York',     // Eastern Time (New York)
    'India': 'Asia/Kolkata',       // Indian Standard Time
    'Australia': 'Australia/Sydney'// Australian Eastern Standard Time
  };

  // Constructor – currently not doing anything, but ready for dependency injection if needed in the future
  constructor() { }

  /**
   * Get the IANA timezone string for a given country.
   * returns The corresponding timezone string or null if not found
   */
  getTimezone(country: string): string | null {
    try {
      return this.timezones[country] || null; // Return the timezone if found, otherwise null
    } catch (error) {
      console.error('Error getting timezone:', error); // Log error to console
      return null;
    }
  }

  /**
   * Get the current date and time for a given timezone.
   * returns An object containing the formatted date and time
   */
  getDateTimeForTimezone(timezone: string): { date: string, time: string } {
    try {
      // Create a new Date and format it for the given timezone
      const date = new Date().toLocaleDateString('en-US', { timeZone: timezone }); //en-GB
      const time = new Date().toLocaleTimeString('en-US', { timeZone: timezone });

      return { date, time };
    } catch (error) {
      // If something goes wrong (e.g., invalid timezone), return 'Invalid'
      console.error('Error getting date/time for timezone:', error);
      return { date: 'Invalid', time: 'Invalid' };
    }
  }
}
