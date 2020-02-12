module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: { node: 'current', browsers: '>5%'  }, 
        useBuiltIns: 'usage'
      }
    ]
  ]
}
