## Scripts

- `yarn` to download dependencies and run a postinstall build
- `yarn start` to start the development server and make your application accessible at `localhost:3000` with hot-reloading enabled
- `yarn start:production` the web-app is built for optimal performance: assets are minified and served gzipped
- `yarn start:tunnel` starts the development server and tunnels it with `ngrok`, making the website available worldwide. Useful for testing on different devices in different locations
- `yarn analyse` will generate a stats.json file from your production build, which you can upload to the [**Webpack Analyzer**](https://webpack.github.io/analyse/#home) or [**Webpack Visualizer**](https://chrisbateman.github.io/webpack-visualizer/). This analyzer will visualize your dependencies and chunks with detailed statistics about the bundle size.
