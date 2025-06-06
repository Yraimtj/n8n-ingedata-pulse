import { IExecuteFunctions } from 'n8n-workflow';
import { WorkflowApi } from '../../../utils/api/WorkflowApi';

export async function unassignActivityMember(
  executeFunctions: IExecuteFunctions,
  itemIndex: number,
  pulseApi: WorkflowApi,
): Promise<any> {
  const activityId = executeFunctions.getNodeParameter('activityId', itemIndex) as string;

  try {
    return await pulseApi.unassignActivityMember(activityId);
  } catch (error) {
    throw new Error('Error unassigning member from activity: ' + (error as Error).message);
  }
}

export async function assignActivityMember(
  executeFunctions: IExecuteFunctions,
  itemIndex: number,
  pulseApi: WorkflowApi,
): Promise<any> {
  const activityId = executeFunctions.getNodeParameter('activityId', itemIndex) as string;
  const accountId = executeFunctions.getNodeParameter('accountId', itemIndex) as string;
  const startWorking = executeFunctions.getNodeParameter('startWorking', itemIndex, false) as boolean;
  
  const assignData = {
    account_id: accountId,
    start_working: startWorking,
  };

  try {
    return await pulseApi.assignActivityMember(activityId, assignData);
  } catch (error) {
    throw new Error('Error assigning member to activity: ' + (error as Error).message);
  }
}

export async function getActivityList(
  executeFunctions: IExecuteFunctions,
  itemIndex: number,
  pulseApi: WorkflowApi,
): Promise<any> {
  const additionalFields = executeFunctions.getNodeParameter('additionalFields', itemIndex, {}) as {
    sort?: string;
    pageNumber?: number;
    pageSize?: number;
    filters?: { filter: Array<{ key: string; values: string }> };
    fields?: { field: Array<{ key: string; fields: string }> };
  };


  try {
    return await pulseApi.getActivityList(additionalFields);
  } catch (error) {
    throw new Error('Error fetching activity list: ' + (error as Error).message);
  }
}
