# Analytics Setup Guide

This guide will help you set up Google Spreadsheet analytics to automatically save all form responses.

## Step 1: Create Google Apps Script

1. Go to [Google Apps Script](https://script.google.com/)
2. Click **"New Project"**
3. Delete the default code
4. Copy and paste the code from `google-apps-script.js` in this repository
5. Name your project (e.g., "Clearity Protocol Analytics")
6. Click **Save** (💾 icon)

## Step 2: Deploy as Web App

1. Click **"Deploy"** button (top right)
2. Select **"New deployment"**
3. Click the gear icon ⚙️ next to "Select type"
4. Choose **"Web app"**
5. Configure the deployment:
   - **Description**: "Clearity Analytics Endpoint" (or any name)
   - **Execute as**: **Me** (your Google account)
   - **Who has access**: **Anyone**
6. Click **"Deploy"**
7. Review permissions and click **"Authorize access"**
8. Choose your Google account
9. Click **"Advanced"** → **"Go to [Project Name] (unsafe)"**
10. Click **"Allow"**
11. **Copy the Web App URL** (it looks like: `https://script.google.com/macros/s/ABC.../exec`)

## Step 3: Configure Your Application

1. Create a `.env` file in the root of your project:
   ```bash
   VITE_ANALYTICS_ENDPOINT=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
   ```
2. Replace `YOUR_SCRIPT_ID` with the actual URL you copied
3. Restart your development server

## Step 4: Verify It Works

1. Run your application
2. Complete the questionnaire
3. Check your Google Drive - a new spreadsheet called **"Clearity Protocol Responses"** should appear
4. Open it to see the responses

## Data Collected

The following data is saved for each submission:
- **Timestamp**: When the form was submitted
- **Chaos Level**: User's self-reported chaos level (0-10)
- **Failure Rate**: How often they fail to finish tasks (0-10)
- **Fight Noise**: Their current methods for fighting mental noise
- **Assistance Needed**: How Clearity can assist them
- **Contributions**: What they're willing to contribute
- **Name**: Contact name
- **Email**: Contact email
- **Telegram/Discord**: Social handle
- **User Agent**: Browser information
- **IP Address**: (if available from the request)

## Troubleshooting

### No data appearing in spreadsheet
- Verify the Web App URL is correct in your `.env` file
- Make sure you restarted your dev server after creating `.env`
- Check the Apps Script execution logs: Script Editor → "Executions" tab

### CORS errors in browser console
- This is normal! We use `mode: 'no-cors'` which prevents errors but also hides responses
- Data should still be saved to the spreadsheet

### Permission errors
- Ensure you selected "Execute as: Me" in deployment settings
- Ensure you selected "Who has access: Anyone" in deployment settings
- Re-deploy if you change these settings

## Viewing Your Data

Access your spreadsheet:
1. Go to [Google Drive](https://drive.google.com/)
2. Search for "Clearity Protocol Responses"
3. Open the spreadsheet to view all responses

You can:
- Download as CSV or Excel
- Create charts and visualizations
- Share with team members
- Set up email notifications for new responses

## Privacy Note

Make sure to comply with privacy regulations (GDPR, CCPA, etc.) when collecting user data. Consider adding:
- Privacy policy link
- Cookie consent banner
- Data retention policy
- User data deletion mechanism

