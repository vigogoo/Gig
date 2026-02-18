# Implementation Plan - Gig App (Mobile)

## Phase 1: Foundation & Entry
This phase focuses on setting up the React Native environment, global theming, and the initial authentication flow simulation.

### 1. Project Setup [IN PROGRESS]
*   **Framework**: Expo (React Native)
*   **Language**: TypeScript
*   **Path**: `gig/mobile`

### 2. Architecture & Utilities
#### **Theme System**
*   **Goal**: visual consistency (Dark by default, but user toggleable).
*   **Settings**: System (Default) | Light | Dark.
*   **Tech**:
    *   `ExecutionContext`: Wrapper to provide theme.
    *   `AsyncStorage`: Persist user preference.
    *   `StyleSheet`: Centralized colors (`constants/Colors.ts`).

#### **Data Layer (API & Mocks)**
*   **Strategy**: "Write the request, return the mock."
*   **Structure**:
    *   `services/api.ts`: Real Axios/Fetch functions calling the endpoints defined in storyboard (e.g., `/api/auth/verify-sim/`).
    *   `services/mock.ts`: Static JSON data mimicking backend responses.
    *   `hooks/useQuery.ts`: A wrapper to switch between Real/Mock easily (or just interceptors).

### 3. Screen Implementation Order

#### A. Settings / Profile (Priority: User Request)
*   **UI**: Simple list.
*   **Feature**: "Appearance" section with Segmented Control or Modal for Theme.
*   **Toggle logic**: Updates global context.

#### B. Splash & Auth (Storyboard Phase 1)
*   **Screen**: `app/index.tsx` (Splash) -> Redirects to Auth or Main.
*   **UI**: "Verifying number..." (Simulated delay).
*   **Code**: `POST /api/auth/verify-sim/` (Mocked success).

#### C. Main Tab Navigator
*   `app/(tabs)/index.tsx`: Map Feed.
*   `app/(tabs)/explore.tsx`: List.
*   `app/(tabs)/profile.tsx`: Settings entry point.

## Verification
*   **Build**: Ensure `npx expo start` runs without errors.
*   **Lint**: TypeScript compilation check.
*   **Manual**: Verify Theme switch instantly updates UI colors.
