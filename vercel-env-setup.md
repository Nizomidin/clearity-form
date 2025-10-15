# Vercel Environment Variables Setup

## Quick Setup Guide

### 1. Go to Vercel Dashboard
- URL: https://vercel.com/dashboard
- Find your `clearity-waitlist` project

### 2. Add Environment Variables
Navigate to: **Settings** → **Environment Variables**

Add these two variables:

#### Variable 1:
- **Name:** `VITE_PUBLIC_POSTHOG_KEY`
- **Value:** `phc_DsC0xJMYsFNFpBOJYmo3A1RFET5uAVXQFp8yg3DrW9y`
- **Environment:** ✅ Production ✅ Preview ✅ Development

#### Variable 2:
- **Name:** `VITE_PUBLIC_POSTHOG_HOST`
- **Value:** `https://us.i.posthog.com`
- **Environment:** ✅ Production ✅ Preview ✅ Development

### 3. Redeploy
- Go to **Deployments** tab
- Click **"Redeploy"** on latest deployment
- Wait 2-3 minutes

### 4. Test
- Visit: https://clearity-waitlist.vercel.app
- Open browser console (F12)
- PostHog errors should be gone
- Go through form - events will track!

## What This Fixes
- ❌ Before: `PostHog was initialized without a token`
- ✅ After: PostHog will track all user interactions

## Verification
After setup, check PostHog dashboard:
- Go to: https://us.posthog.com/events
- You should see events from your live site
