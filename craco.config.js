module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // Iterate over all rules to find those related to file loading
      webpackConfig.module.rules.forEach((rule) => {
        if (rule.loader && rule.loader.includes('file-loader')) {
          // Modify existing rule to handle both images and videos
          rule.test = /\.(png|jpe?g|gif|mp4|webm)$/i; // Match images and video extensions
          rule.options.name = 'assets/media/[name].[ext]'; // Set the output file name
        }
      });

      // No need for a separate video rule since the existing rule is modified

      return webpackConfig;
    },
  },
};