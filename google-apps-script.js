/**
 * Google Apps Script for Clearity Protocol Analytics
 * 
 * SETUP INSTRUCTIONS:
 * 1. Go to https://script.google.com/
 * 2. Create a new project
 * 3. Replace the default code with this script
 * 4. Click "Deploy" > "New deployment"
 * 5. Select type: "Web app"
 * 6. Set "Execute as": "Me"
 * 7. Set "Who has access": "Anyone"
 * 8. Click "Deploy"
 * 9. Copy the Web app URL and paste it in your .env file as VITE_ANALYTICS_ENDPOINT
 * 10. The script will automatically create a new sheet named "Clearity Responses" in your Google Drive
 */

function doPost(e) {
  try {
    // Parse the incoming JSON data
    const data = JSON.parse(e.postData.contents);
    
    // Get or create the spreadsheet
    const ss = getOrCreateSpreadsheet();
    const sheet = ss.getSheetByName('Responses') || ss.insertSheet('Responses');
    
    // Initialize headers if this is a new sheet
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        'Timestamp',
        'Chaos Level',
        'Failure Rate',
        'Fight Noise',
        'Assistance Needed',
        'Contributions',
        'Name',
        'Email',
        'Telegram/Discord',
        'User Agent',
        'IP Address (if available)'
      ]);
      
      // Format header row
      const headerRange = sheet.getRange(1, 1, 1, 11);
      headerRange.setFontWeight('bold');
      headerRange.setBackground('#4a5568');
      headerRange.setFontColor('#ffffff');
    }
    
    // Prepare the row data
    const timestamp = new Date();
    const row = [
      timestamp,
      data.chaosLevel || '',
      data.failureRate || '',
      data.fightNoise || '',
      data.assistance || '',
      Array.isArray(data.contribution) ? data.contribution.join(', ') : '',
      data.name || '',
      data.email || '',
      data.telegram || '',
      data.userAgent || '',
      data.ipAddress || ''
    ];
    
    // Append the data
    sheet.appendRow(row);
    
    // Auto-resize columns for better readability
    sheet.autoResizeColumns(1, 11);
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({ success: true, message: 'Data saved successfully' }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function getOrCreateSpreadsheet() {
  const scriptProperties = PropertiesService.getScriptProperties();
  let spreadsheetId = scriptProperties.getProperty('SPREADSHEET_ID');
  
  if (!spreadsheetId) {
    // Create a new spreadsheet
    const ss = SpreadsheetApp.create('Clearity Protocol Responses');
    spreadsheetId = ss.getId();
    scriptProperties.setProperty('SPREADSHEET_ID', spreadsheetId);
    return ss;
  }
  
  return SpreadsheetApp.openById(spreadsheetId);
}

// Test function - run this to verify the script works
function testScript() {
  const testData = {
    postData: {
      contents: JSON.stringify({
        chaosLevel: 7,
        failureRate: 5,
        fightNoise: 'Meditation and journaling',
        assistance: 'Help me stay focused',
        contribution: ['Share ideas', 'Join community'],
        name: 'Test User',
        email: 'test@example.com',
        telegram: '@testuser',
        userAgent: 'Test Browser'
      })
    }
  };
  
  const result = doPost(testData);
  Logger.log(result.getContent());
}

