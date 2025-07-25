todo:
    landing Page
    websockets
    openapi
  

    VPay – Architecture & Flow
Overview
VPay is a monorepo wallet application built with a modern stack (Next.js, Express, Prisma, PostgreSQL, Tailwind, and a custom UI library). It supports user authentication, wallet balance management, on-ramp (add money), P2P transfers, and transaction history, with a modular architecture for scalability.

High-Level Architecture
Monorepo: Managed by Turborepo, with apps (user-app, bank-webhook) and packages (db, ui, store, etc.).
Database: PostgreSQL, managed via Prisma ORM (db).
Backend:
user-app: Next.js app for user dashboard, authentication, and wallet features.
bank-webhook: Express server to handle bank callbacks for on-ramp transactions.
UI: Custom component library (ui) using Tailwind CSS and Radix UI.
State Management: Recoil (planned), React context/hooks.
API: Next.js API routes for user actions, with rate limiting and authentication.
Main Features & Flow
1. User Authentication
Uses NextAuth for session management.
Users log in with a phone number and password.
2. Dashboard
Shows user greeting, balance (unlocked, locked, total), and transaction summaries.
Graphical view of monthly transactions.
3. Add Money (On-Ramp)
User selects a bank and amount.
Creates an on-ramp transaction (status: Processing).
Redirects to bank site; after payment, the bank calls the /hdfcWebhook endpoint (bank-webhook app).

4. P2P Transfer
User enters recipient's number and amount.
Backend validates recipient, checks balance, and performs atomic transfer (debit sender, credit receiver, create transfer record).
Rate limiting is enforced per IP.
Transaction status is updated (Success/Failure).
5. Transaction History
On-Ramp Transactions: Shows recent add-money events with status and provider.
P2P Transactions: Shows last 5 sent/received transfers, with direction, amount, and counterparties.
All Transactions: Tabular view of all user transactions.
6. Bank Webhook
Receives POST requests from banks after payment.
On webhook, the backend updates the user's balance and transaction status to Success.
sample Postman Post Req:
{
  "token": "232.23011382469227",
  "user_identifier": "2",
  "amount": "10000",
  "PaymentResponse":"Success"
}
![postman webhook call](image.png)
Validates payload, updates user balance and transaction status.
Codebase Structure
user-app: Next.js frontend (dashboard, auth, API routes).
bank-webhook: Express server for bank callbacks.
db: Prisma schema, client, and seed scripts.
ui: Shared UI components (Card, Button, Chart, etc.).
store: State management utilities.
docker: Dockerfiles for deployment.
Data Models (Prisma)
User: id, name, number, password, balances, on-ramp transactions, p2p transfers.
Balance: userId, amount, locked.
OnRampTransaction: userId, amount, status, provider, token.
p2pTransfer: fromUserId, toUserId, amount, status, timestamp.
Flow Diagram
User logs in → Dashboard loads (balance, transactions).
Add Money → Initiate on-ramp → Redirect to bank → Bank webhook → Balance updated.
P2P Transfer → Enter recipient/amount → Backend validates & processes → Balances updated for both users.
Transactions → User views all transaction history.
Tech Stack
Frontend: Next.js, React, Tailwind CSS, Radix UI, custom UI library.
Backend: Next.js API routes, Express (webhook), Prisma, PostgreSQL.
Auth: NextAuth.js.
State: React hooks, Recoil (planned).
Dev Tools: Turborepo, ESLint, Prettier, Docker.


AWS SETUP

Can Run entire Turborepo in ec2 for simplification, but here dockerizing separately and adding workflows for learing.
ec2-t3micro
security group: open ssh,http,https ports

connect using keypair: chmod 400 Vpay-keypair.pem
                       cp Vpay-keypair.pem ~/.ssh/
                       ssh -i ~/.ssh/Vpay-keypair.pem ubuntu@"public-ip-address"
                       
ngnix:
server {
        server_name Vpay.starzc.com;

        location / {
            proxy_pass http://localhost:3005;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_cache_bypass $http_upgrade;


        }


}

server {
        server_name Vpaybankwebhook.starzc.com;

        location / {
            proxy_pass http://localhost:3003;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_cache_bypass $http_upgrade;


        }

    

}
sudo nginx -t
sudo nginx -s reload 
Install certbot for https :https://certbot.eff.org/instructions?ws=nginx&os=snap
