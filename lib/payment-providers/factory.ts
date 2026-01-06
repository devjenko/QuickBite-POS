// lib/payment-providers/factory.ts

import { PaymentProvider } from "./types";
import { ABAProvider } from "./aba-provider";
// import { WingProvider } from './wing-provider'; // Uncomment when you create Wing

// DEFINE VALID PROVIDER TYPES

// This is like a menu - these are the only options available
// TypeScript will prevent you from using anything else
export type ProviderType = "ABA" | "WING";

// You can add more providers here as you add them
// export type ProviderType = 'ABA' | 'WING' | 'ACLEDA' | 'CELLCARD';

// THE FACTORY CLASS

export class PaymentProviderFactory {
  //  Get a single provider

  /**
   * Gets a payment provider by type
   *
   * @param type - The provider type ('ABA' or 'WING')
   * @returns An instance of the payment provider
   *
   * Example usage:
   *   const provider = PaymentProviderFactory.getProvider('ABA');
   *   const qrData = await provider.generateLinkQR('user123');
   */
  static getProvider(type: ProviderType): PaymentProvider {
    // This is a switch statement - like an if/else chain
    // It checks which provider was requested and returns the right one

    switch (type) {
      case "ABA":
        // Return a new instance of ABA provider
        // "new" creates a fresh copy of the ABAProvider class
        return new ABAProvider();

      case "WING":
        // Wing is not implemented yet, so throw an error
        // When you create wing-provider.ts, you'll uncomment this:
        // return new WingProvider();
        throw new Error("Wing provider is not yet implemented");

      default:
        // If someone passes an invalid provider, throw an error
        throw new Error(`Unknown payment provider: ${type}`);
    }
  }

  //  Get all available providers

  /**
   * Gets all available payment providers
   * Useful for displaying a list of providers to users
   *
   * @returns Array of all provider instances
   *
   * Example usage:
   *   const allProviders = PaymentProviderFactory.getAllProviders();
   *   allProviders.forEach(provider => {
   *     console.log(provider.name); // "ABA", "WING", etc.
   *   });
   */
  static getAllProviders(): PaymentProvider[] {
    return [
      new ABAProvider(),
      // new WingProvider(), // Uncomment when implemented
    ];
  }

  //  Check if a provider is supported

  /**
   * Checks if a provider is supported
   *
   * @param type - The provider type to check
   * @returns true if supported, false otherwise
   *
   * Example usage:
   *   if (PaymentProviderFactory.isSupported('ABA')) {
   *     // ABA is supported
   *   }
   */
  static isSupported(type: string): boolean {
    const validProviders: ProviderType[] = ["ABA", "WING"];
    return validProviders.includes(type as ProviderType);
  }

  //  Get list of supported provider names

  /**
   * Gets list of all supported provider names
   * Useful for validation or displaying options
   *
   * @returns Array of provider names
   *
   * Example usage:
   *   const providers = PaymentProviderFactory.getSupportedProviders();
   *   // Returns: ['ABA', 'WING']
   */
  static getSupportedProviders(): ProviderType[] {
    return ["ABA", "WING"];
  }

  // METHOD 5: Get only active/implemented providers

  /**
   * Gets only the providers that are actually implemented
   * (Wing is not implemented yet, so it won't be included)
   *
   * @returns Array of implemented provider names
   *
   * Example usage:
   *   const activeProviders = PaymentProviderFactory.getActiveProviders();
   *   // Returns: ['ABA'] (until Wing is implemented)
   */
  static getActiveProviders(): ProviderType[] {
    const active: ProviderType[] = ["ABA"];

    // Add Wing when it's implemented
    // active.push('WING');

    return active;
  }
}
