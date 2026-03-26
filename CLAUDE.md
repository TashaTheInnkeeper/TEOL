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

### Robin's Questions (Embedded, IoT, Energy, Robotics)
- Q1: CO2 emissions (electricitymaps.com)
- Q3: Solar + EV calculation (mapy.cz)
- Q6: TSMC solar panel area
- Q10: ON Semiconductor component (onsemi.com datasheets)
- Q11: Parking CO2 reduction
- Q12: Arduino DHT sensor code analysis
- Q13: SPI/CAN protocol identification
- Q24: Tesla Bot ROI
- Q25: Drone vs car delivery logistics

### Filip's Questions (Crypto, Networking, AI/ML, Manufacturing)
- Q7: Perceptron algorithm execution
- Q8: CNN architecture dimensions
- Q9: Federated learning concepts
- Q14: 5G data transfer calculation
- Q15: V2V mesh network
- Q16: 6G research (Czech government docs)
- Q17: Differential privacy probability
- Q19: Image encryption transformations
- Q20: Uniswap smart contract (etherscan.io)
- Q21: MEV Sandwich attack
- Q23: 3D printing volume calculation

### Adam's Questions (General, Chemistry)
- Q2: Battery recycling facts verification
- Q4: Electron calculation in batteries
- Q5: EV trip cost/time
- Q18: GDPR/Avast case
- Q22: Blue Zones longevity

## Question Categories & Difficulty

### Easy (Quick lookup)
- Q2: Battery facts - verify true/false
- Q18: GDPR case - legal lookup
- Q22: Blue Zones - general knowledge

### Medium (Moderate calculation)
- Q4: Electron count - chemistry formula
- Q5: EV trip - multi-step math
- Q10: Component ID - datasheet lookup
- Q12: Arduino code - trace logic
- Q14: 5G bandwidth calculation
- Q23: 3D print volume - geometry

### Hard (Complex + external data)
- Q1, Q3, Q6, Q11: Energy calculations + external data
- Q7, Q8, Q9, Q17: ML algorithms and concepts
- Q13: Protocol timing diagrams
- Q15, Q16: Advanced networking
- Q19, Q20, Q21: Cryptography/blockchain
- Q24, Q25: Optimization calculations

## Required External Tools
Prepare these tabs before competition:
- https://app.electricitymaps.com/map/12mo (energy data)
- https://mapy.cz (route/distance calculations)
- https://etherscan.io (Ethereum/Uniswap analysis)
- https://www.onsemi.com (component datasheets)

## Solving Strategies by Type

### Energy/Climate (Q1, Q3, Q6, Q11)
1. Fetch data from electricitymaps.com
2. Watch unit conversions (TWh → kWh → Wh)
3. Q6 answer was: Hradec Králové (~105 km²)

### AI/ML (Q7, Q8, Q9, Q17)
1. Q7: Execute perceptron step-by-step, track weights
2. Q8: Calculate layer dimensions through network
3. Q9: Know terminology (aggregation, differential privacy)
4. Q17: Coin flip probability math

### Blockchain (Q19, Q20, Q21)
1. Q19: Apply transformation matrices to pixels
2. Q20: Read contract events on Etherscan
3. Q21: Understand sandwich attack mechanics

### IoT/Embedded (Q10, Q12, Q13)
1. Search datasheets by part number
2. Trace Arduino code flow carefully
3. Identify protocol by clock/data patterns

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
2. **Assign:** Each member takes their designated questions
3. **Time limit:** Max 10 min per hard question, then flag and move on
4. **Cross-check:** Verify calculation answers together before submit
5. **Communication:** Share findings that might help other questions

## Notes from Last Year
- Team struggled with: external data timing, unit conversions, technical ML/crypto
- Multiple correct answers possible - read carefully
- Answers marked in HTML: class="correct" = right, class="incorrect" = wrong choice
