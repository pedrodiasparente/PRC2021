module.exports = {
    devServer: {
     proxy: {
       '/jcrpubs': {
         target: 'http://localhost:3000',
         secure: true,
         changeOrigin: true,
         pathRewrite: {
           '^/jcrpubs': ''
         }
       },
     }
   }
   };