```markdown
# Design System Document: The Synchronized Dualism

## 1. Overview & Creative North Star
**Creative North Star: The Curated Equilibrium**

This design system moves away from the rigid, boxed-in nature of traditional task managers. Instead, it adopts a "High-End Editorial" approach, treating a user’s schedule not as a list of chores, but as a balanced composition of life. 

The aesthetic is driven by **Intentional Asymmetry**. We break the "template" look by using generous white space (from the `24` and `16` spacing scales) and overlapping elements that suggest a fluid transition between professional responsibilities and personal restoration. By leveraging high-contrast typography scales and tonal layering, we create a signature experience that feels as much like a premium digital journal as it does a productivity powerhouse.

---

## 2. Colors & Tonal Logic

The palette is divided into two distinct emotional "lanes" that coexist within a single interface.

*   **Professional Lane (The Deep Focus):** Utilizes `primary` (#004d5b) and `primary_container` (#006778). These cool, authoritative tones signal structured work and cognitive clarity.
*   **Personal Lane (The Restorative Shift):** Utilizes `secondary` (#436555) and `tertiary` (#77310e). These sage and terracotta tones trigger a shift toward wellness and home life.

### The "No-Line" Rule
To maintain a premium, seamless feel, **1px solid borders are prohibited for sectioning.** Boundaries must be defined solely through background color shifts.
*   **Example:** A `surface_container_low` (#f3f4f2) card should sit on a `surface` (#f9f9f8) background. The change in hex value provides the visual break, keeping the UI "breathable."

### Surface Hierarchy & Nesting
Treat the UI as physical layers of fine paper. 
*   **Level 0 (Base):** `surface` or `background`.
*   **Level 1 (Sections):** `surface_container_low`.
*   **Level 2 (Interactive Cards):** `surface_container_lowest` (#ffffff).
By nesting a "Lowest" white card inside a "Low" grey section, we achieve depth without visual clutter.

### The Glass & Gradient Rule
For floating action buttons or high-priority headers, use semi-transparent applications of `surface_bright` with a `backdrop-blur` effect. To add "soul," apply subtle linear gradients transitioning from `primary` to `primary_container` for professional CTAs, ensuring the interface feels dynamic rather than static.

---

## 3. Typography: The Editorial Voice

We use a "High-Low" typographic pairing to create an authoritative yet approachable voice.

*   **Display & Headline (Manrope):** This is our "Editorial" voice. Use `display-lg` (3.5rem) for morning greetings or milestone achievements. Use `headline-md` (1.75rem) for lane titles. Manrope’s geometric but warm curves ground the system in modernity.
*   **Title & Body (Work Sans):** This is our "Functional" voice. Work Sans is chosen for its exceptional legibility at small scales. Use `body-lg` (1rem) for task descriptions and `label-md` (0.75rem) for metadata.
*   **Hierarchy Note:** Always maintain a high contrast between the headline and the body. If a headline is `headline-lg`, the supporting text should jump down to `body-md` to create clear visual entry points.

---

## 4. Elevation & Depth

We eschew traditional drop shadows in favor of **Tonal Layering**.

*   **The Layering Principle:** Depth is achieved by stacking `surface-container` tiers. Use `surface_container_highest` (#e2e3e1) only for the most recessed elements (like an empty state wells), while interactive cards should "pop" by using `surface_container_lowest` (#ffffff).
*   **Ambient Shadows:** If a floating element (like a Modal) requires a shadow, it must be "Ambient."
    *   **Blur:** 24px - 40px.
    *   **Opacity:** 4% - 6%.
    *   **Color:** Use a tinted version of `on_surface` (#1a1c1b) to ensure the shadow feels like a natural obstruction of light, not a "dirty" smudge.
*   **The Ghost Border:** For accessibility in high-glare environments, use a "Ghost Border"—`outline_variant` (#bec8cb) at 15% opacity. Never use 100% opaque outlines.

---

## 5. Components

### Buttons
*   **Primary:** High-contrast `primary` container with `on_primary` text. Use `xl` (1.5rem / 24px) corner radius to create a "pill-like" organic feel.
*   **Secondary/Tertiary:** Use `surface_container_high` backgrounds. Avoid borders; rely on the tonal shift from the background to define the touch target.

### Cards & Lists
*   **The "No Divider" Mandate:** Dividers are strictly forbidden. Use `spacing-6` (1.5rem) or `spacing-8` (2rem) to separate list items. 
*   **Card Styling:** Apply `rounded-lg` (1rem) or `rounded-xl` (1.5rem). The Professional Lane uses `primary_fixed_dim` for subtle accents, while the Personal Lane uses `secondary_fixed_dim`.

### Input Fields
*   **Styling:** Eschew the "box" look. Use a `surface_container_low` fill with a `title-sm` (Work Sans) label. 
*   **States:** On focus, transition the background to `surface_container_highest`. Do not use a heavy focus ring; use a 2px bottom-bar in the `primary` color for the Professional lane or `tertiary` for Personal.

### Lane Switcher (Unique Component)
A custom segmented control using a `surface_container_high` track. The active "thumb" should be a `surface_container_lowest` card with an ambient shadow, gliding between the "Professional" and "Personal" states.

---

## 6. Do’s and Don'ts

### Do:
*   **Do** use intentional asymmetry. Align a headline to the left but place the CTA to the right to create an editorial flow.
*   **Do** use `tertiary` (#77310e) as an "Interruptor" color. It should be used sparingly to highlight moments of extreme personal importance (e.g., "Time to Unwind").
*   **Do** use the `20` and `24` spacing tokens to create "Breathing Rooms" between the Professional and Personal sections of the app.

### Don't:
*   **Don't** use pure black (#000000). Always use `on_surface` (#1a1c1b) to keep the contrast high but the feel "soft."
*   **Don't** use 1px dividers to separate tasks. It creates "visual noise" that contradicts the brand personality of "Clear and Balanced."
*   **Don't** mix the lanes. If a user is in the "Professional Lane," do not use `secondary` or `tertiary` tokens unless it is a deliberate "Life-Bridge" notification.

---
*Note: This system is designed to evolve. When in doubt, prioritize negative space over decorative elements.*```