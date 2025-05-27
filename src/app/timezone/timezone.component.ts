// Import necessary Angular modules and utilities
import { Component, inject } from '@angular/core';         // Component decorator and dependency injection
import { CommonModule } from '@angular/common';            // Provides common Angular directives like *ngIf, *ngFor
import { FormsModule } from '@angular/forms';              // Enables use of [(ngModel)] for two-way data binding
import { TimezoneService } from '../timezone.service';     // Custom service to fetch timezone-related data

// Component decorator that defines metadata for the component
@Component({
  selector: 'app-timezone',                                // Selector used to embed this component in HTML
  standalone: true,                                        // Declares the component as standalone (no need for NgModule declaration)
  imports: [CommonModule, FormsModule],                    // Angular modules required for this component
  templateUrl: './timezone.component.html',                // Path to the component’s HTML template
  styleUrls: ['./timezone.component.css']                  // Path to the component’s CSS styling
})
export class TimezoneComponent {
  // Inject the TimezoneService using Angular's dependency injection
  private timezoneService = inject(TimezoneService);

  currentTime: string = '';                                
  currentDate: string = '';                               
  selectedCountry: string = '';           // Will be bound to the dropdown via ngModel

  // List of countries shown in the dropdown
  countries: string[] = ['USA', 'India', 'Australia'];  

  // Variables to store the time and date of the selected country
  countryTime: string = '';                               
  countryDate: string = '';                                

  // Constructor runs when the component is initialized
  constructor() {
    try {
      // Start a timer that updates both local and country time every second
      setInterval(() => {
        this.updateLocalTime();     // Update local system time
        this.updateCountryTime();   // Update selected country's time
      }, 1000);
    } catch (error) {
      console.error('Constructor Error:', error);   // Log any errors during setup
    }
  }

  // Updates the local system date and time
  updateLocalTime() {
    try {
      const now = new Date();                              // Get current system date and time
      this.currentTime = now.toLocaleTimeString();         // Format time 
      this.currentDate = now.toLocaleDateString();         // Format date 
    } catch (error) {
      console.error('Error updating local time:', error);   // Log errors
    }
  }

  // Updates the selected country's date and time using TimezoneService
  updateCountryTime() {
    try {
      // Only update if a country is selected
      if (this.selectedCountry) {
        // Get the timezone identifier (like "Asia/Kolkata") for the selected country
        const timezone = this.timezoneService.getTimezone(this.selectedCountry);

        // If timezone is valid, get the date and time for it
        if (timezone) {
          const { date, time } = this.timezoneService.getDateTimeForTimezone(timezone); // Get formatted date/time
          this.countryTime = time;   // Update country time display
          this.countryDate = date;   // Update country date display
        } else {
          // Fallback if timezone is invalid or not found
          this.countryTime = 'Invalid';
          this.countryDate = 'Invalid';
        }
      }
    } catch (error) {
      console.error('Error updating country time:', error);  // Log any errors
    }
  }

  // Called when user selects a country from the dropdown
  onCountryChange() {
    // Immediately update country time once on selection
    this.updateCountryTime();
  }
}
