# Conway Viewer Demo

This project demonstrates the usage of the `@bldrs-ai/conway` viewer component, built with Three.js. It provides a simple web interface to load 3D models and High Dynamic Range (HDR) environment maps, allowing users to interact with the scene and adjust rendering settings.

## Features

*   Loads 3D models (including IFC and STEP formats) from user-selected files.
*   Loads HDR environment maps (`.hdr`) for image-based lighting.
*   Displays the active `@bldrs-ai/conway` version in the GUI.
*   Provides a GUI (using `lil-gui`) with two groups of controls:
    *   **Loader** — cap CSG evaluation with `Limit CSG Depth` (toggle) and `Max CSG Depth` (value), to keep complex boolean geometry tractable.
    *   **Rendering** — Ambient Occlusion, Ambient Light, Shadows (enable/disable), and Shadow Quality (Low, Medium, High).

## Getting Started

### Prerequisites

*   [Node.js](https://nodejs.org/) (which includes npm)
*   [Yarn](https://yarnpkg.com/) (recommended package manager)

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/bldrs-ai/conway-viewer-demo.git
    cd conway-viewer-demo
    ```
2.  Install dependencies:
    ```bash
    yarn install
    ```

### Running the Demo

To start the development server and open the demo in your browser:

```bash
yarn start
```

This will compile the TypeScript code and launch a local server using Parcel.

### Building for Distribution

To create a distribution-ready build in the `dist/` directory:

```bash
yarn build
```

### Other Scripts

*   `yarn test` — run the Jest test suite.
*   `yarn lint` — run ESLint over `src` (with `--fix`).
*   `yarn clean` — remove the `dist/`, `.parcel-cache`, and `compiled` build outputs.
*   `yarn deploy` — build, lint, test, and publish `dist/` to the `gh-pages` branch.

## Usage

Once the demo is running in your browser:

1.  **Load Model:** Click the "Load Model" button in the GUI and select a 3D model file (e.g., IFC, STEP) from your computer. The viewer uses the `@bldrs-ai/conway` library's loading mechanism.
2.  **Load Environment Map:** Click the "Load Environment Map" button and select an `.hdr` file to use for image-based lighting. Loading an environment map will automatically disable the default ambient light. A good source of free HDR based environments is [Poly Haven](https://polyhaven.com/hdris).
3.  **Adjust Loader Settings:** Use the **Loader** folder to cap CSG evaluation depth — enable `Limit CSG Depth` and set `Max CSG Depth` to keep complex boolean geometry tractable.
4.  **Adjust Rendering Settings:** Use the **Rendering** folder to toggle Ambient Occlusion, Shadows, and Ambient Light, and to change the Shadow Quality.

## License

This project is licensed under the AGPL-3.0 license. See the [LICENSE](LICENSE) file for details.
