// PostHog Analytics Event Names
// Using const object to simulate enum for event tracking
export const ANALYTICS_EVENTS = {
  // Journey events
  JOURNEY_STARTED: 'journey_started',
  JOURNEY_DECLINED: 'journey_declined',
  JOURNEY_COMPLETED: 'journey_completed',
  
  // Stage progression events
  STAGE_ENTERED: 'stage_entered',
  STAGE_COMPLETED: 'stage_completed',
  
  // Form submission events
  CALIBRATION_1_SUBMITTED: 'calibration_1_submitted',
  CALIBRATION_2_SUBMITTED: 'calibration_2_submitted',
  COGNITION_1_SUBMITTED: 'cognition_1_submitted',
  COGNITION_2_SUBMITTED: 'cognition_2_submitted',
  COMMITMENT_SUBMITTED: 'commitment_submitted',
  CONTACT_INFO_SUBMITTED: 'contact_info_submitted',
  
  // CTA events
  ALIGNMENT_CALL_CLICKED: 'alignment_call_clicked',
} as const;

// Event properties interface for type safety
export interface StageEventProperties {
  stage: string;
  previousStage?: string;
}

export interface FormSubmissionProperties {
  stage: string;
  [key: string]: any;
}

