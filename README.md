# Settlement Submission and Confirmation

## Overview

The application is implementing a settlement process between two parties, Party A and Party B.

The system handle iterative negotiation of settlement amounts by Party A, along with approvals or objections from Party B.

The process ensure that all changes and responses are reflected on Party A's and Party B's interface.

## Objective

Create a system where Party A can submit a settlement amount to Party B.

Party A is be able to modify the submitted amount an unlimited number of times until Party B responds. Upon receiving the submission, Party B can either raise an objection or agree to the amount.

If Party B disputes the amount, Party A is able to modify and resubmit the amount. This loop continues until Party B agrees, leading to a "settled" stage. The response from Party B is displayed on Party A’s interface, regardless of the choice made.

## How to run

You can just run the application with Docker.

```bash
docker-compose up --build
```

Then, you can try on your browser on `http://localhost:3000`.

## How does it work

If you log in as a proposer, you can propose a new settlement with price and update it. Whenever you create or update the settlement, it is reflected to other clients in realtime via websocket.

And when you try to update, it would check if it's possible as the verifier might approve or reject it before update.

If you log in as a verifier, you can confirm the settlements. As you can't edit the settlement, you can just approve or reject the settlement corresponding to you.
