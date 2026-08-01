# JS Defer Features

The main differences between `<script defer>`, `DOMContentLoaded`, and `window.onload` lie in **what they wait for** and **how they are executed**.

In a standard page lifecycle, they execute in this precise order: `<script defer>` → `DOMContentLoaded` → `window.onload`.

### Direct Comparison

| Feature | `<script defer>` |`DOMContentLoaded`| `window.onload` |
|:--|:--|:--|
| Type | HTML Script Attribute | DOM Event Listener | Window Event Listener / Property |
| Waits For | HTML parsing to finish. | HTML parsed + deferred scripts executed. | Everything (HTML, CSS, Images, Iframes).|
| Blocks Rendering? | No, downloads in the background. | No. | No. |
| Order of Execution | 1st | 2nd | 3rd |
| Best Used For | Loading external scripts efficiently. | Running UI logic as soon as elements exist. | Heavy scripts relying on final layouts or images. |

### Detailed Breakdown

* `<script defer>`
  - **How it works**: When the browser encounters `<script src="..." defer>`, it fetches the JavaScript file in the background while continuing to parse the HTML document. The script executes only **after** the HTML parsing is 100% complete.
  - **Key Detail**: If you have multiple defer scripts, they execute in the exact order they appear in the HTML document.
  - **Limitation**: It only works for external scripts (using the `src` attribute).

* `document.addEventListener("DOMContentLoaded", ...)`
  - **How it works**: This event fires immediately after the browser has completely parsed the HTML document and built the Document Object Model (DOM).
  - **Key Detail**: It **waits** for all deferred scripts to finish executing. However, it **does not wait** for images, stylesheets, or async scripts to load.
  - **Syntax**:

  ```javascript
  document.addEventListener("DOMContentLoaded", () => {
    // Safe to select elements like document.querySelector('#btn')
  });
  ```
* `window.onload` (or `window.addEventListener('load')`)
  - **How it works**: This is the final event in the page loading sequence. It fires only when the **entire page** has loaded, including all dependent resources like images, stylesheets, and iframes.
  - **Key Detail**: If you use `window.onload = function`, you can only assign one function to it (subsequent assignments overwrite the previous ones). Use `window.addEventListener('load', ...)` to attach multiple functions cleanly.
  - **Syntax**:

  ```javascript
  window.addEventListener("load", () => {
    // Safe to calculate image dimensions or check computed styles
  });
  ```

### Summary Checklist: Which should you use?

* Use `defer` for standard external script tags. It gives the best performance because scripts download in parallel with HTML parsing.
* Use `DOMContentLoaded` if you are writing script logic inside an inline block and need to manipulate elements safely without blocking page rendering.
* Use `window.onload` only if your script explicitly depends on external images being fully rendered, such as initializing a canvas game or calculating exact physical image dimensions.
