# PostHog Analytics Implementation Guide

## ✅ What's Been Implemented

PostHog analytics has been successfully integrated into your Clearity Form application. Here's what's tracking:

### 1. **User Journey Events**
- `journey_started` - When user clicks "Yes" to begin the experience
- `journey_declined` - When user clicks "No" and gets the termination message
- `journey_completed` - When user clicks the final "Initiate Alignment Call" button

### 2. **Form Stage Completions**
Each stage submission is tracked with relevant context:

- **Calibration 1** (`calibration_1_submitted`)
  - Tracks: `chaos_level` (0-10)
  
- **Calibration 2** (`calibration_2_submitted`)
  - Tracks: `failure_rate` (0-10)
  
- **Cognition 1** (`cognition_1_submitted`)
  - Tracks: `response_length`, `has_response` (boolean)
  
- **Cognition 2** (`cognition_2_submitted`)
  - Tracks: `response_length`, `has_response` (boolean)
  
- **Commitment** (`commitment_submitted`)
  - Tracks: `contributions` (array), `contribution_count`
  
- **Contact Info** (`contact_info_submitted`)
  - Tracks: `has_name`, `has_email`, `has_contact_method` (booleans)

### 3. **User Identification**
When users submit their contact information, they are automatically identified in PostHog using:
- **Identifier**: User's email address
- **User Properties**:
  - `name` - User's full name
  - `email` - User's email
  - `contact_method` - Telegram/Discord/other contact info
  - `chaos_level` - Their chaos level score
  - `failure_rate` - Their failure rate score

### 4. **Call-to-Action Tracking**
- `alignment_call_clicked` - When user clicks "Initiate Alignment Call"

## 🎯 What This Enables

### In PostHog Dashboard, You Can Now:

1. **Track Funnel Performance**
   - See where users drop off in the journey
   - Measure conversion rates at each stage
   - Identify bottlenecks in the user experience

2. **Analyze User Segments**
   - Group users by chaos level (high vs low)
   - Segment by failure rate
   - See which contributions users select most
   - Identify users who complete vs abandon

3. **Build Cohorts**
   - "High Chaos Users" (chaos_level >= 7)
   - "Committed Users" (contribution_count > 2)
   - "Aligned Users" (clicked alignment call)

4. **Create Insights**
   - Average chaos level of users who complete the journey
   - Most common contribution selections
   - Time between stages
   - Conversion rate from start to CTA click

## 📊 Example PostHog Queries

### Conversion Funnel
```
1. journey_started
2. calibration_1_submitted
3. calibration_2_submitted
4. cognition_1_submitted
5. cognition_2_submitted
6. commitment_submitted
7. contact_info_submitted
8. alignment_call_clicked
```

### User Segments
- **High Chaos Segment**: `chaos_level >= 7`
- **High Commitment**: `contribution_count >= 3`
- **Likely to Convert**: Users who complete all stages quickly

## 🔧 Environment Variables

Make sure your `.env` file has:
```bash
VITE_PUBLIC_POSTHOG_KEY=phc_DsC0xJMYsFNFpBOJYmo3A1RFET5uAVXQFp8yg3DrW9y
VITE_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com
```

## 🚀 Next Steps

### 1. **View Your Data in PostHog**
   - Go to [PostHog Dashboard](https://us.posthog.com)
   - Navigate to "Events" to see all tracked events
   - Go to "Persons" to see identified users

### 2. **Create Your First Funnel**
   - Click "Insights" → "New Insight"
   - Select "Funnel"
   - Add the journey events in order
   - Analyze drop-off rates

### 3. **Set Up Alerts**
   - Create alerts for important events (e.g., journey completed)
   - Get notified when users click the alignment call CTA

### 4. **Deploy to Production**
   Make sure to:
   - Add your PostHog API key to your hosting provider's environment variables
   - Test events in production to ensure they're firing correctly
   - Set up proper user privacy settings in PostHog dashboard

## 📝 Event Naming Convention

All events follow a consistent naming pattern stored in `/src/lib/analytics.ts`:

```typescript
export const ANALYTICS_EVENTS = {
  JOURNEY_STARTED: 'journey_started',
  JOURNEY_DECLINED: 'journey_declined',
  // ... etc
}
```

This ensures:
- Consistency across the codebase
- Easy refactoring if event names need to change
- Type safety and autocomplete in your IDE

## 🔒 Privacy Considerations

- PostHog automatically respects "Do Not Track" browser settings
- User identification happens only after they explicitly provide contact info
- All data is stored in PostHog US cloud (configurable)
- Consider adding a privacy policy link to your form

## 📖 Additional Resources

- [PostHog Documentation](https://posthog.com/docs)
- [PostHog React Integration](https://posthog.com/docs/libraries/react)
- [Building Funnels](https://posthog.com/docs/user-guides/funnels)
- [User Identification](https://posthog.com/docs/integrate/identifying-users)

---

**Implementation Date**: October 15, 2025  
**PostHog Version**: posthog-js/react (latest)

