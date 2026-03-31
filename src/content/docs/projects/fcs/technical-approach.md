---
title: Technical Approach
description: System architecture, control strategy, and implementation approach for the FCS project.
---

<figure class="aerl-figure">
  <img
    class="aerl-inline-visual"
    src="/fcs/fcs-technical-approach.png"
    alt="Bench-top FCS quadcopter setup with labeled body axes, PID plot overlay, and architecture block diagram"
  />
  <figcaption class="aerl-caption">
    Bench-level system view showing body-axis orientation, PID response context, and the modular flight stack architecture.
  </figcaption>
</figure>

## System Architecture

The FCS uses a hierarchical control structure:

- Outer loop handles position and altitude targets
- Middle loop manages roll, pitch, and yaw attitude
- Inner loop performs motor mixing and PWM generation

All loops run on the Teensy 4.1 at defined frequencies chosen to balance control responsiveness and implementation stability.

## Flight Computer

The Teensy 4.1 was selected because it offers:

- 600 MHz ARM Cortex-M7 performance
- Rich SPI, I2C, and UART peripheral support
- A compact form factor suitable for flight hardware
- Enough compute headroom for sensing, estimation, control, and logging

## Control Strategy

The initial controller is cascaded PID.

| Loop | Input | Output | Target frequency |
| --- | --- | --- | --- |
| Roll PID | Roll angle error | Differential motor thrust | 500 Hz |
| Pitch PID | Pitch angle error | Differential motor thrust | 500 Hz |
| Yaw PID | Yaw rate error | Counter-torque adjustment | 500 Hz |
| Altitude hold | Barometer altitude error | Collective thrust | 100 Hz |

## Implementation Notes

- Apply derivative to measurement instead of error to reduce derivative kick
- Clamp integral state to prevent windup
- Clamp final output to the valid motor command range
- Target a 500 Hz main control loop on the Teensy 4.1

## Sensors and Interfaces

- IMU over I2C for angular rate and acceleration
- Barometer over I2C or SPI for altitude hold
- RC receiver over SBUS or PPM
- ESC outputs over PWM initially, with DSHOT as a future improvement if hardware compatibility is confirmed
- SD logging for repeatable flight data analysis

## Development Stack

| Layer | Tooling |
| --- | --- |
| Firmware | PlatformIO with Arduino framework |
| Analysis | Python with matplotlib, pandas, and scipy |
| Simulation | Python or MATLAB/Simulink |
| Version control | Git and GitHub |

## Theory Background

The platform is intentionally designed to teach and validate:

- Rigid-body quadcopter dynamics
- Coordinate frames and attitude representation
- Sensor fusion through a complementary filter
- Cascaded PID control and tuning
- Experimental validation from bench tests through flight tests
