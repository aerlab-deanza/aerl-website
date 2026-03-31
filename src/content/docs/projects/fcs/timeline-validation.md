---
title: Timeline and Validation
description: Project phases, validation targets, and system requirements for the FCS project.
---

## Phase Plan

### Phase 1: Design and Procurement

- Finalize the component list and bill of materials
- Order the frame, motors, ESCs, Teensy, IMU, battery, and accessories
- Set up Git and PlatformIO
- Draft architecture and block diagrams
- Assign committee responsibilities

### Phase 2: Hardware Build

- Assemble the airframe and mount motors
- Install ESCs and route power wiring
- Mount the Teensy and sensor board
- Complete the wiring harness
- Perform a bench power-on test

### Phase 3: Firmware Development

- Implement IMU reads and RC input parsing
- Implement attitude estimation
- Implement PID loops for roll, pitch, and yaw
- Implement motor mixing and ESC outputs
- Validate firmware on the bench with props removed

### Phase 4: Initial Flight Testing

- Conduct tethered hover tests
- Log attitude, motor outputs, and PID error data
- Tune gains iteratively
- Validate attitude hold under disturbances

### Phase 5: PID Tuning and Validation

- Fine-tune gains from flight data
- Run step response tests on roll, pitch, and yaw
- Characterize disturbance rejection
- Record final gains and measured performance

### Phase 6: Documentation and Handoff

- Populate core documentation pages
- Record and annotate flight test videos
- Publish final code and parameter sheets
- Hold a lessons-learned debrief

## Gantt Summary

| Task | W1 | W2 | W3 | W4 | W5 | W6 | W7 | W8 | W9 | W10 | W11 | W12 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Design and procurement | X | X |  |  |  |  |  |  |  |  |  |  |
| Hardware build |  |  | X | X |  |  |  |  |  |  |  |  |
| Firmware development |  |  |  |  | X | X | X |  |  |  |  |  |
| Initial flight test |  |  |  |  |  |  |  | X | X |  |  |  |
| PID tuning |  |  |  |  |  |  |  |  |  | X | X |  |
| Documentation |  |  |  |  |  |  |  |  |  |  |  | X |

## Functional Requirements

- Stable, controlled hover for at least 30 seconds
- Roll and pitch attitude error under +/-2 deg during steady hover
- Yaw drift under +/-5 deg per minute without correction
- RC input response within 100 ms
- PID loops running at a minimum of 250 Hz
- Motor outputs generated with less than 1 ms latency from sensor read

## Performance Requirements

| Metric | Target | Measurement method |
| --- | --- | --- |
| Hover stability | Under +/-2 deg | IMU log analysis |
| Step response settling time | Under 1 s | Step input test plus logs |
| Step response overshoot | Under 15 percent | Step input test plus logs |
| PID loop frequency | Above 250 Hz | Timer measurement in firmware |
| Battery life at hover | Above 8 minutes | Flight test stopwatch |
| Thrust-to-weight ratio | Above 2:1 | Thrust stand measurement |

## Validation Status

| Test | Pass criterion | Status |
| --- | --- | --- |
| Simulated roll step response | Settling under 1 s, overshoot under 15 percent | Pending |
| Simulated pitch step response | Settling under 1 s, overshoot under 15 percent | Pending |
| Simulated yaw step response | Settling under 2 s | Pending |
| Disturbance rejection | Return to level within 2 s | Pending |
| Hover trim | Under 0.5 percent throttle asymmetry | Pending |

## Test Results Log

| Date | Test | Result | Notes |
| --- | --- | --- | --- |
| TBD | IMU I2C comms | Pending | Verify device address and stable reads |
| TBD | Complementary filter | Pending | Tune alpha and compare drift |
| TBD | Motor PWM output | Pending | Confirm timing with an oscilloscope |
| TBD | First bench run | Pending | Props removed, verify response |
