# Technologická Olympiáda - Competition Guide

## Competition Format
- **Duration:** 3 hours
- **Questions:** 25 multiple-choice (multiple correct answers possible)
- **Tools allowed:** Any sources, including AI assistance
- **Constraint:** Questions accessible from single device only → use main.py scraper to distribute

## Team Members & Strengths

| Member | Strengths |
|--------|-----------|
| **Robin** | Embedded, IoT, Energetics, Robotics |
| **Filip** | Crypto, Networking, AI, ML, Manufacturing |
| **Adam** | General knowledge, Chemistry (all know physics) |

## Question Distribution Strategy

Assign questions based on team strengths:
- **Robin:** Embedded, IoT, energy, robotics questions
- **Filip:** Crypto, networking, AI/ML, manufacturing questions
- **Adam:** General knowledge, chemistry questions

## Required External Tools
Prepare these tabs before competition:
- https://app.electricitymaps.com/map/12mo (energy data)
- https://mapy.cz (route/distance calculations)
- https://etherscan.io (Ethereum/Uniswap analysis)
- https://www.onsemi.com (component datasheets)

## Solving Strategies by Type

### Energy/Climate
1. Fetch data from electricitymaps.com
2. Watch unit conversions (TWh → kWh → Wh)
3. Cross-reference multiple sources for emission factors

### AI/ML
1. Execute algorithms step-by-step, track intermediate values
2. Calculate layer dimensions through networks carefully
3. Know terminology (aggregation, differential privacy, federated learning)

### Blockchain/Crypto
1. Use Etherscan to read contract events and transactions
2. Understand common attack patterns (sandwich, front-running)
3. Apply transformation matrices carefully for crypto puzzles

### IoT/Embedded
1. Search datasheets by part number
2. Trace code flow carefully (especially sensor reads)
3. Identify protocols by clock/data patterns (SPI, I2C, CAN)

## Claude Instructions

When asked to perform calculations or solve a problem/question:
1. **Repeat calculation 3-5 times** independently
2. **Compare all results** for consistency
3. **Report any differences** between attempts
4. **Flag discrepancies** as potential hallucination/error risk
5. If results vary, show all attempts and recommend manual verification

This reduces risk of incorrect answers due to calculation errors or hallucinations.

## Competition Day Protocol

1. **Start:** Run `python main.py` to scrape and distribute questions
2. **Assign:** Distribute questions based on team member strengths
3. **Time limit:** Max 10 min per hard question, then flag and move on
4. **Cross-check:** Verify calculation answers together before submit
5. **Communication:** Share findings that might help other questions

## Notes from Last Year
- Team struggled with: external data timing, unit conversions, technical ML/crypto
- Multiple correct answers possible - read carefully
- Answers marked in HTML: class="correct" = right, class="incorrect" = wrong choice
