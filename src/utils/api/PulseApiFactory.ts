import { IExecuteFunctions, ICredentialDataDecryptedObject } from 'n8n-workflow';
import { AccountApi } from './AccountApi';
import { PeopleApi } from './PeopleApi';
import { BasePulseApi } from './BasePulseApi';

export class PulseApiFactory {
  /**
   * Create an API helper instance based on the resource type
   * @param credentials The credentials to use for the API
   * @param resource The resource type (account, people, etc.)
   * @returns The appropriate API helper instance
   */
  static createApiHelper(credentials: ICredentialDataDecryptedObject, resource?: string): BasePulseApi | AccountApi | PeopleApi {
    if (!resource || resource === 'account' || resource === 'accountRole') {
      return new AccountApi(credentials);
    } else if (resource === 'people') {
      return new PeopleApi(credentials);
    }
    
    // Default to base API if resource type is not recognized
    return new BasePulseApi(credentials);
  }

  /**
   * Helper function to create a PulseApi instance from n8n credentials
   */
  static async getPulseApiHelper(
    executeFunctions: IExecuteFunctions,
    resource?: string,
  ): Promise<BasePulseApi | AccountApi | PeopleApi> {
    const credentials = await executeFunctions.getCredentials('pulseApi');

    if (!credentials) {
      throw new Error('No credentials provided for Pulse API');
    }

    return PulseApiFactory.createApiHelper(credentials, resource);
  }
}
