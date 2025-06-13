# Graphen - Network Visualization App

This tool offers a dynamic, interactive visualization of our corporate network topology, highlighting switches, patch panels, and their physical/logical connections.

## Prerequisites

1. **Node.js**: Ensure you have Node.js installed on your system.
2. **Network Data**: Create a folder named `./sheets` in the root directory of the project and place a file named `network.xlsx` in it. This file will be used to read network data.

## Installation

1. Clone the repository:
   ```bash
   git clone git@github.com:PawlikKing/graphen.git
   cd graphen
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Commands

### Build the Project
```bash
npm run build
```
This command compiles the TypeScript files and copies the necessary assets (CSS, JS, images) to the `dist` folder.

### Start the Server
```bash
npm start
```
This command builds the project and starts the server.

### Copy Public Assets
```bash
npm run copy:public
```
This command copies all public assets (CSS, JS, images) from `src/public` to `dist/public`.

### Copy Views
```bash
npm run copy:views
```
This command copies all view files from `src/views` to `dist/views`.

## Folder Structure

- **`src/`**: Contains the source code of the application.
- **`dist/`**: Contains the compiled code and assets after running the build command.
- **`sheets/`**: Contains the `network.xlsx` file for reading network data.

## Features

- Interactive visualization of switches, panels, and connections.
- Toggle between different views (connections and switches).
- Responsive design for various screen sizes.

## License

This project is licensed under the MIT License.
