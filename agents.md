# AGENTS.md — Wrenchr Project Guide

## Project Context
Wrenchr is an uncompromised live auto repair finder & valuation engine.
Users input Year/Make/Model/Zipcode, select repair type (e.g., Tires, Smog, Brakes), and apply filters (Dealer vs ASE Certified / CARB Compliant Test-Only for CA).
Wrenchr scrapes, verifies, and analyzes real-time shop data across Google Places, Yelp, BBB, and CA BAR (Bureau of Automotive Repair) APIs.
It classifies shops into 3 distinct categories:
1. **Cheapest Option** (Lowest verified quote/rate)
2. **Highest Rated Option** (Top aggregate trust score across Yelp/Google/BBB)
3. **Sweet Spot / Best Value** (Optimal price-to-rating ratio)

## STRICT OPERATIONAL LAWS
1. **ZERO MOCK DATA / ZERO PLACEHOLDERS / ZERO FALLBACK LIES**: If live scraping/API fails or finds no results, return explicit failure / empty state errors with actionable details. Never serve fake numbers, mock reviews, or placeholder phones.
2. **MEMORY CONSERVATION RULE**: Maintain 3 memory files at project root:
   - `plans.md`: Backlog / upcoming roadmap.
   - `currentactions.md`: EXACTLY ONE active task.
   - `completed.md`: Append-only ledger of shipped tasks.
   - State transition sequence: `plans.md` -> `currentactions.md` -> [execute task] -> `completed.md` -> edit memory files BEFORE touching todo list.
3. **HUMAN-LIKE REQUEST PROXIES & RATE-LIMITING**: All scraping/HTTP dispatchers MUST use jittered delays (800ms-2200ms randomized), user-agent rotation, exponential backoff, and adhere to max allowable concurrency to prevent IP bans.
4. **PRIVACY & SECURITY**: No raw PII stored unencrypted. User ZIP codes and vehicle details are ephemeral query inputs. API keys stored strictly in `.env.local`.

## ARCHITECTURE OVERVIEW
- **Frontend / Fullstack Framework**: Next.js 14+ (App Router, Server Actions, React 18, Tailwind CSS, Lucide icons).
- **Backend / DB Layer**: PostgreSQL (Prisma ORM) for shop cache, pricing models, and search logs.
- **Scraper Engine**: Node.js custom HTTP fetcher with Cheerio, Playwright fallback, and REST adapters (Google Places API / Yelp Fusion API / BBB / CA BAR CARB registry API).
- **Location & Zipcode Engine**: Haversine distance calculator with zip-code geocoding.

## SETUP & DEV COMMANDS
- Install: `npm install`
- Dev Server: `npm run dev`
- DB Push: `npx prisma db push`
- DB Studio: `npx prisma studio`
- Build: `npm run build`
