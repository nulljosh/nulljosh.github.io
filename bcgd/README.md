# BC Garage Doors (BCGD) - Project & Growth Plan

Modern redesign of [bcgaragedoors.ca](https://bcgaragedoors.ca) and the launchpad for an AI-powered service-business operating system.

Live site: [heyitsmejosh.com/bcgd](https://heyitsmejosh.com/bcgd/)

---

## What this project actually is

BCGD is not just a website redesign.

It has 2 layers:

1) Conversion website (today)
- High-intent local landing page
- Emergency-first CTA paths (call now, fast quote)
- Trust stack (family-owned, reviews, local coverage)
- Service pages/sections that convert traffic to booked jobs

2) Service ops automation product (buildout)
- AI phone handling (after-hours + overflow)
- Automated scheduling + dispatch
- Quote follow-up + reminder sequences
- Job pipeline visibility (lead -> booked -> completed -> paid)
- Payment reminders + collections workflows

The website is the wedge. The product is the compounding engine.

---

## Business target and reality

Target: build toward a business with billion-dollar valuation potential.

Important reality:
- $1B valuation does not come from one local garage door company alone.
- $1B comes from turning this into a repeatable software + automation platform for many service businesses.

So the strategy is:
- Prove ROI on BCGD first
- Productize the workflow
- Scale across home-service verticals

---

## Core thesis

Service businesses lose huge money on:
- Missed calls
- Slow follow-ups
- Scheduling friction
- Quote leakage
- Poor collections flow

If we automate these reliably, we increase:
- Bookings
- Revenue per lead
- Speed to cash
- Owner visibility

And that creates a product people pay for monthly.

---

## Product roadmap (from site to platform)

### Phase 1 - Conversion + Capture (0-90 days)
Goal: turn traffic and calls into measurable booked jobs.

Build:
- Fast quote flow (minimal fields)
- Emergency routing UX
- Click-to-call and missed-call recovery hooks
- Event tracking for funnel analytics

KPIs:
- Lead -> booked conversion rate
- Missed-call callback rate
- Time to first response

### Phase 2 - AI Phone + Scheduling (3-6 months)
Goal: stop revenue leakage from phone + scheduling gaps.

Build:
- AI call handling for overflow/after-hours
- Intent extraction (emergency vs non-emergency)
- Calendar booking automation
- Dispatch logic by service area + urgency

KPIs:
- Calls answered rate
- Booking rate from inbound calls
- Average response latency

### Phase 3 - Follow-up + Pipeline (6-12 months)
Goal: improve close rate and reduce drop-off.

Build:
- Quote follow-up sequences (day 0/1/3/7)
- Appointment reminders + no-show recovery
- Pipeline dashboard (new, qualified, booked, completed, invoiced, paid)

KPIs:
- Quote close rate
- No-show rate
- Days from lead to booked

### Phase 4 - Payments + Reactivation (12-18 months)
Goal: accelerate cash collection and revive dormant customers.

Build:
- Invoice reminder automation
- Failed-payment retries
- Seasonal maintenance/reactivation campaigns

KPIs:
- Days sales outstanding (DSO)
- Recovery revenue
- Reactivation rate

### Phase 5 - Productization for other businesses (18-30 months)
Goal: move from one business system to multi-account SaaS/automation platform.

Build:
- Multi-tenant architecture
- Self-serve onboarding + templates
- Integrations (Twilio, calendar, CRM, payments)
- Role-based dashboards

KPIs:
- MRR/ARR
- Churn
- Net revenue retention
- CAC payback

### Phase 6 - Vertical expansion (30+ months)
Goal: scale beyond garage doors into adjacent home-service categories.

Targets:
- HVAC
- Plumbing
- Electrical
- Roofing
- General contractors

Moat:
- Workflow/IP compounding
- Vertical conversation + conversion data
- Proven ROI playbooks by niche

---

## Go-to-market plan

### Stage A: local proof
- Start with BCGD as flagship case study
- Prove clear revenue lift from automation
- Document before/after metrics

### Stage B: nearby operators
- Sell to similar businesses in Lower Mainland
- Offer setup + monthly automation fee
- Keep deployment tight and repeatable

### Stage C: packaged offering
- Turn services into productized plans:
  - Starter (phone + booking)
  - Growth (follow-up + pipeline)
  - Pro (payments + reactivation + analytics)

---

## Revenue model

Hybrid pricing (best for this market):
- Setup fee (implementation)
- Monthly platform fee
- Optional performance fee tied to outcomes

Why hybrid:
- Setup covers onboarding labor
- Monthly creates compounding recurring revenue
- Performance aligns incentives with client ROI

---

## Operating system (how we execute)

Weekly rhythm:
- Ship one conversion or ops improvement
- Review funnel and booking metrics
- Remove one friction point from customer journey
- Add one automation rule with measurable impact

Monthly rhythm:
- KPI review + roadmap adjustment
- Reliability hardening
- Case study capture

Non-negotiables:
- No feature without KPI tie-in
- No vanity design work without conversion impact
- Fast iteration, but with measurable outcomes

---

## Risks and mitigations

Risk: overbuilding tech before proving demand
- Mitigation: revenue-first milestones and pilot constraints

Risk: fragile automations
- Mitigation: logging, retries, alerting, runbooks

Risk: poor adoption by owners/teams
- Mitigation: simple UX, clear ROI dashboards, white-glove onboarding

Risk: dilution of focus
- Mitigation: BCGD as wedge, then expand only after playbook is repeatable

---

## 90-day execution checklist

- [ ] Instrument full funnel analytics on site
- [ ] Launch fast quote and emergency-intent path
- [ ] Deploy AI call triage for after-hours/overflow
- [ ] Sync bookings into calendar workflow
- [ ] Ship missed-call recovery sequence
- [ ] Publish first ROI case study from BCGD

Definition of success for 90 days:
- Measurable increase in booked jobs
- Faster response times
- At least one repeatable automation package ready to sell

---

## Repo scope

Current repo path: `nulljosh.github.io/bcgd/`

Contains:
- `index.html` - production marketing site
- `img/` - visual assets
- `README.md` - project and business plan (this file)

This repo is the public front-end wedge. Product/automation systems can live in separate service repos and integrate via APIs/webhooks.
