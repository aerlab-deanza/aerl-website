---
title: Theory and Background
description: Core theory supporting the FCS project, including dynamics, estimation, and PID control.
---

<figure class="aerl-figure">
  <img
    class="aerl-inline-visual"
    src="/fcs/fcs-theory-board.png"
    alt="Teensy-based flight control electronics stack with sensor modules and control loop overlays"
  />
  <figcaption class="aerl-caption">
    Concept view of the embedded flight stack: Teensy controller, sensor interfaces, and the roll, pitch, and yaw control loops the theory section explains.
  </figcaption>
</figure>

## Quadcopter Dynamics

A quadcopter is an under-actuated rigid body with six degrees of freedom and four independent actuators. The motors generate thrust forces and reaction torques that combine into net force and net moment on the vehicle.

## Coordinate Frame

The body frame is defined with:

- X pointing forward
- Y pointing left
- Z pointing up

Roll is rotation about X, pitch about Y, and yaw about Z. The world frame may be modeled with either NED or ENU conventions depending on the analysis workflow.

## Equations of Motion

- Linear: total force equals mass times acceleration
- Rotational: torque equals rigid-body inertia effects plus angular-rate coupling

These dynamics are the basis for simulation, controller design, and validation.

## PID Control Background

The initial controller is cascaded PID. Each controller combines:

- Proportional action for immediate error correction
- Integral action to reduce steady-state bias
- Derivative action to damp response and reduce overshoot

For the quadcopter, outer-loop objectives generate attitude or thrust targets, while inner loops track those targets using sensor feedback.

## Attitude Estimation

Raw accelerometer and gyroscope data are fused with a complementary filter:

`angle = alpha * (angle + gyro_rate * dt) + (1 - alpha) * accel_angle`

At the current target loop rate, an `alpha` value around `0.98` is a reasonable starting point for blending short-term gyro stability with long-term accelerometer reference.

## Why theory matters here

This project is not only about making the vehicle fly. It is also a platform for:

- learning control theory by implementation
- validating models against real hardware
- building reusable documentation for future teams
- creating a path toward LQR, MPC, and adaptive control methods
