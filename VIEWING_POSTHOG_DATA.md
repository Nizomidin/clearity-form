# Viewing Your Data in PostHog - Quick Start Guide

## 🚀 Quick Access Links

- **PostHog Dashboard**: https://us.posthog.com/
- **Your Project**: Look for the project with key `phc_DsC0xJMYsFNFpBOJYmo3A1RFET5uAVXQFp8yg3DrW9y`

---

## 📊 Step 1: View Live Events

### Navigate to Events:
1. Go to https://us.posthog.com/
2. Click **"Events"** in the left sidebar (or **"Activity"** → **"Live events"**)
3. You should see events coming in real-time as users interact with your form

### What You'll See:
```
✓ journey_started
✓ calibration_1_submitted (with chaos_level property)
✓ calibration_2_submitted (with failure_rate property)
✓ cognition_1_submitted (with response_length property)
✓ cognition_2_submitted (with response_length property)
✓ commitment_submitted (with contributions array)
✓ contact_info_submitted (with has_name, has_email, has_contact_method)
✓ alignment_call_clicked
✓ journey_completed
```

### Pro Tip:
- Click on any event to see its **properties** (the extra data we're sending)
- Look for `chaos_level`, `failure_rate`, `contributions`, etc.

---

## 👥 Step 2: View Identified Users

### Navigate to Persons:
1. Click **"Persons"** in the left sidebar
2. You'll see a list of all identified users (people who submitted contact info)

### What You'll See for Each User:
- **Email** (their identifier)
- **Properties**:
  - `name` - Full name
  - `email` - Email address
  - `contact_method` - Telegram/Discord handle
  - `chaos_level` - Their chaos score (0-10)
  - `failure_rate` - Their failure rate score (0-10)

### Click on a User to See:
- All events they've triggered
- Timeline of their journey through your form
- All their properties

---

## 📈 Step 3: Create Your First Funnel (HIGHLY RECOMMENDED!)

This shows you where users drop off in your form.

### Create Funnel:
1. Click **"Insights"** in the left sidebar
2. Click **"New insight"** button (top right)
3. Select **"Funnels"** as the insight type
4. Add these steps in order:

```
Step 1: journey_started
Step 2: calibration_1_submitted
Step 3: calibration_2_submitted
Step 4: cognition_1_submitted
Step 5: cognition_2_submitted
Step 6: commitment_submitted
Step 7: contact_info_submitted
Step 8: alignment_call_clicked
```

5. Click **"Save"** and give it a name like "Clearity Journey Funnel"

### What This Shows:
- **Conversion rate** at each step
- **Drop-off percentage** between steps
- Where users are getting stuck or leaving
- Overall completion rate

---

## 🔍 Step 4: Create Useful Insights

### Average Chaos Level of Users
1. **Insights** → **New Insight** → **Trends**
2. Event: `calibration_1_submitted`
3. Change "Total count" to "Property value" → **Average**
4. Select property: `chaos_level`
5. See average chaos level over time

### User Commitment Analysis
1. **Insights** → **New Insight** → **Trends**
2. Event: `commitment_submitted`
3. Breakdown by: `contribution_count`
4. See distribution of how many contributions users select

### Conversion Rate Over Time
1. **Insights** → **New Insight** → **Trends**
2. Compare two events:
   - `journey_started`
   - `journey_completed`
3. See the ratio of completions to starts

---

## 🎯 Step 5: Set Up User Segments (Cohorts)

### Create "High Chaos Users" Segment:
1. Click **"Cohorts"** in the left sidebar (under People)
2. Click **"New cohort"**
3. Name it: "High Chaos Users"
4. Add condition:
   - User property `chaos_level` ≥ 7
5. Save

### Create "Committed Users" Segment:
1. New cohort: "Committed Users"
2. Add condition:
   - User property `contribution_count` ≥ 3
3. Save

### Create "Completed Journey" Segment:
1. New cohort: "Completed Journey"
2. Add condition:
   - Performed event `alignment_call_clicked`
3. Save

### Why This Matters:
- Filter any insight by these cohorts
- Send targeted messages to specific groups
- Understand different user behaviors

---

## 🔔 Step 6: Set Up Alerts (Optional)

### Get Notified When Someone Completes:
1. Go to **"Alerts"** (may be under Settings)
2. Create new alert
3. Trigger: When `journey_completed` event happens
4. Get notified via email or Slack

### Alert for Drop-offs:
1. Create alert for funnel drop-off
2. Get notified if drop-off rate exceeds threshold

---

## 📊 Key Metrics to Watch

### 1. **Overall Conversion Rate**
- `journey_started` → `journey_completed`
- **Target**: Aim for > 30% initially

### 2. **Stage Drop-off Rates**
- Which stage loses the most users?
- Focus optimization efforts there

### 3. **Average Chaos Level**
- Are you attracting the right audience?
- High chaos users might convert better

### 4. **Contribution Selections**
- Which contribution type is most popular?
- Tells you what users want to do

### 5. **Contact Info Completion Rate**
- How many provide email vs just name?
- Measures trust/commitment level

---

## 🧪 Testing Checklist

Before going live, verify in PostHog:

- [ ] Navigate to Events → See `journey_started` event
- [ ] Complete form locally → See all events firing
- [ ] Check Persons → See yourself identified with email
- [ ] Create funnel → See your test journey
- [ ] Check event properties → Verify chaos_level, failure_rate, etc. are captured

---

## 🚨 Troubleshooting

### "I don't see any events"
1. Check browser console for PostHog debug logs
2. Make sure you're logged into the correct PostHog project
3. Verify `.env` file has correct `VITE_PUBLIC_POSTHOG_KEY`
4. Try hard refresh (Cmd+Shift+R or Ctrl+Shift+R)

### "Events show up but no user properties"
- User properties are only set after `contact_info_submitted` event
- Make sure you complete the form up to the contact stage

### "Events are delayed"
- PostHog can take 30-60 seconds to process events
- Refresh the Events page if needed

---

## 🎓 Advanced: Sample Queries

### Find Users Who Started But Didn't Finish
**Cohort**:
- Performed `journey_started`
- Did not perform `contact_info_submitted`
- In the last 7 days

### High Intent Users (Likely to Convert)
**Cohort**:
- User property `chaos_level` ≥ 7
- User property `contribution_count` ≥ 3
- Performed `contact_info_submitted`

### Users to Follow Up With
**Cohort**:
- Performed `contact_info_submitted`
- Did not perform `alignment_call_clicked`
- Has property `email` set

---

## 📚 Next Steps

1. ✅ Test your form and verify events in PostHog
2. ✅ Create your first funnel
3. ✅ Set up user segments/cohorts
4. ✅ Share insights with your team
5. ✅ Deploy to production with same PostHog config

---

## 🔗 Helpful PostHog Links

- **Events Explorer**: https://us.posthog.com/events
- **Persons**: https://us.posthog.com/persons
- **Insights**: https://us.posthog.com/insights
- **Funnels Guide**: https://posthog.com/docs/product-analytics/funnels
- **Cohorts Guide**: https://posthog.com/docs/data/cohorts

---

**Remember**: All events are being tracked in real-time, so every test you do shows up in PostHog. Use a different email when testing vs. real usage!

