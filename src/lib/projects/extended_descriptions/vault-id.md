# The problem it solves

Application sessions today are **device-bound, fragile, and centralized**.  
Users lose access when switching browsers or devices, and developers rely on insecure cookie-based storage.

---

## 💡 What VaultID Does

VaultID **stores encrypted session data on IPFS** and **anchors a proof of that session on-chain**, creating a decentralized, portable session system.

- **IPFS** → stores the encrypted session securely
- **Blockchain** → records a tamper-proof reference (no secrets on-chain)

---

## 🔑 Key Capabilities

- **Portable Sessions**  
  Use the same login across:
  - Multiple browsers
  - Multiple devices
  - Different environments (desktop → laptop)

- **Shared Sessions**  
  Multiple users using the **same wallet** can access the same authenticated session  
  (useful for teams, shared dashboards, DAOs, ops accounts)

- **Single Login, Everywhere**  
  One authentication → usable across all supported clients

- **Decentralized by Design**  
  No central session store  
  No server-controlled cookies  
  No plaintext credentials

---

## 🚀 What’s Coming Next

- **Refresh Token Management**  
  Secure rotation to extend session validity without re-login

- **Mobile Support**  
  Designed to work seamlessly on mobile browsers and apps

---

## 🧠 In Short

VaultID turns sessions into **portable, shared, and decentralized assets** —  
usable across browsers, devices, and users, without sacrificing security or control.

---

# Challenges we ran into

Building VaultID involved solving problems that **don’t have standard patterns yet**, especially around browser behavior, sessions, and decentralization.

---

### 🔍 Detecting Login / Logout State Changes

**Challenge:**  
Websites don’t expose a clear signal for “user logged in” or “user logged out”.  
Each app handles authentication differently — cookies, redirects, silent refreshes, etc.

**Why it was hard:**

- No universal event for auth state changes
- Sessions update silently in the background
- Logout flows vary wildly across apps

**How we solved it:**

- Monitored **cookie mutations and storage changes**
- Compared session snapshots over time
- Triggered the extension popup only when a **meaningful auth state change** was detected
  - Login → prompt to **save session**
  - Logout → prompt to **delete session**

---

### 🔐 Syncing & Decrypting Sessions from IPFS

**Challenge:**  
Session data stored on IPFS is encrypted and fetched asynchronously, making synchronization tricky.

**Why it was hard:**

- IPFS retrieval is non-instant
- AES-GCM requires exact nonce + key handling
- Partial or out-of-order data breaks decryption

**How we solved it:**

- Strict versioning of session payloads
- Deterministic encryption/decryption flow
- Validated decrypted data before applying it

---

### 🍪 Rehydrating Cookies into Websites

**Challenge:**  
Correctly restoring cookies into a website after decryption is non-trivial.

**Why it was hard:**

- Cookie attributes (domain, path, secure, sameSite) must match exactly
- Incorrect flags silently break login
- Browsers enforce strict security rules

**How we solved it:**

- Preserved full cookie metadata during encryption
- Restored cookies in the correct order
- Applied browser-compliant constraints to avoid rejection

---

## 🧠 Key Takeaway

The hardest part wasn’t encryption or blockchain —  
it was **bridging real-world browser behavior with decentralized storage** in a way that feels seamless to users.
